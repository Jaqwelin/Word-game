const grid = document.getElementById('grid');
const message = document.getElementById('message');

// Create 9x9 grid
for (let i = 0; i < 81; i++) {
    const input = document.createElement('input');
    input.maxLength = 1;
    input.dataset.index = i;
    grid.appendChild(input);
}

function checkGrid() {
    const inputs = document.querySelectorAll('#grid input');
    const rows = Array.from({ length: 9 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => inputs[r * 9 + c].value.toUpperCase())
    );

    let valid = true;
    message.textContent = '';

    // Check for duplicates in rows
    for (let r = 0; r < 9; r++) {
        const seen = new Set();
        for (let c = 0; c < 9; c++) {
            const val = rows[r][c];
            if (val && seen.has(val)) {
                valid = false;
                message.textContent = 'Duplicate letters in row ' + (r + 1);
                return;
            }
            seen.add(val);
        }
    }

    // Check for duplicates in columns
    for (let c = 0; c < 9; c++) {
        const seen = new Set();
        for (let r = 0; r < 9; r++) {
            const val = rows[r][c];
            if (val && seen.has(val)) {
                valid = false;
                message.textContent = 'Duplicate letters in column ' + (c + 1);
                return;
            }
            seen.add(val);
        }
    }

    // Check for duplicates in 3x3 boxes
    for (let box = 0; box < 9; box++) {
        const seen = new Set();
        const startRow = Math.floor(box / 3) * 3;
        const startCol = (box % 3) * 3;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const val = rows[startRow + r][startCol + c];
                if (val && seen.has(val)) {
                    valid = false;
                    message.textContent = 'Duplicate letters in 3x3 box ' + (box + 1);
                    return;
                }
                seen.add(val);
            }
        }
    }

    message.textContent = valid ? 'Grid is valid!' : 'Grid has errors.';
}
