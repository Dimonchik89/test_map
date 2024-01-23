import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    position: {},
    markers: [],
    actualTag: null
}

const markersSlice = createSlice({
    name: "markers",
    initialState,
    reducers: {
        changePosition: (state, action) => {
            state.position = action.payload
        },
        addOneMarker: (state, action) => {
            state.markers.push(action.payload)
        }, 
        setMarkers: (state, action) => {
            state.markers = action.payload;
        },
        selectMarker: (state, action) => {
            state.position = state.markers.find(item => item.lat === action.payload.lat && item.lng === action.payload.lng)
        },
        changeMarker: (state, action) => {
            state.markers = state.markers.map(item => {
                if(item.lat === action.payload.lat && item.lng === action.payload.lng) {
                    return action.payload
                }
                return item;
            })
        },
        changeActualTag: (state, action) => {
            if(action.payload) {
                state.actualTag = action.payload;
            } else {
                state.actualTag = null;
            }
        }
    }
})

const { actions, reducer } = markersSlice;
export const { changePosition, setMarkers, addOneMarker, selectMarker, changeMarker, changeActualTag } = actions;
export default reducer;