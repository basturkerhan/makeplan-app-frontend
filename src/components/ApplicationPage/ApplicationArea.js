import React, { useState,useEffect }    from "react"
import ApplicationHeader                from "../headers/ApplicationHeader"
import BoardList                        from "./BoardList"
import CreateNewBoardArea               from "./CreateNewBoardArea"
import {loadBoards, createBoard}        from "../../actions/boardActions"
import { client }                       from "../../helpers/httpHelpers"
import { connect }                      from "react-redux"
import alertify                         from "alertifyjs"
import "./applicationPageStyle.css"

const ApplicationArea = (props) => {
    const [newBoardAreaOpen, setNewBoardAreaOpen] = useState(false)
    let {board}     = props
    const {dispatch}= props

    useEffect(() => {
        const getBoards = ()=>{
            client("users/me")
                .then(response => {
                    if(response.status)
                        dispatch( loadBoards(response.data.Boards) )
                    else alertify.error(response.message)
                    document.title = `Tüm Panolarım`
                    return
                })
        }
        getBoards()
    }, [])

    return (
        <div>
            {
                newBoardAreaOpen && <CreateNewBoardArea setNewBoardAreaOpen={setNewBoardAreaOpen} createBoard={createBoard} dispatch={dispatch} />
            }
            <div>
                <ApplicationHeader />
                <div className="container mt-4">
                    {board && <BoardList setNewBoardAreaOpen={setNewBoardAreaOpen} board={board} dispatch={dispatch}/>}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state=>{
    return {
        board: state.board
    }
}
export default connect(mapStateToProps)(ApplicationArea)