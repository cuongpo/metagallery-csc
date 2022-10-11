import { Button, Container, Image, Input, Loading, Text } from "@nextui-org/react";
import { useAccount } from "@web3modal/react";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getTxMessage } from "../../common/utils/getTxMessage";
import SelectPaymentToken from "./components/SelectPaymentToken";
import { approveNFT, checkIsApprovedNFT, getMyNFTByTokenId, listNFT } from "./services/nft-item.service";

type FormValues = {
  paymentToken: string;
  price: string;
};

const SaleNFT = () => {
  const { register, control, handleSubmit } = useForm<FormValues>();
  const { itemId } = useParams();
  const { address } = useAccount();
  const [isApproved, setIsApproved] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { data: item } = useQuery(["my-nft", itemId], getMyNFTByTokenId, {
    enabled: !!address && !!itemId,
  });

  const onSubmit = useCallback(
    async (data: FormValues) => {
      if (!item) {
        return;
      }
      let toastId: ReturnType<typeof toast> | null = null;
      try {
        setIsLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const signer = provider.getSigner();
        if (!isApproved) {
          const tx = await approveNFT(item.tokenId, import.meta.env.VITE_MARKETPLACE_CONTRACT_ADDRESS, signer);
          toastId = toast.info("Approving, please wait...", {
            autoClose: false,
          });
          await tx.wait();
          toast.update(toastId, {
            render: "NFT approved successfully",
            type: "success",
            autoClose: 3000,
          });
          setIsApproved(true);
          return;
        }
        const _price = ethers.utils.parseEther(data.price);
        const tx = await listNFT(item.tokenId, _price, data.paymentToken, signer);
        toastId = toast.info("Listing NFT, please wait...", {
          autoClose: false,
        });
        await tx.wait();
        toast.update(toastId, {
          render: "NFT listed successfully",
          type: "success",
          autoClose: 3000,
        });
        navigate("/marketplace");
      } catch (error) {
        const message = getTxMessage(error);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    },
    [item, isApproved]
  );

  useEffect(() => {
    if (item) {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      checkIsApprovedNFT(item.tokenId, import.meta.env.VITE_MARKETPLACE_CONTRACT_ADDRESS, provider).then(setIsApproved);
    }
  }, [item]);

  if (!item) {
    return null;
  }

  return (
    <Container xs className="py-6">
      <Text h1 className="text-3xl font-semibold">
        List NFT
      </Text>
      <div className="flex py-6 gap-x-6">
        <div className="w-1/3">
          <Image
            src={`https://${item.tokenURI}.ipfs.w3s.link/`}
            width="100%"
            height="100%"
            className="max-h-[180px] shadow rounded"
            objectFit="cover"
            alt="Card example background"
          />
        </div>
        <div className="w-2/3 space-y-2">
          <Text className="text-xl font-semibold">{item.collectionInfo.collectionName}</Text>
          <Text className="text-2xl font-semibold">{item.tokenName}</Text>
          <div>
            <Text className="text-gray-700">Contract address</Text>
            <Text className="text-sm font-medium">{item.contract}</Text>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="flex items-end gap-x-2">
          <div className="w-3/4">
            <Input
              size="lg"
              label="Set Price"
              placeholder="Price"
              initialValue="0"
              fullWidth
              {...register("price", {
                required: "Price is required",
              })}
            />
          </div>
          <div className="w-1/3">
            <Controller
              control={control}
              name="paymentToken"
              render={({ field: { onChange, value } }) => (
                <SelectPaymentToken onSelect={onChange} selectedItem={value} />
              )}
              rules={{ required: "Payment token is required" }}
            />
          </div>
        </div>

        <Input size="lg" label="Royalty Fee" placeholder="Platform Fee" disabled initialValue="0" fullWidth />
        <Input size="lg" label="Platform Fee" placeholder="Platform Fee" disabled initialValue="0" fullWidth />
        <Button type="submit" disabled={isApproved === undefined || isLoading} size="lg" color="gradient">
          {isApproved === undefined || isLoading ? <Loading color="currentColor" size="xs" /> : null}
          <span className="ml-2">{isApproved === undefined ? "Loading" : isApproved ? "List NFT" : "Approve"}</span>
        </Button>
      </form>
    </Container>
  );
};
export default SaleNFT;
