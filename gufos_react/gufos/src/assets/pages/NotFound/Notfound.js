import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,  MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from 'mdbreact'; // MDBInput

import toastr from 'toastr';
import produtoImg from '../../img/Agrupar51.png';
import './produto.css';

toastr.options = {
    "closeButton": true,
    "debug": false,
    "latestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

class NotFound extends Component {    
    constructor(props) {
        super(props);

        this.state = {
            modal : false,
            produtos : [],
            IdProduto : "",
            TotalProdutos : "",
            ContPaginacao : 1
        }
        
    }
    
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    Teste = () => {
        // Abrir Modal
        this.toggle();
    };

     // Antes de carregar nosso Dom
    UNSAFE_componentWillMount() {
       
    }

    ListarProdutos = () => {     
       
        fetch("http://localhost:5000/api/produto")
            .then(response => response.json())
            .then(data => {
                this.setState({ produtos : data });
                this.setState({TotalProdutos : this.state.produtos.length})
                console.log(data);
             })
            .catch(error => console.log(error));       
    }
    // Após renderizar o componente
    componentDidMount() {
        console.log("Carregado...");
        this.ListarProdutos();      
    }

    VerOfertas = (id) => {
        // Abrir Modal
         console.log(id);
         this.toggle();
    }

    VisualizarProduto = (event) => {
        event.preventDefault();
    }


    render(){
       

            const data = {
              columns: [
                {
                  label: 'Produto',
                  field: 'produto',
                  sort: 'asc',
                  width: 150
                },
                {
                  label: 'Descrição',
                  field: 'descrição',
                  sort: 'asc',
                  width: 270
                },
                {
                  label: 'Cidade',
                  field: 'cidade',
                  sort: 'asc',
                  width: 200
                },
                {
                  label: 'Região',
                  field: 'região',
                  sort: 'asc',
                  width: 100
                },
                {
                  label: 'Quantidade',
                  field: 'quantidade',
                  sort: 'asc',
                  width: 150
                },
                {
                  label: 'Validade',
                  field: 'validade',
                  sort: 'asc',
                  width: 100
                },
                {
                  label: 'Cooperativa',
                  field: 'cooperativa',
                  sort: 'asc',
                  width: 100
                },
                {
                  label: 'Contato',
                  field: 'contato',
                  sort: 'asc',
                  width: 100
                }
              ],
              rows: [
                  {
                    produto: 'Banana',
                    descrição: 'Nanica',
                    cidade : 'São Paulo',
                    região : 'Sul',
                    quantidade : '10Kg',
                    validade : "30/11/2019",
                    cooperativa : "Ribeirão das Frutas",
                    contato : "(11)2236-8987"
                    
                  },
                  {
                    produto: 'Banana',
                    descrição: 'Nanica',
                    cidade : 'São Paulo',
                    região : 'Sul',
                    quantidade : '10Kg',
                    validade : "30/11/2019",
                    cooperativa : "Ribeirão das Frutas",
                    contato : "(11)2236-8987"
                    
                  },
                  {
                    produto: 'Banana',
                    descrição: 'Nanica',
                    cidade : 'São Paulo',
                    região : 'Sul',
                    quantidade : '10Kg',
                    validade : "30/11/2019",
                    cooperativa : "Ribeirão das Frutas",
                    contato : "(11)2236-8987"
                    
                  },
                  {
                    produto: 'Banana',
                    descrição: 'Nanica',
                    cidade : 'São Paulo',
                    região : 'Sul',
                    quantidade : '10Kg',
                    validade : "30/11/2019",
                    cooperativa : "Ribeirão das Frutas",
                    contato : "(11)2236-8987"
                    
                  },
                  {
                    produto: 'Banana',
                    descrição: 'Nanica',
                    cidade : 'São Paulo',
                    região : 'Sul',
                    quantidade : '10Kg',
                    validade : "30/11/2019",
                    cooperativa : "Ribeirão das Frutas",
                    contato : "(11)2236-8987"
                    
                  },
                  {
                    produto: 'Banana',
                    descrição: 'Nanica',
                    cidade : 'São Paulo',
                    região : 'Sul',
                    quantidade : '10Kg',
                    validade : "30/11/2019",
                    cooperativa : "Ribeirão das Frutas",
                    contato : "(11)2236-8987"
                    
                  },
                  {
                    produto: 'Banana',
                    descrição: 'Nanica',
                    cidade : 'São Paulo',
                    região : 'Sul',
                    quantidade : '10Kg',
                    validade : "30/11/2019",
                    cooperativa : "Ribeirão das Frutas",
                    contato : "(11)2236-8987"
                    
                  },
                  {
                    produto: 'Banana',
                    descrição: 'Nanica',
                    cidade : 'São Paulo',
                    região : 'Sul',
                    quantidade : '10Kg',
                    validade : "30/11/2019",
                    cooperativa : "Ribeirão das Frutas",
                    contato : "(11)2236-8987"
                    
                  },
                  {
                    produto: 'Banana',
                    descrição: 'Nanica',
                    cidade : 'São Paulo',
                    região : 'Sul',
                    quantidade : '10Kg',
                    validade : "30/11/2019",
                    cooperativa : "Ribeirão das Frutas",
                    contato : "(11)2236-8987"
                    
                  },
                  {
                    produto: 'Banana',
                    descrição: 'Nanica',
                    cidade : 'São Paulo',
                    região : 'Sul',
                    quantidade : '10Kg',
                    validade : "30/11/2019",
                    cooperativa : "Ribeirão das Frutas",
                    contato : "(11)2236-8987"
                    
                  },
                  {
                    produto: 'Banana',
                    descrição: 'Nanica',
                    cidade : 'São Paulo',
                    região : 'Sul',
                    quantidade : '10Kg',
                    validade : "30/11/2019",
                    cooperativa : "Ribeirão das Frutas",
                    contato : "(11)2236-8987"
                    
                  },
                  {
                    produto: 'Banana',
                    descrição: 'Nanica',
                    cidade : 'São Paulo',
                    região : 'Norte',
                    quantidade : '20Kg',
                    validade : "30/11/2019",
                    cooperativa : "Ribeirão das Cores",
                    contato : "(11)2236-8987"
                    
                  },
                  {
                    produto: 'Banana',
                    descrição: 'Maça',
                    cidade : 'São Paulo',
                    região : 'Sul',
                    quantidade : '10Kg',
                    validade : "30/11/2019",
                    cooperativa : "Ribeirão das Frutas",
                    contato : "(11)2236-8987"
                    
                  }
                  
              ]
        }
    


        return( 
            <div>
                <Header/>
                
                <div className="container_produto">
                    <form id="produtos" className="produtos_todo" onSubmit={this.VisualizarProduto}>
                        {
                            this.state.produtos.map(function(produto){

                                return(
                                    <div className="card_produtos" key={produto.produtoId}>
                                        <img src={produtoImg}/>
                                        <div className="card_btn">
                                            <label>
                                                <button type="submit" className="btn2">Fornecer</button>
                                            </label>
                                            <label>
                                                <button type="submit" className="btn1" onClick={() => this.VerOfertas(produto.produtoId)}>Ver Ofertas</button>
                                            </label>
                                        </div>
                                    </div>
                                )

                            }.bind(this))
                        }
                       
                     </form>   
                     <MDBRow>
                            <MDBCol>
                                <MDBPagination className="mb-5" color="red">
                                <MDBPageItem>
                                    <MDBPageNav aria-label="Previous">
                                    <span aria-hidden="true">Anterior</span>
                                    </MDBPageNav>
                                </MDBPageItem>
                                {
                                   this.state.produtos.map(function() {  

                                        return (
                                            
                                            <MDBPageItem>
                                                <MDBPageNav>
                                                    {this.state.ContPaginacao}
                                                </MDBPageNav>
                                            </MDBPageItem>

                                        );
                                     
                                   }.bind(this))
                                }
                                
                                <MDBPageItem>
                                    <MDBPageNav aria-label="Previous">
                                    <span aria-hidden="true">Próximo</span>
                                    </MDBPageNav>
                                </MDBPageItem>
                                </MDBPagination>
                            </MDBCol>
                    </MDBRow>                    
                </div>


                <button onClick={this.Teste}>Abrir Modal</button>
                    <div className="container">                        
                        <MDBContainer>                           
                            
                            <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="fluid">
                            <MDBModalHeader toggle={this.toggle}>Editar</MDBModalHeader>
                                <MDBModalBody>
                                    <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        data={data}
                                    />
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>                                       
                                    {/* <MDBBtn color="primary" type="submit">Salvar</MDBBtn> */}
                                </MDBModalFooter>
                            </MDBModal>
                            
                        </MDBContainer>
                    </div>
                <Footer/>
            </div>
        );
    }
    
}

export default NotFound;