import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './assets/pages/Home/App';
import * as serviceWorker from './serviceWorker';

// Importamos a página categorias
import Categorias from './assets/pages/Categorias/Categorias';
// Importamos a biblioteca react-router-dom
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
// Caso o usuario acesse alguma url não existente
import NotFound from './assets/pages/NotFound/Notfound';


// Router renderiza a Url / Route cria a rota
// Realizar  a criação da rotas
// Switch serve para quando uma rota não existir cair direto em um route sem path, que será uma página notfound caso seja informada uma url inexistente
const Rotas = (
    <Router> 
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/categorias" component={Categorias}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(Rotas, document.getElementById('root'));


serviceWorker.unregister();
