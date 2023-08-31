import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onOpenChange, title, description, children }) => {
  return (
    <Dialog.Root 
      open={isOpen} 
      onOpenChange={onOpenChange}
      defaultOpen={isOpen}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className='bg-neutral-900/90 backdrop-blur fixed inset-0'
        />
        <Dialog.Content>
        
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
