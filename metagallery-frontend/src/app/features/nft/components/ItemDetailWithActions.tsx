import { Button, Card, Col, Row, Text } from "@nextui-org/react";
import { useAccount } from "@web3modal/react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { NFT } from "../../../common/types/NFT";
import ItemInSeries from "./ItemInSeries";

type Props = {
  item: NFT | undefined;
};

const ItemDetailWithActions: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();

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
          <Button
            onClick={() => {
              navigate(`/nft/${item.tokenId}/sale`);
            }}
            size="lg"
            color="warning"
            css={{ borderRadius: 5, width: "40%", mt: 20 }}
          >
            List NFT
          </Button>
        </Row>
        <Row>
          <Col className="mt-8">
            <ItemInSeries collectionId={item.collectionId} />
          </Col>
        </Row>
      </Col>
    </Card>
  );
};

export default ItemDetailWithActions;
