import JSCPP from 'JSCPP'
import hljs from 'highlight.js/lib/core'
import cpp from 'highlight.js/lib/languages/cpp'
import 'highlight.js/styles/github-dark.css'
import { projects } from './projects.js'

hljs.registerLanguage('cpp', cpp)

// ── State ──────────────────────────────────────────────────
let currentProject = null

// ── DOM refs ───────────────────────────────────────────────
const $landing     = document.getElementById('landing')
const $projectView = document.getElementById('project-view')
const $cardsGrid   = document.getElementById('cards-grid')
const $backBtn     = document.getElementById('back-btn')
const $navTitle    = document.getElementById('nav-title')
const $codeDisplay = document.getElementById('code-display')
const $copyBtn     = document.getElementById('copy-btn')
const $clearBtn    = document.getElementById('clear-btn')
const $termOutput  = document.getElementById('term-output')
const $outputPre   = document.getElementById('output-pre')
const $cursor      = document.getElementById('cursor')
const $stdinInput  = document.getElementById('stdin-input')
const $stdinHint   = document.getElementById('stdin-hint')
const $exampleBtn  = document.getElementById('example-btn')
const $runBtn      = document.getElementById('run-btn')
const $statusMsg   = document.getElementById('status-msg')
const $termTitle   = document.getElementById('term-title')

// ── Utility ────────────────────────────────────────────────
const delay = ms => new Promise(r => setTimeout(r, ms))

function setAccentColor(color) {
  document.documentElement.style.setProperty('--accent', color)
  const dim = color + '22'
  document.documentElement.style.setProperty('--accent-dim', dim)
}

// ── Hero terminal animation ─────────────────────────────────
const heroLines = [
  { text: '$ ls src/cpp/', color: '#b8ffda' },
  { text: '  bubble_sort.cpp', color: '#6b7280' },
  { text: '  caesar_cipher.cpp', color: '#6b7280' },
  { text: '  prime_sieve.cpp', color: '#6b7280' },
  { text: '  matrix_multiply.cpp', color: '#6b7280' },
  { text: '  statistics.cpp', color: '#6b7280' },
  { text: '$ _', color: '#00ff88' },
]

async function animateHero() {
  const container = document.getElementById('hero-lines')
  for (const { text, color } of heroLines) {
    await delay(120)
    const span = document.createElement('div')
    span.textContent = text
    span.style.color = color
    container.appendChild(span)
  }
}

// ── Render cards ───────────────────────────────────────────
function renderCards() {
  $cardsGrid.innerHTML = ''
  for (const project of projects) {
    const card = document.createElement('div')
    card.className = 'card'
    card.style.setProperty('--accent', project.color)
    card.style.setProperty('--accent-dim', project.color + '18')
    card.innerHTML = `
      <div class="card-icon" style="background:${project.color}18;color:${project.color}">${project.icon}</div>
      <div class="card-subtitle">${project.subtitle}</div>
      <div class="card-title">${project.title}</div>
      <div class="card-desc">${project.description}</div>
      <div class="card-action">Launch Terminal →</div>
    `
    card.addEventListener('click', () => openProject(project))
    $cardsGrid.appendChild(card)
  }
}

// ── Open project ───────────────────────────────────────────
function openProject(project) {
  currentProject = project
  setAccentColor(project.color)

  $navTitle.textContent = project.title
  $termTitle.textContent = project.title.toLowerCase().replace(/ /g, '_')
  $stdinHint.textContent = project.hint

  // Syntax-highlight the source
  $codeDisplay.textContent = project.code
  hljs.highlightElement($codeDisplay)

  // Reset terminal
  resetTerminal()
  printWelcome(project)

  $landing.classList.add('hidden')
  $projectView.classList.remove('hidden')
  window.scrollTo(0, 0)
}

function resetTerminal() {
  $outputPre.textContent = ''
  $cursor.className = 'cursor blink'
  $statusMsg.textContent = ''
  $stdinInput.value = ''
}

function printWelcome(project) {
  appendOutput(`# ${project.title} — ${project.subtitle}\n`)
  appendOutput(`# ${project.description}\n`)
  appendOutput(`\n$ g++ source.cpp -o ${project.id}\n`)
  appendOutput(`# Compilation OK  ·  provide stdin below and click Run\n\n`)
  scrollTerminal()
}

// ── Back ───────────────────────────────────────────────────
$backBtn.addEventListener('click', () => {
  $projectView.classList.add('hidden')
  $landing.classList.remove('hidden')
  setAccentColor('#00ff88')
  currentProject = null
})

// ── Copy source ────────────────────────────────────────────
$copyBtn.addEventListener('click', () => {
  if (!currentProject) return
  navigator.clipboard.writeText(currentProject.code).then(() => {
    $copyBtn.textContent = '✓ Copied'
    setTimeout(() => { $copyBtn.innerHTML = '⎘ Copy' }, 1800)
  })
})

// ── Clear terminal ─────────────────────────────────────────
$clearBtn.addEventListener('click', () => {
  if (currentProject) {
    resetTerminal()
    printWelcome(currentProject)
  }
})

// ── Load example ───────────────────────────────────────────
$exampleBtn.addEventListener('click', () => {
  if (currentProject) $stdinInput.value = currentProject.exampleInput
  $stdinInput.focus()
})

// ── Run program ────────────────────────────────────────────
$runBtn.addEventListener('click', runProgram)
$stdinInput.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'Enter') runProgram()
})

async function runProgram() {
  if (!currentProject) return

  const stdin = $stdinInput.value.trim()
  if (!stdin) {
    $statusMsg.textContent = '⚠  stdin is empty — provide input first'
    $statusMsg.style.color = '#ff9500'
    return
  }

  $runBtn.disabled = true
  $statusMsg.textContent = ''
  $cursor.className = 'cursor'   // stop blink while running

  // Show run prompt
  appendOutput(`\n$ ./${currentProject.id}\n`)
  scrollTerminal()

  await delay(120)

  // Run JSCPP (synchronous)
  let programOutput = ''
  let errorMsg = ''
  try {
    const config = {
      stdio: { write: s => { programOutput += s } },
      maxTimeout: 10000,
    }
    JSCPP.run(currentProject.code, stdin + '\n', config)
  } catch (e) {
    const msg = e.message || String(e)
    if (!msg.includes('EOF') && !msg.includes('exit')) {
      errorMsg = msg
    }
  }

  // Animate output line by line
  const lines = programOutput.split('\n')
  for (let i = 0; i < lines.length; i++) {
    appendOutput(lines[i] + (i < lines.length - 1 ? '\n' : ''))
    scrollTerminal()
    // Small pause between lines for terminal feel
    if (lines[i].trim() !== '') await delay(22)
  }

  if (errorMsg) {
    appendOutput(`\n[Runtime Error] ${errorMsg}\n`)
  } else {
    appendOutput(`\n[Process exited with code 0]\n`)
  }

  scrollTerminal()
  $cursor.className = 'cursor blink'
  $runBtn.disabled = false
  $statusMsg.textContent = errorMsg ? '✗ Runtime error' : '✓ Finished'
  $statusMsg.style.color = errorMsg ? '#ff6b6b' : '#00ff88'
}

// ── Terminal helpers ───────────────────────────────────────
function appendOutput(text) {
  $outputPre.textContent += text
}

function scrollTerminal() {
  $termOutput.scrollTop = $termOutput.scrollHeight
}

// ── Init ───────────────────────────────────────────────────
renderCards()
animateHero()
