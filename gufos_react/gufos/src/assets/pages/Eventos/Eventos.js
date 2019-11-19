import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';

class Eventos extends Component {
    constructor(props) {

        super(props);

        this.state =  {
                lista : [],// Definimos uma lista vazia inicial
                listaCategorias : [],
                tituloEvento : "",
                dataEvento : "",
                loading : false, // Criando um estado para verificar carregamento                
                erroMsg : ""
            }
    }

    
     // GET - Listar Categorias
    ListarEventos = () => {
        // Habilitado o icone de carregando
        this.setState({ loading : true });

        fetch("http://localhost:5000/api/evento")
            .then(response => response.json())
            .then(data => {
                this.setState({ lista: data });
                console.log(data);
             })
            .catch(error => console.log(error));
        
        // Desabilitada o icone de carregando após dois segundos
        setTimeout(() => {
            this.setState({ loading : false });    
        }, 2300);    
    }

    ListarCategorias = () => {       

        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => {
                this.setState({ listaCategorias: data });
                console.log(data);
             })
            .catch(error => console.log(error));       
    }


    // Antes de carregar nosso Dom
    UNSAFE_componentWillMount() {
        document.title = this.props.titulo_pagina;
        console.log("Carregando...");
    }

    // Utilizamos para poder alterar o input de cadastro
   AtualizaTituloEvento = (input) => {
       this.setState({ tituloEvento: input.target.value });
       console.log(this.state.tituloEvento);
   }

    // Utilizamos para poder alterar o input de cadastro
   AtualizaTituloDataEvento = (input) => {
       this.setState({ dataEvento: input.target.value });
       console.log(this.state.dataEvento);
   }
    
    // Após renderizar o componente
    componentDidMount() {
        console.log("Carregado...");
        this.ListarEventos();
        this.ListarCategorias();
        //console.log(this.state.lista);
    }

    render() {

        let options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false,
            timeZone: 'America/Sao_Paulo' 
        };

        return (
            <div>
                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Eventos</h1>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Evento</th>
                                        <th>Data</th>
                                        <th>Acesso Livre</th>
                                        <th>Tipo do Evento</th>
                                        <th>Localização</th>
                                        <th>Ações</th>
                                    </tr>
                                    {   // Percorrer a lista de categoria
                                        this.state.lista.map(function (evento) {
                                            return (
                                                // Colocamos uma Key pois cada linha em jsx precisa de um Id Unico
                                                <tr key={evento.eventoId}>
                                                    <td>{evento.eventoId}</td>
                                                    <td>{evento.titulo}</td>
                                                    <td>{new Intl.DateTimeFormat('pt-BR', options).format(Date.parse(evento.dataEvento))}</td>                                                   
                                                    <td>{evento.acessoLivre ? "Sim" : "Não"}</td>
                                                    <td>{evento.categoria.titulo}</td>
                                                    <td>{evento.localizacao.endereco}</td>
                                                    <td>
                                                        <button>Alterar</button>
                                                        <button>Excluir</button>
                                                    </td>
                                                </tr>
                                            )
                                        // Usamos para vincular todo o contexto do map
                                        })
                                    }
                                </thead>
                                <tbody id="tabela-lista-corpo"></tbody>
                            </table>
                            
                            {/* Verifica e caso haja uma mensagem de erro ele mostra abaixo da tabela */}
                            { this.state.erroMsg && <div className="text-danger">{this.state.erroMsg}</div> }

                            {/* Verifica seo estado de loanding está como true e mostra o icone de carregando */}
                            { this.state.loading && <i className="fas fa-spinner fa-spin fa-4x blue-text"></i>}

                        </div>
                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
                            <div className="container">
                                <input
                                type="text"
                                id="evento__titulo"
                                placeholder="Título do evento"
                                value={this.state.tituloEvento}
                                onChange={this.AtualizaTituloEvento}
                                />
                                <input 
                                type="text" 
                                id="evento__data" 
                                placeholder="dd/MM/yyyy"
                                value={this.state.dataEvento}
                                onChange={this.AtualizaTituloDataEvento}
                                
                                />
                                <select id="option__acessolivre">
                                    <option value="1">Livre</option>
                                    <option value="0">Restrito</option>
                                </select>
                                <select id="option__tipoevento">
                                    <option value="0" selected disabled>Selecione Tipo do Evento</option>
                                    {   // Percorrer a lista de Eventos
                                        this.state.listaCategorias.map(function (categoria) {
                                            return (
                                                // Colocamos uma Key pois cada linha em jsx precisa de um Id Unico
                                                <option key={categoria.categoriaId} value={categoria.categoriaId}>{categoria.titulo}</option>
                                            )
                                        // Usamos para vincular todo o contexto do map
                                        })
                                    }
                                </select>
                                                          
                            </div>
                            <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                                Cadastrar
                            </button>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Eventos;