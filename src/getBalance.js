import axios from 'axios';
let data = 'getBalance() {\n    if(this.address) {\n        let params = {\n            chainId: 1,\n            account: your wallet address,\n            inTokenAddress:`${previousTokenAddress},${nextTokenAddress}`\n            };\n        axios.get(\'https://open-api.openocean.finance/v1/cross/getBalance\', { params }).then(res => {\n            const { data } = res.data\n            const previousBalance = data[0].balance\n            const nextBalance = data[1].balance\n        }).catch(e => console.log(e));\n    }\n},';

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://open-api.openocean.finance/v1/cross/getBalance?chainId=56&account=0x929B44e589AC4dD99c0282614e9a844Ea9483C69&inTokenAddress=0x55d398326f99059ff775485246999027b3197955,0x55d398326f99059fF775485246999027B3197955',
    headers: {
        'Content-Type': 'application/javascript',
        'Cookie': '__cflb=0H28v9KzzEdj11imvL2rdb9wNdY43F5YsbKrdp4g3f3'
    },
    data: data
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
