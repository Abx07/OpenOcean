import axios from 'axios';
let data = '';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://open-api.openocean.finance/cross_chain/v1/cross/getMinSend?fromChainId=56&toChainId=137&address=0x55d398326f99059ff775485246999027b3197955',
  headers: { 
    'Cookie': '__cflb=0H28v9KzzEdj11imvLDZLCCRvrLR9RKMornM5MaLjRo'
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
