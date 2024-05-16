"use client";

import { useEffect, useState } from "react";

import DesignMetadataModal from "@/components/modals/DesignMetadataModal";
import DesignDetailModal from "@/components/modals/DesignDetailModal";
import DeleteConfirmation from "@/components/modals/DeleteConfirmation";

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
      <DeleteConfirmation />
    </>
  );
};

export default ModalProvider;
