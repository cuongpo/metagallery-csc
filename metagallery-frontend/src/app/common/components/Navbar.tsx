import { Button, Navbar as NextUINavbar, Text } from "@nextui-org/react";
import { useConnectModal, useAccount } from "@web3modal/react";
import { useCallback, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import useGlobalStore from "../../store";
import Logo from "./Logo";

const menus = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Marketplace",
    href: "/marketplace",
  },
  {
    title: "Collections",
    href: "/collections",
  },
  {
    title: "My NFTs",
    href: "/my-nfts",
  },
  {
    title: "Mint NFT",
    href: "/mint",
  },
];

const Navbar = () => {
  const { open, isOpen } = useConnectModal();
  const [addLoading, removeLoading] = useGlobalStore(
    useCallback((state) => [state.addLoading, state.removeLoading] as const, [])
  );

  const onPressConnect = useCallback(() => {
    addLoading();
    open();
    setTimeout(removeLoading, 1000);
  }, [addLoading, open, removeLoading]);

  const { connected, address } = useAccount();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <NextUINavbar variant="sticky">
      <NextUINavbar.Content enableCursorHighlight hideIn="xs">
        <NextUINavbar.Brand onClick={() => navigate("/")} className="mr-8 cursor-pointer">
          <Logo />
          <Text b color="inherit" hideIn="xs">
            MetaGallery
          </Text>
        </NextUINavbar.Brand>
        {menus.map((menu, index) => {
          const isActive = location.pathname === menu.href;
          return (
            <NextUINavbar.Link
              isActive={isActive}
              as="a"
              className="cursor-pointer"
              onPress={() => {
                navigate(menu.href);
              }}
            >
              <span className="font-medium text-[16px]">{menu.title}</span>
            </NextUINavbar.Link>
          );
        })}
      </NextUINavbar.Content>
      <NextUINavbar.Content>
        <NextUINavbar.Item>
          {connected ? (
            <Button color="gradient" auto>
              {address.slice(0, 6)}...{address.slice(-4)}
            </Button>
          ) : (
            <Button color="gradient" auto onPress={onPressConnect}>
              Connect Wallet
            </Button>
          )}
        </NextUINavbar.Item>
      </NextUINavbar.Content>
    </NextUINavbar>
  );
};

export default Navbar;
