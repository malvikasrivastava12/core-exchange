// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import React from "react";
// import "@rainbow-me/rainbowkit/styles.css";
// import {
//   getDefaultConfig,
//   getDefaultWallets,
//   RainbowKitProvider,

// } from "@rainbow-me/rainbowkit";
// import { createConfig, WagmiProvider } from "wagmi";
// import { bscTestnet, opBNBTestnet } from "wagmi/chains";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { tokenPocketWallet, trustWallet } from "@rainbow-me/rainbowkit/wallets";
// import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
// import { connectorsForWallets } from "@rainbow-me/rainbowkit";
// import {
//   rainbowWallet,
//   walletConnectWallet,
// } from "@rainbow-me/rainbowkit/wallets";

// const avalanche = {
//   id: 43_114,
//   name: 'Avalanche',
//   iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
//   iconBackground: '#fff',
//   nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
//   rpcUrls: {
//     default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
//   },
//   blockExplorers: {
//     default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
//   },
//   contracts: {
//     multicall3: {
//       address: '0xca11bde05977b3631167028862be2a173976ca11',
//       blockCreated: 11_907_934,
//     },
//   },
// } as const satisfies Chain;

// const connectors = connectorsForWallets(
//   [
//     {
//       groupName: "Recommended",
//       wallets: [
//         trustWallet,
//         rainbowWallet,
//         tokenPocketWallet,
//         walletConnectWallet,
//         metaMaskWallet,
//       ],
//       chains: [bscTestnet],
//     },
//   ],
//   {
//     appName: "My RainbowKit App",
//     projectId: "0f5eb76626c44bb9cfe4f2c7c6bb7c47",
//   }
// );

// export const config = createConfig({
//   connectors,
//   chains: [bscTestnet],
// });

// const queryClient = new QueryClient();
// createRoot(document.getElementById("root")).render(
//   <WagmiProvider config={config}>
//     <QueryClientProvider client={queryClient}>
//       <RainbowKitProvider>
//         <React.StrictMode>
//           <App />
//         </React.StrictMode>
//       </RainbowKitProvider>
//     </QueryClientProvider>
//   </WagmiProvider>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.jsx";
import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { coreDao, opBNBTestnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "0f5eb76626c44bb9cfe4f2c7c6bb7c47",
  chains: [coreDao],
  ssr: true,
});

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
