import React                from "react"
import { connect }          from "react-redux"
import { client }           from "../../helpers/httpHelpers"
import {changeBackground}   from "../../actions/currentBoardActions"
import alertify             from "alertifyjs"

const ChangeBackgroundAreaInMenu = (props)=>{

    const handleChangeBackground = (path)=>{
        const {dispatch, currentBoard} = props
        const body = {
            path
        }
        client(`boards/${currentBoard._id}/change-background`, { body })
            .then(response => {
                if (response.status) {
                    dispatch( changeBackground(path) )
                    alertify.success("Pano arkaplanı değiştirildi")
                }
        })
    }

    const getImage = (backgroundName)=>{
        let path = `/images/backgrounds/${backgroundName}.jpg`
        return (
            <div className="card background-image-card" onClick={e=>handleChangeBackground(path)}>
                <img src={path} className="card-img-top" alt={path}></img>
            </div>
        )
    }

    return (
        <div className="mt-5">
            <ul>
                <li>{getImage(1)}</li>
                <li>{getImage(2)}</li>
                <li>{getImage(3)}</li>
                <li>{getImage(4)}</li>
                <li>{getImage(5)}</li>
                <li>{getImage(6)}</li>
                <li>{getImage(7)}</li>
            </ul>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        currentBoard: state.currentBoard
    }
}
export default connect(mapStateToProps)(ChangeBackgroundAreaInMenu);

