import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,  MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from 'mdbreact'; // MDBInput
import Axios from 'axios';
import toastr from 'toastr';
//import produtoImg from '../../img/produtos/Agrupar49.png';
import Contato from '../../components/contato/contato';
import './produto.css';


// toastr.options = {
//     "closeButton": true,
//     "debug": false,
//     "latestOnTop": false,
//     "progressBar": false,
//     "positionClass": "toast-top-right",
//     "preventDuplicates": false,
//     "onclick": null,
//     "showDuration": "3000",
//     "hideDuration": "10000",
//     "timeOut": "20000",
//     "extendedTimeOut": "1000",
//     "showEasing": "swing",
//     "hideEasing": "linear",
//     "showMethod": "fadeIn",
//     "hideMethod": "fadeOut"
// }

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "3000",
  "hideDuration": "10000",
  "timeOut": "15000",
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
            IdOferta : "",

            contato : {
              telefone : "",
              dados  : ""
            },
            
            ProdutoNome : "",

            filtrarOferta : {
              cidade : "Selecionar cidade",
              regiao : "Selecionar região",
              validade : "Selecionar validade"
            }
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

              // Obj.ações = <MDBBtn color="purple" size="sm" onClick={() => this.ReservarProduto(oferta, Telefone)}>Reservar</MDBBtn>;
              Obj.ações = <button className="btns1" onClick={() => this.ReservarProduto(oferta, Telefone)}>Reservar</button>;
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

    ReservarProduto = (Oferta, Telefone) => {
      console.log("IdOferta: ", Oferta.ofertaId )
      console.log("Nome: ", Oferta.usuario.nome)

      this.setState({Cooperativa : Oferta.usuario.nome});
      this.setState({IdOferta : Oferta.ofertaId});
      this.setState({contato : {
        telefone : Telefone,
        dados : Oferta
      }})
      this.setState({ProdutoNome : Oferta.produto.nome})
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
        if(this.state.value > 0) {
            Axios.post("http://localhost:5000/api/reserva",{
                quantidade : this.state.value,
                ofertaId : this.state.IdOferta
    
            }, config)
            .then((response) => {
                console.log("Resp: ", response.data);
                if(response.status === 200) {
                  toastr.success(`Sua reserva foi feita você tera até 5 dias para entrar em contato com a cooperativa ${this.state.Cooperativa}.`, response.data.mensagem)
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
        else {
          toastr.info("A quantidade não foi informada.", "Atenção!");
        }
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
      if(row === this.state.Pg){
        return  <MDBPageItem onClick={() => this.SetPg(row)} key={row} active>
                  <MDBPageNav>
                      {row}
                  </MDBPageNav>
                </MDBPageItem>  
         
      } else {
        return  <MDBPageItem onClick={() => this.SetPg(row)} key={row}>
                  <MDBPageNav>
                      {row}
                  </MDBPageNav>
                </MDBPageItem>         

      }


    }

    decrease = () => {
      if(this.state.value > 0) {
        this.setState({ value: parseFloat(this.state.value - 1 )});
      }
    }
  
    increase = () => {
      this.setState({ value: parseFloat(this.state.value + 1) });
    }
    
    AtulizaValueReserva = (input) => {
      this.setState({ value : parseFloat(input.target.value)});
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
                    <form method="get" id="formde_busca" className="espaço_busca">
                      <label>
                          <input input type="text" placeholder="Digite o produto..." className="form_busca"
                              aria-label="buscar produto"/>
                      </label>

                    </form>

                    <form method="GET" id="formde_filtro" className="filtro">
                        <select name="cidade" value={this.state.filtrarOferta.cidade}>
                            <option value="Selecionar cidade" disabled>Selecionar cidade</option>
                            <option value="São Paulo">São Paulo</option>                            
                        </select>
                        <select name="regiao" value={this.state.filtrarOferta.regiao}>
                            <option value="Selecionar região" disabled>Selecionar região</option>
                            <option value="norte">Região Norte</option>
                            <option value="sul">Região Sul</option>
                            <option value="leste">Região Leste</option>
                            <option value="oeste">Região Oeste</option>
                            <option value="central">Região Central</option>
                        </select>
                        <select name="validade" value={this.state.filtrarOferta.validade}>
                            <option value="Selecionar validade" disabled>Selecionar validade</option>
                            <option value={5}>Até 5 dias</option>
                            <option value={10}>Até 10 dias</option>
                            <option value={15}>Até 15 dias</option>
                            <option value={20}>Até 20 dias</option>
                        </select>
                        <label>
                            <button type="submit" className="btns">Filtrar</button>
                        </label>
                      </form>

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
                     <MDBRow className="mdbRow">
                            <MDBCol>
                                <MDBPagination className="mb-5" color="red" >
                                <MDBPageItem onClick={() => this.SetPg(1)}>
                                    <MDBPageNav aria-label="Previous">
                                      <span aria-hidden="true" >Primeira</span>
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
                                <MDBPageItem onClick={() => this.SetPg(this.state.QtdPaginas)}>
                                    <MDBPageNav aria-label="Previous">
                                    <span aria-hidden="true">Última</span>
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
                                      responsive                                        
                                      striped
                                      bordered
                                      small
                                      hover
                                      barReverse
                                      entriesLabel = "Mostrar entradas"
                                      infoLabel={["Mostrando de", "até", "de", "registros"]}
                                      paginationLabel={["Anterior", "Próximo"]}
                                      searchLabel="Procurar"
                                      theadColor="dark"                                      
                                      theadTextWhite 
                                      entries={5}
                                      entriesOptions={[ 5, 10, 15, 20]}                                       
                                      noRecordsFoundLabel="Zero records to render"
                                      data={data}
                                  />
                              </MDBModalBody>
                              <MDBModalFooter>
                                  {/* <MDBBtn color="warning" onClick={this.toggle}>Fechar</MDBBtn>                                        */}
                                  {/* <MDBBtn color="primary" type="submit">Salvar</MDBBtn> */}
                                  <button className="btns_fechar" onClick={this.toggle}>Fechar</button>
                              </MDBModalFooter>
                          </MDBModal>
                          
                      </MDBContainer>
                      
                      <MDBContainer>                        
                        <MDBModal isOpen={this.state.modal13} toggle={this.toggleForm} size="md">
                          <MDBModalHeader toggle={this.toggle}>Reservar - {this.state.ProdutoNome} <i className="fas fa-shopping-cart"></i></MDBModalHeader>
                          <MDBModalBody>                                                       
                            <div className="centralizar_">
                              <div className="def-number-input number-input">
                                  <label className="label_prod">Quantidade do produto</label><br/>
                                  <button onClick={this.decrease} className="minus"><i className="fas fa-minus"></i></button>
                                  <input className="quantity centralizar_" name="quantity" value={this.state.value} onChange={this.AtulizaValueReserva}
                                  type="number" />
                                  <button onClick={this.increase} className="plus"><i className="fas fa-plus"></i></button>
                              </div>
                            </div>                            
                            <Contato telefone={this.state.contato.telefone} dados={this.state.contato.dados}/> 
                          </MDBModalBody>                          
                          <MDBModalFooter>                           
                              {/* <MDBBtn color="warning" onClick={this.toggleForm}>Fechar</MDBBtn> */}
                              {/* <MDBBtn color="purple" onClick={() => this.ConcluirReserva()}>Concluir Reserva</MDBBtn> */}
                              <button className="btns_fechar" onClick={this.toggleForm}>Fechar</button>
                              <button className="btns_concluir" onClick={() => this.ConcluirReserva()}>Efetivar</button>
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