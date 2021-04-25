import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'

import Dashboard from './containers/dashboard'
import Transactions from './containers/transactions'

import './App.css'

const App = props => {
    const routes = (
        <Switch>
            <Route path='/transactions' exact component={Transactions} />
            <Route path='/' exact component={Dashboard} />
            <Redirect to='/' />
        </Switch>
    )
    return <Router>{routes}</Router>
}

export default App
