import React,{ Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS , CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const months = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
}
const defaultData= [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40];
const defaultDataReversed = defaultData.slice().reverse();
const datasetTemplate = {
    label: [],
    data: new Array(12).fill(0),
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
}
export class BarChart extends Component{

    constructor(props){
        super(props);
        
        this.chartReference = React.createRef();
        this.state={Transactions:[],
            data: {
                labels: Object.values(months),
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
                },
             showIngoing:true, showOutgoing:true, showTotal:true}

        this.handleGetData = this.handleGetData.bind(this);
    }

    handleGetData(event){
        event.preventDefault();
        const params = new URLSearchParams({
            "startDate" : String(event.target.startDate.value),
            "endDate" : String(event.target.startDate.value),
        })
        fetch(import.meta.env.VITE_REACT_APP_API+`Transaction?${params}`)
        .then(response=>response.json())
        .then(data=>{
            this.setState({Transactions:data}, () => { this.showAll(); });
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

    showAll(){
        this.state.showIngoing = true;
        this.state.showOutgoing = true;
        this.state.showTotal = true;
        this.updateChartData();
    }

    toggleIngoing(){
        this.state.showIngoing = !this.state.showIngoing;
        this.updateChartData();
    }

    toggleOutgoing(){
        this.state.showOutgoing = !this.state.showOutgoing;
        this.updateChartData();
    }

    toggleTotal(){
        this.state.showTotal = !this.state.showTotal;
        this.updateChartData();
    }

    extractIngoingData(){
        const transactions = this.state.Transactions.filter(transaction => transaction.transactionType === 0);
        const monthlyTotals = Array(12).fill(0).map((_, i) => {
            const month = i + 1;
            return transactions.reduce((total, transaction) =>{
                const date = new Date(transaction.transactionTime);
                return date.getMonth() + 1 === month ? total + transaction.amount : total;
            }, 0);
        });
        return monthlyTotals;
    }

    extractOutgoingData(){
        const transactions = this.state.Transactions.filter(transaction => transaction.transactionType === 1);
        const monthlyTotals = Array(12).fill(0).map((_, i) => {
            const month = i + 1;
            return transactions.reduce((total, transaction) =>{
                const date = new Date(transaction.transactionTime);
                return date.getMonth() + 1 === month ? total + transaction.amount : total;
            }, 0);
        });
        return monthlyTotals;
    }
    // TODO: Fix this
    calculateTotal(ingoingData, outgoingData){
        return ingoingData.map((ingoingAmount, index) => ingoingAmount - outgoingData[index]);
    }

    updateChartData(){
        const chartData = this.state.data;
        chartData.datasets = [];
        const ingoingData = this.extractIngoingData();
        const outgoingData = this.extractOutgoingData();
        const total = ingoingData.map((ingoingAmount, i) => ingoingAmount - outgoingData[i]); // calculateTotal(ingoingData, outgoingData)
        if(this.state.showIngoing){
            const DataSet = { ...datasetTemplate };
            DataSet.label = 'Ingoing';
            DataSet.data = ingoingData;
            chartData.datasets.push(DataSet);
        }
        if(this.state.showOutgoing){
            const DataSet = { ...datasetTemplate };
            DataSet.label = 'Outgoing';
            DataSet.data = outgoingData;
            chartData.datasets.push(DataSet);
        }
        if(this.state.showTotal){
            const DataSet = { ...datasetTemplate };
            DataSet.label = 'Total';
            DataSet.data = total;
            chartData.datasets.push(DataSet);
        }
        this.updateChart(chartData);
    }

    updateChart(data){
        const chart = this.chartReference.current;
        chart.data = data;
        chart.update();
    }

    render(){
        const {Transactions, data}=this.state;
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
                        <Form onSubmit={this.handleGetData}>
                            <Form.Group>
                                <Form.Label>Transactions Between</Form.Label>
                                <Form.Control type="date" name="startDate" placeholder="Start Date" required onChange={this.checkEndDate} defaultValue={"2022-01-01"}/>
                                <Form.Control type="date" name="endDate"  placeholder="End Date" required onChange={this.checkStartDate} defaultValue={"2023-01-01"}/>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="success" type="submit">
                                    Get Data
                                </Button>
                            </Form.Group>
                        </Form>
                    </Row>
                    <Row>
                        <Chart ref={this.chartReference} type="line" data={data} redraw/>
                    </Row>
                    <Row>
                        <ButtonToolbar className="m-2 justify-content-center">
                            <Button variant='info'
                            onClick={()=>this.showAll()}>
                                Show All
                            </Button>
                            <Button variant='secondary'
                            onClick={()=>this.toggleIngoing()}>
                                Toggle Ingoing
                            </Button>
                            <Button variant='secondary'
                            onClick={()=>this.toggleOutgoing()}>
                                Toggle Outgoing
                            </Button>
                            <Button variant='secondary'
                            onClick={()=>this.toggleTotal()}>
                                Toggle Total
                            </Button>
                        </ButtonToolbar>
                    </Row>
                </Container>
            </div>
        );
    }
}