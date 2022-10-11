import { Route, Routes } from "react-router-dom";
import MainLayout from "./common/components/MainLayout";
import Landing from "./features/landing";
import Marketplace from "./features/marketplace";
import MintNFT from "./features/mint-nft";
import MyNFTs from "./features/my-nft";
import NFT from "./features/nft";
import MarketplaceItem from "./features/marketplace-item";
import SaleNFT from "./features/sale";
import Collection from "./features/collection";
import CreateCollection from "./features/collection/create";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/marketplace">
          <Route index element={<Marketplace />} />
          <Route path=":itemId" element={<MarketplaceItem />} />
        </Route>
        <Route path="/collections">
          <Route index element={<Collection />} />
          <Route path="create" element={<CreateCollection />} />
          <Route path=":itemId" element={<Collection />} />
        </Route>
        <Route path="/my-nfts">
          <Route index element={<MyNFTs />} />
        </Route>
        <Route path="/nft">
          <Route path=":itemId" element={<NFT />} />
          <Route path=":itemId/sale" element={<SaleNFT />} />
        </Route>
        <Route path="/mint" element={<MintNFT />} />
        <Route index element={<Landing />} />
      </Route>
    </Routes>
  );
};

export default Router;
