import React,{Component} from 'react';
import {Button} from 'react-bootstrap';

export class Home extends Component{
    login = () => fetch(import.meta.env.VITE_REACT_APP_API+'login', { 
        method: "POST",
        credentials: 'include'
    })
    test = () => fetch(import.meta.env.VITE_REACT_APP_API+'test',{credentials: 'include'})
    render(){
        return(
            <div className="mt-5 d-flex justify-content-center ">
                <Button className="mr-2" variant="warning" onClick={()=>this.login()}>Login</Button>
                <Button className="mr-2" variant="info" onClick={()=>this.test()}>Test</Button>
            </div>
        );
    }
}