import type { ConfigOptions } from "@web3modal/react";
import { Web3ModalProvider } from "@web3modal/react";
import { ToastContainer } from "react-toastify";
import LoadingOverlay from "./common/components/LoadingOverlay";
import Router from "./Router";

const config: ConfigOptions = {
  projectId: "c0484c60a018f7fe0e6a14ca08686fcf",
  theme: "light",
  accentColor: "default",
  ethereum: {
    appName: "3D Gallery",
    chains: JSON.parse(import.meta.env.VITE_ETHERUM_CHAINS),
  },
};

const App = () => {
  return (
    <Web3ModalProvider config={config}>
      <Router />
      <LoadingOverlay />
      <ToastContainer />
    </Web3ModalProvider>
  );
};

export default App;
