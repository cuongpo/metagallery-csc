import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { NFT } from "../../../common/types/NFT";
import { PaginationResponse } from "../../../common/types/PaginationResponse";

export const getNFTByTokenId = async (queryContext: QueryFunctionContext): Promise<NFT> => {
  const [, tokenId] = queryContext.queryKey;
  return axios.get("/nfts/" + tokenId, {
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
