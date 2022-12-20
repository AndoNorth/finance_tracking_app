import React,{Component, useState} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddTransactionModal} from './AddTransactionModal';
import {EditTransactionModal} from './EditTransactionModal';

export class Finances extends Component{

    constructor(props){
        super(props);
        this.state={Transactions:[], addModalShow:false, editModalShow:false}
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

    deleteTransaction(transId){
        if(window.confirm('Are you sure?')){
            fetch(import.meta.env.VITE_REACT_APP_API+'Transaction/'+transId,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }

    }

    render(){
        const {Transactions, TransId, TransSummary, TransDescription, TransAmount, TransType, TransTime}=this.state;
        // const [date, setDate] = useState(new Date());
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Summary</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>TransactionType</th>
                        <th>TransactionTime</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Transactions.map(trans=>
                            <tr key={trans.id}>
                                <td>{trans.summary}</td>
                                <td>{trans.description}</td>
                                <td>{trans.amount}</td>
                                <td>{trans.transactionType}</td>
                                <td>{trans.transactionTime}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                        TransId:trans.id,
                                        TransSummary:trans.summary,
                                        TransDescription:trans.description,
                                        TransAmount:trans.amount,
                                        TransType:trans.transactionType,
                                        TransTime:trans.transactionTime})}>
                                            Edit
                                        </Button>
                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteTransaction(trans.id)}>
                                            Delete
                                        </Button>
                                        <EditTransactionModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        TransId={TransId}
                                        TransSummary={TransSummary}
                                        TransDescription={TransDescription}
                                        TransAmount={TransAmount}
                                        TransType={TransType}
                                        TransTime={TransTime}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant='primary'
                onClick={()=>this.setState({addModalShow:true})}>
                Add Transaction
                </Button>
                <Button variant='success'
                onClick={()=>this.refreshList()}>
                Refresh List
                </Button>
                <AddTransactionModal show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>
            </div>
            
        );
    }
}