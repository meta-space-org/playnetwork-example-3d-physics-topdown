import * as fs from 'fs/promises';

class FileLevelProvider {
    constructor(path) {
        this.path = path;
    }

    async save(id, data) {
        await fs.mkdir(this.path, { recursive: true });
        await fs.writeFile(`${this.path}/${id}.json`, data);
    }

    async load(id) {
        try {
            return await fs.readFile(`${this.path}/${id}.json`);
        } catch (e) {
            console.error(e);
        }
    }

    async has(id) {
        try {
            await fs.access(`${this.path}/${id}.json`);
            return true;
        } catch (e) {
            return false;
        }
    }
}

export default FileLevelProvider;
