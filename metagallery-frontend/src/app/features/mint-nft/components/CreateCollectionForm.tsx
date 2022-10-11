import { Button, Col, Grid, Input, Row } from "@nextui-org/react";
import { useContract, useSigner } from "@web3modal/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
};

const CreateCollectionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleCreateCollection = useCallback((data: FormValues) => {
    // contract?.createCollection(data.name);
  }, []);

  return (
    <Grid xs={12} lg={6} as="form" onSubmit={handleSubmit(handleCreateCollection)}>
      <Col className="space-y-4">
        <Row>
          <Input {...register("name")} fullWidth label="Name" />
        </Row>
        <Row>
          <Button className="w-full" css={{ width: "100%" }} type="submit" color="gradient">
            Create Collection
          </Button>
        </Row>
      </Col>
    </Grid>
  );
};

export default CreateCollectionForm;
