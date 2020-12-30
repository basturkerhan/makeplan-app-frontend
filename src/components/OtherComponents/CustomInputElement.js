import React, { useState }              from "react"
import { client }                       from "../../helpers/httpHelpers"
import { useParams }                    from "react-router-dom"
import { updateCardCurrentBoardScreen } from "../../actions/currentBoardActions"
import alertify                         from "alertifyjs"
import "./otherComponentStyles.css"

// ------------------------------------------------------------------------------------
// If board exist, we are using for board name area. 
// Else, if card exist, we are using for card name area. Also if card option exist, we have to another option named inputForWhat. If inputForWhat equals to "text", we are using for card's name, else we are using for card's description.
// If both don't exist, we are using for list's name area.
// ------------------------------------------------------------------------------------

const CustomInputElement = ({ board, card, name, id, inputForWhat, dispatch }) => {
    const [inputName, setInputName] = useState(name)
    const params                    = useParams()

    const openForm = (e) => {
        e.target.value      = ""
        e.target.className += " active-text-area"
    }
    const closeForm = (e) => {
        e.target.className   = e.target.className.split(" active-text-area")[0]
        if (e.target.value === "") {
            e.target.value   = inputName
            return
        }
        let path = card  ? `cards/${id}/update` 
                 : board ? `boards/${params.id}/rename` 
                         : `boards/${params.id}/lists/${id}/rename`

        const body = card  ? inputForWhat === "text" ? { text: inputName } : { description: inputName } 
                   : board ? { name: inputName } 
                           : { title: inputName }

        client(path, { body })
            .then(response => {
                if (response.status) {
                    if (card) {
                        dispatch(updateCardCurrentBoardScreen(response.data))
                    }
                return
                }
                setInputName(name)
                alertify.error("Sadece pano sahibi pano ismini güncelleyebilir")
            })
    }

    const handleRenameEvent = (e) => {
        setInputName(e.target.value)
    }

    const renderInput = () => {
        const classname = card  ? inputForWhat === "text" ? "card-text-area-header" : "card-text-area" 
                        : board ? "board-text-area" : "list-text-area"
        return (
            <div className="board-name mb-2">
                <input
                    type="text"
                    value={inputName}
                    onFocus={openForm}
                    onChange={handleRenameEvent}
                    onBlur={closeForm}
                    className={classname} />
            </div>
        )
    }
    return renderInput()
}
export default CustomInputElement