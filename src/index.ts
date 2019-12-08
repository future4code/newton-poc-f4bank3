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

const args = process.argv.slice(2);
const action = args[0];
const userParam = args.slice(1);

switch (action) {
    case "new":
        if (userParam.length === 3) {
            const object = treatUserAccountObj(userParam);
            createAccount(object);
        }
        else {
            console.log(`Número de parâmetros incorreto. Exemplo: "Nome" "CPF" "Data de nascimento: 31/12/2010"`)
        }
        break;
    case "showAll":
        const promise = getAllAccounts();
        promise.then((resolve) => { console.log(resolve) });
        break;
    case "balance":
        getBalance(userParam);
        break;
    case "add":
        addBalance(userParam);
        break;
    default:
        console.log("Comando inválido");
        break;
}
// TO DO MELHORAR A TIPAGEM DA FUNÇÃO
function writeFileBank(array: string[]) {
    return new Promise((resolve, reject) => {
        writeFile('userData.json', JSON.stringify(array), "utf-8", (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}
async function createAccount(account: UserAccount) {
    if (Number(account.birthDate.format("YYYY")) <= 2001) {

        const allAccounts = await getAllAccounts();
        const filterAccount = allAccounts.filter((acc) => { return acc.cpf === account.cpf });

        if (filterAccount.length === 0) {
            allAccounts.push(account);
            try {
                await writeFileBank(allAccounts);
                console.log("Conta criada com sucesso!")
            }
            catch (err) {
                console.log(err)
            }


        } else {
            console.log("CPF já existe")
        }
    }
    else {
        console.log("Você não é maior de idade, portanto, não poderá ter a sua conta criada!");
    }

}

async function getBalance(userParam: string[]) {
    const name = userParam[0];
    const cpf = userParam[1];

    const allAccounts = await getAllAccounts();
    const filterAccount = allAccounts.filter((acc) => { return acc.cpf === cpf && acc.name === name });
    if (filterAccount.length > 0) {
        console.log('\x1b[33m%s\x1b[0m', `Saldo: R$ ${filterAccount[0].balance},00`)
    }
    else {
        console.log('\x1b[31m%s\x1b[0m', "Não encontramos sua conta.")
    }
}

async function addBalance(userParam: string[]) {
    const name = userParam[0];
    const cpf = userParam[1];
    const value = parseInt(userParam[2]);

    const allAccounts = await getAllAccounts();
    const updatedAllAccounts = allAccounts.map(acc => {
        if (acc.name === name && acc.cpf == cpf) {
            return { ...acc, balance: parseInt(acc.balance) + value }
        }
        else {
            return acc
        }
    });
    try {
        await writeFileBank(updatedAllAccounts);
        console.log("Seu saldo foi atualizado com sucesso!");
    }
    catch (err) {
        console.log('\x1b[31m%s\x1b[0m', "Não encontramos sua conta.");
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

function treatUserAccountObj(param: string[]): UserAccount {
    const object: UserAccount = {
        name: param[0],
        cpf: param[1],
        birthDate: moment(param[2], "DD/MM/YYYY"),
        balance: 0,
    }
    return object
}




