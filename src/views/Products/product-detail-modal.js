import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
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
            this._getProductImages()
         }
        }
    

    _handleClickCrawl = ()=>{
       
    }

    
    _getProductImages =()=>{
        const productId= this.props.product.id;
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
        console.log(this.state.images);
        return (
            <div>
              <Modal isOpen={this.props.modal} toggle={this.props.toggle} size="xl">
                <ModalHeader toggle={this.props.toggle}>Product Details</ModalHeader>
                <ModalBody style={{height: "70vh",overflow: "scroll"}}>
                    <PriceChart images={this.state.images}/>
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
