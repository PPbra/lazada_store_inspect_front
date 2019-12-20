import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Jumbotron,Badge,Row, Col} from 'reactstrap';
import {Component} from 'react';
import APICaller from '../../services/apiConnecter';
import PriceChart from './price-chart';

 class ProductDetails extends Component {
     
    constructor(props){
        super(props);
        this.state = {
            images:[]
        }
    }

    componentWillReceiveProps(nextProps) {
        const { product } = this.props
         if (nextProps.product !== product) {
            this._getProductImages(nextProps.product.id)
         }
    }
    

    _handleClickCrawl = ()=>{
       
    }

    
    _getProductImages =(productId)=>{
       
        APICaller.getProductImage(productId)
            .then(res=>{
                if(res.success){
                    this.setState({
                        images:res.data
                    })
                }
            })
    }

    render(){
        const title = this.props.product.title?this.props.product.title:"TITLE";
        const url = this.props.product.pdpUrl?this.props.product.pdpUrl:"URL";
        return (
            <div>
              <Modal isOpen={this.props.modal} toggle={this.props.toggle} size="xl">
                <ModalHeader toggle={this.props.toggle}>Product Details</ModalHeader>
                <ModalBody style={{height: "70vh",overflow: "scroll"}}>
                    <PriceChart images={this.state.images}/>
                    <Jumbotron>
                        <Row>
                            <Col>
                                <h1>Title <Badge color="primary">{title.length>50?title.substring(0, 50)+"...":title}</Badge></h1>
                            </Col>
                            <Col>
    <h1>URL <Badge color="success"><a href={url} style={{color:"white",textDecoration:"none"}}>{url.length>50?url.substring(0,50)+"...":url}</a></Badge></h1>
                            </Col>
                        </Row>
                    </Jumbotron>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.props.toggle}>Close</Button>
                </ModalFooter>
              </Modal>
            </div>
          );
    }
  
}

export default ProductDetails;
