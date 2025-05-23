const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// ====== CONFIG ======
const CSV_FILE = 'users_30000.csv';
const OUTPUT_FILE = 'output.sql';
const TABLE_NAME = 'users';
// ====================

const output = fs.createWriteStream(path.resolve(__dirname, OUTPUT_FILE), { flags: 'w' });
let isFirstRow = true;
let columns = [];

fs.createReadStream(path.resolve(__dirname, CSV_FILE))
    .pipe(csv())
    .on('data', (row) => {
        if (isFirstRow) {
            columns = Object.keys(row).map(col => `\`${col}\``);
            output.write(`INSERT INTO \`${TABLE_NAME}\` (${columns.join(', ')}) VALUES\n`);
            isFirstRow = false;
        }

        const values = Object.values(row)
            .map(val => `'${val.replace(/'/g, "''")}'`)
            .join(', ');
        output.write(`(${values}),\n`);
    })
    .on('end', () => {
        // Go back and remove the last comma + newline, then add semicolon
        fs.readFile(path.resolve(__dirname, OUTPUT_FILE), 'utf-8', (err, data) => {
            if (err) throw err;
            const finalSQL = data.replace(/,\n$/, ';\n');
            fs.writeFileSync(path.resolve(__dirname, OUTPUT_FILE), finalSQL);
            console.log(`✅ All done. File written: ${OUTPUT_FILE}`);
        });
    });
