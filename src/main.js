import JSCPP from 'JSCPP'
import hljs from 'highlight.js/lib/core'
import cpp from 'highlight.js/lib/languages/cpp'
import 'highlight.js/styles/monokai.css'
import { projects } from './projects.js'

hljs.registerLanguage('cpp', cpp)

const $ = id => document.getElementById(id)
let cur = null

for (const p of projects) {
  const dc = p.difficulty.toLowerCase().replace(/[^a-z]/g, '')
  const d = document.createElement('div')
  d.className = 'row'
  d.innerHTML = `<span class="rn">${p.title}</span><span class="rd ${dc}">${p.difficulty}</span><span class="rc">${p.description}</span>`
  d.onclick = () => open(p)
  $('list').appendChild(d)
}

function open(p) {
  cur = p
  $('vtitle').textContent = p.title
  $('code').innerHTML = hljs.highlight(p.code, { language: 'cpp' }).value
  $('out').textContent = `# ${p.hint}\n\n$ ./${p.id}\n`
  $('stdin').value = ''
  $('st').textContent = ''
  $('landing').hidden = true
  $('view').hidden = false
  $('stdin').focus()
}

$('back').onclick = () => { $('view').hidden = true; $('landing').hidden = false }
$('eg').onclick  = () => { if (cur) $('stdin').value = cur.exampleInput }
$('clr').onclick = () => { if (cur) $('out').textContent = `# ${cur.hint}\n\n$ ./${cur.id}\n` }

$('run').onclick = async () => {
  if (!cur) return
  const input = $('stdin').value.trim()
  if (!input) { $('st').textContent = 'no input'; return }

  $('run').disabled = true
  $('st').textContent = ''
  const out = $('out')
  out.textContent += `\n$ ./${cur.id}\n`

  let res = '', err = ''
  try {
    JSCPP.run(cur.code, input + '\n', { stdio: { write: s => res += s }, maxTimeout: 10000 })
  } catch (e) {
    const m = String(e.message ?? e)
    if (!m.includes('EOF') && !m.includes('exit')) err = m
  }

  const lines = res.split('\n')
  for (let i = 0; i < lines.length; i++) {
    out.textContent += lines[i] + (i < lines.length - 1 ? '\n' : '')
    out.scrollTop = out.scrollHeight
    if (lines[i].trim()) await new Promise(r => setTimeout(r, 18))
  }
  out.textContent += err ? `\n[error] ${err}\n` : '\n[exit 0]\n'
  out.scrollTop = out.scrollHeight
  $('run').disabled = false
  $('st').textContent = err ? '✗' : '✓'
}
