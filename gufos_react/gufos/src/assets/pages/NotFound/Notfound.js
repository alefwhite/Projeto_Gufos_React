import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,  MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from 'mdbreact'; // MDBInput
import Axios from 'axios';
import toastr from 'toastr';
//import produtoImg from '../../img/produtos/Agrupar49.png';

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
    "timeOut": "10000",
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
            modal13: false,

            produtos : [],
            IdProduto : "",

            ProdutosPorPagina : [],
            TotalProdutos : 0,
            Quantidade_Por_Pagina: 9,
            Pg : 1,
            QtdPaginas : 0,
            
            TodasOfertas : [],
            ListaOferta : [],

            Telefones : [],
            value: 0,
            
            isLoading : false,

            Cooperativa : "",
            IdOferta : ""
        }

    }
    
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleForm = () => {
        this.setState({
            modal13: !this.state.modal13
        });

        if(this.state.modal13 === false) {
            this.setState({value : 0});
        }
    }

     // Antes de carregar nosso Dom
    UNSAFE_componentWillMount() {
       
    }
       
        
    // Após renderizar o componente
    async componentDidMount() {
      console.log("Carregado...");
      
      await this.ListarProdutosPorPagina();
      await this.ListarProdutos();

      this.PegarTelefone();
      
      //await this.ListarOfertas();

      this.setState({ QtdPaginas : Math.ceil(this.state.TotalProdutos / this.state.Quantidade_Por_Pagina)});
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
  
   PegarTelefone = () => {
      let config = {
        headers: {
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*" // Cors
        }
      }
      
     Axios.get(`http://localhost:5000/api/telefone`, config)
      .then(response => {        
        this.setState({Telefones : response.data});   
        console.log("Tel: ", this.state.Telefones);
      })
      .catch(error => {
        console.log(error);
      });     
  }
  
   async VerOfertas(id) {
        // Abrir Modal
         console.log("Id do Produto: ", id);
         this.setState({IdProduto : id});
         await this.ListarOfertas();
        
        let OfertaFiltrada = [];

        let options = {
          year: 'numeric', month: 'numeric', day: 'numeric',         
          hour12: false,
          timeZone: 'America/Sao_Paulo' 
        };
        
        this.state.TodasOfertas.map(async function(oferta){
            console.log("Oferta: ", oferta)
            if(oferta.produtoId === id) {
              let Obj = {} //new Object();

              let Telefone = "";

              this.state.Telefones.forEach(element => {
                    if(element.usuarioId === oferta.usuario.usuarioId) {
                        Telefone = element.telefone1;
                    }
              });

              Obj.ações = <MDBBtn color="purple" size="sm" onClick={() => this.ReservarProduto(oferta.ofertaId, oferta.usuario.nome)}>Reservar</MDBBtn>;
              Obj.produto = oferta.produto.nome;
              Obj.descrição = oferta.descricao;
              Obj.cidade = oferta.cidade;
              Obj.região = oferta.regiao;
              Obj.preço = "R$: " + oferta.preco;
              Obj.quantidade = oferta.quantidade;
              Obj.validade = new Intl.DateTimeFormat('pt-BR', options).format(Date.parse(oferta.validade))
              Obj.cooperativa = oferta.usuario.nome;
              Obj.contato = Telefone;

              OfertaFiltrada.push(Obj);
            }
            
         

         }.bind(this));
        
         this.setState({ListaOferta : OfertaFiltrada});
         
         this.toggle();
    }

    ReservarProduto = (OfertaId, nome) => {
      console.log("IdOferta: ", OfertaId )
      console.log("Nome: ", nome)

      this.setState({Cooperativa : nome});
      this.setState({IdOferta : OfertaId});

      this.toggleForm();      

    }

    ConcluirReserva = () => {
      console.log("Concluir Reserva");
      let config = {
            headers: {
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin":"*" // Cors
            }
        }
        console.log("valor", this.state.value)
        console.log("Id", this.state.IdOferta)

        Axios.post("http://localhost:5000/api/reserva",{
            quantidade : this.state.value,
            ofertaId : this.state.IdOferta

        }, config)
        .then((response) => {
            console.log("Resp: ", response.data);
            if(response.status === 200) {
               toastr.success(`Sua reserva foi feita você tera até 5 dias para entrar em contato com a cooperativa ${this.state.Cooperativa}`, response.data.mensagem)
            }
            
            this.VerOfertas(this.state.IdProduto);
            this.toggle();
            // Fechar Form
            this.toggleForm();

        })
        .catch((erro) => {
          console.log(erro);
          toastr.error("Não foi possível efetuar sua reservar")
        })
    }
    

    VisualizarProduto = (event) => {
        event.preventDefault();
    }

    SetPg = (row) => {
      this.setState({Pg : row})
      console.log("Pagina: ", this.state.Pg);
      setTimeout(() => {
        this.ListarProdutosPorPagina();
      }, 380);
    }

    renderPagina = (row) => {
      return  <MDBPageItem onClick={() => this.SetPg(row)} key={row}>
                <MDBPageNav>
                    {row}
                </MDBPageNav>
              </MDBPageItem>         
    }

    decrease = () => {
      if(this.state.value > 0) {
        this.setState({ value: parseInt(this.state.value - 1 )});
      }
    }
  
    increase = () => {
      this.setState({ value: parseInt(this.state.value + 1) });
    }
    
    AtulizaValueReserva = (input) => {
      this.setState({ value : parseInt(input.target.value)});
    }

   
    render(){

      let paginas = [];
     
      for(let i = 0; i < this.state.QtdPaginas; i++) {      
          paginas.push(i + 1);
      }      

      //console.log("Dentro do Render: ",this.state.ListaOferta);

      const data = {

          columns: [
            {
              label: 'Ações',
              field: 'ações',
              sort: 'asc',
              width: 150
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
              label: 'Preço',
              field: 'preço',
              sort: 'asc',
              width: 150
            },
            {
              label: 'Quantidade Por Kilo',
              field: 'quantidade',
              sort: 'asc',
              width: 150
            },
            {
              label: 'Validade',
              field: 'validade',
              sort: 'asc',
              width: 100
            }           
           
          ],         
          rows : this.state.ListaOferta          
            
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
                                      {/* produto.imagemProduto != null ? produto.imagemProduto : produtoImg                     */}
                                      {/* produto.imagemProduto && this.PegarImagem(produto.imagemProduto)  */}
                                        <img src={produto.imagemProduto && require(`../../img/produtos/${produto.imagemProduto}`)} alt="teste"/>
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
               
                  <div className="container">                        
                      <MDBContainer>                           
                          
                          <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="fluid">
                          <MDBModalHeader toggle={this.toggle}>Ofertas</MDBModalHeader>
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
                      
                      <MDBContainer>                        
                        <MDBModal isOpen={this.state.modal13} toggle={this.toggleForm}>
                          <MDBModalHeader toggle={this.toggle}>Reservar Produto</MDBModalHeader>
                          <MDBModalBody>
                            <div className="centralizar_">

                              <div className="def-number-input number-input">
                                  <label className="label_prod">Quantidade do produto: </label>
                                  <button onClick={this.decrease} className="minus"><i className="fas fa-minus"></i></button>
                                  <input className="quantity centralizar_" name="quantity" value={this.state.value} onChange={this.AtulizaValueReserva}
                                  type="number" />
                                  <button onClick={this.increase} className="plus"><i className="fas fa-plus"></i></button>
                              </div>

                            </div>
                          </MDBModalBody>
                          <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggleForm}>Fechar</MDBBtn>
                            <MDBBtn color="primary" onClick={() => this.ConcluirReserva()}>Concluir Reserva</MDBBtn>
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