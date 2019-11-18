import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput} from 'mdbreact';
// Link vai ser usado no lugar href do html pq ele é mais robusto.
//import {Link} from 'react-router-dom';

class Categorias extends Component {

    constructor(props) {
        super(props);

        this.state =
            {
                lista: [],
                nome: "",
                modal: false,
                editarModal : {
                    categoriaId : "",
                    titulo : ""
                }
            }

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

    ListaAtualizada = () => {
        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => this.setState({ lista: data }))
            .catch(error => console.log(error));
    }

    CadastrarCategoria(event) {
        event.preventDefault();
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

    DeletarCategoria = (id) => {
        console.log("Excluindo...");

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
            .catch(error => console.log(error));
    }

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

    AtualizaNome(input) {
        this.setState({ nome: input.target.value });
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
                                    {
                                        this.state.lista.map(function (categoria) {
                                            return (
                                                <tr key={categoria.categoriaId}>
                                                    <td>{categoria.categoriaId}</td>
                                                    <td>{categoria.titulo}</td>
                                                    <td>
                                                        <button onClick={e => this.AlterarCategoria(categoria)}>Alterar</button>
                                                        <button onClick={e => this.DeletarCategoria(categoria.categoriaId)}>Excluir</button>
                                                    </td>
                                                </tr>
                                            )
                                        }.bind(this))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Tipo de Evento</h2>
                            <form onSubmit={this.CadastrarCategoria}>
                                <div className="container">
                                    <input type="text" id="nome-tipo-evento" placeholder="tipo do evento" value={this.state.nome} onChange={this.AtualizaNome.bind(this)} />
                                    <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">Cadastrar</button>
                                </div>
                            </form>
                            <MDBContainer>
                                {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
                                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                <MDBModalHeader toggle={this.toggle}>Editar - {this.state.editarModal.titulo}</MDBModalHeader>
                                    <MDBModalBody>
                                        (...)
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                                        <MDBBtn color="primary">Salvar</MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>
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