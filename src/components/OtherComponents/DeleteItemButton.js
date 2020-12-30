import React            from "react"
import { connect }      from "react-redux"
import { useParams }    from "react-router-dom"
import { client }       from "../../helpers/httpHelpers"
import { removeBoard }  from "../../actions/boardActions"
import { removeCard }   from "../../actions/cardActions"
import { removeList }   from "../../actions/currentBoardActions"
import alertify         from "alertifyjs"
import "./otherComponentStyles.css"

// ------------------------------------------------------------------------------------
// If props.cardID exist, we are using for delete card 
// If props.listID exist, we are using for delete list
// If props.boardID exist, we are using for delete board
// ------------------------------------------------------------------------------------

const DeleteItemButton = (props, { listID, cardID, boardID }) => {
    const params       = useParams()
    const { dispatch } = props

    const handleDelete = (e) => {
        const path = props.cardID  ? `boards/${params.id}/lists/${props.listID}/cards/${e.target.id}/delete`
                   : props.listID  ? `boards/${params.id}/lists/${props.listID}/delete`
                   : props.boardID ? `boards/${props.boardID}/delete`
                   : null

        const dispatchFunction = props.cardID  ? removeCard(e.target.id, props.listID)
                               : props.listID  ? removeList(props.listID)
                               : props.boardID ? removeBoard(props.boardID)
                               : null
        
        client(path)
            .then(response => {
                if (response.status)
                    dispatch(dispatchFunction)
                else alertify.error(response.message)
            })
    }

    return (
        <div
            id={props.cardID || props.listID || props.boardID || params.id}
            className="delete-item-button"
            onMouseDown={handleDelete}>
        </div>
    )
}
export default connect()(DeleteItemButton)