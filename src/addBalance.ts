async function addBalance(userParam: string[]) {
    const name = userParam[0];
    const cpf = userParam[1];
    const value = userParam[2];
    const allAccounts = await getAllAccounts();
    const newBalanceAllAccounts = allAccounts.map(acc => {
        if (acc.name ===name && acc.cpf==cpf){
            return {...acc,balance: acc.balance+value}
        }
        return acc
    });
    //adicionar função async para escrever no arquivo
    console.log(newBalanceAllAccounts);
}