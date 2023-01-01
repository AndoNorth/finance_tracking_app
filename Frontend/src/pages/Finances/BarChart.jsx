import React,{ Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS , CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export class BarChart extends Component{

    constructor(props){
        super(props);
        this.state={Transactions:[]}

        this.handleGenerate = this.handleGenerate.bind(this);
    }

    handleGenerate(event){
        event.preventDefault();
        const params = new URLSearchParams({
            "startDate" : String(event.target.startDate.value),
            "endDate" : String(event.target.startDate.value),
        })
        fetch(import.meta.env.VITE_REACT_APP_API+`Transaction?${params}`)
        .then(response=>response.json())
        .then(data=>{
            this.setState({Transactions:data});
        })
        .catch(error=>console.error(error));
    }

    checkEndDate(event){
        if(!event.target.form.endDate.value){
            event.target.form.endDate.value = event.target.form.startDate.value;
        }
        else{
            let startDate = new Date(event.target.form.startDate.value);
            let endDate = new Date(event.target.form.endDate.value);
            if(endDate.getTime() < startDate.getTime()){
                event.target.form.endDate.value = event.target.form.startDate.value;
            }
        }
    }
    
    checkStartDate(event){
        if(!event.target.form.startDate.value){
            event.target.form.startDate.value = event.target.form.endDate.value;
        }
        else{
            let startDate = new Date(event.target.form.startDate.value);
            let endDate = new Date(event.target.form.endDate.value);
            if(endDate.getTime() < startDate.getTime()){
                event.target.form.startDate.value = event.target.form.endDate.value;
            }
        }
    }

    render(){
        const {Transactions}=this.state;
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',];
        const defaultData = [65, 59, 80, 81, 56, 55, 40];
        const defaultDataReversed = defaultData.slice().reverse();
        const data = {
        labels: labels,
        datasets: [{
            label: 'Ingoing',
            data: defaultData,
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        },{
            label: 'Outgoing',
            data: defaultDataReversed,
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        },{
            label: 'Total',
            data: defaultData.map((num, index) => num - defaultDataReversed[index]),
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
        };
        const options = {
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
                axis: 'x',
            },
            plugins: {
                tooltip: {
                    enabled: true,
                },
                legend: false,
            },
            scales: {
                y: {
                    grid: {
                        drawOnChartArea: false,
                        drawBorder: false,
                    }
                },
                x:{
                    grid: {
                        drawBorder: false,
                        borderDash: [6],
                        border: false,
                    },
                    ticks: {
                        font: {
                            family: "'Mullish', sans-serif",
                            size: '16px'
                        }
                    }
                }
            }
        };
        return(
            <div className="mt-5">
                <Container>
                    <Row>
                        <Form onSubmit={this.handleGenerate}>
                            <Form.Group>
                                <Form.Label>Transactions Between</Form.Label>
                                <Form.Control type="date" name="startDate" placeholder="Start Date" required onChange={this.checkEndDate}/>
                                <Form.Control type="date" name="endDate"  placeholder="End Date" required onChange={this.checkStartDate}/>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Generate
                                </Button>
                            </Form.Group>
                        </Form>
                    </Row>
                    <Row>
                        <Chart type="line" data={data}/>
                    </Row>
                    <Row>
                        <ButtonToolbar className="m-2 justify-content-center">
                            <Button variant='primary'
                            onClick={()=>{
                                console.log(Transactions);
                            }}>
                                Show All
                            </Button>
                            <Button variant='success'
                            onClick={()=>this.toggleData()}>
                                Show Ingoing
                            </Button>
                            <Button variant='success'
                            onClick={()=>this.toggleData()}>
                                Show Outgoing
                            </Button>
                            <Button variant='success'
                            onClick={()=>this.toggleData()}>
                                Show Total
                            </Button>
                        </ButtonToolbar>
                    </Row>
                </Container>
            </div>
        );
    }
}