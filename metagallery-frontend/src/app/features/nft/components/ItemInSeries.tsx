import { Image, Text } from "@nextui-org/react";
import clsx from "clsx";
import { useQuery } from "react-query";
import { getNFTsInSeri } from "../services/nft-item.service";

type Props = {
  collectionId: string;
};

const ItemInSeries: React.FC<Props> = ({ collectionId }) => {
  const { data } = useQuery(["nfts", collectionId], getNFTsInSeri);
  return (
    <div>
      <Text size={22} weight="medium">
        Series Content
      </Text>
      <div className="mt-4 w-full">
        <div className="grid grid-cols-2 gap-8">
          {(data?.docs || []).map((item, index) => (
            <div key={item.tokenId}>
              <div className={clsx("flex gap-x-4 w-full", index % 3 === 0 ? "bg-slate-50" : "bg-gray-100")}>
                <div>
                  <Image objectFit="cover" width={100} height={100} src={`https://${item.tokenURI}.ipfs.w3s.link/`} />
                </div>
                <div className="w-full truncate">
                  <Text weight="medium" className="truncate w-full">
                    #{item.tokenId} - {item.tokenName}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemInSeries;
