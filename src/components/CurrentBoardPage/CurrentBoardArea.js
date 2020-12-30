import React, { useState }          from "react"
import CurrentBoardSecondaryHeader  from "../headers/CurrentBoardSecondaryHeader"
import CurrentBoard                 from "./CurrentBoard"
import CurrentBoardMenu             from "./CurrentBoardMenu"
import CardInfo                     from "./CardInfo"
import { connect }                  from "react-redux"
import ApplicationHeader            from "../headers/ApplicationHeader"
import "./currentBoardStyle.css"

const CurrentBoardArea = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { card, currentBoard }      = props
    const styles = {
        allScreen: {
            backgroundImage: `url(${currentBoard.backgroundColor})`
        }
    }
    document.title = `${currentBoard.name} Panosu`

    return (
        <div className="all-page">
            <div className="board-rightmenu card" style={{ display: isMenuOpen ? "block" : "none" }}>
                <CurrentBoardMenu currentBoard={currentBoard} />
            </div>
            <div className="all-screen" style={styles.allScreen}>
                {
                    card.isOpen && <CardInfo />
                }
                <ApplicationHeader />

                <CurrentBoardSecondaryHeader
                    dispatch        ={props.dispatch}
                    currentBoardName={currentBoard.name}
                    currentBoardId  ={currentBoard._id}
                    setIsMenuOpen   ={setIsMenuOpen}
                    isMenuOpen      ={isMenuOpen} />
                    
                <div className="bottom-menu mt-2">
                    <div className="board-area">
                        <CurrentBoard />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        card: state.card,
        currentBoard: state.currentBoard
    }
}

export default connect(mapStateToProps)(CurrentBoardArea)