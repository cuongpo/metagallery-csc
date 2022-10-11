import { Card, Col, Container, Grid, Pagination, Row, Spacer, Text } from "@nextui-org/react";
import { ethers } from "ethers";
import { getMarketplaceItems } from "../services/marketplace.service";
import { MarketplaceItem as MarketplaceItemType } from "../types/MarketplaceItem";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import clsx from "clsx";

const SectionNFT = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery(["marketplace", page], getMarketplaceItems);
  return (
    <Container lg className="py-12 lg:py-20">
      <Text
        h3
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        className="mx-3 text-2xl "
        weight="semibold"
      >
        Features NFTs
      </Text>
      <div className="mt-4">
        <Grid.Container gap={2} justify="center">
          {(data?.docs || []).map((item: MarketplaceItemType) => (
            <Grid key={item.tokenId} xs={3}>
              <MarketplaceItem item={item} />
            </Grid>
          ))}
        </Grid.Container>
      </div>
    </Container>
  );
};

type ItemProps = {
  item: MarketplaceItemType;
};

const MarketplaceItem: React.FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const handleItemPress = useCallback(() => {
    navigate(`/marketplace/${item.marketId}`);
  }, [navigate]);

  return (
    <Card isPressable onPress={handleItemPress}>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={`https://${item.tokenURI}.ipfs.w3s.link/`}
          objectFit="cover"
          width="100%"
          height={360}
          alt="NFT"
        />
      </Card.Body>
      <Card.Footer css={{ justifyItems: "flex-start", px: 16, pb: 16 }}>
        <Col>
          <Row wrap="wrap" justify="space-between" align="center">
            <Text weight="medium" size={16}>
              #{item.tokenId.toString()} {item.tokenName}
            </Text>
          </Row>
          <Row wrap="wrap" justify="space-between" align="center">
            <Text weight="medium" size={14}>
              Price
            </Text>
            <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
              {ethers.utils.formatEther(item.marketPrice)} {item.paymentToken.tokenSymbol}
            </Text>
          </Row>
          <Row wrap="wrap" justify="space-between" align="center">
            <Text weight="medium" size={14}>
              Seller
            </Text>
            <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
              {item.owner.slice(0, 6)}...{item.owner.slice(-4)}
            </Text>
          </Row>
        </Col>
      </Card.Footer>
    </Card>
  );
};

export default SectionNFT;
