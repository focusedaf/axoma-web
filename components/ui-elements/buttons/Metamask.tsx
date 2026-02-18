"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  className?: string;
  onConnect?: (address: string) => void;
  disabled?: boolean;
}

const Metamask = ({ className, onConnect, disabled }: Props) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    const checkMetaMask = () => {
      if (
        typeof window.ethereum !== "undefined" &&
        window.ethereum.isMetaMask
      ) {
        setIsMetaMaskInstalled(true);
      } else {
        setIsMetaMaskInstalled(false);
      }
    };

    checkMetaMask();

    const handleEthereum = () => {
      checkMetaMask();
    };

    window.addEventListener("ethereum#initialized", handleEthereum, {
      once: true,
    });

    setTimeout(checkMetaMask, 1000);

    return () => {
      window.removeEventListener("ethereum#initialized", handleEthereum);
    };
  }, []);

  const connectWallet = async () => {
    if (!isMetaMaskInstalled || typeof window.ethereum === "undefined") {
      window.open("https://metamask.io", "_blank");
      toast.info("Redirecting to MetaMask download page...");
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      if (!accounts || accounts.length === 0) {
        toast.error("No accounts found");
        return;
      }

      const address = accounts[0];

      if (onConnect) {
        onConnect(address);
      }

      toast.success("Wallet connected successfully!");
    } catch (error: any) {
      console.error("Error connecting wallet:", error);

      if (error.code === 4001) {
        toast.error("Connection request rejected");
      } else if (error.code === -32002) {
        toast.error("Connection request already pending", {
          description: "Please check MetaMask",
        });
      } else {
        toast.error("Failed to connect wallet");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={connectWallet}
      disabled={disabled || isConnecting}
      className={`
      flex items-center justify-center gap-3
      h-11 w-full
      font-semibold
      bg-gray-50 text-muted-foreground
      shadow-sm
      transition-all duration-200
      hover:bg-gray-100
      ${
        disabled || isConnecting
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      }
      ${className || ""}
    `}
    >
      {isConnecting
        ? "Connecting..."
        : !isMetaMaskInstalled
          ? "Install MetaMask"
          : "Connect to MetaMask"}

      <Image
        src="/images/Metamask.png"
        alt="Metamask Icon"
        width={24}
        height={24}
        className="shrink-0"
      />
    </Button>
  );
};

export default Metamask;
