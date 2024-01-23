import React from 'react'
import { MarkerF } from '@react-google-maps/api'
import { changePosition, selectMarker } from '../../store/markersSlice'
import { bindActionCreators } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'

const Marker = ({ lat, lng, handleOpenModal, changePosition, selectMarker }) => {

    const onClick = (data) => {
        // console.log("marker", data, lat, lng);
        selectMarker({lat: String(lat), lng: String(lng)})
        handleOpenModal()
    }

    return (
        <MarkerF 
            onClick={onClick}
            position={{ lat, lng }}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    changePosition: bindActionCreators(changePosition, dispatch),
    selectMarker: bindActionCreators(selectMarker, dispatch)
})

export default connect(null, mapDispatchToProps)(Marker)