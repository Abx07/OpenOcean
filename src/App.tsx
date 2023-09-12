import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';

interface TokenListData {
  // Defining the structure of the data
  tokens: string[];
}

function App() {
  const [data, setData] = useState<TokenListData | null>(null);
  const [showTokenList, setShowTokenList] = useState<boolean>(false);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);

  useEffect(() => {
    // Define the Axios request configuration
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://open-api.openocean.finance/v3/avax/tokenList',
      headers: {
        Cookie: '__cflb=0H28v9KzzEdj11imvL2rdb9wNdY43F5Yrv6wJiU9ajP',
      },
    };

    // Making the Axios request and update the state with the response data
    axios
      .request(config)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const toggleTokenList = () => {
    setShowTokenList(!showTokenList);
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Requesting access to the user's MetaMask wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Created a Web3 instance using the MetaMask provider
        const web3 = new Web3(window.ethereum);

        // Check if the user is connected and get their address
        const accounts = await web3.eth.getAccounts();

        if (accounts.length > 0) {
          setWalletConnected(true);
        }
      } catch (error) {
        console.error(error);
        setWalletConnected(false);
      }
    } else {
      console.error('MetaMask extension not found');
      setWalletConnected(false);
    }
  };

  return (
    <div className="App">
      <h1>Token List from OpenOcean API</h1>
      {walletConnected ? (
        <>
          <button onClick={toggleTokenList}>Toggle Token List</button>
          {showTokenList && data ? (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <p>Click the button to display the token list.</p>
          )}
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;

// import React, { useEffect, useState } from 'react';
// import * as BigNumber from 'bignumber.js';
// import { OpenoceanSdk } from '@openocean.finance/openocean-sdk';

// // Define a type for the data you expect from the API
// interface TokenData {
//   symbol: string;
//   address: string;
//   decimals: number;
// }

// function App() {
//   const [chainName, setChainName] = useState<string>('bsc');
//   const [walletName, setWalletName] = useState<string>('MetaMask');
//   const [inToken, setInToken] = useState<TokenData | null>(null);
//   const [outToken, setOutToken] = useState<TokenData | null>(null);
//   const [gasPrice, setGasPrice] = useState<number>(5);
//   const [inTokenBalance, setInTokenBalance] = useState<number | null>(null);
//   const [outTokenBalance, setOutTokenBalance] = useState<number | null>(null);
//   const [inAmount, setInAmount] = useState<number>(1);
//   const [outAmount, setOutAmount] = useState<number | null>(null);
//   const [myWallet, setMyWallet] = useState<any | null>(null);
//   const [chain, setChain] = useState<any | null>(null);

//   useEffect(() => {
//     const genSdk = new OpenoceanSdk();
//     const { api, swapSdk } = genSdk;

//     const fetchData = async () => {
//       try {
//         // Connect the wallet when the component mounts
//         await connectWallet(chainName);
//         // Fetch token list and gas price
//         await getTokenList();
//         await getGasPrice();
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const getGasPrice = async () => {
//     try {
//       const genSdk = new OpenoceanSdk();
//       const { api } = genSdk;

//       const response = await api.getGasPrice({
//         chain: chainName,
//       });

//       setGasPrice(response.data.gasPrice);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getTokenList = async () => {
//     try {
//       const genSdk = new OpenoceanSdk();
//       const { api } = genSdk;

//       const { data } = await api.getTokenList({ chain: chainName });
//       const inTokenData = data.find((item: TokenData) => item.symbol === 'USDC');
//       const outTokenData = data.find((item: TokenData) => item.symbol === 'BUSD');

//       setInToken(inTokenData);
//       setOutToken(outTokenData);
//       // Fetch balances
//       await getBalance();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const quote = async () => {
//     try {
//       const genSdk = new OpenoceanSdk();
//       const { api } = genSdk;

//       const response = await api.quote({
//         chain: chainName,
//         inTokenAddress: inToken?.address,
//         outTokenAddress: outToken?.address,
//         amount: inAmount,
//         gasPrice: gasPrice,
//       });

//       if (response.code === 200) {
//         const outAmountValue = new BigNumber(response.data.outAmount).div(10 ** outToken!.decimals).toFixed(4);
//         setOutAmount(Number(outAmountValue));
//       } else {
//         alert('Error: ' + response.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const swap = async () => {
//     try {
//       if (!myWallet) {
//         alert('Please connect the wallet.');
//         return;
//       }
//       if (inTokenBalance && inTokenBalance < inAmount) {
//         alert(`${inToken!.symbol} Insufficient balance.`);
//         return;
//       }

//       const genSdk = new OpenoceanSdk();
//       const { api, swapSdk } = genSdk;

//       const { data } = await api.exchange({
//         chain: chainName,
//       });

//       const allowance = await getAllowance(data.approveContract);

//       if (new BigNumber(allowance).lt(inAmount)) {
//         await approve(data.approveContract);
//         return;
//       }

//       const response = await swapSdk.swapQuote({
//         chain: chainName,
//         inTokenAddress: inToken!.address,
//         outTokenAddress: outToken!.address,
//         amount: inAmount,
//         gasPrice: gasPrice,
//         slippage: 1, // 1%
//         account: myWallet.address,
//       });

//       if (response.code === 200) {
//         swapSdk.swap(response.data)
//           .on('error', (error: any) => {
//             console.error(error);
//           })
//           .on('transactionHash', (hash: any) => {
//             console.log('Transaction Hash:', hash);
//           })
//           .on('receipt', (receiptData: any) => {
//             console.log('Receipt:', receiptData);
//             // Refresh balances
//             getBalance();
//           })
//           .on('success', (successData: any) => {
//             console.log('Swap Successful:', successData);
//           });
//       } else {
//         alert('Error: ' + response.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const connectWallet = async (selectedChainName: string) => {
//     try {
//       setChainName(selectedChainName);
//       const genSdk = new OpenoceanSdk();
//       const { swapSdk } = genSdk;

//       const data = await swapSdk.connectWallet({
//         chainName: selectedChainName,
//         walletName: walletName,
//       });

//       if (data) {
//         setMyWallet(data.wallet);
//         setChain(data.chain);
//       }
//     } catch (error) {
//       console.error(error);
//       setMyWallet(null);
//       setChain(null);
//     }
//   };

//   const getBalance = async () => {
//     try {
//       if (!myWallet) {
//         alert('Please connect the wallet.');
//         return;
//       }

//       const genSdk = new OpenoceanSdk();
//       const { swapSdk } = genSdk;

//       const inBalance = await swapSdk.getBalance({
//         account: myWallet.address,
//         chain: chainName,
//         tokenAddressOrSymbol: inToken!.address,
//         decimals: inToken!.decimals,
//       });

//       const outBalance = await swapSdk.getBalance({
//         account: myWallet.address,
//         chain: chainName,
//         tokenAddressOrSymbol: outToken!.address,
//         decimals: outToken!.decimals,
//       });

//       setInTokenBalance(Number(inBalance.short));
//       setOutTokenBalance(Number(outBalance.short));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getAllowance = async (approveContract: any) => {
//     try {
//       const genSdk = new OpenoceanSdk();
//       const { swapSdk } = genSdk;

//       const allowance = await swapSdk.getAllowance({
//         chain: chainName,
//         decimals: inToken!.decimals,
//         tokenAddress: inToken!.address,
//         approveContract: approveContract,
//         account: myWallet.address,
//       });

//       return Number(allowance);
//     } catch (error) {
//       console.error(error);
//       return 0;
//     }
//   };

//   const approve = async (approveContract: any) => {
//     try {
//       const genSdk = new OpenoceanSdk();
//       const { swapSdk } = genSdk;

//       const approveResult = await swapSdk.approve({
//         chain: chainName,
//         tokenAddress: inToken!.address,
//         approveContract: approveContract,
//         gasPrice: gasPrice,
//         decimals: inToken!.decimals,
//         amount: inAmount,
//       });

//       if (!approveResult.code) {
//         approveResult
//           .on('error', (error: any) => {
//             console.error(error);
//           })
//           .on('transactionHash', (hash: any) => {
//             console.log('Approval Transaction Hash:', hash);
//           })
//           .on('receipt', (receiptData: any) => {
//             console.log('Approval Receipt:', receiptData);
//           })
//           .on('success', (successData: any) => {
//             console.log('Approval Successful:', successData);
//           });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div id="app">
//       <div style={{ color: 'blue' }}>
//         {chain && <div>chain: {chain.chainName}</div>}
//         {myWallet && <div>walletName: {myWallet.name}</div>}
//         {myWallet && <div>address: {myWallet.address}</div>}
//         {inToken && (
//           <div>
//             inToken: {inToken.symbol} Balance: {inTokenBalance}
//           </div>
//         )}
//         {outToken && (
//           <div>
//             outToken: {outToken.symbol} Balance: {outTokenBalance}
//           </div>
//         )}
//       </div>
//       <div>
//         <div>
//           <h3>ConnectWallet</h3>
//           <button onClick={() => connectWallet('eth')} style={{ marginRight: '10px' }}>
//             connectWallet eth
//           </button>
//           <button onClick={() => connectWallet('bsc')} style={{ marginRight: '10px' }}>
//             connectWallet bsc
//           </button>
//           <button onClick={() => connectWallet('polygon')} style={{ marginRight: '10px' }}>
//             connectWallet polygon
//           </button>
//         </div>
//         <div>
//           <h3>Quote</h3>
//           {inToken && outToken && (
//             <div>
//               {inAmount} {inToken.symbol} swap to {outAmount} {outToken.symbol}
//             </div>
//           )}
//           <button onClick={quote}>quote</button>
//         </div>
//         <div>
//           <h3>Swap</h3>
//           <button onClick={swap}>swap</button>
//         </div>
//         <div>
//           <h3>GetBalance</h3>
//           <button onClick={getBalance}>GetBalance</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
