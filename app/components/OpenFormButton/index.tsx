import { Button } from '@ui/index';
import React, { useState, useRef } from 'react';

interface IOpenFormButton {
  children?: React.ReactNode;
  formTitle?: string;
  buttonLabel?: string;
  focusRef?: React.RefObject<any>;
}

export const OpenFormButton: React.FC<IOpenFormButton> = ({
  children,
  focusRef,
  buttonLabel = 'Open Form',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClick = () => {
    if (!isOpen) {
      console.log('Already open, focusing form');
      setIsOpen(true);
      setTimeout(() => focusRef?.current?.focus(), 0);
    } else {
      focusRef?.current?.focus();
    }
  };

  return (
    <>
      <Button onClick={handleClick}>{buttonLabel}</Button>
      {isOpen && <div className="mt-4">{children}</div>}
    </>
  );
};
