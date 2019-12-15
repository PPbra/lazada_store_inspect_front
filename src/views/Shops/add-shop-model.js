import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,InputGroup,InputGroupAddon,InputGroupText } from 'reactstrap';
import {Component} from 'react';
import APICaller from '../../services/apiConnecter';
import { ToastsStore} from 'react-toasts';

 class AddShopModel extends Component {

    _handleClickComplete =()=> { 
        const URL = this.refs.shopUrlInput.value;
        console.log(URL);
        APICaller.addShopByURL(URL)
            .then(res=>{
                if(res.success){
                    ToastsStore.success("Add shop completed!")
                    this.props.toggle();
                }else{
                    ToastsStore.warning(res.reason);
                }
            })

    }
 
    render(){
        return (
            <div>
              <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>Add Shop By URL</ModalHeader>
                <ModalBody>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>Shop URL</InputGroupText>
                    </InputGroupAddon>
                    <input className="form-control" ref="shopUrlInput" placeholder="https://www.lazada.vn/shop/samsung-official-store ..."/>
                </InputGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this._handleClickComplete}>Complete</Button>{' '}
                  <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
          );
    }
  
}

export default AddShopModel;
