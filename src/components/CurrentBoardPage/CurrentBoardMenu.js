import React, { useState }          from "react"
import BoardOrCardMembers           from "./BoardOrCardMembers"
import ChangeBackgroundAreaInMenu   from "./ChangeBackgroundAreaInMenu"
import { client }                   from "../../helpers/httpHelpers" 
import { useHistory }               from "react-router-dom"

const CurrentBoardMenu = ({ currentBoard }) => {
    let [showChangeBackgroundArea, setShowChangeBackgroundArea] = useState(false)
    let history = useHistory()

    const unfollowBoardEvent = (e)=>{
        e.preventDefault()
        const path = `boards/${currentBoard._id}/unfollow`
        client(path)
        .then(response=>{
            if(response.status) {
                history.push(`/`)
            }
        })
    }

    const boardMenuComponent = () => {
        return (
            <div>
                {currentBoard.description && <div className="mt-5">
                <h2>Pano Açıklaması</h2>
                <p>{currentBoard.description}</p>
            </div>}
                <div className="members mt-5">
                    <BoardOrCardMembers />
                </div>
                <div className="unfollow-board">
                    <button className="btn" onClick={(e)=>unfollowBoardEvent(e)}>Panodan Çık</button>
                </div>
                <div className="events mt-5">
                    <h2>Son Etkinlikler</h2><hr />
                    <ul className="activities-list">
                        {
                            currentBoard.lastActivities.map((activity, index) => (
                                <li className="card p-2 activity-item" key={index}>
                                    <p className="activity-item-body">
                                        {activity.notificationOwnerFirstName} {activity.notificationOwnerLastName} tarafından {activity.notificationText}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className="current-board-menu">
            <h1>Menü</h1><hr />
            <button 
                type="button" 
                className="btn btn-light btn-block"
                onClick={e => setShowChangeBackgroundArea(!showChangeBackgroundArea)}
                >{showChangeBackgroundArea ? "Menüye Dön" : "Arkaplanı Değiştir"}
            </button>
                {showChangeBackgroundArea ? <ChangeBackgroundAreaInMenu /> : boardMenuComponent()}
        </div>
    )
}
export default CurrentBoardMenu