import React, { useState } from 'react';
import { MetaMask } from '@openocean.finance/wallet';

const WalletConnect: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    const myWallet = new MetaMask();
    try {
      const result = await myWallet.requestConnect();
      if (result) {
        setConnected(true);
        // Get the connected account from the wallet
        const connectedAccount = myWallet.account;
        setAccount(connectedAccount ?? null);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div>
      {!connected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Wallet Connected!</p>
          {account && <p>Connected Account: {account}</p>}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;

// import { useEffect, useState } from "react";
// import { MetaMask } from "@openocean.finance/wallet";

// function WalletConnect() {
//   const [isConnected, setIsConnected] = useState(false);

//   const connectWallet = async (params: { chainId: number }) => {
//     try {
//       const myWallet = new MetaMask();
//       const result = await myWallet.requestConnect(params.chainId);
//       // Check the result and update the state accordingly
//       if (result === "success") {
//         setIsConnected(true);
//       } else {
//         setIsConnected(false);
//       }
//     } catch (error) {
//       console.error("Error connecting wallet:", error);
//       setIsConnected(false);
//     }
//   };

//   useEffect(() => {
//     // You can call connectWallet function here or in response to some user action
//   }, []);

//   return (
//     <div>
//       {isConnected ? (
//         <p>Your wallet is connected!</p>
//       ) : (
//         <button onClick={() => connectWallet({ chainId: 1 })}>
//           Connect Wallet
//         </button>
//       )}
//     </div>
//   );
// }

// export default WalletConnect;




