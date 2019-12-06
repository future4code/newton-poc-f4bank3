import * as moment from "moment"

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

function createAccount(account: UserAccount) {
    const accountJson = JSON.stringify(account);
    console.log(accountJson)
}

function treatUserAccountObj(param: string[]):UserAccount {
    const object:UserAccount = {
        name: param[0],
        cpf: param[1],
        birthDate: moment(param[2]),
        balance: 0,
    }
    return object
}

const newObj = treatUserAccountObj(userParam)
console.log(newObj)