import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

// Import dos components da biblioteca Material Design
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact'; // MDBInput


class Eventos extends Component {
    constructor(props) {

        super(props);

        this.state =  {
                lista : [],// Definimos uma lista vazia inicial
                listaCategorias : [],
                listaLocalizacao : [],

                modal : false,
                editarModal : { // Usamos para armazenar os dados para serem alterados
                    eventoId : "",
                    tituloEvento : "",
                    dataEvento : "",
                    acessoLivre : "",
                    tipoEvento : "",
                    localizacaoEvento : ""
                },

                tituloEvento : "",
                dataEvento : "",
                acessoLivre : "",
                tipoEvento : "Selecione o tipo do evento...",
                localizacaoEvento : "Selecione a localização...",

                loading : false, // Criando um estado para verificar carregamento                
                erroMsg : ""
            }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
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
                    acessoLivre : this.state.acessoLivre === "0" ? false : true,
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

     //  DELETE - Deletar Categoria
     DeletarEvento = (id) => {
        console.log("Excluindo...");
        
        this.setState({ erroMsg : ""});

        fetch(`http://localhost:5000/api/evento/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.ListarEventos();
        })
        .catch(error => {
            console.log(error);
            this.setState({ erroMsg : "Não é possível excluir este evento, verifique se não há presenças confirmadas!"});
        });
    }

     // Acionado quando clicarmos no botão editar para capturar e salvar no state os dados atuais
     AlterarEvento = (evento) => {
       
        this.setState({
            editarModal : {
                eventoId : evento.eventoId,
                tituloEvento : evento.titulo,
                dataEvento : evento.dataEvento,
                acessoLivre : evento.acessoLivre,
                tipoEvento : evento.categoriaId,
                localizacaoEvento : evento.localizacaoId                
            }
        });

        // Abrir Modal
        this.toggle();
    }

    // Utilizamos para atualizar os states dos inputs
    AtualizaEditarModalTitulo = (input) => {

        this.setState({ 
            editarModal : {
            ...this.state.editarModal, [input.target.name] : input.target.value }
        });        
       
    }
    
     // UPDATE - Atualiza a categoria
    SalvarAlteracoes = (event) => {
        // Previne que a pagina seja carregada
        event.preventDefault();

        let id = this.state.editarModal.eventoId;   
       
        let AlteraoEventos = {
            eventoId : this.state.editarModal.eventoId,
            titulo : this.state.editarModal.tituloEvento,
            categoriaId : this.state.editarModal.tipoEvento,
            acessoLivre : this.state.editarModal.acessoLivre === "0" ? false : true,
            dataEvento  : this.state.editarModal.dataEvento,
            localizacaoId : this.state.editarModal.localizacaoEvento
        }

        console.log(AlteraoEventos);

        fetch(`http://localhost:5000/api/evento/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(AlteraoEventos)
        })
        .then(response => response.json())
        .catch(error => console.log(error));
        
        // Atraso na requisição, pois as respostas possuem intervalos muito próximos
        setTimeout(() => {
            this.ListarEventos();                
        }, 500);

        // Fechar Modal
        this.toggle();
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
                <Header/>
                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Eventos</h1>
                        <div className="container" id="conteudoPrincipal-lista">

                            {/* Verifica e caso haja uma mensagem de erro ele mostra abaixo da tabela */}
                            { this.state.erroMsg && <div className="text-danger">{this.state.erroMsg}</div> }

                            {/* Verifica seo estado de loanding está como true e mostra o icone de carregando */}
                            { this.state.loading && <i className="fas fa-spinner fa-spin fa-4x blue-text"></i>}

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
                                                        <MDBBtn gradient="purple" onClick={() => this.AlterarEvento(evento)}>Alterar</MDBBtn>
                                                    </td>
                                                    <td>
                                                        <MDBBtn gradient="peach" onClick={() => this.DeletarEvento(evento.eventoId)}>Excluir</MDBBtn>
                                                    </td>
                                                </tr>
                                            )
                                        // Usamos para vincular todo o contexto do map
                                        }.bind(this))
                                    }
                                </thead>
                                <tbody id="tabela-lista-corpo"></tbody>
                            </table>                           
                           
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
                                    <select id="option__tipoevento" className="browser-default custom-select" name="tipoEvento" onChange={this.AtualizaEstado} value={this.state.tipoEvento}>
                                        {/* <option value="0" selected disabled>Selecione Tipo do Evento</option> */}
                                        <option disabled value="Selecione o tipo do evento...">Selecione o tipo do evento...</option>
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
                                    <select id="option__localizacao" className="browser-default custom-select" name="localizacaoEvento" onChange={this.AtualizaEstado} value={this.state.localizacaoEvento}>
                                        <option value="Selecione a localização..." disabled>Selecione a localização...</option>
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
                     {/* Utilizamos o Modal da biblioteca para fazer o Update */}
                     <MDBContainer>
                        {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
                        {/* Abraçamos os Inputs do container com um form */}
                        <form onSubmit={this.SalvarAlteracoes}>
                            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                            <MDBModalHeader toggle={this.toggle}>Editar - {this.state.editarModal.tituloEvento}</MDBModalHeader>
                                <MDBModalBody>
                                    {/* <MDBInput
                                        label="Categoria"
                                        value={this.state.editarModal.titulo}
                                        onChange={this.AtualizaEditarModalTitulo}
                                    /> */}
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Nome do Evento        
                                    </label>
                                    <input
                                        type="text"
                                        value={this.state.editarModal.tituloEvento}
                                        onChange={this.AtualizaEditarModalTitulo}
                                        name="tituloEvento"
                                        id="defaultFormCardNameEx"
                                        className="form-control"
                                    /><br/>

                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Tipo do Evento        
                                    </label>
                                    <select id="option__tipoevento_modal" className="browser-default custom-select" name="tipoEvento" onChange={this.AtualizaEditarModalTitulo} value={this.state.editarModal.tipoEvento}>
                                        {   // Percorrer a lista de Eventos
                                            this.state.listaCategorias.map(function (categoria) {
                                                return (
                                                    // Colocamos uma Key pois cada linha em jsx precisa de um Id Unico
                                                    <option key={categoria.categoriaId} value={categoria.categoriaId}>{categoria.titulo}</option>
                                                )
                                            // Usamos para vincular todo o contexto do map
                                            })
                                        }
                                    </select><br/><br/>

                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Acesso Livre        
                                    </label>
                                    <select id="option__acessolivre_modal" className="browser-default custom-select" name="acessoLivre" onChange={this.AtualizaEditarModalTitulo} value={this.state.editarModal.acessoLivre}>
                                        <option value="0">Restrito</option>
                                        <option value="1">Livre</option>                                                                            
                                    </select><br/><br/>

                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Data do Evento        
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={this.state.editarModal.dataEvento}
                                        onChange={this.AtualizaEditarModalTitulo}
                                        id="defaultFormCardNameEx"
                                        className="form-control"
                                    /><br/>

                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Localização        
                                    </label>
                                    <select id="option__localizacao_modal" className="browser-default custom-select" name="localizacaoEvento" onChange={this.AtualizaEditarModalTitulo} value={this.state.editarModal.localizacaoEvento}>
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
                                                                     
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                                    {/* Incluimos o type submit para poder enviar os dados do modal */}
                                    <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                        </form>    
                    </MDBContainer>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Eventos;