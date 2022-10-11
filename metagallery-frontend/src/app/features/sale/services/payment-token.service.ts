import axios from "axios";
import { PaginationResponse } from "../../../common/types/PaginationResponse";

type PaymentToken = {
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: string;
};
export const getPaymentTokens = (): Promise<PaginationResponse<PaymentToken>> => {
  return axios.get("/payment-tokens");
};
