import React        from "react"
import AuthIndex    from "./AuthIndex"

const AuthSection = () => {
    return (
        <div className="auth-section">
            <div className="container">
                <div className="row">
                    <div className="col-md auth-section-info">
                        <h2>Makeplan sayesinde ekip arkadaşlarınızla organize olmanız daha kolay!</h2>
                        <p className="lead">Makeplan içinde kullanabileceğiniz panolar sayesinde, ekip arkadaşlarınızla veya kişisel olarak görevleri listelere ve hatta listeler içindeki kartlara ayırabilir, onlardan sorumlu üyeler atayabilir ve bu kartları esnek bir şekilde yönetebilirsiniz.</p>
                    </div>
                    <div className="col-md">
                        <AuthIndex/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AuthSection