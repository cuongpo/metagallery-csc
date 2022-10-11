import { BigNumber } from "ethers";

export type MyNFTItem = {
  orderId: BigNumber;
  seller: string;
  tokenId: BigNumber;
  paymentToken: string;
  price: BigNumber;
};
