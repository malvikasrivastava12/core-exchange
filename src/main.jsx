import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.jsx";
import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { createConfig, WagmiProvider } from "wagmi";
import { bscTestnet, opBNBTestnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { tokenPocketWallet, trustWallet } from "@rainbow-me/rainbowkit/wallets";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

// const connectors = connectorsForWallets(
//   [
//     {
//       groupName: "Recommended",
//       wallets: [
//         trustWallet,
//         rainbowWallet,
//         tokenPocketWallet,
//         walletConnectWallet,
//       ],
//     },
//   ],
//   {
//     appName: "My RainbowKit App",
//     projectId: "0f5eb76626c44bb9cfe4f2c7c6bb7c47",
//   }
// );

// export const config = createConfig({
//   connectors,
//   chains: [opBNBTestnet],
// });
const { wallets } = getDefaultWallets();
console.log(wallets, "wallets");
export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "0f5eb76626c44bb9cfe4f2c7c6bb7c47",
  chains: [opBNBTestnet],
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
