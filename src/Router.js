import React                                        from 'react'
import { BrowserRouter, Switch, Route, Redirect }   from 'react-router-dom'
import ApplicationArea                              from "./components/ApplicationPage/ApplicationArea"
import CurrentBoardArea                             from "./components/CurrentBoardPage/CurrentBoardArea"
function Router() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ApplicationArea} />
                <Route exact path="/boards/:id" component={CurrentBoardArea} />
                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
    )
}
export default Router