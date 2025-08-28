// Simple validation that our components have the correct structure for React 19
const fs = require('fs');
const path = require('path');

console.log('Validating React 19 compatibility...');

const srcDir = './src';
const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.js') && file !== 'Halogen.js');

let passed = 0;
let failed = 0;

files.forEach(filename => {
    const filePath = path.join(srcDir, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const checks = [
        {
            name: 'Uses class component syntax',
            test: content.includes('class Loader extends React.Component')
        },
        {
            name: 'Has proper propTypes',
            test: content.includes('Loader.propTypes =')
        },
        {
            name: 'Has proper defaultProps', 
            test: content.includes('Loader.defaultProps =')
        },
        {
            name: 'No React.createClass',
            test: !content.includes('React.createClass')
        },
        {
            name: 'No getDefaultProps method',
            test: !content.includes('getDefaultProps')
        },
        {
            name: 'Uses prop-types import',
            test: content.includes("require('prop-types')")
        }
    ];
    
    const failedChecks = checks.filter(check => !check.test);
    
    if (failedChecks.length === 0) {
        console.log(`✓ ${filename} - All checks passed`);
        passed++;
    } else {
        console.log(`❌ ${filename} - Failed checks:`);
        failedChecks.forEach(check => {
            console.log(`  - ${check.name}`);
        });
        failed++;
    }
});

console.log(`\nValidation complete:`);
console.log(`✓ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);

if (failed === 0) {
    console.log('\n🎉 All components are ready for React 19!');
} else {
    console.log('\n⚠️  Some components need fixes');
    process.exit(1);
}