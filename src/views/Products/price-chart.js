import React,{Component} from 'react';
import {Line} from 'react-chartjs-2';
import dateTime from '../../services/date-time';
import {Col,Row,Card,CardBody} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'


const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandDanger = getStyle('--danger')



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
                label: 'Price',
                backgroundColor: brandPrimary,
                borderColor: 'rgba(255,255,255,.55)',
                data: price_data
              }
            ]
          };

          const dataOpts1 = {
            tooltips: {
              enabled: false,
              custom: CustomTooltips
            },
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                  },
                  ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                  },
          
                }],
              yAxes: [
                {
                  display: false,
                  ticks: {
                    display: false,
                    min: Math.min.apply(Math, data.datasets[0].data) - 10000,
                    max: Math.max.apply(Math, data.datasets[0].data) + 10000,
                  },
                }],
            },
            elements: {
              line: {
                borderWidth: 1,
              },
              point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
              },
            }
          }
        const data2 = {
            labels: labels,
            datasets: [
              {
                label: 'Discount Price',
                backgroundColor: brandDanger,
                borderColor: 'rgba(255,255,255,.55)',
                data: discountPrice_data
              }
            ]
          };
          const dataOpts2 = {
            tooltips: {
              enabled: false,
              custom: CustomTooltips
            },
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                  },
                  ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                  },
          
                }],
              yAxes: [
                {
                  display: false,
                  ticks: {
                    display: false,
                    min: Math.min.apply(Math, data2.datasets[0].data) - 10000,
                    max: Math.max.apply(Math, data2.datasets[0].data) + 10000,
                  },
                }],
            },
            elements: {
              line: {
                borderWidth: 1,
              },
              point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
              },
            }
          }
        const data3 = {
            labels: labels,
            datasets: [
              {
                label: 'Reviews',
                backgroundColor: brandSuccess,
                borderColor: 'rgba(255,255,255,.55)',
                data: reviews_data
              }
            ]
          };

          const dataOpts3 = {
            tooltips: {
              enabled: false,
              custom: CustomTooltips
            },
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                  },
                  ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                  },
          
                }],
              yAxes: [
                {
                  display: false,
                  ticks: {
                    display: false,
                    min: Math.min.apply(Math, data3.datasets[0].data) - 10,
                    max: Math.max.apply(Math, data3.datasets[0].data) + 10,
                  },
                }],
            },
            elements: {
              line: {
                borderWidth: 1,
              },
              point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
              },
            }
          }
        const data4 = {
            labels: labels,
            datasets: [
              {
                label: 'Rating',
                backgroundColor: brandInfo,
                borderColor: 'rgba(255,255,255,.55)',
                data: rating_data
              }
            ]
          };
          const dataOpts4 = {
            tooltips: {
              enabled: false,
              custom: CustomTooltips
            },
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                  },
                  ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                  },
          
                }],
              yAxes: [
                {
                  display: false,
                  ticks: {
                    display: false,
                    min: Math.min.apply(Math, data4.datasets[0].data) - 1,
                    max: Math.max.apply(Math, data4.datasets[0].data) + 1,
                  },
                }],
            },
            elements: {
              line: {
                borderWidth: 1,
              },
              point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
              },
            }
          }
        return ( 
        <div>
             <Row>
                <Col xs="12" sm="6" lg="3">
                  <Card className="text-white bg-info">
                    <CardBody className="pb-0">
                      <div className="text-value">{price_data[price_data.length-1]}</div>
                      <div>Default Price</div>
                    </CardBody>
                    <div className="chart-wrapper mx-3" style={{ height: '80px' }}>
                      <Line data={data} options={dataOpts1} height={80}/>        
                    </div>
                  </Card>
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Card className="text-white bg-info">
                    <CardBody className="pb-0">
                      <div className="text-value">{!!discountPrice_data[discountPrice_data.length-1]?discountPrice_data[discountPrice_data.length-1]:0}</div>
                      <div>Discount Price</div>
                    </CardBody>
                    <div className="chart-wrapper mx-3" style={{ height: '80px' }}>
                      <Line data={data2} options={dataOpts2} height={80}/>        
                    </div>
                  </Card>
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Card className="text-white bg-info">
                    <CardBody className="pb-0">
                      <div className="text-value">{reviews_data[reviews_data.length-1]}</div>
                      <div>Riviews</div>
                    </CardBody>
                    <div className="chart-wrapper mx-3" style={{ height: '80px' }}>
                      <Line data={data3} options={dataOpts3} height={80}/>        
                    </div>
                  </Card>
                </Col>
                <Col xs="12" sm="6" lg="3">
                  <Card className="text-white bg-info">
                    <CardBody className="pb-0">
                      <div className="text-value">{rating_data[rating_data.length-1]}</div>
                      <div>Rating</div>
                    </CardBody>
                    <div className="chart-wrapper mx-3" style={{ height: '80px' }}>
                      <Line data={data4} options={dataOpts4} height={80}/>        
                    </div>
                  </Card>
                </Col>
            </Row> 
        </div>
      );
    }
}

export default PriceChart;