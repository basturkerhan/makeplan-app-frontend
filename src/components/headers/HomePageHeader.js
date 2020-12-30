import React from "react"

const HomePageHeader = ({children}) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg header">
                <h1 className="title">makeplan</h1>
            </nav>
            {children}
        </div>
    )
}
export default HomePageHeader