/**
 * loader.js
 * Reads manifest.json, finds every *.mathion entry,
 * and renders a clickable button for each one.
 */

(async () => {
  const grid     = document.getElementById('button-grid');
  const emptyMsg = document.getElementById('empty-msg');

  let files = [];

  try {
    const res = await fetch('manifest.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // Accept either a flat array  ["a.mathion", …]
    // or an object with a "files" key  { "files": ["a.mathion", …] }
    const raw = Array.isArray(data) ? data : (data.files ?? []);

    files = raw.filter(f => typeof f === 'string' && f.endsWith('.mathion'));
  } catch (err) {
    console.warn('Could not load manifest.json:', err);
  }

  if (files.length === 0) {
    emptyMsg.hidden = false;
    return;
  }

  for (const filePath of files) {
    // Derive the button label: everything before the last ".mathion"
    const name = filePath.replace(/\.mathion$/, '').split('/').pop();

    const a = document.createElement('a');
    a.className  = 'file-btn';
    a.href       = filePath;
    a.target     = '_blank';
    a.rel        = 'noopener noreferrer';
    a.title      = filePath;

    a.innerHTML = `
      <span class="icon">⬡</span>
      <span class="label">${escapeHtml(name)}</span><span class="ext">.mathion</span>
    `;

    grid.appendChild(a);
  }
})();

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
