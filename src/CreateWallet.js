import axios from 'axios';
let data = '';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://open-api.openocean.finance/v3/bsc/createWallet',
  headers: { 
    'Cookie': '__cflb=0H28v9KzzEdj11imvL2rdb9wNdY43F5Yq5hAz6LoBBb'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
