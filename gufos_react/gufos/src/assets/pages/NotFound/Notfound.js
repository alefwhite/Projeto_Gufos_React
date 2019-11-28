import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,  MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from 'mdbreact'; // MDBInput
import Axios from 'axios';
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

            ProdutosPorPagina : [],
            TotalProdutos : 0,
            Quantidade_Por_Pagina: 9,
            Pg : 1,
            QtdPaginas : 0,
            
            TodasOfertas : []
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
       
        
    // Após renderizar o componente
    async componentDidMount() {
      console.log("Carregado...");
      
      await this.ListarProdutosPorPagina();
      await this.ListarProdutos();
      await this.ListarOfertas();

      this.setState({ QtdPaginas : Math.round(this.state.TotalProdutos / this.state.Quantidade_Por_Pagina)});
      console.log("Qtd: ",this.state.QtdPaginas);
           
      
    }

    
    // Quando a uma atualização no componente
    componentDidUpdate() {
      console.log("Atualizando...");
    }
    

   async ListarProdutos() {     
       
     await fetch("http://localhost:5000/api/produto")
            .then(response => response.json())
            .then(data => {
                this.setState({ produtos : data });
                this.setState({TotalProdutos : this.state.produtos.length})
                console.log(data);
                console.log(this.state.TotalProdutos);
             })
            .catch(error => console.log(error));       
    }

    async ListarProdutosPorPagina() {
        let config = {
            headers: {
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin":"*" // Cors
            }
        }

      let pular = (this.state.Pg - 1) * this.state.Quantidade_Por_Pagina;
      let pegar = this.state.Quantidade_Por_Pagina;
      console.log("Pula: ", pular)

     await Axios.get(`http://localhost:5000/api/produto/paginacao/${pular}/${pegar}`,config)
      .then(response => {
        console.log("Axios: ", response.data);
        this.setState({ProdutosPorPagina : response.data});
      })
      .catch(error => {
        console.log(error);
      });

    }

   async ListarOfertas() {
      let config = {
        headers: {
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*" // Cors
        }
       }
              
      await Axios.get("http://localhost:5000/api/oferta", config)
      .then(response => {
        console.log("Ofertas: ", response.data);
        this.setState({TodasOfertas : response.data});
      
      })
      .catch(error => {
        console.log(error);
      });

    }

    VerOfertas = (id) => {
        // Abrir Modal
         console.log("IdDaOfeta: ", id);
         this.toggle();
    }

    VisualizarProduto = (event) => {
        event.preventDefault();
    }

    SetPg = (row) => {
      this.setState({Pg : row})
      console.log("Pagina: ", this.state.Pg);
      setTimeout(() => {
        this.ListarProdutosPorPagina();
      }, 500);
    }

    renderPagina = (row) => {
      return  <MDBPageItem onClick={() => this.SetPg(row)} key={row}>
                <MDBPageNav>
                    {row}
                </MDBPageNav>
              </MDBPageItem>         
    }
     

   
    render(){

      let paginas = [];
      
      for(let i = 0; i < this.state.QtdPaginas; i++) {
        paginas.push(i + 1);
      }

            const data = {
              columns: [
                {
                  label: 'Ações',
                  field: 'Ações',
                  sort: 'asc',
                  width: 150
                },
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
                    Ações : <MDBBtn color="purple" size="sm">Reservar</MDBBtn>, 
                    produto: 'Banana',
                    descrição: 'Nanica',
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
                            this.state.ProdutosPorPagina.map(function(produto){

                                return(
                                    <div className="card_produtos" key={produto.produtoId}>
                                        <img src={produtoImg}/>
                                        <div className="card_btn">
                                            <label>
                                                <button type="submit" className="btn2">{produto.produtoId}</button>
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
                                                                             
                                      paginas.map(this.renderPagina)
                                      
                                    }

                                    {/* <MDBPageItem>
                                        <MDBPageNav>
                                          1
                                        </MDBPageNav>
                                    </MDBPageItem>                                                                 */}
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
                                        scrollX
                                        striped
                                        bordered
                                        small
                                        hover
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