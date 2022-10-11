import axios from "axios";
import { Collection } from "../../../common/types/Collection";
import { PaginationResponse } from "../../../common/types/PaginationResponse";

export const getCollections = async (): Promise<PaginationResponse<Collection>> => {
  return axios.get("/collections");
};

export const uploadImage = async (
  file: File
): Promise<{
  cid: string;
}> => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + import.meta.env.VITE_WEB3_STORAGE_API_KEY,
    },
    baseURL: import.meta.env.VITE_WEB3_STORAGE_API_URL,
  });
};
