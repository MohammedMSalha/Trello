import React from 'react';
import ReactDOM from 'react-dom';
import {Switch,Route,Redirect} from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/home';



/**
* This site has 5 pages, all of which are rendered (Dashboard,Home,Register,Login,New Ticket)
* dynamically in the browser (not server rendered).
* @author Mohammed M.Salha
* @date 24/2/2021
*/
function App() {
    return (
        <div>
           <Switch>
               <Route exact  path="/" component={Home} />
               <Route exact  path="/login" component={Login} />
               <Route exact  path="/register" component={Register} />
           </Switch>
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('app'));
}
