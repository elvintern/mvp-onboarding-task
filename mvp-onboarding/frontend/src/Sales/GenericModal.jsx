import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function GenericModal({
  title,
  children,
  show,
  handleClose,
  handleSave,
  saveButtonLabel,
  saveButtonVariant = 'success',
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant={saveButtonVariant} onClick={handleSave}>
          {saveButtonLabel}
          <FontAwesomeIcon className="btn--icon--ml" icon={faCheck} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
