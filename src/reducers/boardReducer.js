import CONSTANTS from "../actions/index"

const initialState = []

// ------------------------------------------------------------------------------------
// LOAD_BOARDS  => Retrieves the board list from the API and load
// CREATE_BOARD => Create new board
// DELETE_BOARD => Delete board
// ------------------------------------------------------------------------------------

const boardReducer = (state = initialState, action)=> {
switch (action.type) {
    case CONSTANTS.LOAD_BOARDS:
        return action.payload

    case CONSTANTS.CREATE_BOARD:
        const newBoard = {
            background  : action.payload.background,
            _id         : action.payload._id,
            name        : action.payload.name
        }
        return [...state, newBoard]

    case CONSTANTS.DELETE_BOARD:
        let removeBoardState  = state.filter(board => {
            if(board._id    === action.payload) return false
            return true
        })
        return removeBoardState

    default:
        return state;
}
}
export default boardReducer;