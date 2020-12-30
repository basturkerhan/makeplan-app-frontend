import CONSTANTS from "./index"

export const loadBoards = (boards)=>{
    return {
        type: CONSTANTS.LOAD_BOARDS,
        payload: boards
    }
}

export const createBoard = (board)=>{
    return {
        type: CONSTANTS.CREATE_BOARD,
        payload: board
    }
}

export const removeBoard = (boardID)=>{
    return {
        type: CONSTANTS.DELETE_BOARD,
        payload: boardID
    }
}

export const loadBoard = (board)=>{
    return {
        type: CONSTANTS.LOAD_BOARD,
        payload: board.data
    }
}