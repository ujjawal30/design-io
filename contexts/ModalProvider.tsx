"use client";

import { useEffect, useState } from "react";

import DesignMetadataModal from "@/components/modals/DesignMetadataModal";
import DesignDetailModal from "@/components/modals/DesignDetailModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <DesignMetadataModal />
      <DesignDetailModal />
    </>
  );
};

export default ModalProvider;
