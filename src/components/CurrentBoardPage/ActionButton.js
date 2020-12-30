import React, { Component }     from 'react'
import TextareaAutosize         from 'react-autosize-textarea'
import { connect }              from 'react-redux'
import { addList, addMember }   from "../../actions/currentBoardActions"
import { addCard }              from "../../actions/cardActions"
import { client }               from "../../helpers/httpHelpers"
import { FontAwesomeIcon }      from '@fortawesome/react-fontawesome'
import { faPlus }               from '@fortawesome/free-solid-svg-icons'
import alertify                 from "alertifyjs"
//------------------------------------------------------------------------------
// ActionButton Component includes what happen when click
// -add new card,
// -add new list,
// -add board member buttons
//------------------------------------------------------------------------------

class ActionButton extends Component {
    state = {
        formOpen: false,
        text: ""
    }

    openForm = () => {
        this.setState({ formOpen: true })
    }

    closeForm = (e) => {
        this.setState({ text: "" })
        this.setState({ formOpen: false })
    }

    handleInputChange = (e) => {
        this.setState({ text: e.target.value })
    }

    handleAddList = (e) => {
        e.preventDefault()
        const { dispatch } = this.props;
        const { text } = this.state
        if (text) {
            const body = {
                title: text
            }
            client(`boards/${this.props.boardId}/createlist`, { body })
                .then(response => {
                    dispatch(addList(response.data))
                    this.closeForm()
                })
        }
        return
    }

    handleAddCard = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const { text } = this.state
        if (text) {
            const body = {
                text
            }
            client(`boards/${this.props.boardId}/lists/${this.props.listID}/createcard`, { body })
                .then(response => {
                    dispatch(addCard(response.data, this.props.listID))
                    this.closeForm()
                })
        }
        return
    }

    handleAddMember = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const { currentBoard } = this.props
        const { text } = this.state
        if (text) {
            const body = {
                email: text
            }
            client(`boards/${currentBoard._id}/invite`, { body })
                .then(response => {
                    if (response.status) {
                        dispatch(addMember(response.data))
                        this.closeForm()
                        alertify.success(`${response.data.firstName} ${response.data.lastName} üyesi panoya eklendi`)
                    }
                    else{
                        alertify.error(response.message)
                    }
                })
        }
        return
    }

    renderAddButton = () => {
        const { list, member } = this.props
        const buttonText = member ? "Yeni üye ekle" : list ? "Yeni bir liste ekle" : "Yeni bir kart ekle"
        const buttonTextOpacity = list || member ? 1 : 0.5
        const buttonTextColor = list ? "white" : "inherit"
        const buttonTextBackground = list ? "rgba(255,255,255,.15)" : "none"
        return (
            <div onClick={this.openForm} className="action-button" style={{
                opacity: buttonTextOpacity,
                color: buttonTextColor,
                backgroundColor: buttonTextBackground
            }}>
                <p><FontAwesomeIcon icon={faPlus} style={{ marginRight: 4 }} />{buttonText}</p>
            </div>
        )
    }

    renderForm = () => {
        const { list, member } = this.props
        const placeholder = member ? "Kullanıcı email adresi..." : list ? "Liste adı giriniz..." : "Kart adı giriniz..."
        const buttonText = member ? "Davet Et" : list ? "Liste Ekle" : "Kart Ekle"
        return (
            <div>
                <div className="card" style={this.styles.card}>
                    <TextareaAutosize
                        placeholder={placeholder}
                        autoFocus
                        onBlur={this.closeForm}
                        onChange={this.handleInputChange}
                        value={this.state.text}
                        style={this.styles.textArea} />
                </div>
                <button
                    onMouseDown={this.props.member ? this.handleAddMember : this.props.list ? this.handleAddList : this.handleAddCard}
                    style={this.styles.button}
                    className="btn btn-block">{buttonText}</button>
            </div>


        )
    }

    styles = {
        card: {
            minWidth: 272,
            padding: 8,
            overflow: "hidden",
            borderRadius: 0
        },
        textArea: {
            resize: "none",
            width: "100%",
            outline: "none",
            border: "none"
        },
        button: {
            borderRadius: 0,
            backgroundColor: "#e55039",
            color: "white",
            textAlign: "center"
        }
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton()
    }
}

const mapStateToProps = (state) => {
    return {
        currentBoard: state.currentBoard
    }
}

export default connect(mapStateToProps)(ActionButton)
