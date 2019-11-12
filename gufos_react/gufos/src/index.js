import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Importamos a página categorias
import Categorias from './pages/Categorias/Categorias';
// Importamos a biblioteca react-router-dom
import {Route, BrowserRouter as Router} from 'react-router-dom';

// Router renderiza a Url / Route cria a rota
// Realizar  a criação da rotas
const Rotas = (
    <Router> 
        <div>
            <Route exact path="/" component={App} />
            <Route path="/categorias" component={Categorias} />
        </div>
    </Router>
);

ReactDOM.render(Rotas, document.getElementById('root'));


serviceWorker.unregister();
