import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,InputGroup,InputGroupAddon,Input } from 'reactstrap';
import {Component} from 'react';

 class AddShopModel extends Component {

 
    render(){
        return (
            <div>
              <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>Add Shop By URL</ModalHeader>
                <ModalBody>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                    <input placeholder="https://www.lazada.vn/shop/samsung-official-store ..."/>
                    </InputGroupAddon>
                    <Input />
                </InputGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.props.toggle}>Complete</Button>{' '}
                  <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
          );
    }
  
}

export default AddShopModel;
