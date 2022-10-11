import { Avatar, Col, Dropdown, Spacer, Text } from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getPaymentTokens } from "../services/payment-token.service";

type Key = string | number;

type Props = {
  onSelect: (project: Key) => void;
  selectedItem?: Key;
};

const SelectPaymentToken: React.FC<Props> = ({ onSelect }) => {
  const { data } = useQuery("payment-tokens", getPaymentTokens);

  const [selected, setSelected] = useState<string>();

  const onSelectionChange = useCallback((keys: Set<Key> | "all") => {
    if (typeof keys === "string") {
      return setSelected(undefined);
    }
    const key = keys.values().next().value;
    setSelected(key);
  }, []);

  useEffect(() => {
    if (selected) {
      onSelect(selected);
    }
  }, [selected, onSelect]);

  const selectedValue = useMemo(
    () => data?.docs.find((paymentToken) => paymentToken.tokenAddress === selected),
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
        <Spacer y={0.1} />
        <Dropdown.Button flat size="md" color="default" css={{ mb: -18, w: "100%" }}>
          {selectedValue?.tokenSymbol || "Select Payment Token"}
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
        <Dropdown.Section title="Payment tokens">
          {!data?.docs.length ? (
            <Dropdown.Item css={{ pointerEvents: "none", userSelect: "none" }}>No Payment Token Found</Dropdown.Item>
          ) : (
            (data?.docs || []).map((paymentToken) => (
              <Dropdown.Item
                key={paymentToken.tokenAddress}
                description={paymentToken.tokenAddress}
                icon={<Avatar squared text={paymentToken.tokenSymbol} css={{ borderRadius: 6 }} size="sm" />}
              >
                {paymentToken.tokenSymbol}
              </Dropdown.Item>
            ))
          )}
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SelectPaymentToken;
