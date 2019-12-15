import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Button } from 'reactstrap';
import APICaller from '../../../services/apiConnecter';
import AddShopModel from '../add-shop-model';


class Tables extends Component {
  constructor(props){
    super(props);
    this.state = {
      shops:[],
      isOpenAddShop:false
    }
  }

  _handleClickOpenAddShop = ()=>{
    this.setState({
      isOpenAddShop:!this.state.isOpenAddShop
    });
  }

  componentDidMount(){
    APICaller.getAllShops()
      .then(res=>{
        if(!!res.success){
          this.setState({
            shops:res.data
          })
        }
      })
  }
  _shopsRender =()=>{
    const {shops} = this.state;
    return shops.map((shop)=>{
      console.log(shop)
      return  (<tr key={shop.id}>
                <td>{shop.id}</td>
                  <td>{shop.name}</td>
                  <td>{shop.createdAt}</td>
                  <td>{shop.products_count}</td>
                  <td>
                    <Badge color="success">Followed</Badge>
                  </td>
              </tr>)
    })
  }
  render() {
    return (
      <div className="animated fadeIn">
        <AddShopModel modal={this.state.isOpenAddShop} toggle={this._handleClickOpenAddShop}/>
        <Row>
          <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Followed Shops
                  <Button style={{float: "right"}} color="primary" onClick={this._handleClickOpenAddShop}>Add shop</Button>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead>
                    <tr>
                      <th>ShopId</th>
                      <td>Name</td>
                      <th>Date Add</th>
                      <th>Products Count</th>
                      <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                  
                    {this._shopsRender()}
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
                      <PaginationLink tag="button">2</PaginationLink>
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

    );
  }
}

export default Tables;
