import React, { useState }              from "react"
import { FontAwesomeIcon }              from '@fortawesome/react-fontawesome'
import { faTimes, faPlus }              from '@fortawesome/free-solid-svg-icons'
import { connect }                      from "react-redux"
import { closeCard, changeImage }       from "../../actions/cardActions"
import { updateCardCurrentBoardScreen } from "../../actions/currentBoardActions"
import CustomInputElement               from "../OtherComponents/CustomInputElement"
import BoardOrCardMembers               from "./BoardOrCardMembers"
import { uploadImage }                  from "../../helpers/httpHelpers"
import { client }                       from "../../helpers/httpHelpers"
import alertify                         from "alertifyjs"

//-------------------------------------------------------------------------------------
// If you clicked on any card, CardInfo component opens. It includes;
// -change card title
// -change card desc
// -add follower to card
// -remove follower from card
// -change/add card image settings
//-------------------------------------------------------------------------------------

const CardInfo = (props) => {
    const [isShowBoardMembers, setIsShowBoardMembers] = useState(false)
    const { card }      = props.currentCard
    const { dispatch }  = props
    const memberText    = isShowBoardMembers ? "Sorumlulara Geri Dön" : "Sorumlu Ekle"

    const handleCloseCard = () => {
        dispatch(closeCard())
    }

    const onSubmitEvent = (file) => {
        uploadImage(file).then(async (res) => {
            if (!res.error) {
                const body = {
                    path: `https://res.cloudinary.com/dmrfmfmfw/image/upload/${res.public_id}`
                }
                try {
                    const data = await client(`cards/${card._id}/change-image`, { body });
                    if (!data.status) {
                        alertify.error(data.message)
                        return
                    }
                    dispatch(changeImage(data.card.image))
                    dispatch(updateCardCurrentBoardScreen(data.card))
                    alertify.success("Kart fotoğrafı başarıyla eklendi")

                } catch (err) {
                    alertify.error(err.message)
                }
            }
            else {
                // unsupported file type
                alertify.error(res.error.message)
            }
        })
    }

    const onChangeEvent = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            e.target.files[0] && onSubmitEvent(e.target.files[0])
        }
    }

    const style = {
        header: {
            height: 200,
            backgroundImage: card.image.length > 0 ? `url(${card.image})` : `url("/images/backgrounds/4.jpg")`
        }
    }

    return (
        <div className="card-info-area">
            <div className="card-info card">
                <div style={style.header} className="card-img">
                    <input type="file" className="btn btn-light change-img" name="file" onChange={onChangeEvent} />
                </div>
                <div className="exit-button" onClick={handleCloseCard}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <div className="card-body card-info-body">
                    <CustomInputElement
                        card
                        name={card.text}
                        inputForWhat="text"
                        id={card._id}
                        dispatch={props.dispatch}
                    /><hr />

                    <div className="row">
                        <div className="col-md-8">
                            <div className="description">
                                <h2>Açıklama</h2>
                                <CustomInputElement
                                    card
                                    name={card.description}
                                    inputForWhat="description"
                                    id={card._id}
                                    dispatch={props.dispatch}
                                /><hr />
                            </div>
                        </div>
                        <div className="col-md-4">

                            {
                                isShowBoardMembers ? <BoardOrCardMembers forCardInfo /> : <BoardOrCardMembers followers forCardInfo />
                            }

                            <div onClick={e => setIsShowBoardMembers(!isShowBoardMembers)} className="action-button">
                                <p>
                                    {isShowBoardMembers ? null : <FontAwesomeIcon icon={faPlus} style={{ marginRight: 4 }} />}
                                    {memberText}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentCard: state.card
    }
}
export default connect(mapStateToProps)(CardInfo)