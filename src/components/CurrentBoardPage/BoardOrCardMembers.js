import React                            from "react"
import { connect }                      from "react-redux"
import UserProfilePhoto                 from "../User/UserProfilePhoto"
import ActionButton                     from "./ActionButton"
import { FontAwesomeIcon }              from '@fortawesome/react-fontawesome'
import { faPlus }                       from '@fortawesome/free-solid-svg-icons'
import { client }                       from "../../helpers/httpHelpers"
import { updateCardCurrentBoardScreen } from "../../actions/currentBoardActions"
import { addFollower }                  from "../../actions/cardActions"
import DeleteMemberButton               from "../OtherComponents/DeleteMemberButton"
import alertify                         from "alertifyjs"

//-----------------------------------------------------------------------
// If followers exist, we are using for Card Followers, else we are using for Board Members
// If forCardInfo exist, we are using for follower/member list of CardInfo Component
//-----------------------------------------------------------------------

const BoardOrCardMembers = (props, { followers, forCardInfo }) => {
    const text = props.forCardInfo ? "Kart Sorumluları" : "Pano Üyeleri"
    const { currentBoard, card } = props
    const memberList = props.followers ? card.card.followers : currentBoard.members

    const handleAddFollower = (userID) => {
        const { dispatch } = props
        const body = {
            userID
        }
        client(`cards/${card.card._id}/addfollower`, { body })
            .then(response => {
                if (response.status) {
                    dispatch(updateCardCurrentBoardScreen(response.card))
                    dispatch(addFollower(response.card))
                    alertify.success(`${response.user.firstName} ${response.user.lastName} kişisi kart sorumlusu olarak atandı`)
                    return
                }
                alertify.error(response.message)
            })
    }

    return (
        <div>
            <h2>{text}</h2>
            {props.forCardInfo ? null : <ActionButton member />}
            <ul className="members-list mt-2">
                {
                    memberList.map(member => (
                        <li key={member._id} className="members-item">
                            <UserProfilePhoto firstName={member.firstName} lastName={member.lastName} />
                            {member.firstName} {member.lastName}
                            { 
                            /* delete member from board */
                            !props.forCardInfo && !props.followers && <DeleteMemberButton board={currentBoard} userID={member._id} />
                            }
                            { 
                            /* delete follower from card */
                            props.forCardInfo && props.followers && <DeleteMemberButton deleteFollower cardID={card.card._id} userID={member._id} />
                            }
                            {
                                props.forCardInfo && !props.followers ?
                                    <div className="add-follower" onClick={e => handleAddFollower(member._id)}>
                                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: 4 }} />
                                    </div>
                                    : null
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentBoard: state.currentBoard,
        card        : state.card
    }
}
export default connect(mapStateToProps)(BoardOrCardMembers)