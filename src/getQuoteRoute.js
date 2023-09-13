import axios from 'axios';
let data = 'getBalance() {\n    if(this.address) {\n        let params = {\n            chainId: 1,\n            account: your wallet address,\n            inTokenAddress:`${previousTokenAddress},${nextTokenAddress}`\n            };\n        axios.get(\'https://open-api.openocean.finance/v1/cross/getBalance\', { params }).then(res => {\n            const { data } = res.data\n            const previousBalance = data[0].balance\n            const nextBalance = data[1].balance\n        }).catch(e => console.log(e));\n    }\n},';

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://open-api.openocean.finance/cross_chain/v1/cross/quoteByOO?fromSymbol=USDT&fromChainId=56&toSymbol=USDT&toChainId=137&amount=100000000000000000000000',
    headers: {
        'Content-Type': 'application/javascript',
        'Cookie': '__cflb=0H28v9KzzEdj11imvLDZLCCRvrLR9RKMeqDcAjCKED3'
    },
    data: data
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
    })
    .catch((error) => {
        console.log(error);
    });
