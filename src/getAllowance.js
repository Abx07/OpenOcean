import axios from 'axios';
let data = '';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://open-api.openocean.finance/v1/cross/getAllowance?chainId=56&account=0xf8953d8671644348303cfa8Ae408F5d9fb884761&inTokenAddress=0x55d398326f99059ff775485246999027b3197955,0x08ba0619b1e7a582e0bce5bbe9843322c954c340&contractAddress=0x6352a56caadC4F1E25CD6c75970Fa768A3304e64',
  headers: { 
    'Cookie': '__cflb=0H28v9KzzEdj11imvLDZLCCRvrLR9RKMornM5MaLjRo'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log("Response: ")
  console.log(JSON.stringify(response.data, null, 2));
})
.catch((error) => {
  console.log(error);
});
