import axios from 'axios';

const requestData = ''; // You can add data here if needed

const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://open-api.openocean.finance/v1/56/limit-order/all?statuses=[1,2,3]&limit=1',
    headers: {
        'Cookie': '__cflb=0H28v9KzzEdj11imvL2rdb9wNdY43F5Yq5hAz6LoBBb'
    },
    data: requestData
};

console.log('Sending a GET request to Open Ocean API...');
axios.request(config)
    .then((response) => {
        console.log('Response from Open Ocean API:');
        console.log(JSON.stringify(response.data, null, 2)); // Pretty print JSON
    })
    .catch((error) => {
        console.error('Error while making the request:');
        console.error(error);
    });
