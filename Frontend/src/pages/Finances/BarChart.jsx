import React,{ Component } from 'react';
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS , CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export class BarChart extends Component{

    constructor(props){
        super(props);
        this.state={Transactions:[]}
    }

    refreshList(){
        fetch(import.meta.env.VITE_REACT_APP_API+'Transaction')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Transactions:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    // componentDidUpdate(){
    //     this.refreshList();
    // }

    render(){
        const {Transactions}=this.state;
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',];
        const data = {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
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
        }
        return(
            <div className="mt-5 d-flex justify-content-center ">
                <Chart type="line" data={data}/>
            </div>
        );
    }
}