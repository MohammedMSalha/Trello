import React from 'react';
import ReactDOM from 'react-dom';
import {Switch} from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import {Provider} from 'react-redux';
import {store,persiststore} from './redux/store';
import {connect} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import PrivateRoute from './pages/parts/route/privateRoute';
import PublicRoute from './pages/parts/route/publicRoute';

/**
* This site has 5 pages, all of which are rendered (Dashboard,Home,Register,Login,New Ticket)
* dynamically in the browser (not server rendered).
* @author Mohammed M.Salha
* @date 24/2/2021
*/
function App() {
    // isLoggedIn return true or false (Descripe login status)
    let isLoggedIn = store.getState().Reducer.isLoggedIn;
    return (
        <div>
           <Switch>
                <PrivateRoute isLoggedIn={isLoggedIn} exact path="/dashboard" component={Dashboard} />
                <PublicRoute  isLoggedIn={isLoggedIn} restricted={true}   exact path="/login" component={Login} />
                <PublicRoute  isLoggedIn={isLoggedIn} restricted={true}   exact path="/register" component={Register} />
                <PublicRoute  isLoggedIn={isLoggedIn} restricted={false}   exact path="/" component={Home} />
           </Switch>
        </div>
    );
}

 

export default connect(null)(App);

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persiststore}>
                    <App />
                </PersistGate>
            </BrowserRouter>
           
        </Provider>
    , document.getElementById('app'));
}

 