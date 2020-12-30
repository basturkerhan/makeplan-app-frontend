import React from "react"

const InfoSection = () => {
    return (
        <div className="info-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src="/images/organization.png" className="img-fluid" alt="organization-section"/>
                    </div>
                    <div className="col-md-6 info-section-info">
                        <h2>Kendi takımınızı oluşturun!</h2>
                        <p className="lead">Makeplan içinde oluşturduğunuz panolara takım arkadaşlarınızı ekleyin ve görevlerinizi aranızda paylaştırıp panonuzu beraber yönetin.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InfoSection