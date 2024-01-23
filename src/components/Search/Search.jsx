import React from 'react'
import FormInput from '../Form/FormInput'
import {changeActualTag} from "../../store/markersSlice"
import { bindActionCreators } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import "../../style/search.css"


const Search = ({changeActualTag}) => {

    const handleSubmit = (e) => {
        e.preventDefault()

        const { search } = e.target.elements;
        changeActualTag(search.value.trim())
    }

    return (
        <div className='search'>
            <form
                onSubmit={handleSubmit}
            >
                <FormInput
                    name="search"
                    label="Search"
                />
            </form>
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    changeActualTag: bindActionCreators(changeActualTag, dispatch)
})

export default connect(null, mapDispatchToProps)(Search)