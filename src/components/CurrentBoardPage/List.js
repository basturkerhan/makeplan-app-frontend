import React, { useState }      from "react"
import ActionButton             from "./ActionButton"
import Card                     from "./Card"
import { Draggable, Droppable } from "react-beautiful-dnd"
import CustomInputElement       from "../OtherComponents/CustomInputElement"
import DeleteItemButton         from "../OtherComponents/DeleteItemButton"


const List = ({ title, cards, listID, index }) => {
    const [isVisibleDeleteButton, setIsVisibleDeleteButton] = useState(false);

    const mouseEnter = () => {
        setIsVisibleDeleteButton(true)
    }
    const mouseLeave = () => {
        setIsVisibleDeleteButton(false)
    }

    return (
        <Draggable draggableId={String(listID)} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Droppable droppableId={String(listID)} index={index}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="card-container">
                                <div
                                    className="card-area"
                                    onMouseEnter={mouseEnter}
                                    onMouseLeave={mouseLeave}>

                                    <div className="list-header">
                                        <CustomInputElement name={title} id={listID} />
                                        {isVisibleDeleteButton && <DeleteItemButton listID={listID} />}
                                    </div>
                                    {
                                        cards.map((card, index) => (
                                            <Card listID={listID} index={index} key={card._id} card={card} />
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>

                                <div>
                                    <ActionButton listID={listID} />
                                </div>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}
export default List