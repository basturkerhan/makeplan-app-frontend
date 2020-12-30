import React, { useContext, useState }  from "react"
import { UserContext }                  from "../../context/UserContext"
import "./user.css"

// ------------------------------------------------------------------------------------
// If firstname and lastname of user exist, we are using this component for board/card member's photo/follower's photo
// Else, we are using for user's profile image in header 
// ------------------------------------------------------------------------------------

const UserProfilePhoto = ({ firstName, lastName }) => {
    const { user, setUser }                     = useContext(UserContext)
    const [isProfileOpened, setIsProfileOpened] = useState(false)
    const name = firstName && lastName ? `${firstName[0]}${lastName[0]}` 
                                       : `${user.data.firstName[0]}${user.data.lastName[0]}`

    const handleClickSignout = (e) => {
        e.preventDefault()
        localStorage.removeItem("access_token")
        localStorage.removeItem("user")
        setUser(null)
    }


    return (
        <div className="btn-group">
            <button type="button" className="user-btn" onClick={e => setIsProfileOpened(!isProfileOpened)}>
                <div className={firstName && lastName ? "userPhoto" : "profilePhoto"} onClick={e => setIsProfileOpened(!isProfileOpened)}>
                    {name}
                </div>
            </button>
            {
                // if firstname and lastname doesn't exist, don't show signout menu. Else, we are using for profile photo in header and show signout menu
                firstName && lastName ? null :
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-right" 
                    style={{ display: isProfileOpened ? "block" : "none" }}>
                        <button className="dropdown-item" type="button" onClick={e => handleClickSignout(e)}>Çıkış Yap</button>
                    </div>
            }
        </div>
    )
}
export default UserProfilePhoto