import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import APICaller from '../../services/apiConnecter';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import {subscribeToNoti} from '../../services/noti-subcriber';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,  
} from '@coreui/react';

import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  constructor(props){
    super(props);
    this.state = {
      notis:[]
    }
    subscribeToNoti((e)=>{
      const data = JSON.parse(e);
      const Old = JSON.parse(data.old);
      const New = JSON.parse(data.new);
      let message_content = "";
      if(data.type==="shop"){
        message_content = `Shop ${Old.name} has been changed at products count to ${New.products_count}`
      }else{
        message_content = `Product ${Old.title} has been changed at: \n
        ${New.changedAt.map(e=>`${e}: ${Old[e]}->${New[e]}\n`)}`
      }
      ToastsStore.success(message_content,20000);
      this._getNotis();
    })
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  componentDidMount(){
    this._getNotis()
  }

  _getNotis = () =>{
      APICaller.getNotis()
        .then(res=>{
          if(res.success){
            this.setState({
              notis:res.data
            })
          }
        })
  }

  render() {
    return (
      <div className="app">
         <ToastsContainer store={ToastsStore}/>
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader loadNoti={this._getNotis} onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/shops" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside loadNoti={this._getNotis} notis={this.state.notis}/>
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
