import { Button } from '@mui/material'
import React, { useState } from 'react'
import ModalInfo from '../ModalInfo/ModalInfo'
import { useShowModal } from '../../hooks/useShowModal'
import { addOneMarker, position, changeMarker } from '../../store/markersSlice'
import { bindActionCreators } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import FormInput from './FormInput'

const Form = ({ position, handleClose, addOneMarker, changeMarker }) => {
    const [modalInfo, setModalInfo] = useState("")
    const { open, handleOpen: handleOpenModal, handleClose: handleCloseModal} = useShowModal()


    const handleSubmit = (e) => {
        e.preventDefault()

        const { latitude, longitude, name, description, tag } = e.target.elements
        const place = {
            lat: latitude.value, 
            lng: longitude.value, 
            name: name.value, 
            description: description.value, 
            tag: tag.value
        }
        try {
            const data = localStorage.getItem("markers")
            if(data) {
                let storageMarkers = JSON.parse(data)
                const includeMarker = storageMarkers?.find(item => item.lat === position.lat && item.lng === position.lng)

                if(includeMarker) {

                    storageMarkers = storageMarkers.map(item => {
                        if(item.lat == includeMarker.lat && item.lng == includeMarker.lng) {
                            return place
                        }
                        return item;
                    })

                    changeMarker(place)
                    localStorage.setItem("markers", JSON.stringify(storageMarkers))
                } else {
                    storageMarkers.push(place)
                    localStorage.setItem("markers", JSON.stringify(storageMarkers))
                }
                
            } else {
                localStorage.setItem("markers", JSON.stringify([place]))
            }

            setModalInfo("success")
            handleOpenModal()

            setTimeout(() => {
                addOneMarker(place)
            }, 2000)
        } catch(error) {
            setModalInfo(error.message)
            handleOpenModal()
        } finally {
            setTimeout(() => {
                handleClose()
            }, 2000)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormInput
                    name='latitude'
                    label="Latitude" 
                    defaultValue={position?.lat}
                />
                <FormInput
                    name='longitude'
                    label="Longitude" 
                    defaultValue={position?.lng}
                />
                <FormInput
                    name='name'
                    label="Name" 
                    defaultValue={position?.name}
                />
                <FormInput
                    name='description'
                    label="Description" 
                    defaultValue={position?.description}
                />
                <FormInput
                    name='tag'
                    label="Tag" 
                    defaultValue={position?.tag}
                />
                <Button type='submit' variant="text">Save</Button>
            </form>
            <ModalInfo 
                title={modalInfo}
                open={open}
                handleClose={handleCloseModal}
            />
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    position
})

const mapDispatchToProps = dispatch => ({
    addOneMarker: bindActionCreators(addOneMarker, dispatch),
    changeMarker: bindActionCreators(changeMarker, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)