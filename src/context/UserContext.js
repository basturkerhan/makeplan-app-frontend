import React, { createContext, useState, useEffect }    from "react"
import { client }                                       from "../helpers/httpHelpers"

// ------------------------------------------------------------------------------------
// If access_token exist, that's means user is already logged in
// Go to API and bring user's data
// ------------------------------------------------------------------------------------

export const UserContext        = createContext(null)

export const UserProvider = ({ children }) => {
    const storageUser           = localStorage.getItem("access_token")
    const [isLoad, setIsLoad]   = useState(false)
    const [user, setUser]       = useState(null)

    useEffect(() => {
        const getUser = () => {
            if (!storageUser) {
                setIsLoad(true)
                setUser(null)
                return
            }
            client("users/me")
                .then(response => {
                    setIsLoad(true)
                    setUser(response)
                    return
                })
        }
        getUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, isLoad}}>
            {children}
        </UserContext.Provider>
    )
}