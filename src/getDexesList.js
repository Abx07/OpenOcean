import axios from 'axios'; // Make sure you have Axios installed

async function getDexList(chainId) {
    try {
        const response = await axios.get(`https://open-api.openocean.finance/v3/${chainId}/dexList`);
        const dexList = response.data; // Assuming the API response contains the list of DEXs

        console.log('DEX List:', dexList);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage:
const chainId = 1; // Replace with the desired chain ID

getDexList(chainId);
