import JSCPP from 'JSCPP'
import hljs from 'highlight.js/lib/core'
import cpp from 'highlight.js/lib/languages/cpp'
import 'highlight.js/styles/monokai.css'
import { projects } from './projects.js'

hljs.registerLanguage('cpp', cpp)

let currentProject = null

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
const $stdinInput  = document.getElementById('stdin-input')
const $stdinHint   = document.getElementById('stdin-hint')
const $exampleBtn  = document.getElementById('example-btn')
const $runBtn      = document.getElementById('run-btn')
const $statusMsg   = document.getElementById('status-msg')
const $termTitle   = document.getElementById('term-title')

const delay = ms => new Promise(r => setTimeout(r, ms))

// ── Render cards ──────────────────────────────────────────
function renderCards() {
  for (const p of projects) {
    const card = document.createElement('div')
    card.className = 'card'
    const diff = p.difficulty.toLowerCase().replace(/[^a-z]/g, '')
    card.innerHTML = `
      <div class="card-title">${p.title}</div>
      <div class="card-diff ${diff}">${p.difficulty}</div>
      <div class="card-desc">${p.description}</div>`
    card.addEventListener('click', () => openProject(p))
    $cardsGrid.appendChild(card)
  }
}

// ── Open project ──────────────────────────────────────────
function openProject(project) {
  currentProject = project
  $navTitle.textContent = project.title
  $termTitle.textContent = project.id

  $codeDisplay.innerHTML = hljs.highlight(project.code, { language: 'cpp' }).value

  const $codePre = document.getElementById('code-pre')
  let $gutter = document.getElementById('line-gutter')
  if (!$gutter) {
    $gutter = document.createElement('span')
    $gutter.id = 'line-gutter'
    $gutter.setAttribute('aria-hidden', 'true')
    $codePre.insertBefore($gutter, $codeDisplay)
  }
  $gutter.innerHTML = project.code.split('\n').map((_, i) => `<span>${i + 1}</span>`).join('')

  resetTerminal()
  $outputPre.textContent = `# ${project.title}\n# ${project.hint}\n\n$ ./${project.id}\n`

  $landing.classList.add('hidden')
  $projectView.classList.remove('hidden')
  window.scrollTo(0, 0)
}

function resetTerminal() {
  $outputPre.textContent = ''
  $statusMsg.textContent = ''
  $stdinHint.textContent = currentProject?.hint ?? ''
  $stdinInput.value = ''
}

// ── Navigation ────────────────────────────────────────────
$backBtn.addEventListener('click', () => {
  $projectView.classList.add('hidden')
  $landing.classList.remove('hidden')
  currentProject = null
})

$copyBtn.addEventListener('click', () => {
  if (!currentProject) return
  navigator.clipboard.writeText(currentProject.code).then(() => {
    $copyBtn.textContent = 'Copied!'
    setTimeout(() => { $copyBtn.textContent = 'Copy' }, 1500)
  })
})

$clearBtn.addEventListener('click', () => {
  if (!currentProject) return
  resetTerminal()
  $outputPre.textContent = `# ${currentProject.title}\n# ${currentProject.hint}\n\n$ ./${currentProject.id}\n`
})

$exampleBtn.addEventListener('click', () => {
  if (currentProject) $stdinInput.value = currentProject.exampleInput
})

// ── Run ───────────────────────────────────────────────────
$runBtn.addEventListener('click', runProgram)
$stdinInput.addEventListener('keydown', e => { if (e.ctrlKey && e.key === 'Enter') runProgram() })

async function runProgram() {
  if (!currentProject) return
  const stdin = $stdinInput.value.trim()
  if (!stdin) {
    $statusMsg.textContent = 'stdin is empty'
    return
  }

  $runBtn.disabled = true
  $statusMsg.textContent = ''

  $outputPre.textContent += `\n$ ./${currentProject.id}\n`
  $termOutput.scrollTop = $termOutput.scrollHeight

  let output = ''
  let err = ''
  try {
    JSCPP.run(currentProject.code, stdin + '\n', {
      stdio: { write: s => { output += s } },
      maxTimeout: 10000,
    })
  } catch (e) {
    const msg = String(e.message ?? e)
    if (!msg.includes('EOF') && !msg.includes('exit')) err = msg
  }

  const lines = output.split('\n')
  for (let i = 0; i < lines.length; i++) {
    $outputPre.textContent += lines[i] + (i < lines.length - 1 ? '\n' : '')
    $termOutput.scrollTop = $termOutput.scrollHeight
    if (lines[i].trim()) await delay(18)
  }

  $outputPre.textContent += err
    ? `\n[Error] ${err}\n`
    : '\n[exit 0]\n'

  $termOutput.scrollTop = $termOutput.scrollHeight
  $runBtn.disabled = false
  $statusMsg.textContent = err ? 'error' : 'done'
}

renderCards()
