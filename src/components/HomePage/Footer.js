import React from "react"
const Footer = () => {

    const handleScrollUp = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="homepage-footer-section">
            <div className="container pt-5">
                <div className="row">
                    <div className="col-md-4 text-area">
                        <h3>Plan Yapmaya Hemen Başlayın</h3>
                        <p className="lead">Şimdi kaydolun ve hemen ekibinizle veya kişisel olarak bir pano oluşturun. Panonuza listeler ve kartlar ekleyin, bunları kontrol ederek işlerinizi kolay ve esnek bir şekilde planlayın.</p>
                        <button className="btn btn-block" onClick={handleScrollUp}>Kayıt Ol</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer