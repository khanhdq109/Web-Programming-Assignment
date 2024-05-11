import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const CustomModal = (
    {
        show = false,
        title = 'Modal title',
        body = 'Body',
        cancelText = 'Huỷ',
        confirmText = 'Xác nhận',
        handleConfirm,
        handleCancel
    }) => {
    return (
        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {body}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleCancel} variant="secondary">{cancelText}</Button>
                <Button onClick={handleConfirm} variant="primary">{confirmText}</Button>
            </Modal.Footer>
        </Modal>
    )
}
