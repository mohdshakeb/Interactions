#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of component paths to include in the pre-bundled code map
const componentPaths = [
  'src/components/travel-time-calculator/travel-time-calculator.tsx',
  'src/components/asset-counter-demo/asset-counter-demo.tsx',
  'src/components/text-reveal/text-reveal.tsx',
  'src/components/text-hover/text-hover.tsx',
  'src/components/dropdown/dropdown.tsx',
  'src/components/animated-button/animated-button.tsx',
  'src/components/asset-counter/asset-counter.tsx'
];

// Initialize the code map
const codeMap = {};

// Read each component file and add its content to the map
componentPaths.forEach(componentPath => {
  try {
    const fullPath = path.join(process.cwd(), componentPath);
    if (fs.existsSync(fullPath)) {
      const code = fs.readFileSync(fullPath, 'utf8');
      codeMap[componentPath] = code;
      console.log(`✅ Added ${componentPath} to code map`);
    } else {
      console.error(`❌ Component file not found: ${fullPath}`);
    }
  } catch (error) {
    console.error(`❌ Error reading component file ${componentPath}:`, error);
  }
});

// Generate the TypeScript file with the code map
const outputPath = path.join(process.cwd(), 'src/app/api/component-code/code-map.ts');

// Create the directory if it doesn't exist
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the code map to a TypeScript file
const tsContent = `
// This file is auto-generated during the build process
// It contains the source code of all components for the code view panel

export const COMPONENT_CODE_MAP: Record<string, string> = ${JSON.stringify(codeMap, null, 2)};
`;

fs.writeFileSync(outputPath, tsContent);
console.log(`✅ Generated code map at ${outputPath}`); 