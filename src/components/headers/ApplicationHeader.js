import React                from "react"
import UserProfilePhoto     from "../User/UserProfilePhoto"
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faColumns }        from '@fortawesome/free-solid-svg-icons'
import { useHistory }       from "react-router-dom"

const ApplicationHeader = () => {
    const history = useHistory()

    const goMainPage = ()=>{
        history.push("/")
    }

    return (
        <nav className="navbar application-header">
            <h1 className="title" onClick={goMainPage}> <FontAwesomeIcon icon={faColumns} style={{fontSize:"1.7rem", marginRight:"0.4rem"}}/>makeplan</h1>
            <div className="right-area">
                <UserProfilePhoto />
            </div>
        </nav>)
}
export default ApplicationHeader