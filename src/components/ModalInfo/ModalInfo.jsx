import { Box, Modal, Typography } from '@mui/material'
import React from 'react'
import "../../style/modal.css"

const ModalInfo = ({ title, open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={`modal-wrapper modal__info ${title === 'success' ? 'bg__success' : 'bg__error'}`}>
                <Box className="modal-container">
                    <Typography
                        variant='span'
                        component="span"
                        className='modal__title'
                    >
                        {title}
                    </Typography>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalInfo