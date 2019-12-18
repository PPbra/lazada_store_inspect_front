import React,{Component} from 'react';
import {Line} from 'react-chartjs-2';
import dateTime from '../../services/date-time';
import {Col,Row} from 'reactstrap';



class PriceChart extends Component {
   
    render(){

        const labels = this.props.images.map(e=>dateTime.format(new Date(e.createdAt)));
        const price_data = this.props.images.map(e=>e.price);
        const discountPrice_data = this.props.images.map(e=>e.priceDiscount);
        const reviews_data = this.props.images.map(e=>e.reviews);
        const rating_data = this.props.images.map(e=>e.rating);
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
                data: price_data
              }
            ]
          };
        const data2 = {
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
                data: discountPrice_data
              }
            ]
          };
        const data3 = {
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
                data: reviews_data
              }
            ]
          };
        const data4 = {
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
                data: rating_data
              }
            ]
          };
        return ( 
        <div>
             <Row>
                <Col xs={{size:8,offset:2}}>
                <h2>Default Price</h2>
                <Line data={data} />        
                </Col>
            </Row> 
             <Row>
                <Col xs={{size:8,offset:2}}>
                <h2>Discount Price</h2>
                <Line data={data2} />        
                </Col>
            </Row> 
             <Row>
                <Col xs={{size:8,offset:2}}>
                <h2>Reviews Count</h2>
                <Line data={data3} />        
                </Col>
            </Row> 
             <Row>
                <Col xs={{size:8,offset:2}}>
                <h2>Rating</h2>
                <Line data={data4} />        
                </Col>
            </Row> 
        </div>
      );
    }
}

export default PriceChart;