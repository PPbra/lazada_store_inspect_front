import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table ,Pagination,PaginationItem,PaginationLink} from 'reactstrap';
import APICaller from '../../services/apiConnecter';
import ProductDetailsModal from './product-detail-modal';


class Tables extends Component {
  constructor(props){
    super(props);
    this.state = {
      products:[],
      isOpenModal:false,
      productDetails:{}
    }
  }

  componentDidMount(){
    this._getProducts();
  }

  _getProducts = ()=>{
    APICaller.getFollowedProducts()
      .then(res=>{
        if(res.success){
          this.setState({
            products:res.data
          })
        }
      })
  }

  _handleClickOpenModel = ()=>{
    this.setState({
      isOpenModal:!this.state.isOpenModal
    })
  }

  _chooseProduct=(product)=>{
    this.setState({
      productDetails:product,
      isOpenModal:true
    })
  }
  _renderProducts = ()=>{
      const {products} = this.state;
      return products.map(e=>{
        return (
                    <tr key={e.id}>
                      <td><Badge color="secondary">{e.id}</Badge></td>
                      <td>{e.sku}</td>
                      <td><Badge color="warning">{e.shop}</Badge></td>
                      <td><Badge color="secondary">{(e.title.length>100)?e.title.substring(0,100)+"...":e.title}</Badge></td>
                      <td><Badge color="primary">{(e.discountPrice>0)?e.discountPrice:e.price}</Badge></td>
                      <td style={{cursor:"pointer"}}>
                        <Badge color="success" onClick={()=>{
                                                this._chooseProduct(e);
                                            }}>
                        SHOW
                      </Badge>
                      </td>
                      <td style={{cursor:"pointer"}}>
                          <Badge color="danger" onClick={()=>{
                                                    APICaller.changeProductStatus(e.id,{doFollow:0})
                                                      .then(res=>{
                                                        if(res.success){
                                                          this._getProducts()
                                                        }
                                                      })
                                                }}>
                          DELETE
                        </Badge>
                      </td>
                    </tr>
        )
      })
  }

  

  render() {
    return (
      <div className="animated fadeIn">
        <ProductDetailsModal modal={this.state.isOpenModal} toggle={this._handleClickOpenModel} product={this.state.productDetails}/>
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Products <small className="text-muted">followed</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">SKU</th>
                      <th scope="col">SHOPID</th>
                      <th scope="col">NAME</th>
                      <th scope="col">CURRENT PRICE</th>
                      <th scope="col">DETAILS</th>
                      <th scope="col">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this._renderProducts()
                    }
                  </tbody>
                </Table>
                <Pagination>
                    <PaginationItem>
                      <PaginationLink previous tag="button"></PaginationLink>
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink next tag="button"></PaginationLink>
                    </PaginationItem>
                  </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Tables;
