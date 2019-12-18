import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Button } from 'reactstrap';
import APICaller from '../../../services/apiConnecter';
import AddShopModel from '../add-shop-model';
import ShopDetails from '../shop-detail-model';
import dateTime from '../../../services/date-time';


class Tables extends Component {
  constructor(props){
    super(props);
    this.state = {
      shops:[],
      isOpenAddShop:false,
      isOpenShopDetails:false,
      shopDetails:{}
    }
  }

  _handleClickOpenAddShop = ()=>{
    this.setState({
      isOpenAddShop:!this.state.isOpenAddShop
    });
  }

  _handleClickOpenShopDetails = ()=>{
    this.setState({
      isOpenShopDetails:!this.state.isOpenShopDetails
    });
  }

  componentDidMount(){
    this._getAllShops()
  }

  _getAllShops = ()=>{
    this.setState({
      shops:[]
    })
    APICaller.getAllShops()
      .then(res=>{
        if(!!res.success){
          this.setState({
            shops:res.data
          })
        }
      })
  }

  _handleClickDeleteShop = (e)=>{
    APICaller.deleteShop(e)
      .then(res=>{
        if(res.success){
          this._getAllShops()
        }
      })
  }

  

  _handleClickShopRow = (shop)=>{
    this.setState({
      shopDetails:shop,
      isOpenShopDetails:true
    })
  }

  _shopsRender =()=>{
    const {shops} = this.state;
    return shops.map((shop)=>{
      return  (<tr key={shop.id} style={{cursor:"pointer"}}  >
                <td>{shop.id}</td>
                  <td>{shop.name}</td>
                  <td>{dateTime.format(new Date(shop.createdAt))}</td>
                  <td>{shop.products_count}</td>
                  <td >
                    <Badge color="success" onClick={()=>{
                                            this._handleClickShopRow(shop);
                                          }}>
                      Followed
                    </Badge>
                  </td>
                  <td>
                    <Badge color="danger" onClick={()=>{
                      this._handleClickDeleteShop(shop.id);
                    }}>Delete</Badge>
                  </td>
              </tr>)
    })
  }
  render() {
    return (
      <div className="animated fadeIn">
        <AddShopModel modal={this.state.isOpenAddShop} toggle={this._handleClickOpenAddShop}/>
        <ShopDetails modal={this.state.isOpenShopDetails} toggle={this._handleClickOpenShopDetails} shop={this.state.shopDetails}/>
        <Row>
          <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>  Shops <small className="text-muted">followed</small>
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
                      <th>Actions</th>
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
