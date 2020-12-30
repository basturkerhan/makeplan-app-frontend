import CONSTANTS from "../actions/index"

// ------------------------------------------------------------------------------------
// OPEN_CARD    => On click the card, show the retrieved card's informations
// CLOSE_CARD   => Load initialState
// CHANGE_IMAGE => Change card's image on CardInfo component screen
// ------------------------------------------------------------------------------------

const initialState = {
    isOpen  : false,
    card    : null
}

const cardReducer = (state = initialState, action)=> {
    switch (action.type) {
        case CONSTANTS.OPEN_CARD:
            const newState = {
                isOpen      : true,
                card        : {...action.payload}
            }
            return newState

        case CONSTANTS.CLOSE_CARD:
            return initialState

        case CONSTANTS.CHANGE_IMAGE:
            let ciNewState = {...state}
            ciNewState.card.image = action.payload
            return ciNewState

        case CONSTANTS.ADD_FOLLOWER:
            let newCard = { ...action.payload }
            return {
                ...state,
                card: newCard
            }
        
        case CONSTANTS.REMOVE_FOLLOWER:
            let newRCard = { ...action.payload }
            return {
                ...state,
                card: newRCard
            }

        default:
            return state;
    }
}
export default cardReducer
