import { useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api'
import MapComponent from './components/MapComponent/MapComponent'
import ModalComponent from './components/ModalComponent/ModalComponent'
import { useShowModal } from './hooks/useShowModal';
import { bindActionCreators } from '@reduxjs/toolkit';
import { setMarkers } from './store/markersSlice';
import { connect } from 'react-redux';
import './App.css'
import Search from './components/Search/Search';


function App({ setMarkers }) {
  const { open, handleOpen, handleClose } = useShowModal()



  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    language: "uk"
  })

  useEffect(() => {
    const data = localStorage.getItem("markers");
    if(data) {
      const saveMarkers = JSON.parse(data)
      setMarkers(saveMarkers)
    }
  }, [])

  return (
    <div className='app'>
      <Search/>
      <MapComponent 
        isLoaded={isLoaded}
        handleOpenModal={handleOpen}  
      />
      <ModalComponent
        open={open}
        handleClose={handleClose}
      />
    </div>
  )
}

const mapDispathToProps = dispatch => ({
  setMarkers: bindActionCreators(setMarkers, dispatch)
})

export default connect(null, mapDispathToProps)(App)
