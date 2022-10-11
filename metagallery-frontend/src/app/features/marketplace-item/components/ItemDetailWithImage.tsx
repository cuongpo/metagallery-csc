import { Card, Col, Row, Text } from "@nextui-org/react";
import { MarketplaceItem } from "../../marketplace/types/MarketplaceItem";

type Props = {
  item: MarketplaceItem | undefined;
};

const ItemDetailWithImage: React.FC<Props> = ({ item }) => {
  if (!item) {
    return null;
  }
  const contractAddress = import.meta.env.VITE_MARKETPLACE_CONTRACT_ADDRESS;
  const chainId = import.meta.env.VITE_CHAIN_ID;
  return (
    <Card variant="flat" css={{ w: "100%", borderRadius: 0, shadow: "none", border: "none", bg: "transparent" }}>
      <Card.Body css={{ p: 0, maxHeight: 400 }}>
        <Card.Image
          src={`https://${item.tokenURI}.ipfs.w3s.link/`}
          width="100%"
          height="100%"
          className="max-h-[400px]"
          objectFit="cover"
          alt="Card example background"
        />
      </Card.Body>
      <Card.Footer>
        <Col className="space-y-4">
          <Col className="space-y-2">
            <Text color="#000" size={24}>
              Details
            </Text>
            <Col className="space-y-2">
              <Row justify="space-between">
                <Text color="#555" size={16}>
                  Creator
                </Text>
                <Text color="#000" weight="semibold" size={16}>
                  {item.creator.slice(0, 6)}...{item.creator.slice(-4)}
                </Text>
              </Row>
              <Row justify="space-between">
                <Text color="#555" size={16}>
                  Owner
                </Text>
                <Text color="#000" weight="semibold" size={16}>
                  {item.owner.slice(0, 6)}...{item.owner.slice(-4)}
                </Text>
              </Row>
              <Row justify="space-between">
                <Text color="#555" size={16}>
                  Network
                </Text>
                <Text color="#000" weight="semibold" size={16}>
                  {import.meta.env.VITE_NETWORK_NAME}
                </Text>
              </Row>
              <Row justify="space-between">
                <Text color="#555" size={16}>
                  Contract Address
                </Text>
                <Text color="#000" weight="semibold" size={16}>
                  {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
                </Text>
              </Row>
              <Row justify="space-between">
                <Text color="#555" size={16}>
                  Chain ID
                </Text>
                <Text color="#000" weight="semibold" size={16}>
                  {Number(chainId)}
                </Text>
              </Row>
              <Row justify="space-between">
                <Text color="#555" size={16}>
                  Token ID
                </Text>
                <Text color="#000" weight="semibold" size={16}>
                  {item.tokenId.toString()}
                </Text>
              </Row>
            </Col>
          </Col>
        </Col>
      </Card.Footer>
    </Card>
  );
};

export default ItemDetailWithImage;
