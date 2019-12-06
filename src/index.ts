import * as moment from "moment";
import { writeFile, readFile } from "fs"

type UserAccount = {
    name: string,
    cpf: string,
    birthDate: moment.Moment,
    balance: number,
    extract?: Transactions[]
}

type Transactions = {
    value: number,
    date: Date,
    description: string,
}

const args = process.argv.slice(2)
const action = args[0]
const userParam = args.slice(1)

// TO DO MELHORAR A TIPAGEM DA FUNÇÃO
async function createAccount(account: UserAccount) {

    const allAccounts = await getAllAccounts()

    const filterAccount = allAccounts.filter((acc) => { return acc.cpf === account.cpf });

    if (filterAccount.length === 0) {
        allAccounts.push(account)

        const promise = new Promise((resolve, reject) => {
            writeFile('userData.json', JSON.stringify(allAccounts), "utf-8", (err) => {
                if (err) reject(err);
                resolve("A conta foi criada com sucesso!")
            });
        });
        promise.then((resolve) => {
            console.log(resolve)
        }, (reject) => {
            console.log(reject)
        });

    } else {
        console.log("CPF já existe")
    }
}

function getAllAccounts() {
    return new Promise<Array<any>>((resolve, reject) => {
        readFile('userData.json', 'utf8', (err: Error, data: string) => {
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

// function getBalance() {
//     Receber um nome
//     Receber um cpf

//     if (nomeRecebido === nomeDosistema && cpfRecebido === cpfDoSistema) {
//         const promise = new Promise((resolve, reject) => {
//             readFile('userData.json', 'utf8', (err: Error, data: string) => {
//                 if (err) {
//                     console.error("Não foi possível encontrar o usuário");
//                     reject(err);
//                 }
//                 else {
//                     // return Saldo da Conta
//                 }
//             });
//         })
//     } else {
//         console.log("Cpf ou nome não esta cadastrado") 
// }
// }

function treatUserAccountObj(param: string[]): UserAccount {
    const object: UserAccount = {
        name: param[0],
        cpf: param[1],
        birthDate: moment(param[2], "DD/MM/YYYY"),
        balance: 0,
    }
    return object
}

const object = treatUserAccountObj(userParam)

createAccount(object)


