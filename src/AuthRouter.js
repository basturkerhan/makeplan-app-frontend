import React                                        from "react"
import { BrowserRouter, Redirect, Route, Switch }   from "react-router-dom"
import HomepageArea                                 from "./components/HomePage/HomepageArea"

const AuthRouter = ()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomepageArea} />
                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
    )
}
export default  AuthRouter