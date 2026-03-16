const fs = require('fs');

function replaceTranslations(filepath, objName, importStmt) {
    let content = fs.readFileSync(filepath, 'utf-8');

    // Regex to match the entire type and const declaration
    const typeRegex = new RegExp(`type ${objName.replace('_TRANSLATIONS', 'Translation')} = \\{[\\s\\S]*?\\}\\s*`, 'm');
    const constRegex = new RegExp(`const ${objName}: Record<[\\s\\S]*?> = \\{[\\s\\S]*?\\n\\}\\n`, 'm');

    // Or we know the exact lines!
    let lines = content.split('\n');
    let newLines = [];

    if (filepath.includes('NaturraCustomOrder')) {
        // lines 15 to 514 are 14 to 513 in 0-index
        newLines = [...lines.slice(0, 14), importStmt, ...lines.slice(514)];
    } else if (filepath.includes('NaturraPartnership')) {
        // lines 18 to 323
        newLines = [...lines.slice(0, 17), importStmt, ...lines.slice(324)];
    }

    fs.writeFileSync(filepath, newLines.join('\n'), 'utf-8');
    console.log(`Updated ${filepath}`);
}

replaceTranslations(
    'c:\\extal naturra\\naturra-extal\\src\\pages\\NaturraCustomOrder.tsx',
    'CUSTOM_ORDER_TRANSLATIONS',
    "import { NATURRA_CUSTOM_ORDER_TRANSLATIONS as CUSTOM_ORDER_TRANSLATIONS } from '../utils/NaturraTranslations'"
);

replaceTranslations(
    'c:\\extal naturra\\naturra-extal\\src\\pages\\NaturraPartnership.tsx',
    'PARTNERSHIP_TRANSLATIONS',
    "import { NATURRA_PARTNERSHIP_TRANSLATIONS as PARTNERSHIP_TRANSLATIONS } from '../utils/NaturraTranslations'"
);
