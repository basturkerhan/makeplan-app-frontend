import React, { useState }  from 'react'
import LoginView            from "./LoginView"
import SignupView           from "./SignupView"

function AuthIndex() {
    const [auth, setAuth]        = useState("LOGIN")
    const changeToLogin          = () => setAuth("LOGIN")
    const changeToSignup         = () => setAuth("SIGNUP")
    const changeToForgotPassword = () => setAuth("FORGOTPASSWORD")

    return (
        <div className="text-white">
            {
                auth === "LOGIN" ?
                    <LoginView
                        changeToSignup={changeToSignup} changeToForgotPassword={changeToForgotPassword}
                    /> :
                    <SignupView
                        changeToLogin={changeToLogin}
                    />
            }
        </div>
    )
}

export default AuthIndex