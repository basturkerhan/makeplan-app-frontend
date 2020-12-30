import React            from "react"
import HomePageHeader   from "../headers/HomePageHeader"
import AuthSection      from "./authsection/AuthSection"
import InfoSection      from "./InfoSection"
import Footer           from "./Footer"
import "./homePageStyle.css"

const HomepageArea = ()=>{
    document.title = `Make Plan Project`
    return(
        <div>
            <HomePageHeader/>
            <AuthSection/>
            <InfoSection/>
            <Footer/>
        </div>
    )
}
export default  HomepageArea