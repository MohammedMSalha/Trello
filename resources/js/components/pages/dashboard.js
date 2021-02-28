import React,{Component} from 'react';
import { connect } from 'react-redux';
import Head from './parts/header';
import DragDrop from './parts/dragdrop';
import {store} from '../redux/store';

class Dashboard extends Component{

    constructor(props){
        super(props);
    }

    


    render(){
        return (
            <>
            <Head/>
            <DragDrop  />
            </>
        );
    }
}


export default connect(null)(Dashboard);