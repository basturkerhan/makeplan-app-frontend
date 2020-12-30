import React, { useState }  from "react"
import { memo }             from "react"
import { Draggable }        from "react-beautiful-dnd"
import { connect }          from "react-redux"
import { openCard }         from "../../actions/cardActions"
import DeleteItemButton     from "../OtherComponents/DeleteItemButton"
import UserProfilePhoto     from "../User/UserProfilePhoto"

const Card = memo( (props, { index, card, listID }) => {
    const [isVisibleDeleteButton, setIsVisibleDeleteButton] = useState(false)
    const { dispatch } = props
    const handleOpenCard = (e) => {
        if (e.target.className.includes("delete-item-button")) {
            return
        }
        dispatch(openCard(props.card))
    }

    const mouseEnter = () => {
        if(!isVisibleDeleteButton)
            setIsVisibleDeleteButton(true)
    }
    const mouseLeave = () => {
        if(isVisibleDeleteButton)
            setIsVisibleDeleteButton(false)
    }

    return (
        <Draggable draggableId={String(props.card._id)} index={props.index} key={props.card._id}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div
                        className="card list-item-card"
                        onClick={handleOpenCard}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}>
                        {
                        props.card.image.length > 0 ? <img src={props.card.image} className="card-img-top" alt={props.card._id}></img> : null
                        }
                        <div className="card-body">
                            {isVisibleDeleteButton && <DeleteItemButton listID={props.listID} cardID={props.card._id} />}
                            {props.card.text}
                        </div>
                        {
                            props.card?.followers ?
                                <div className="card-footer">
                                    {
                                        props.card.followers.map(follower=>(
                                            <li className="followers-item" key={follower._id}>
                                                <UserProfilePhoto firstName={follower.firstName} lastName={follower.lastName} />
                                            </li>
                                        ))
                                    }
                                </div>
                                : null
                        }
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    )
})
export default connect()(Card)