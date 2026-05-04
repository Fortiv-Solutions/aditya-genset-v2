const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'src/components/admin'),
  path.join(__dirname, 'src/pages/admin')
];

const replacements = [
  { regex: /bg-stone-950/g, replace: "bg-background" },
  { regex: /bg-\[\#111110\]/g, replace: "bg-card" },
  { regex: /bg-\[\#161614\]/g, replace: "bg-card shadow-sm" },
  { regex: /bg-stone-900/g, replace: "bg-background" },
  { regex: /bg-stone-800/g, replace: "bg-muted" },
  { regex: /text-white/g, replace: "text-foreground" },
  { regex: /text-stone-200/g, replace: "text-foreground" },
  { regex: /text-stone-300/g, replace: "text-muted-foreground" },
  { regex: /text-stone-400/g, replace: "text-muted-foreground" },
  { regex: /text-stone-500/g, replace: "text-muted-foreground" },
  { regex: /text-stone-600/g, replace: "text-muted-foreground" },
  { regex: /text-stone-700/g, replace: "text-muted-foreground" },
  { regex: /text-stone-900/g, replace: "text-accent-foreground" },
  { regex: /bg-white\/[0-9]+/g, replace: "bg-secondary" },
  { regex: /border-white\/[0-9]+/g, replace: "border-border" },
  { regex: /bg-amber-500/g, replace: "bg-accent" },
  { regex: /hover:bg-amber-400/g, replace: "hover:bg-accent/90" },
  { regex: /text-amber-400/g, replace: "text-accent" },
  { regex: /border-amber-400/g, replace: "border-accent" },
  { regex: /border-amber-500/g, replace: "border-accent" },
  { regex: /ring-amber-500/g, replace: "ring-accent" },
  { regex: /text-amber-300/g, replace: "text-accent" },
  { regex: /bg-amber-400/g, replace: "bg-accent" },
  { regex: /border-amber-500\/[0-9]+/g, replace: "border-accent/50" },
  { regex: /bg-amber-500\/[0-9]+/g, replace: "bg-accent/10" },
  { regex: /ring-amber-500\/[0-9]+/g, replace: "ring-accent/20" },
  { regex: /fill-stone-900/g, replace: "fill-accent-foreground" },
  { regex: /hover:bg-white\/[0-9]+/g, replace: "hover:bg-secondary/80" },
  { regex: /divide-white\/[0-9]+/g, replace: "divide-border" },
  { regex: /border-white\/[0-9]+/g, replace: "border-border" },
  { regex: /border-stone-[0-9]+/g, replace: "border-border" },
  { regex: /bg-black\/[0-9]+/g, replace: "bg-background/80 backdrop-blur-sm" },
  { regex: /from-stone-950/g, replace: "from-background" },
  { regex: /via-stone-950/g, replace: "via-background" }
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const r of replacements) {
        content = content.replace(r.regex, r.replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${file}`);
      }
    }
  }
}

for (const dir of dirs) {
  if (fs.existsSync(dir)) {
    processDir(dir);
  }
}
console.log('Done replacing theme variables.');
