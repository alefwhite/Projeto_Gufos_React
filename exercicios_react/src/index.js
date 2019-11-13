import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './assets/pages/Home/App';
import * as serviceWorker from './serviceWorker';
import NotFound from './assets/pages/NotFound/Notfound';
import Produtos from './assets/pages/Produtos/Produtos';
import QuemSomos from './assets/pages/QuemSomos/Quemsomos';

import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'; 

const Rotas = (
    <Router> 
        <div>
            <Switch>
                <Route exact path="/" component={App}/>              
                <Route path="/produtos" component={Produtos}/>                              
                <Route path="/quemsomos" component={QuemSomos}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>

);

ReactDOM.render(Rotas, document.getElementById('root'));

serviceWorker.unregister();
