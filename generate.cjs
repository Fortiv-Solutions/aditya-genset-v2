const fs = require('fs');
const code = fs.readFileSync('src/pages/DGSetsCategory.tsx', 'utf-8');
const match = code.match(/const dgSets: DGSet\[\] = (\[[\s\S]*?\]);/);
if (match) {
  let arrStr = match[1];
  arrStr = arrStr.replace(/gensetImages\[\d+\]/g, '"image"');
  const arr = eval(arrStr);
  let output = '  productsData: {\n';
  arr.forEach(p => {
    output += `    product_${p.id}_model: "${p.model}",\n`;
    output += `    product_${p.id}_kva: "${p.kva}",\n`;
    output += `    product_${p.id}_engine: "${p.engine}",\n`;
    output += `    product_${p.id}_application: "${p.application}",\n`;
    output += `    product_${p.id}_fuel: "${p.fuel}",\n`;
    output += `    product_${p.id}_noise: "${p.noise}",\n`;
    output += `    product_${p.id}_compliance: "${p.compliance}",\n`;
  });
  output += '  },\n';
  fs.writeFileSync('output.txt', output);
  console.log('Done');
} else {
  console.log('No match');
}
