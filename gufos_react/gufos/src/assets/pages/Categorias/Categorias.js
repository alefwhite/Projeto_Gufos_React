import React, {Component} from 'react';
import Footer from '../../components/Footer/Footer';
// Link vai ser usado no lugar href do html pq ele é mais robusto.
import {Link} from 'react-router-dom';

class Categorias extends Component {

    // Antes de carregar nosso Dom
    UNSAFE_componentWillMount() {
        console.log("Carregando...");
    }

    // Após renderizar o component
    componentDidMount() {
        console.log("Carregado...");
    }

    render() {
        return (
            <div>
                <main className="conteudoPrincipal">
                    <Link to="/">Voltar</Link>
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título</th>
                                    </tr>
                                </thead>
                                <tbody id="tabela-lista-corpo"></tbody>
                            </table>
                        </div>
                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Tipo de Evento</h2>
                            <form>
                                <div className="container">
                                    <input type="text" id="nome-tipo-evento" placeholder="tipo do evento"/>
                                    <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">Cadastrar</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </main>
                <Footer/>
            </div>
        );
    }
}

export default Categorias;