import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
// Import dos components da biblioteca Material Design
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact'; // MDBInput
// Link vai ser usado no lugar href do html pq ele é mais robusto.
//import {Link} from 'react-router-dom';

class Categorias extends Component {

    constructor(props) {
        // Usado para poder manipular os states que são herdados de Component
        super(props);

        this.state =
            {
                lista: [],// Definimos uma lista vazia inicial
                nome: "", // Recebe o valor do input do form de cadastro
                modal: false,
                editarModal : { // Usamos para armazenar os dados para serem alterados
                    categoriaId : "",
                    titulo : ""
                },
                loading : false, // Criando um estado para verificar carregamento                
                erroMsg : ""
            }
        
        // Damos o bind no caso quando não usamos Arrow Function
        this.CadastrarCategoria = this.CadastrarCategoria.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    // Antes de carregar nosso Dom
    UNSAFE_componentWillMount() {
        document.title = this.props.titulo_pagina;
        console.log("Carregando...");
    }

    // Após renderizar o componente
    componentDidMount() {
        console.log("Carregado...");
        this.ListaAtualizada();
        //console.log(this.state.lista);
    }

    // Quando a uma atualização no componente
    componentDidUpdate() {
        console.log("Atualizando...");
    }

    // Quando sai da página ele mata o componente
    componentWillUnmount() {
        console.log("Saindo.....");
    }

    // GET - Listar Categorias
    ListaAtualizada = () => {
        // Habilitado o icone de carregando
        this.setState({ loading : true });

        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => this.setState({ lista: data }))
            .catch(error => console.log(error));
        
        // Desabilitada o icone de carregando após dois segundos
        setTimeout(() => {
            this.setState({ loading : false });    
        }, 2300);    
    }

    // POST - Cadastrar Categoria
    CadastrarCategoria(event) {
        event.preventDefault(); // Inpede que a página seja carregada
        console.log("Cadastrando");
        console.log(this.state.nome);

        fetch("http://localhost:5000/api/categoria", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ titulo: this.state.nome })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.ListaAtualizada();
            this.setState({ nome: '' })
            document.getElementById("nome-tipo-evento").focus();
            //this.setState( () => ({ lista : this.state.lista}))
        })
        .catch(error => console.log(error));        
    }  

    // Utilizamos para poder alterar o input de cadastro
    AtualizaNome(input) {
        this.setState({ nome: input.target.value });
    }

    //  DELETE - Deletar Categoria
    DeletarCategoria = (id) => {
        console.log("Excluindo...");
        
        this.setState({ erroMsg : ""});

        fetch(`http://localhost:5000/api/categoria/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.ListaAtualizada();
        })
        .catch(error => {
            console.log(error);
            this.setState({ erroMsg : "Não é possível excluir está categoria, verifique se não há eventos que a utilizem!"});
        });
    }

    // Acionado quando clicarmos no botão editar para capturar e salvar no state os dados atuais
    AlterarCategoria = (categoria) => {
        console.log(categoria);

        this.setState({
            editarModal : {
                categoriaId : categoria.categoriaId,
                titulo : categoria.titulo
            }
        });

        // Abrir Modal
        this.toggle();
    }

    // UPDATE - Atualiza a categoria
    SalvarAlteracoes = (event) => {
        // Previne que a pagina seja carregada
        event.preventDefault();

        let id = this.state.editarModal.categoriaId;

        fetch(`http://localhost:5000/api/categoria/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.editarModal)
        })
        .then(response => response.json())
        .catch(error => console.log(error));
        
        // Atraso na requisição, pois as respostas possuem intervalos muito próximos
        setTimeout(() => {
            this.ListaAtualizada();                
        }, 500);

        // Fechar Modal
        this.toggle();
    } 

    // Utilizamos para atualizar os states dos inputs
    AtualizaEditarModalTitulo = (input) => {
        this.setState({editarModal : {
            categoriaId : this.state.editarModal.categoriaId,
            titulo : input.target.value
        }});
    }

    render() {

        let ano = "2018";

        return (
            <div>
                <main className="conteudoPrincipal">
                    {/* <Link to="/">Voltar</Link> */}
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="tabela-lista-corpo">
                                    {   // Percorrer a lista de categoria
                                        this.state.lista.map(function (categoria) {
                                            return (
                                                // Colocamos uma Key pois cada linha em jsx precisa de um Id Unico
                                                <tr key={categoria.categoriaId}>
                                                    <td>{categoria.categoriaId}</td>
                                                    <td>{categoria.titulo}</td>
                                                    <td>
                                                        <button onClick={e => this.AlterarCategoria(categoria)}>Alterar</button>
                                                        <button onClick={e => this.DeletarCategoria(categoria.categoriaId)}>Excluir</button>
                                                    </td>
                                                </tr>
                                            )
                                        // Usamos para vincular todo o contexto do map
                                        }.bind(this))
                                    }
                                </tbody>
                            </table>

                            {/* Verifica e caso haja uma mensagem de erro ele mostra abaixo da tabela */}
                            { this.state.erroMsg && <div className="text-danger">{this.state.erroMsg}</div> }

                            {/* Verifica seo estado de loanding está como true e mostra o icone de carregando */}
                            { this.state.loading && <i className="fas fa-spinner fa-spin fa-4x blue-text"></i>}

                        </div>
                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Tipo de Evento</h2>
                            <form onSubmit={this.CadastrarCategoria}>
                                <div className="container">
                                    <input type="text" id="nome-tipo-evento" placeholder="tipo do evento" value={this.state.nome} onChange={this.AtualizaNome.bind(this)} />
                                    <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">Cadastrar</button>
                                </div>
                            </form>
                            {/* Utilizamos o Modal da biblioteca para fazer o Update */}
                            <MDBContainer>
                                {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
                                {/* Abraçamos os Inputs do container com um form */}
                                <form onSubmit={this.SalvarAlteracoes}>
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                    <MDBModalHeader toggle={this.toggle}>Editar - {this.state.editarModal.titulo}</MDBModalHeader>
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
                                                Categoria        
                                            </label>
                                            <input
                                                type="text"
                                                value={this.state.editarModal.titulo}
                                                onChange={this.AtualizaEditarModalTitulo}
                                                id="defaultFormCardNameEx"
                                                className="form-control"
                                            />                                
                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                                            {/* Incluimos o type submit para poder enviar os dados do modal */}
                                            <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModal>
                                </form>    
                            </MDBContainer>
                        </div>
                    </section>
                </main>
                <Footer ano={ano} />
            </div>
        );
    }
}

export default Categorias;