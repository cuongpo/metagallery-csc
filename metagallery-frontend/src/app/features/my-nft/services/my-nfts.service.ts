import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { NFT } from "../../../common/types/NFT";
import { PaginationResponse } from "../../../common/types/PaginationResponse";

export const getMyNFTs = (queryContext: QueryFunctionContext): Promise<PaginationResponse<NFT>> => {
  return axios.get("/nfts", {
    params: {
      owner: queryContext.queryKey[1],
      page: queryContext.queryKey[2],
      limit: 8,
      marketId: "null",
    },
  });
};
