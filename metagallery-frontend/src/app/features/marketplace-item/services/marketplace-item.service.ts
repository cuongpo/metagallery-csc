import axios from "axios";
import { BigNumber, Contract, ContractTransaction, Signer } from "ethers";
import { QueryFunctionContext } from "react-query";
import { NFT } from "../../../common/types/NFT";
import { PaginationResponse } from "../../../common/types/PaginationResponse";
import { MarketplaceItem } from "../../marketplace/types/MarketplaceItem";

export const getItemByMarketId = async (queryContext: QueryFunctionContext): Promise<MarketplaceItem> => {
  const [, tokenId] = queryContext.queryKey;
  return axios.get("/marketplace/" + tokenId, {
    params: {},
  });
};

export const getNFTsInSeri = async (queryContext: QueryFunctionContext): Promise<PaginationResponse<NFT>> => {
  const [, collectionId] = queryContext.queryKey;
  return axios.get("/nfts", {
    params: {
      collectionId,
    },
  });
};
