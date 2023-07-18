import React, {forwardRef} from 'react';
import { useModal } from '../../context/Modal';

const OpenModalButton = forwardRef(({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}, modalButtonRef) => {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <button onClick={onClick} ref={modalButtonRef}>{buttonText}</button>
  );
});

export default OpenModalButton;
