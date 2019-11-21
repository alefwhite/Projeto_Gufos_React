import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import '../../css/login.css';
// import iconLogin from '../../img/icon-login.png';
// npm install --save axios
import Axios from 'axios'; 


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email : "",
            senha : ""
        }

    }

    AtualizaEstado = (event) => {
        this.setState({ [event.target.name] : event.target.value})
    }

    RealizarLogin = (event) => {        
        event.preventDefault();

        let config = {
            headers : {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*" // Cors
            }
        }

        Axios.post("http://localhost:5000/api/login",{
            email : this.state.email,
            senha : this.state.senha
        }, config)
        .then(response => {
            console.log("Retorno do Login: ", response)
        })
        .catch(error => {
            console.log("Erro : ", error);
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
                                    <button type="submit" className="btns btn__login" id="btn__login">
                                        Login
                                    </button>
                                </div>
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