import { Card, Col, Container, Grid, Pagination, Row, Text } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { getMyNFTs } from "../services/my-nfts.service";
import { NFT } from "../../../common/types/NFT";
import { useAccount } from "@web3modal/react";
import clsx from "clsx";

const MyNFTItems = () => {
  const { address } = useAccount();
  const [page, setPage] = useState(1);
  const { data } = useQuery(["my-nfts", address, page], getMyNFTs, {
    enabled: !!address,
  });

  return (
    <Container lg className="py-6">
      <Text
        h3
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        className="mx-3 text-2xl"
        weight="semibold"
      >
        Showing {data?.docs.length || 0} results:
      </Text>
      <Grid.Container gap={2}>
        {(data?.docs || []).map((item: NFT) => (
          <Grid key={item.tokenId} xs={3}>
            <MyNFTItem item={item} />
          </Grid>
        ))}
      </Grid.Container>
      <div className={clsx("flex justify-center", (data?.totalPages || 0) > 1 ? "visible" : "invisible")}>
        <Pagination size="lg" total={data?.totalPages || 0} initialPage={1} onChange={setPage} />
      </div>
    </Container>
  );
};

type ItemProps = {
  item: NFT;
};

const MyNFTItem: React.FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const handleItemPress = useCallback(() => {
    navigate(`/nft/${item.tokenId}`);
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
        <Col className="space-y-1">
          <Row wrap="wrap" justify="space-between" align="center">
            <Text weight="medium" size={16} className="truncate">
              #{item.tokenId} {item.tokenName}
            </Text>
          </Row>
          <Row wrap="wrap" justify="space-between" align="center">
            <Text weight="medium" className="uppercase text-[#C99400] truncate" size={14}>
              {item.collectionInfo.collectionName}
            </Text>
            <Text weight="medium" className="px-2 py-0.5 bg-slate-200 rounded" size={12}>
              {import.meta.env.VITE_NETWORK_NAME}
            </Text>
          </Row>
        </Col>
      </Card.Footer>
    </Card>
  );
};

export default MyNFTItems;
