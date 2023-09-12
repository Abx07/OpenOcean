import axios from 'axios';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://open-api.openocean.finance/v3/avax/tokenList',
  headers: { 
    'Cookie': '__cflb=0H28v9KzzEdj11imvL2rdb9wNdY43F5Yrv6wJiU9ajP'
  }
};

axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
