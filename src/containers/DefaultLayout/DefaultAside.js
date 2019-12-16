import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane,Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import APICaller from '../../services/apiConnecter';
import dateTime from '../../services/date-time';
// import { AppSwitch } from '@coreui/react'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '2'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }



  _renderNotis = ()=>{
    const {notis} = this.props;
    const notiss = notis.reverse();

    return notiss.map(e=>{
      return(
        <div key={e.id}>
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="phuongngo" />
                  <span className="avatar-status badge-success"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Admin</small>
                {
                  (e.marked)?<small style={{cursor:"pointer"}} className="text-muted float-right mt-1">Read</small>:
                  <small style={{cursor:"pointer"}} className="text-muted float-right mt-1" onClick={()=>{
                    APICaller.markNoti(e.id)
                      .then(res=>{
                        if(res.success){
                          this.props.loadNoti();
                        }
                      })
                  }}>Mark as read</small>
                }
              </div>
              <div className="text-truncate font-weight-bold">{dateTime.format(new Date(e.createdAt))}</div>
              <small style={{color:(!!e.marked)?"#73818f":"blue"}} >{e.message}</small>
            </div>
            <hr />
        </div>
      )
    })
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '2' })}
                     onClick={() => {
                       this.props.loadNoti()
                     }}>
              <i className="icon-bell"></i><Badge pill color="danger">{this.props.notis.length}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="2" className="p-3">
            {this._renderNotis()}
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
