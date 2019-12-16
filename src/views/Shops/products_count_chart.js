import React,{Component} from 'react';
import {Line} from 'react-chartjs-2';
import APICaller from '../../services/apiConnecter';
import dateTime from '../../services/date-time';



class ProductsCountChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            shopImages:[]
        }
    }

    componentDidMount(){
        const {shopId} = this.props;
        APICaller.getShopImages(shopId)
            .then((res)=>{
                if(res.success){
                    this.setState({
                        shopImages:res.data
                    })
                }
            })

    }

    render(){

        const labels = this.state.shopImages.map(e=>dateTime.format(new Date(e.createdAt)));
        const products_count_data = this.state.shopImages.map(e=>e.products_count);
        console.log(products_count_data,labels)

        const data = {
            labels: labels,
            datasets: [
              {
                label: 'Number of products',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 1,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: products_count_data
              }
            ]
          };
        return ( 
        <div>
          <h2>Products Count</h2>
          <Line data={data} />
        </div>
      );
    }
}

export default ProductsCountChart;