import React,{Component} from 'react';
import { Header , Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import LogoutState from '../../redux/actions/logoutAction';
import CreateTicket from './createTicket';
class Head extends Component{

    constructor(props){
        super(props);
        this.logout=this.logout.bind(this);
    }

    logout(){
        this.props.logoutUser();
        window.location.reload();
    }

    render(){
        return (<Header as='h3' block>
                    <Button color='red' onClick={() => {this.logout()}}>LOGOUT</Button>
                    <CreateTicket />
                </Header>
                )
    }
}





const mapDispatchToProps = (dispatch) =>{
    return {
      logoutUser : ()=> dispatch(LogoutState())
    };
};
export default connect(null,mapDispatchToProps)(Head)
