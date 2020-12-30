import React from "react"

const AuthErrorMessageArea = ({error="Bilinmeyen bir hata oluştu"})=>{
    return (
        <div className="alert alert-danger">
            {error}
        </div>
    )
}
export default AuthErrorMessageArea