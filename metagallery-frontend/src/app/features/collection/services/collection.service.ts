import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { Collection } from "../../../common/types/Collection";
import { PaginationResponse } from "../../../common/types/PaginationResponse";

export const getMyCollections = async (queryContext: QueryFunctionContext): Promise<PaginationResponse<Collection>> => {
  return axios.get("/collections", {
    params: {
      limit: Number.MAX_SAFE_INTEGER,
      owner: queryContext.queryKey[1],
    },
  });
};
