import axios from "axios";
import { BigNumber, Contract, ContractTransaction, Signer } from "ethers";
import { QueryFunctionContext } from "react-query";
import { NFT } from "../../../common/types/NFT";

export const getMyNFTByTokenId = async (queryContext: QueryFunctionContext): Promise<NFT> => {
  const [, tokenId, owner] = queryContext.queryKey;
  return axios.get("/nfts/" + tokenId, {
    params: {
      owner,
    },
  });
};

export const approveNFT = async (tokenId: string, spender: string, signer: Signer): Promise<ContractTransaction> => {
  console.log("Approving NFT", tokenId, spender);
  const contract = new Contract(
    import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
    ["function approve(address, uint256)"],
    signer
  );
  return contract.approve(spender, tokenId);
};

export const checkIsApprovedNFT = async (
  tokenId: string,
  spender: string,
  provider: Signer["provider"]
): Promise<boolean> => {
  console.log("Checking approving NFT", tokenId, spender);
  const contract = new Contract(
    import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
    ["function getApproved(uint256) public view returns (address)"],
    provider
  );
  const address = await contract.getApproved(tokenId);
  console.log(`Is approved: ${address === spender} => address: ${address}, spender: ${spender}`);
  return address === spender;
};

export const listNFT = async (
  tokenId: string,
  price: BigNumber,
  paymentToken: string,
  signer: Signer
): Promise<ContractTransaction> => {
  console.log("Listing NFT", tokenId, price, import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS);
  const contract = new Contract(
    import.meta.env.VITE_MARKETPLACE_CONTRACT_ADDRESS,
    ["function addOrder(uint256,address, uint256)"],
    signer
  );
  return contract.addOrder(tokenId, paymentToken, price);
};
