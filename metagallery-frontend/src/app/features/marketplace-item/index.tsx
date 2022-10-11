import { useParams } from "react-router-dom";
import { Container, Grid } from "@nextui-org/react";
import ItemDetailWithImage from "./components/ItemDetailWithImage";
import ItemDetailWithActions from "./components/ItemDetailWithActions";
import { useQuery } from "react-query";
import { getItemByMarketId } from "./services/marketplace-item.service";

const MarketplaceItem = () => {
  const { itemId } = useParams();

  const { data } = useQuery(["marketPlaceItme", itemId], getItemByMarketId, {});

  return (
    <Container md className="py-4">
      <Grid.Container gap={6}>
        <Grid xs={12} lg={4}>
          <ItemDetailWithImage item={data} />
        </Grid>
        <Grid xs={12} lg={8}>
          <ItemDetailWithActions item={data} />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default MarketplaceItem;
