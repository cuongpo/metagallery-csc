export type MarketplaceItem = {
  tokenId: string;
  collectionId: string;
  contract: string;
  owner: string;
  creator: string;
  tokenName: string;
  tokenURI: string;
  marketId: string;
  marketPrice: string;
  marketPaymentToken: string;
  collectionInfo: {
    collectionId: string;
    collectionName: string;
  };
  paymentToken: {
    tokenAddress: string;
    tokenDecimals: number;
    tokenSymbol: string;
  };
};
