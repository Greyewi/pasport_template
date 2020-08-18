import React, { Component } from 'react'
import AdminRoute from './components/routes/admin'
import AuthRoute from './components/routes/auth'
import PersonPage from './components/routes/person-page'
import EventsPage from './components/routes/events-page'
import ClientRoute from './components/routes/client'
import {Route, NavLink} from 'react-router-dom'
import ProtectedRoute from './components/common/protected-route'

class App extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><NavLink to = '/admin' activeStyle = {{color: 'red'}}>admin</NavLink></li>
                    <li><NavLink to = '/people' activeStyle = {{color: 'red'}}>people</NavLink></li>
                    <li><NavLink to = '/events' activeStyle = {{color: 'red'}}>events</NavLink></li>
                </ul>
                <Route path='/auth' component={AuthRoute}/>
                <Route path='/clients' component={ClientRoute}/>
                <ProtectedRoute path='/admin' component={AdminRoute}/>
                <ProtectedRoute path="/people" component={PersonPage}/>
                <ProtectedRoute path="/events" component={EventsPage}/>
            </div>
        )
    }
}

export default App