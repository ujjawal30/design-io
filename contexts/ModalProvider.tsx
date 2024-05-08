"use client";

import { useEffect, useState } from "react";

import DesignMetadataModal from "@/components/modals/DesignMetadataModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <DesignMetadataModal />;
};

export default ModalProvider;
