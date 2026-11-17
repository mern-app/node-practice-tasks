import fs from "node:fs/promises";
import path from "node:path";

const folderPath = path.join(import.meta.dirname, "test-folder");
const files = await fs.readdir(folderPath);

console.log(`Total files: ${files.length}\n`);

for (const file of files) {
    const fullPath = path.join(folderPath, file);
    const stats = await fs.stat(fullPath);

    console.log(
        `${file} | ${path.extname(file)} | ${(stats.size / 1024).toFixed(2)} KB`
    );
}
