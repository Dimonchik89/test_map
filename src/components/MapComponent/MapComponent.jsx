import React, { useEffect,useRef,useState } from 'react'
import { GoogleMap } from '@react-google-maps/api'
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { createStructuredSelector } from 'reselect';
import { changePosition, selectMarker, markers, actualTag } from '../../store/markersSlice';
import "../../style/map.css"

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const defaultOptions = {
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clickableIcons: false,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    fullscreenControl: false,
}

const MapComponent = ({ isLoaded, handleOpenModal, markers, changePosition, selectMarker, actualTag }) => {
    const [map, setMap] = useState(null)
    const newMarkers = useRef(null)

    const onLoad = React.useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const onClick = (loc) => {
        const lat = loc.latLng.lat();
        const lng = loc.latLng.lng();
        handleOpenModal()
        changePosition({ lat, lng })
    }

    useEffect(() => {
        if(map) {

            if(newMarkers) {
                for(let i = 0; i < newMarkers.current?.length; i++) {
                    newMarkers.current[i]?.setMap(null) 
                }
            }

            newMarkers.current = actualTag ? markers?.map(item => {
                    if(item.tag === actualTag) {
                        return new google.maps.Marker({
                            position: {lat: +item.lat, lng: +item.lng},
                            map: map,
                            icon: `${item.tag.toLowerCase() === "cat" ? "./cat.svg" : item.tag.toLowerCase() === "dog" ? "./dog.svg" : "location.svg"}`,
                            title: item.name
                        })
                    } else {return}
                    }).filter(item => item !== undefined) :
                    markers?.map(item => {
                        return new google.maps.Marker({
                            position: {lat: +item.lat, lng: +item.lng},
                            map: map,
                            icon: `${item.tag.toLowerCase() === "cat" ? "./cat.svg" : item.tag.toLowerCase() === "dog" ? "./dog.svg" : "location.svg"}`,
                            title: item.name
                        })
                    })
        }
    }, [map, actualTag, markers])


    useEffect(() => {
        if(map) {
            window.google.maps.event.addListener(map, 'idle', function() {
                var bounds = map.getBounds(); 
                
                newMarkers.current.forEach(function(marker) {
                    if (bounds.contains(marker.getPosition())) {
                        marker.setMap(map);
                    } else {
                        marker.setMap(null);
                    }

                    google.maps.event.addListener(marker, 'click', function() {
                        const { position } = marker;

                        selectMarker({lat: String(position.lat()), lng: String(position.lng())})
                        handleOpenModal()
                    });
                });
            })


                window.google.maps.event.addListener(map, 'zoom_changed', function() {
                    const zoomLevel = map.getZoom();
                    console.log(zoomLevel);
                    if(zoomLevel >= 14) {
                        for(let i = 0; i < newMarkers.current.length; i++) {
                            newMarkers.current[i].setMap(null)
                        }

                        const data = markers.filter(item => item.tag === 'cat')

                        newMarkers.current = data?.map(item => {
                            return new google.maps.Marker({
                                position: {lat: +item.lat, lng: +item.lng},
                                map: map,
                                icon: `${item.tag.toLowerCase() === "cat" ? "./cat.svg" : item.tag.toLowerCase() === "dog" ? "./dog.svg" : "location.svg"}`,
                                title: item.name
                            })
                        })
                    } else {
                        for(let i = 0; i < newMarkers.current.length; i++) {
                            newMarkers.current[i].setMap(null)
                        }

                        newMarkers.current = markers?.map(item => {
                            return new google.maps.Marker({
                                position: {lat: +item.lat, lng: +item.lng},
                                map: map,
                                icon: `${item.tag.toLowerCase() === "cat" ? "./cat.svg" : item.tag.toLowerCase() === "dog" ? "./dog.svg" : "location.svg"}`,
                                title: item.name
                            })
                        })
                    }
                });
        }
    }, [map])

    return (
        <div className='map-container'>
            {
                isLoaded ? 
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={defaultOptions}
                        onClick={onClick}
                    >
                        {/* {
                            markers.map(({lat, lng}) => <Marker key={nanoid()} lat={+lat} lng={+lng} handleOpenModal={handleOpenModal}/>)
                        } */}
                    </GoogleMap> : null
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    markers,
    actualTag
})

const mapDispathToProps = dispatch => ({
    changePosition: bindActionCreators(changePosition, dispatch),
    selectMarker: bindActionCreators(selectMarker, dispatch)
})

export default connect(mapStateToProps, mapDispathToProps)(MapComponent);