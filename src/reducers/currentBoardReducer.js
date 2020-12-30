import CONSTANTS from "../actions/index"

// ------------------------------------------------------------------------------------
// LOAD_BOARD                       => On click the board, load board informations
// ADD_LIST                         => Add list to current board
// REMOVE_LIST                      => Remove list from current board
// ADD_CARD                         => Add card to the list of current board
// REMOVE_CARD                      => Remove card from the list of current board
// DRAG_HAPPENED                    => What happen after the drag event (card drag/list drag)
// ADD_MEMBER                       => Add member to current board
// REMOVE_MEMBER                    => Remove member from current board
// ADD_FOLLOWER_TO_CARD             => Add follower to current board
// REMOVE_FOLLOWER_FROM_CARD        => Remove follower from current board
// UPDATE_CARD_CURRENTBOARD_SCREEN  => Find and update the relevant card for changes in the CardInfo component
// CHANGE_BACKGROUND                => Change board's background
// ------------------------------------------------------------------------------------

const initialState = null;

const currentBoardReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.LOAD_BOARD:
            return {
                ...action.payload,
                backgroundColor: `${action.payload.background}`,
            }

        case CONSTANTS.ADD_LIST:
            // action.payload keeps new list informations
            return {
                ...state,
                lists: [...state.lists, {...action.payload} ]
            }

        case CONSTANTS.REMOVE_LIST:
            // action.payload keeps deleted list's ID
            return {
                ...state,
                lists: state.lists.filter(list=>{
                    if(list._id === action.payload) return false
                    return true
                })
            }

        case CONSTANTS.ADD_CARD:
            const newCard = { ...action.payload.data }
            return {
                ...state,
                lists: state.lists.map(list => {
                    if (list._id === action.payload.listID) {
                        return {
                            ...list,
                            cards: [...list.cards, newCard]
                        }
                    } else {
                        return list
                    }
                })
            }

        case CONSTANTS.REMOVE_CARD:
            const { cardID, listID } = action.payload
            return {
                ...state,
                lists: state.lists.map(list=>{
                    if(list._id === listID){
                        return {
                            ...list,
                            cards: list.cards.filter(card=>{
                                if(card._id === cardID ) return false
                                return true
                            })
                        }
                    }
                    return list
                })
            }

        case CONSTANTS.DRAG_HAPPENED:
            const { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, type } = action.payload
            const newSortableState = { ...state }
            if (type === "list") {
                const list = newSortableState.lists.splice(droppableIndexStart, 1)
                newSortableState.lists.splice(droppableIndexEnd, 0, ...list)
                return newSortableState
            }
            if (droppableIdStart === droppableIdEnd) {
                const list = newSortableState.lists.find(list => list._id === droppableIdStart)
                const card = list.cards.splice(droppableIndexStart, 1)
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }
            if (droppableIdStart !== droppableIdEnd) {
                const startList = newSortableState.lists.find(list => list._id === droppableIdStart)
                const endList = newSortableState.lists.find(list => list._id === droppableIdEnd)
                const card = startList.cards.splice(droppableIndexStart, 1)
                endList.cards.splice(droppableIndexEnd, 0, ...card)
            }
            return newSortableState

        case CONSTANTS.ADD_MEMBER:
            const member = { ...action.payload }
            return {
                ...state,
                members: [...state.members, member]
            }

        case CONSTANTS.REMOVE_MEMBER:
            const deleteMember = { ...action.payload }
            return {
                ...state,
                members:
                    state.members.filter(boardMember => {
                        if (boardMember._id === deleteMember._id) return false
                        return true
                    })
            }


        case CONSTANTS.UPDATE_CARD_CURRENTBOARD_SCREEN:
            const updatedCard           = { ...action.payload }
            const updateCardState       = { ...state }
            const updatedCardOwnerList  = updateCardState.lists.find(list => list._id === updatedCard.ownerList)
            const oldCardIndex          = updatedCardOwnerList.cards.indexOf(updatedCardOwnerList.cards.find(card => card._id === updatedCard._id))
            updatedCardOwnerList.cards.splice(oldCardIndex, 1, updatedCard)
            return updateCardState


        case CONSTANTS.CHANGE_BACKGROUND:
            return {
                ...state,
                backgroundColor: action.payload
            }
        
        default:
            return state
    }
}
export default currentBoardReducer
