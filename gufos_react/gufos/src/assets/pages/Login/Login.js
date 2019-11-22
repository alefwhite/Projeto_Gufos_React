import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import '../../css/login.css';
// import iconLogin from '../../img/icon-login.png';
// npm install --save axios
// import Axios from 'axios'; 
import {parseJWT} from '../../../services/auth';
import api from '../../../services/api';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email : "",
            senha : "",
            erroMensagem : "",
            isLoading : false
        }

    }

    AtualizaEstado = (event) => {
        this.setState({ [event.target.name] : event.target.value})
    }

    RealizarLogin = (event) => {        
        event.preventDefault();

        // Limpa o conteudo do state erroMensagem
        this.setState({ erroMensagem : "" });
        // Define que uma requisição está em andamento
        this.setState({ isLoading : true });

        // let config = {
        //     headers: {
        //         "Content-Type":"application/json",
        //         "Access-Control-Allow-Origin":"*" // Cors
        //     }
        // }

        // Axios.post("http://localhost:5000/api/login",{
        //     email : this.state.email,
        //     senha : this.state.senha
        // }, config)

        api.post("/login", {
            email : this.state.email,
            senha : this.state.senha
        })
        .then(response => {
          // Exibe no console somente o token
           console.log("Token : ", response.data.token);
           
           // Caso a requisição retorne o status code 200 salva o token no local storage
           // E define que a requisição terminou
           if(response.status === 200) {
                localStorage.setItem("usuario-gufos", response.data.token);
                this.setState({ isLoading : false});

                // Define basse64 recebendo o payload do token
                let base64 = localStorage.getItem("usuario-gufos").split('.')[1];
                // Exibe no console o valor de base64
                console.log(base64);

                // Exibe no console o valor do payload convertido para string
                console.log(window.atob(base64));

                // Exibe no console o valor de payload convertido para json
                console.log(JSON.parse(window.atob(base64)));

                // Exibe no console o tipo de usuario logado
                console.log(parseJWT().Role);

                if(parseJWT().Role === "Administrador") {
                    this.props.history.push('/categorias');
                } else {
                    this.props.history.push('/eventos');
                }

               
           }
           
        })
        // Caso ocorram algum erro, define o state erroMensagem como "Email ou senha inválidos"
        // E define que a requisição terminou
        .catch(error => {
            console.log("Erro : ", error);
            this.setState({ erroMensagem : "E-mail ou senha inválidos!" });
            this.setState({ isLoading : false});
        });
    }


    render() {
        return (
            <div>
                <Header/>
                <section className="container flex">
                    <div className="img__login"><div className="img__overlay"></div></div>

                    <div className="item__login">
                        <div className="row">
                            {/* <div className="item">
                                <img src={iconLogin} className="icone__login" alt="teste"/>
                            </div> */}
                            <div className="item" id="item__title">
                                <p className="text__login" id="item__description">
                                    Bem-vindo! Faça login para acessar sua conta.
                                </p>
                            </div>
                            <form onSubmit={this.RealizarLogin}>
                                <div className="item">
                                    <input
                                        className="input__login"
                                        placeholder="username"
                                        type="text"
                                        name="email" // Deve ser igual ao nome da variavel no state para que o atualzia estado funcione
                                        value={this.state.email}
                                        id="login__email"
                                        onChange={this.AtualizaEstado}
                                    />
                                </div>
                                <div className="item">
                                    <input
                                        className="input__login"
                                        placeholder="password"
                                        type="password"
                                        name="senha"
                                        value={this.state.senha}
                                        id="login__password"
                                        onChange={this.AtualizaEstado}
                                    />
                                </div>
                                <div className="item">
                                    <p style={{color:"red"}}>{this.state.erroMensagem}</p>   
                                </div>
                                {   
                                    this.state.isLoading === true &&
                                    <div className="item">
                                        <button type="submit" className="btns btn__login" id="btn__login" disabled>
                                            Loading...
                                        </button>
                                    </div>
                                }
                                {
                                    this.state.isLoading === false &&
                                    <div className="item">
                                        <button type="submit" className="btns btn__login" id="btn__login" >
                                            Login
                                        </button>
                                    </div>
                                }                                
                            </form>
                        </div>
                    </div>
                </section>
                <Footer/>
                {/* 
                    <script>
                        // console.log(document);
                        // id
                        // console.log(document.getElementById("login__email"));
                        // classNamee
                        // console.log(document.getElementsByClassName("input__login"));

                        // var a = 10;
                        // var b = "Texto";

                        // // buscar a referencia do botao
                        // var btnLogin = document.querySelector("#btn__login");

                        // btnLogin.addEventListener("click", function(event) {
                        //   event.preventDefault();
                        //   // console.log("Hello World!");
                        //   console.log(document.querySelector("#login__email").value);
                        // });

                        var inputSenha = document.querySelector("#login__password");

                        inputSenha.addEventListener("keyup", function() {
                            // caso a senha tenha menos do que 6 caracteres, fica vermelho, querido
                            if (inputSenha.value.length < 6) {
                            inputSenha.style.borderBottomColor = "red";
                            } else {
                            inputSenha.style.borderBottomColor = "green";
                            }
                        });
                    </script> 
                */}
                
            </div>
        );
    }
}

export default Login;