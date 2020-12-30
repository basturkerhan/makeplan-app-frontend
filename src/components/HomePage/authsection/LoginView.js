import React, { useContext, useState }  from 'react'
import { UserContext }                  from "../../../context/UserContext"
import { client }                       from "../../../helpers/httpHelpers"
import { useInput }                     from "../../../hooks/useInput"
import alertify                         from "alertifyjs"
import AuthErrorMessageArea             from './AuthErrorMessageArea'

function LoginView({ changeToSignup }) {
    const [inputs, setInputs]   = useInput({ email: "", password: "" })
    const [error, setError]     = useState(null)
    const { setUser }           = useContext(UserContext)

    const onUserClick = async (e) => {
        e.preventDefault()
        const body = {
            email   : inputs.email,
            password: inputs.password
        }
        try {
            const data          = await client("auth/login", { body })
            const access_token  = data.access_token
            if (!data.status) {
                setError(data.message)
                return
            }
            alertify.success("Başarıyla giriş yapıldı")
            localStorage.setItem("access_token", access_token)
        } catch (err) {
            setError(err.message)
        }
        const user = await client("users/me")
        setUser(user)
    }

    return (
        <div>
            <form onSubmit={onUserClick}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" className="form-control" onChange={setInputs} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Şifre</label>
                    <input name="password" type="password" className="form-control" onChange={setInputs} />
                </div>
                <button type="submit" className="btn btn-success btn-lg btn-block">Giris Yap</button>
            </form>
            <p className="authFooterMsg"
                onClick={changeToSignup}><b>Daha yeni misin? O zaman aramıza katıl</b></p>
            {error ? <AuthErrorMessageArea error={error}/> : null}
        </div>
    )
}
export default LoginView