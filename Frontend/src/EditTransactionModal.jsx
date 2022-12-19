import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditTransactionModal extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(import.meta.env.VITE_REACT_APP_API+'Transaction/'+event.target.Id.value,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                "Id":Number(event.target.Id.value),
                "Summary":event.target.Summary.value,
                "Description":event.target.Description.value,
                "Amount":Number(event.target.Amount.value),
                "TransactionType":Number(event.target.TransactionType.value),
                "TransactionTime":event.target.TransactionTime.value
            })
        })
        .then(response=>response.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert(error);
        })
    }

    render(){
        return (
            <div className="container">
                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Transaction
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Transaction" class="form-check form-check-inline">
                                        <Form.Label>TransactionId</Form.Label>
                                        <Form.Control type="text" name="Id" required disabled defaultValue={this.props.TransId}/>
                                        <Form.Label>Summary</Form.Label>
                                        <Form.Control type="text" name="Summary" required placeholder="Name Of Transaction" defaultValue={this.props.TransSummary}/>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="Description" placeholder="Description" as="textarea" rows={3} defaultValue={this.props.TransDescription}/>
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control type="number" name="Amount" required placeholder="10.00" step="0.01" defaultValue={this.props.TransAmount}/>
                                        <Form.Label>TransactionType</Form.Label> <br/>
                                        <Form.Check name="TransactionType" label ="InGoing" inline type="radio" required value={0} defaultChecked={true}/>
                                        <Form.Check name="TransactionType" label ="OutGoing" inline  type="radio" required  value={1}  />
                                        <br/> <Form.Label>TransactionTime</Form.Label>
                                        <Form.Control type="datetime-local" name="TransactionTime" defaultValue={this.props.TransTime}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Transaction
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}