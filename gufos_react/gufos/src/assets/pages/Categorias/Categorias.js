import React, {Component} from 'react';
import Footer from '../../components/Footer/footer';

class Categorias extends Component {

    render() {
        return (
            <div>
                <main className="conteudoPrincipal">
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