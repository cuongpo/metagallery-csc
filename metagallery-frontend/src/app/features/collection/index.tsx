import { Button, Container, Text } from "@nextui-org/react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ListCollection from "./components/ListCollection";

const Collection = () => {
  const navigate = useNavigate();
  const onClickCreateCollection = useCallback(() => {
    navigate("/collections/create");
  }, []);

  return (
    <Container md css={{ py: 20 }}>
      <div className="flex items-center space-x-6">
        <Text h1 size={32}>
          Collections
        </Text>
        <Button onPress={onClickCreateCollection} auto color="secondary" size="sm" css={{ mt: 2 }}>
          Create New Collection
        </Button>
      </div>
      <ListCollection />
    </Container>
  );
};

export default Collection;
