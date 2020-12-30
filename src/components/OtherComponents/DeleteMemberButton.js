import React                                            from "react"
import { connect }                                      from "react-redux"
import { client }                                       from "../../helpers/httpHelpers"
import { removeMember, updateCardCurrentBoardScreen }   from "../../actions/currentBoardActions"
import { removeFollower }                               from "../../actions/cardActions"
import alertify                                         from "alertifyjs"

// ------------------------------------------------------------------------------------
// If props.deleteFollower exist, we are using this component for delete card's follower
// If props.deleteFollower doesn't exist, we are using this component for delete board's member
// ------------------------------------------------------------------------------------

const DeleteMemberButton = (props,{deleteFollower, board, userID, cardID})=>{
    const {dispatch} = props

    const handleRemoveMemberOrFollower = ()=>{
        const path = props.deleteFollower ? `cards/${props.cardID}/delete-follower` 
                                          : `boards/${props.board._id}/delete-member`
        const body = {
            userID: props.userID
        }
        client(path, {body})
        .then(response=>{
            if(response.status)
            {
            props.deleteFollower ? dispatch(updateCardCurrentBoardScreen(response.card)) 
                                 : dispatch(removeMember(response.data))

            props.deleteFollower && dispatch(removeFollower(response.card))
            }
            alertify.success(response.message)
        })
    }

    return (
        <div
        className="delete-member-button"
        onMouseDown={handleRemoveMemberOrFollower}>
    </div>
    )
}
export default connect()(DeleteMemberButton)