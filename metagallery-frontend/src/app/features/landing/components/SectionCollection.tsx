import { Button, Card, Col, Container, Grid, Row, Text } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";

import { getCollectionItems } from "../services/collection.service";

const SectionCollection = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery(["collection", page], getCollectionItems);
  return (
    <Container lg className="pt-12 lg:pt-20">
      <Text
        h3
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        className="mx-3 text-2xl "
        weight="semibold"
      >
        Recommended Collections
      </Text>
      <div className="mt-4">
        <Grid.Container gap={2} justify="center">
          {(data?.docs || []).map((item) => (
            <Grid key={item.collectionName} xs={3}>
              <CollectionItem item={item} />
            </Grid>
          ))}
        </Grid.Container>
      </div>
    </Container>
  );
};

type ItemProps = {
  item: Awaited<ReturnType<typeof getCollectionItems>>["docs"][0];
};

const CollectionItem: React.FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();
  // const handleItemPress = useCallback(() => {
  //   navigate(`/marketplace/${item.marketId}`);
  // }, [navigate]);

  return (
    <Card isPressable>
      <Card.Body css={{ p: 0 }}>
        {/* <Card.Image
          src={`https://${item.tokenURI}.ipfs.w3s.link/`}
          objectFit="cover"
          width="100%"
          height={360}
          alt="NFT"
        /> */}
      </Card.Body>
      <Card.Footer css={{ alignItems: "center", px: 16, pb: 20 }}>
        <Col>
          <Row wrap="wrap" justify="center" align="center">
            <span className="font-medium text-center max-auto text-lg">{item.collectionName}</span>
          </Row>
          <Button
            color="primary"
            as="a"
            href={`https://app.brolab.io/room/gallery-2?collection=${
              item.collectionId
            }&network=${import.meta.env.VITE_NETWORK_NAME.toLowerCase()}`}
            flat
            css={{ width: "100%", mt: 10 }}
            target="_blank"
          >
            View Collection
          </Button>
        </Col>
      </Card.Footer>
    </Card>
  );
};

export default SectionCollection;
