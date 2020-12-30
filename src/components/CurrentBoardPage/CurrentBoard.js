import React                            from "react"
import { connect }                      from "react-redux"
import List                             from "./List"
import ActionButton                     from "./ActionButton"
import { DragDropContext, Droppable }   from "react-beautiful-dnd"
import { sort }                         from "../../actions/currentBoardActions"
import { useParams }                    from "react-router-dom"
import { client }                       from "../../helpers/httpHelpers"

const CurrentBoard = (props) => {
    const { currentBoard } = props
    const params           = useParams()


    const onDragEnd = (result) => {
        const { destination, source, type } = result
        if (!destination) {
            return
        }
        // path: /boards/:board_id/event? src_id & dest_id & src_index & dest_index & type
        client(`boards/${params.id}/event?sourceId=${source.droppableId}&destinationId=${destination.droppableId}&sourceIndex=${source.index}&destinationIndex=${destination.index}&type=${type}`)
        props.dispatch(sort(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            type
        ))
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
                {(provided) => (
                    <div className="board" {...provided.droppableProps} ref={provided.innerRef}>
                        {
                            currentBoard.lists.map((list,index) => (
                                <List listID={list._id} key={list._id} title={list.title} cards={list.cards} index={index}/>
                            ))
                        }
                        <ActionButton list boardId={params.id} />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

const mapStateToProps = state => {
    return {
        currentBoard: state.currentBoard
    }
}
export default connect(mapStateToProps)(CurrentBoard)