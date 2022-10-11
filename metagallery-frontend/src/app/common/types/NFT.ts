export type NFT = {
  tokenId: string;
  tokenName: string;
  tokenURI: string;
  owner: string;
  creator: string;
  collectionId: string;
  collectionInfo: {
    collectionId: string;
    collectionName: string;
  };
  contract: string;
};
