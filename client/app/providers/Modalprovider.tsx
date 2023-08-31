import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";

const ModalProvider: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Test modal"
      description="Test Description"
      isOpen={true} 
      onOpenChange={() => {}} 
    >
      Test children
    </Modal>
  );
};

export default ModalProvider;
