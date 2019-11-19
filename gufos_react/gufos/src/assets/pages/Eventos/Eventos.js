import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import { MDBBtn } from "mdbreact";

class Eventos extends Component {
    constructor(props) {

        super(props);

        this.state =  {
                lista : [],// Definimos uma lista vazia inicial
                listaCategorias : [],
                listaLocalizacao : [],

                tituloEvento : "",
                dataEvento : "",
                acessoLivre : "",
                tipoEvento : "",
                localizacaoEvento : "",

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

    CadastrarEvento = (event) => {
        event.preventDefault(); // Inpede que a página seja carregada
        console.log("Cadastrando");      

        fetch("http://localhost:5000/api/evento", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {             
                    titulo : this.state.tituloEvento,
                    categoriaId : this.state.tipoEvento,
                    acessoLivre : this.state.acessoLivre ? true : false,
                    dataEvento  : this.state.dataEvento,
                    localizacaoId : this.state.localizacaoEvento
                }
            )
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);

            this.ListarEventos();

            this.setState({ novoEvento : ""});

            document.getElementById("evento__titulo").focus();
            //this.setState( () => ({ lista : this.state.lista}))
        })
        .catch(error => console.log(error));        
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

    ListarLocalizacao = () => {       

        fetch("http://localhost:5000/api/localizacao")
            .then(response => response.json())
            .then(data => {
                this.setState({ listaLocalizacao : data });
                console.log(data);
             })
            .catch(error => console.log(error));       
    }      

    // Atualiza estado generico.
    AtualizaEstado = (event) => {
        this.setState({ [event.target.name] : event.target.value });
    }    
   

    // Antes de carregar nosso Dom
    UNSAFE_componentWillMount() {
        document.title = this.props.titulo_pagina;
        console.log("Carregando...");
    }

    // Após renderizar o componente
    componentDidMount() {
        console.log("Carregado...");
        this.ListarEventos();
        this.ListarCategorias();
        this.ListarLocalizacao();
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
                                        <th colSpan="2">Ações</th>
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
                                                    <td>{evento.categoriaId ? evento.categoria.titulo : "Sem Titulo"}</td>
                                                    <td>{evento.localizacaoId ? evento.localizacao.endereco : "Sem localização" }</td>
                                                    <td>
                                                        <MDBBtn gradient="purple">Alterar</MDBBtn>
                                                    </td>
                                                    <td>
                                                        <MDBBtn gradient="peach">Excluir</MDBBtn>
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
                            <form onSubmit={this.CadastrarEvento}>
                                <div className="container">
                                    <input
                                    type="text"
                                    id="evento__titulo"
                                    placeholder="Título do evento"
                                    value={this.state.tituloEvento}
                                    onChange={this.AtualizaEstado}
                                    name="tituloEvento"
                                    />
                                    <input 
                                    type="datetime-local" 
                                    id="evento__data" 
                                    placeholder="dd/MM/yyyy"
                                    value={this.state.dataEvento}
                                    name="dataEvento"
                                    onChange={this.AtualizaEstado}
                                    
                                    />
                                    <select id="option__acessolivre" className="browser-default custom-select" name="acessoLivre" onChange={this.AtualizaEstado}>
                                        <option value="1">Livre</option>
                                        <option value="0">Restrito</option>
                                    </select>
                                    <select id="option__tipoevento" className="browser-default custom-select" name="tipoEvento" onChange={this.AtualizaEstado}>
                                        {/* <option value="0" selected disabled>Selecione Tipo do Evento</option> */}
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
                                    <select id="option__localizacao" className="browser-default custom-select" name="localizacaoEvento" onChange={this.AtualizaEstado}>
                                        {/* <option value="0" selected disabled>Selecione Tipo do Evento</option> */}
                                        {   // Percorrer a lista de Eventos
                                            this.state.listaLocalizacao.map(function (localizacao) {
                                                return (
                                                    // Colocamos uma Key pois cada linha em jsx precisa de um Id Unico
                                                    <option key={localizacao.localizacaoId} value={localizacao.localizacaoId}>{localizacao.endereco}</option>
                                                )
                                            // Usamos para vincular todo o contexto do map
                                            })
                                        }
                                    </select>
                                    <MDBBtn gradient="blue"  type="submit" className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">Cadastrar</MDBBtn>
                                    {/* <button type="submit" className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                                        Cadastrar
                                    </button> */}
                                </div>
                            </form>                              
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Eventos;