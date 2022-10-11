import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { PaginationResponse } from "../../../common/types/PaginationResponse";
import { MarketplaceItem } from "../types/MarketplaceItem";

export const getMarketplaceItems = async (
  queryContext: QueryFunctionContext
): Promise<PaginationResponse<MarketplaceItem>> => {
  return axios.get("/marketplace", {
    params: {
      limit: 8,
      page: queryContext.queryKey[1],
    },
  });
};
