import axios from 'axios';
let data = '';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://open-api.openocean.finance/v3/1/swap_quote?inTokenAddress=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&outTokenAddress=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&account=0xbdfa4f4492dd7b7cf211209c4791af8d52bf5c50&amount=1&gasPrice=25&slippage=1',
  headers: { 
    'Cookie': '__cflb=0H28v9KzzEdj11imvL2rdb9wNdY43F5Yq5hAz6LoBBb'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data, null, 2));
})
.catch((error) => {
  console.log(error);
});
