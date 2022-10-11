import { Avatar, Col, Dropdown, Spacer, Text } from "@nextui-org/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getCollections } from "../services/mint-nft.service";
import { getMyCollections } from "../../collection/services/collection.service";
import { useAccount } from "@web3modal/react";
import { useNavigate } from "react-router-dom";

type Key = string | number;

type Props = {
  onSelect: (project: Key) => void;
  selectedItem?: Key;
};

const SelectCollection: React.FC<Props> = ({ onSelect }) => {
  const { address } = useAccount();
  const { data } = useQuery(["collections", address], getMyCollections, {
    enabled: !!address,
  });
  const navigate = useNavigate();

  const [selected, setSelected] = useState<string>();

  const onSelectionChange = useCallback((keys: Set<Key> | "all") => {
    if (typeof keys === "string") {
      return setSelected(undefined);
    }
    const key = keys.values().next().value;
    if (key === "create") {
      navigate("/collections/create");
    }
    setSelected(key);
  }, []);

  useEffect(() => {
    if (selected) {
      onSelect(selected);
    }
  }, [selected, onSelect]);

  const selectedValue = useMemo(
    () => data?.docs.find((collection) => collection.collectionId === selected),
    [data?.docs, selected]
  );

  const selectedKeys = useMemo(() => {
    if (selected) {
      return new Set([selected]);
    }
    return new Set<string>();
  }, [selected]);

  return (
    <Dropdown>
      <Col>
        <Text size={18}>Collection</Text>
        <Spacer y={0.1} />
        <Dropdown.Button flat color="default" css={{ width: "100%" }}>
          {selectedValue?.collectionName || "Select Collection"}
        </Dropdown.Button>
        <Spacer y={1} />
      </Col>
      <Dropdown.Menu
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={onSelectionChange}
        color="default"
        aria-label="Projects"
        css={{ $$dropdownMenuWidth: "280px" }}
      >
        <Dropdown.Section title="My Collections">
          {!data?.docs.length ? (
            <Dropdown.Item css={{ pointerEvents: "none", userSelect: "none" }}>No Collections Found</Dropdown.Item>
          ) : (
            (data?.docs || []).map((collection) => (
              <Dropdown.Item
                key={collection.collectionId}
                description={collection.collectionName}
                icon={<Avatar squared text={collection.collectionName} css={{ borderRadius: 6 }} size="sm" />}
              >
                {collection.collectionName}
              </Dropdown.Item>
            ))
          )}
        </Dropdown.Section>
        <Dropdown.Section title="Want to create collections?">
          <Dropdown.Item
            color="primary"
            as="button"
            key="create"
            icon={<PlusCircleIcon height={22} width={22} fill="currentColor" />}
          >
            Create New Collection
          </Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SelectCollection;
