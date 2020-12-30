import React,{useState}     from 'react'
import { client }           from "../../../helpers/httpHelpers"
import { useInput }         from "../../../hooks/useInput"
import alertify             from "alertifyjs"
import AuthErrorMessageArea from './AuthErrorMessageArea'

function SignupView({ changeToLogin }) {
    const [inputs, setInputs]   = useInput({ firstName: "", lastName: "", email: "", password: "", repassword: "" })
    const [error, setError]     = useState(null)

    const onUserClick = async (e) => {
        e.preventDefault()
        let {firstName, lastName, email, password, repassword} = inputs
        if (firstName === "" || lastName === "" || email === "" || password === "" || repassword === "") {
            setError("Lütfen tüm alanları doldurunuz")
            return
        }
        if (repassword !== password) {
            setError("Şifre alanları birbiriyle aynı olmalıdır")
            return
        }
        const body = {
            firstName,
            lastName,
            email,
            password
        }
        try {
            const data = await client("auth/register", { body })
            if (!data.status) {
                setError(data.message)
                return
            }
            alertify.success("Kayıt işleminiz başarıyla tamamlandı")
            changeToLogin()
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <form onSubmit={onUserClick}>
                <label htmlFor="name-surname">İsim - Soyisim</label>
                <div className="row form-group">
                    <div className="col">
                        <input name="firstName" onChange={setInputs} type="text" className="form-control" placeholder="İsim" />
                    </div>
                    <div className="col">
                        <input name="lastName" onChange={setInputs} type="text" className="form-control" placeholder="Soyisim" />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input name="email" onChange={setInputs} type="email" className="form-control" placeholder="Email adresi" />
                </div>
                <label htmlFor="exampleInputEmail1">Şifre</label>
                <div className="row form-group">
                    <div className="col">
                        <input name="password" onChange={setInputs} type="password" className="form-control" placeholder="Şifre" />
                    </div>
                    <div className="col">
                        <input name="repassword" onChange={setInputs} type="password" className="form-control" placeholder="Şifre Tekrarı" />
                    </div>
                </div>
                <button type="submit" className="btn btn-success btn-lg btn-block">Kayıt Ol</button>
            </form>
            <p className="authFooterMsg"
                onClick={changeToLogin}><b>Zaten üye misin? O zaman giriş yap</b></p>
            {error ? <AuthErrorMessageArea error={error}/> : null}
        </div>
    )
}
export default SignupView