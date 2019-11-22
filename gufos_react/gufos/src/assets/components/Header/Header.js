import React, {Component} from 'react';
import Logo from '../../img/icon-login.png'
import "../../css/cabecalho.css";
import {Link, withRouter} from 'react-router-dom';
import { usuarioAutenticado, parseJWT} from '../../../services/auth';


class Header extends Component{
  
    logout = () => {
        // Remove o token do localStorage
        localStorage.removeItem("usuario-gufos");

        // Redireciona para o endereço "/"
        this.props.history.push("/");
    }

    render() {
        return (
            <header className="cabecalhoPrincipal">
                <div className="container">
                    <img src={Logo} alt="Logo do Gufos"/>

                    <nav className="cabecalhoPrincipal-nav">
                        <Link to="/">Home</Link>

                        {
                            usuarioAutenticado() && parseJWT().Role === "Administrador" ?
                            (// Se o usuario for administrador
                                <>                                                                  
                                    <Link to="/categorias">Categorias</Link>
                                    <a onClick={this.logout}>Sair</a>
                                </>
                            )
                            :
                            (
                                usuarioAutenticado() && parseJWT().Role === "Aluno" ? 
                                (
                                    // Se o usuario for aluno
                                    <>                                                                    
                                        <Link to="/eventos">Eventos</Link>
                                        <a onClick={this.logout}>Sair</a>                                        
                                    </>    
                                )
                                :
                                (   // Se o usuario não estiver logado
                                    <>
                                        <Link to="/login" className="cabecalhoPrincipal-nav-login">Login</Link>                                        
                                    </>
                                )
                            )
                        }
                        {/* <Link to="/">Home</Link>
                        <Link to="/eventos">Eventos</Link>
                        <Link to="/categorias">Categorias</Link>
                        <Link to="/login" className="cabecalhoPrincipal-nav-login">Login</Link> */}
                    </nav>
                </div>
            </header>

        )
    }
}

export default withRouter(Header); // Conserta erros de redirecionamento

 
