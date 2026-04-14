const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'dist');
fs.mkdirSync(dist, { recursive: true });

// Copy static files as-is
['mkt201_midterm.html', 'manifest.json', 'sw.js', 'tb_questions.js',
 'chapter 1.pdf', 'chapter 2.pdf', 'chapter 3.pdf', 'chapter 5.pdf'].forEach(f => {
  if (fs.existsSync(f)) {
    fs.copyFileSync(f, path.join(dist, f));
    console.log(`Copied ${f}`);
  } else {
    console.log(`Skipped (not found): ${f}`);
  }
});

// index.html → tiny redirect (was 219 KB duplicate)
fs.writeFileSync(
  path.join(dist, 'index.html'),
  '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=mkt201_midterm.html"><script>location.replace("mkt201_midterm.html")</script></head></html>'
);
console.log('Written index.html (redirect)');

// Minify JS
console.log('Minifying JS...');
execFileSync('npx', ['terser', 'mkt201_scripts.js', '-o', 'dist/mkt201_scripts.js', '--compress', '--mangle'], { stdio: 'inherit' });

// Minify CSS
console.log('Minifying CSS...');
execFileSync('npx', ['cleancss', '-o', 'dist/mkt201_styles.css', 'mkt201_styles.css'], { stdio: 'inherit' });

// Print size comparison
function kb(file) {
  try { return Math.round(fs.statSync(file).size / 1024) + ' KB'; }
  catch { return '—'; }
}
console.log('\n--- Size comparison ---');
console.log(`mkt201_scripts.js  ${kb('mkt201_scripts.js')} → ${kb('dist/mkt201_scripts.js')}`);
console.log(`mkt201_styles.css  ${kb('mkt201_styles.css')} → ${kb('dist/mkt201_styles.css')}`);
console.log(`index.html         ${kb('index.html')} → ${kb('dist/index.html')}`);
console.log('Build complete');
