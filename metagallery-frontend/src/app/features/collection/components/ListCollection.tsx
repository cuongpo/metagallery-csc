import { Avatar, Button, Card, Grid, Text } from "@nextui-org/react";
import { useAccount } from "@web3modal/react";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getMyCollections } from "../services/collection.service";

const ListCollection = () => {
  const { address } = useAccount();
  const { data, isLoading } = useQuery(["collections", address], getMyCollections, {
    enabled: !!address,
  });

  const navigate = useNavigate();

  const onClickCreateCollection = useCallback(() => {
    navigate("/collections/create");
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data || !address) {
    return <div>No data</div>;
  }
  if (!data.docs.length) {
    return (
      <div className="flex flex-col space-y-4 items-center justify-center min-h-[320px]">
        <div className="text-center">
          <div className="text-2xl font-bold">No collections found</div>
          <div className="text-gray-500">Create a new collection to get started</div>
        </div>
        <Button color="primary" onClick={onClickCreateCollection}>
          Create Collection
        </Button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
      {data.docs.map((collection) => (
        <Card key={collection.collectionId} css={{ p: "$6", mw: "400px" }} isPressable isHoverable>
          <Card.Header>
            <Avatar squared text={collection.collectionName} css={{ borderRadius: 6 }} size="lg" />
            <Grid.Container css={{ pl: "$6" }}>
              <Grid xs={12}>
                <Text h4 css={{ lineHeight: "$xs" }}>
                  {collection.collectionId}
                </Text>
              </Grid>
              <Grid xs={12}>
                <Text css={{ color: "$accents8", mt: -2 }}>{collection.collectionName}</Text>
              </Grid>
            </Grid.Container>
          </Card.Header>
          <Card.Footer>
            <Button
              color="primary"
              as="a"
              href={`https://app.brolab.io/room/gallery-2?collection=${
                collection.collectionId
              }&network=${import.meta.env.VITE_NETWORK_NAME.toLowerCase()}`}
              flat
              css={{ width: "100%" }}
              target="_blank"
            >
              View Collection
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};

export default ListCollection;
