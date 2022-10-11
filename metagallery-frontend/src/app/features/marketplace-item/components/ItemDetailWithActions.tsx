import { Button, Card, Col, Loading, Row, Spacer, Text } from "@nextui-org/react";
import { useAccount } from "@web3modal/react";
import { BigNumber, ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getTxMessage } from "../../../common/utils/getTxMessage";
import { MarketplaceItem } from "../../marketplace/types/MarketplaceItem";

type Props = {
  item: MarketplaceItem | undefined;
};

const ItemDetailWithActions: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const isOwner = item?.owner.toLowerCase() === address?.toLowerCase();

  const checkIsApproved = useCallback(async () => {
    try {
      if (!item || !address) {
        return;
      }
      setIsLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        item.marketPaymentToken,
        ["function allowance(address, address) public view returns (uint256)"],
        signer
      );
      const allowedToken = await contract.allowance(address, import.meta.env.VITE_MARKETPLACE_CONTRACT_ADDRESS);
      const isApproved = await allowedToken.gte(BigNumber.from(item.marketPrice));
      setIsApproved(isApproved);
    } catch (error) {
      const message = getTxMessage(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [item, address]);

  const approveToken = useCallback(async () => {
    let toastId: ReturnType<typeof toast> | null = null;
    try {
      if (!item || !address) {
        return;
      }
      setIsLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(item.marketPaymentToken, ["function approve(address, uint256)"], signer);
      const tx = await contract.approve(import.meta.env.VITE_MARKETPLACE_CONTRACT_ADDRESS, ethers.constants.MaxUint256);

      toastId = toast.info("Approving, please wait...", {
        autoClose: false,
      });

      await tx.wait();
      toast.update(toastId, {
        render: "Token approved successfully",
        type: "success",
        autoClose: 3000,
      });
      toastId = null;
      setIsApproved(true);
    } catch (error) {
      const message = getTxMessage(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
      if (toastId) {
        toast.dismiss(toastId);
      }
    }
  }, []);

  const buyNFT = useCallback(async () => {
    if (!window.ethereum) {
      console.log("No ethereum provider");
      return;
    }
    setIsLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const abi = ["function executeOrder(uint256)"];
    const contract = new ethers.Contract(import.meta.env.VITE_MARKETPLACE_CONTRACT_ADDRESS!, abi, signer);
    let toastId: ReturnType<typeof toast> | null = null;
    try {
      const tx = await contract.executeOrder(item!.marketId);
      toastId = toast.info("Buying, please wait...", {
        autoClose: false,
      });
      await tx.wait();
      toast.update(toastId, {
        render: "NFT bought successfully",
        type: "success",
        autoClose: 3000,
      });
      navigate(`/nft/${item!.tokenId}`);
    } catch (error) {
      const message = getTxMessage(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
      if (toastId) {
        toast.dismiss(toastId);
      }
    }
  }, [item]);

  const cancelSale = useCallback(async () => {
    if (!window.ethereum) {
      console.log("No ethereum provider");
      return;
    }
    setIsLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const abi = ["function cancelOrder(uint256)"];
    const contract = new ethers.Contract(import.meta.env.VITE_MARKETPLACE_CONTRACT_ADDRESS!, abi, signer);
    let toastId: ReturnType<typeof toast> | null = null;
    try {
      const tx = await contract.cancelOrder(item!.marketId);
      toastId = toast.info("Cancelling sale, please wait...", {
        autoClose: false,
      });
      await tx.wait();
      toast.update(toastId, {
        render: "Sale cancelled successfully",
        type: "success",
        autoClose: 3000,
      });
      navigate(`/nft/${item!.tokenId}`);
    } catch (error) {
      const message = getTxMessage(error);
      toast.error(message);
      console.log(error);
    } finally {
      setIsLoading(false);
      if (toastId) {
        toast.dismiss(toastId);
      }
    }
  }, [item]);

  useEffect(() => {
    checkIsApproved();
  }, [checkIsApproved]);

  if (!item) {
    return null;
  }

  return (
    <Card
      variant="flat"
      css={{ w: "100%", borderRadius: 0, shadow: "none", px: 20, bg: "transparent", border: "none" }}
    >
      <Col className="space-y-2">
        <Row>
          <Text size={16} weight="medium">
            Collection: {item.collectionInfo.collectionName}
          </Text>
        </Row>
        <Row>
          <Text size={32} weight="semibold">
            {item.tokenName}
          </Text>
        </Row>
        <Row>
          <div className="items-center flex space-x-2">
            <span className="font-semibold text-[32px]">{ethers.utils.formatEther(item.marketPrice)}</span>{" "}
            <a
              target="_blank"
              href={`${import.meta.env.VITE_EXPLORER_ADDRESS_URL}/${item.paymentToken.tokenAddress}`}
              className="px-2 py-1 rounded-lg bg-slate-200 text-orange-500 text-lg font-bold"
            >
              {item.paymentToken.tokenSymbol}
            </a>
          </div>
        </Row>
        <Row>
          {isOwner ? (
            <Button
              disabled={isLoading}
              onClick={cancelSale}
              size="lg"
              color="secondary"
              css={{ borderRadius: 5, width: "40%", mt: 20 }}
            >
              {isLoading ? <Loading size="xs" className="mr-2" /> : null}
              <span className="ml-2">Cancel Order</span>
            </Button>
          ) : (
            <Button
              disabled={isLoading}
              onClick={isApproved ? buyNFT : approveToken}
              size="lg"
              color="warning"
              css={{ borderRadius: 5, width: "40%", mt: 20 }}
            >
              {isLoading ? <Loading size="xs" className="mr-2" /> : null}

              <span className="ml-2">{isApproved ? "Buy NFT" : `Approve ${item.paymentToken.tokenSymbol}`}</span>
            </Button>
          )}
        </Row>
      </Col>
    </Card>
  );
};

export default ItemDetailWithActions;
