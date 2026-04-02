const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'Pillars.tsx');
let content = fs.readFileSync(filePath, 'utf8');

console.log('File length:', content.length);
console.log('Has <>:', content.includes('<>'));
console.log('Has </>:', content.includes('</>'));

// Find the SectionHeader function's opening fragment
const fragmentOpen = content.indexOf('<>\n      {/* Keyframes injected once */}');
const fragmentOpenCRLF = content.indexOf('<>\r\n      {/* Keyframes injected once */}');

console.log('Fragment open (LF):', fragmentOpen);
console.log('Fragment open (CRLF):', fragmentOpenCRLF);

// Find where SectionHeader ends — the closing }  preceded by );
// We want to insert </> before the first ); } that appears after the fragment open
const fragStart = Math.max(fragmentOpen, fragmentOpenCRLF);

if (fragStart === -1) {
  console.error('Could not find the opening fragment. Dumping first <> occurrence context:');
  const idx = content.indexOf('<>');
  console.log('First <>:', idx, '| context:', JSON.stringify(content.slice(Math.max(0, idx-20), idx+60)));
  process.exit(1);
}

// Find the closing ); } after the fragment
const closingPattern_LF = '\n  );\n}';
const closingPattern_CRLF = '\r\n  );\r\n}';

let closingIdx = content.indexOf(closingPattern_CRLF, fragStart);
let useCRLF = true;
if (closingIdx === -1) {
  closingIdx = content.indexOf(closingPattern_LF, fragStart);
  useCRLF = false;
}

console.log('Closing idx:', closingIdx, 'CRLF:', useCRLF);

if (closingIdx === -1) {
  console.error('Could not find closing pattern');
  process.exit(1);
}

// Insert </> before the ); }
const nl = useCRLF ? '\r\n' : '\n';
const insertStr = `${nl}    </>`;
const fixed = content.slice(0, closingIdx) + insertStr + content.slice(closingIdx);

fs.writeFileSync(filePath, fixed, 'utf8');
console.log('Done! File written. New length:', fixed.length);
console.log('Now has </>:', fixed.includes('</>'));
