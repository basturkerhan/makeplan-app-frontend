import React, { useState }  from "react"
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faHistory }        from '@fortawesome/free-solid-svg-icons'
import { client }           from "../../helpers/httpHelpers"
import { loadBoard }        from "../../actions/boardActions"
import { useHistory }       from "react-router-dom"
import DeleteItemButton     from "../OtherComponents/DeleteItemButton"

const BoardList = ({ lastOpened, setNewBoardAreaOpen, board, dispatch }) => {
    const [isVisibleDeleteButton, setIsVisibleDeleteButton] = useState(false)
    let history = useHistory()

    const mouseEnter = () => {
        setIsVisibleDeleteButton(true)
    }
    const mouseLeave = () => {
        setIsVisibleDeleteButton(false)
    }

    const handleClick = (e) => {
        const boardId = e.target.id
        if (!e.target.className.includes("delete-item-button")) {
            client(`boards/${boardId}`)
                .then(response => {
                    if(response.status) {
                        dispatch(loadBoard(response))
                        history.push(`/boards/${boardId}`)
                    }
                })
        }
    }

    return (
        <div className="card board-list">
            <div className="card-header board-list-header">
                <FontAwesomeIcon icon={faHistory} />
                <h2>Tüm Panolarım</h2>
            </div>
            <ul className="board-list">
                {
                    board.map(brd => (
                        <div
                            key={brd._id}
                            className="list-item-container">
                            <li
                                id={brd._id}
                                className="list-item"
                                style={{
                                    backgroundImage: `url("${brd.background}")`
                                }}
                                onClick={handleClick}
                                onMouseEnter={mouseEnter}
                                onMouseLeave={mouseLeave}>
                                {isVisibleDeleteButton && <DeleteItemButton boardID={brd._id} />}
                                {brd.name}
                            </li>
                        </div>
                    ))
                }
                <div className="list-item-container" onClick={() => setNewBoardAreaOpen(true)}>
                    <li className="create-new-list-item">
                        Yeni Pano Yarat
                    </li>
                </div>
            </ul >
        </div>
    )
}
export default BoardList