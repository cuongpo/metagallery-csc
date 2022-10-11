import axios from "axios";
import { Collection } from "../../../common/types/Collection";
import { PaginationResponse } from "../../../common/types/PaginationResponse";

export const getCollectionItems = (): Promise<PaginationResponse<Collection>> => {
  return axios.get("/collections", {
    params: {
      limit: 4,
      page: 1,
    },
  });
};
