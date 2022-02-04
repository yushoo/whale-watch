import React, { FC, MouseEventHandler } from "react";
import { WalletConnectionBtn } from "./ProviderConnectionElements";

interface providerProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ProviderConnection: FC<providerProps> = ({ onClick }: providerProps) => {
  return (
    <WalletConnectionBtn onClick={onClick}>Connect Wallet</WalletConnectionBtn>
  );
};

export default ProviderConnection;
