import CONSTANTS from "./index"

export const addCard = (data, listID) =>{
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {data,listID}
    }
}
export const removeCard = (cardID, listID) =>{
    return {
        type: CONSTANTS.REMOVE_CARD,
        payload: {cardID,listID}
    }
}
export const changeImage = (path) =>{
    return {
        type: CONSTANTS.CHANGE_IMAGE,
        payload: path
    }
}

export const openCard = (card)=>{
    return {
        type: CONSTANTS.OPEN_CARD,
        payload: card
    }
}
export const closeCard = ()=>{
    return {
        type: CONSTANTS.CLOSE_CARD
    }
}

export const addFollower = (card)=>{
    return {
        type: CONSTANTS.ADD_FOLLOWER,
        payload: card
    }
}

export const removeFollower = (card)=>{
    return {
        type: CONSTANTS.REMOVE_FOLLOWER,
        payload: card
    }
}