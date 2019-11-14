import React, {Component} from 'react';
import Footer from '../../components/Footer/Footer';
// Link vai ser usado no lugar href do html pq ele é mais robusto.
import {Link} from 'react-router-dom';

class Categorias extends Component {

    constructor(props) {
        super(props);

        this.state =
        {
            lista : [
                {idCategoria : 1, titulo : "Show"},
                {idCategoria : 2, titulo : "Meetup"},
                {idCategoria : 3, titulo : "Hackathon"},
                {idCategoria : 4, titulo : "WorkShop"},
            ]
        }


    }

    // Antes de carregar nosso Dom
    UNSAFE_componentWillMount() {
        document.title = this.props.titulo_pagina;
        console.log("Carregando...");
    }

    // Após renderizar o componente
    componentDidMount() {
        console.log("Carregado...");
        console.log(this.state.lista);
    }

    // Quando a uma atualização no componente
    componentDidUpdate() {
        console.log("Atualizando...");
    }

    // Quando sai da página ele mata o componente
    componentWillUnmount() {
        console.log("Saindo.....");
    }

    

    render() {

        let ano = "2018";

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
                                <tbody id="tabela-lista-corpo">
                                    {
                                        this.state.lista.map(function(categoria){
                                            return (
                                                <tr key={categoria.idCategoria}>
                                                    <td>{categoria.idCategoria}</td>
                                                    <td>{categoria.titulo}</td>       
                                                </tr>    
                                            )
                                        })
                                    }
                                </tbody>
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
                <Footer ano={ano}/>
            </div>
        );
    }
}

export default Categorias;