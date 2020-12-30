import CONSTANTS from "./index"

export const addList = (data) => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: data
    }
}

export const removeList = (listID) =>{
    return {
        type: CONSTANTS.REMOVE_LIST,
        payload: listID
    }
}

export const addMember = (member)=>{
    return {
        type: CONSTANTS.ADD_MEMBER,
        payload: member
    }
}

export const removeMember = (member)=>{
    return {
        type: CONSTANTS.REMOVE_MEMBER,
        payload: member
    }
}

export const updateCardCurrentBoardScreen = (card)=> {
    return {
        type: CONSTANTS.UPDATE_CARD_CURRENTBOARD_SCREEN,
        payload: card
    }
}

export const changeBackground = (path)=>{
    return {
        type: CONSTANTS.CHANGE_BACKGROUND,
        payload: path
    }
}

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    type
) => {
    return {
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            type
        }
    }
}