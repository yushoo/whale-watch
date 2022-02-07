import React, { useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

import ProviderConnection from "../ProviderConnection";

import {
  HeaderContainer,
  LayoutContainer,
  LayoutWrapper,
  ProviderContainer,
  DashboardContainer,
  DashboardDisplay,
} from "./LayoutElements";

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, callback: (args: any) => void) => void;
  isPhantom: boolean;
}

type WindowWithSolana = Window & {
  solana?: PhantomProvider;
};

const Layout = () => {
  const [walletAvail, setWalletAvail] = useState(false);
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  const [connected, setConnected] = useState(false);
  const [pubKey, setPubKey] = useState<PublicKey | null>(null);

  const getProvider = async () => {
    if ("solana" in window) {
      const solWindow = window as WindowWithSolana;
      if (solWindow?.solana?.isPhantom) {
        setProvider(solWindow.solana);
        setWalletAvail(true);
        // Attemp an eager connection
        await solWindow.solana.connect({ onlyIfTrusted: true });
      }
    } else {
      console.log("not found");
    }
  };

  // Check if wallet is connected
  useEffect(() => {
    const onLoad = async () => {
      await getProvider();
    };
    // Wait for the window to fully finish loading
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    provider?.on("connect", (publicKey: PublicKey) => {
      console.log(`connect event: ${publicKey}`);
      setConnected(true);
      setPubKey(publicKey);
    });
    provider?.on("disconnect", () => {
      console.log("disconnect event");
      setConnected(false);
      setPubKey(null);
    });
  }, [provider]);

  const connectHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    console.log(`connect handler`);
    provider?.connect().catch((err) => {
      console.error("connect ERROR:", err);
    });
  };

  const disconnectHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    console.log("disconnect handler");
    provider?.disconnect().catch((err) => {
      console.error("disconnect ERROR:", err);
    });
  };

  return (
    <LayoutWrapper>
      <LayoutContainer>
        <ProviderContainer>
          <div>
            {walletAvail ? (
              <>
                <ProviderConnection onClick={connectHandler} />
                {connected ? (
                  <p>Your public key is : {pubKey?.toBase58()}</p>
                ) : null}
              </>
            ) : (
              <>
                <p>
                  Opps!!! Phantom is not available. Go get it{" "}
                  <a href="https://phantom.app/">https://phantom.app/</a>.
                </p>
              </>
            )}
          </div>
        </ProviderContainer>
        <HeaderContainer>asdf</HeaderContainer>
        <DashboardContainer>
          <DashboardDisplay></DashboardDisplay>
        </DashboardContainer>
      </LayoutContainer>
    </LayoutWrapper>
  );
};

export default Layout;
