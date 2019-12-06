import { readFile } from 'fs'

function getAllAccounts(path: string) {
    return new Promise<Array<any>>((resolve, reject) => {
        readFile(path, 'utf8', (err: Error, data: string) => {
            if (err) {
                console.error("Não foi possível encontrar o arquivo.");
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    });
}