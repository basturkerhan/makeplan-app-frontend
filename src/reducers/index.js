import { combineReducers } from "redux"
import currentBoardReducer from "./currentBoardReducer"
import cardReducer from "./cardReducer"
import boardReducer  from "./boardReducer"

export default combineReducers({
    currentBoard: currentBoardReducer,
    card        : cardReducer,
    board       : boardReducer
})