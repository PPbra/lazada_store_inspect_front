import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Row,Col ,Table,Badge} from 'reactstrap';
import {Component} from 'react';
import ProductsCountChart from './products_count_chart';
import APICaller from '../../services/apiConnecter';
import { ToastsStore} from 'react-toasts';
import dateTime from '../../services/date-time';

 class ShopDetails extends Component {
     
    constructor(props){
        super(props);
        this.state = {
            products:[]
        }
    }

    componentWillReceiveProps(nextProps) {
        const { shop } = this.props
         if (nextProps.shop !== shop) {
            APICaller.getShopProducts(nextProps.shop.id)
            .then(res=>{
                if(res.success){
                    this.setState({
                        products:res.data
                    })
                }
            })
         }
        }
    

    _handleClickCrawl = ()=>{
        const shopId= this.props.shop.id;
        APICaller.productsInit(shopId)
            .then(res=>{
                if(res.success){
                    ToastsStore.success("Server is getting products!");
                    this.props.toggle();
                }
                else{
                    ToastsStore.error("Error!");
                    this.props.toggle();
                }
            })
        
    }

    _getProducts =()=>{
        const shopId= this.props.shop.id;
        APICaller.getShopProducts(shopId)
            .then(res=>{
                if(res.success){
                    this.setState({
                        products:res.data
                    })
                }
            })
    }

    _handleClickProductStatus = (product) =>{
       const body =  {
            doFollow:!product.doFollow
        }
        APICaller.changeProductStatus(product.id,body)
            .then(res=>{
                if(res.success){
                    this._getProducts();
                }
            })
    }

    _renderProducts = ()=>{
        return this.state.products.map(e=>{
            return (
                <tr>
                    <td>{e.id}</td>
                    <td>{e.sku}</td>
                    <td>{e.shop}</td>
                    <td>{dateTime.format(new Date(e.createdAt))}</td>
                    <td style={{cursor:"pointer"}} onClick={()=>{this._handleClickProductStatus(e)}}>
                    {
                                (!!e.doFollow)?<Badge color="success">Followed</Badge>:<Badge color="danger">No follow</Badge>
                    }
                    </td>
                    
                </tr>
            )
        })
    }


    render(){
        return (
            <div>
              <Modal isOpen={this.props.modal} toggle={this.props.toggle} size="xl">
                <ModalHeader toggle={this.props.toggle}>Shop {this.props.shop.id} - {this.props.shop.name}</ModalHeader>
                <ModalBody style={{height: "70vh",overflow: "scroll"}}>
                    <Row>
                        <Col xs={{size:8,offset:2}}>
                            <ProductsCountChart shopId={this.props.shop.id}/>
                        </Col>
                    </Row>
                    <Row><Col xs={{size:10,offset:1}}><h4>Products List</h4></Col></Row>
                    <Row>
                        <Col xs={{size:10,offset:1}}>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>SKU</th>
                                        <th>SHOPID</th>
                                        <th>Date Add</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this._renderProducts()}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this._handleClickCrawl}>Craw Products</Button>{' '}
                  <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
          );
    }
  
}

export default ShopDetails;
