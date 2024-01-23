import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Form from '../Form/Form';
import "../../style/modal.css"


const ModalComponent = ({ open, handleClose }) => {

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="modal-wrapper modal__big">
                    <Box className="modal-container">
                        <Form handleClose={handleClose}/>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}


export default ModalComponent;