import { Button, Col, Container, Input, Loading, Text } from "@nextui-org/react";
import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getTxMessage } from "../../common/utils/getTxMessage";

type FormValues = {
  name: string;
};

const CreateCollection = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = useCallback(async (data: FormValues) => {
    if (!window.ethereum) {
      toast.error("No ethereum provider");
      return;
    }

    let toastId: ReturnType<typeof toast> | null = null;
    setIsLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      const abi = ["function createCollection(string)"];
      const contract = new ethers.Contract(import.meta.env.VITE_NFT_CONTRACT_ADDRESS!, abi, signer);
      const tx = await contract.createCollection(data.name);
      toastId = toast.info("Creating collection, please wait...", {
        autoClose: false,
      });
      await tx.wait();
      toast.update(toastId, {
        render: "Collection created successfully",
        type: "success",
        autoClose: 3000,
      });
      navigate("/collections");
    } catch (error) {
      toast.error(getTxMessage(error));
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Container xs css={{ py: 20 }}>
      <div className="flex items-center space-x-6">
        <Text h1 size={32}>
          Create Collection
        </Text>
      </div>
      <Col as="form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          fullWidth
          label="Collection name"
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
        <Button type="submit" disabled={isLoading} size="lg" color="gradient">
          {isLoading ? <Loading color="currentColor" size="xs" /> : null}
          <span className="ml-2">{isLoading ? "Creating collection..." : "Create collection"}</span>
        </Button>
      </Col>
    </Container>
  );
};

export default CreateCollection;
