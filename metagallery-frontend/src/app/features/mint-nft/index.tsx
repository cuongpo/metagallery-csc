import { Button, Col, Container, Grid, Input, Loading, Row } from "@nextui-org/react";
import { ContractTransaction, ethers } from "ethers";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getTxMessage } from "../../common/utils/getTxMessage";
import SelectCollection from "./components/SelectCollection";
import { uploadImage } from "./services/mint-nft.service";

type FormValues = {
  recipient: string;
  tokenURI: FileList;
  name: string;
  collectionId: string;
};

const MintNFT = () => {
  const { register, handleSubmit, control } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleMintNFT = useCallback(
    handleSubmit(async (data) => {
      if (!window.ethereum) {
        console.log("No ethereum provider");
        return;
      }
      setIsLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      const abi = ["function mintNFT(address,string,string,uint256) returns (uint256)"];
      const contract = new ethers.Contract(import.meta.env.VITE_NFT_CONTRACT_ADDRESS!, abi, signer);
      let toastId: ReturnType<typeof toast> | null = null;
      try {
        toastId = toast.info("Uploading image, please wait...", {
          autoClose: false,
        });
        const { cid } = await uploadImage(data.tokenURI[0]);
        const tx: ContractTransaction = await contract.mintNFT(data.recipient, cid, data.name, data.collectionId);
        toast.update(toastId, {
          render: "Minting NFT, please wait...",
          type: "info",
          autoClose: false,
        });
        const receipt = await tx.wait();
        const abi = ["event MintNFT(uint256, address, string, string, uint256)"];
        const iface = new ethers.utils.Interface(abi);
        const event = iface.parseLog(receipt.logs[1]);
        const tokenId = event.args[0];
        toast.update(toastId, {
          render: "NFT minted successfully",
          type: "success",
          autoClose: 3000,
        });
        navigate(`/nft/${tokenId}`);
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
    }),
    []
  );

  return (
    <Container xs className="py-4">
      <Col as="form" onSubmit={handleMintNFT} className="space-y-4">
        <Controller
          control={control}
          name="collectionId"
          render={({ field: { onChange, value } }) => <SelectCollection onSelect={onChange} selectedItem={value} />}
          rules={{ required: "Collection is required" }}
        />
        <Row>
          <Input
            fullWidth
            label="Recipient"
            {...register("recipient", {
              required: "Recipient is required",
              pattern: {
                value: /^0x[a-fA-F0-9]{40}$/,
                message: "Invalid address",
              },
            })}
          />
        </Row>
        <Row>
          <Input
            fullWidth
            type="file"
            label="Token URI"
            {...register("tokenURI", {
              required: "Token URI is required",
            })}
          />
        </Row>
        <Row>
          <Input
            fullWidth
            label="Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              maxLength: {
                value: 32,
                message: "Name must be at most 32 characters",
              },
            })}
          />
        </Row>
        <Row>
          <Button disabled={isLoading} className="space-x-2" css={{ width: "100%" }} type="submit" color="gradient">
            {isLoading ? <Loading size="xs" /> : null}
            <span className="ml-2">Mint NFT</span>
          </Button>
        </Row>
      </Col>
    </Container>
  );
};

export default MintNFT;
