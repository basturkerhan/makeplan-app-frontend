import React                from "react"
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faBars }           from '@fortawesome/free-solid-svg-icons'
import CustomInputElement   from "../OtherComponents/CustomInputElement"

const CurrentBoardSecondaryHeader = ({ isMenuOpen, setIsMenuOpen, currentBoardName, dispatch }) => {

    const openOrCloseMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className="secondary-header">
            <CustomInputElement
                dispatch={dispatch}
                board 
                name={currentBoardName}/>
            <div className="menu-right">
                <button
                    className="btn show-menu menu-item"
                    onClick={openOrCloseMenu}>
                    <FontAwesomeIcon icon={faBars} style={{ fontSize: "1.8rem" }} />
                </button>
            </div>
        </div>
    )
}
export default CurrentBoardSecondaryHeader