const fs = require('fs');
const code = fs.readFileSync('src/data/products.ts', 'utf-8');
const match = code.match(/export const SHOWCASE: ShowcaseProduct = (\{[\s\S]*?\});/);
if (match) {
  let objStr = match[1];
  objStr = objStr.replace(/dgOverview|dgEngine|dgAlternator|dgEnclosure|dgDimensions|dgThumb|dgControl|dgFuel/g, '"image"');
  const obj = eval('(' + objStr + ')');
  let output = '  showcaseData: {\n';
  output += `    productName: "${obj.name}",\n`;
  output += `    pageLabel: "Showcase",\n`;
  output += `    pageSubtitle: "A 6-chapter walkthrough — scroll to explore each system.",\n`;
  output += `    presentModeBtn: "Present Mode",\n`;
  
  obj.sections.forEach((s, i) => {
    output += `    chapter_${i}_title: "${s.title}",\n`;
    if (s.tagline) output += `    chapter_${i}_tagline: "${s.tagline}",\n`;
    if (s.highlight) {
      s.highlight.forEach((h, j) => {
        output += `    chapter_${i}_h${j}_label: "${h.label}",\n`;
        output += `    chapter_${i}_h${j}_value: "${h.value}",\n`;
      });
    }
    s.specs.forEach((sp, k) => {
      output += `    chapter_${i}_spec${k}_label: "${sp.label}",\n`;
      output += `    chapter_${i}_spec${k}_value: "${sp.value}",\n`;
    });
  });
  output += '  },\n';
  fs.writeFileSync('showcase.txt', output);
  console.log('Done');
}
