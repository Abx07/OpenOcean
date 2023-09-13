import axios from 'axios'; // Make sure you have Axios installed

let data = '';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://open-api.openocean.finance/v3/avax/getTransaction?hash=0x57e752d311c347008a5d66286096b62d6a0687834a3df8b0dd06265ff16ee575',
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

