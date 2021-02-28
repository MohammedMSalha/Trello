import { stubFalse } from 'lodash';
import React from 'react';
import { Message } from 'semantic-ui-react'

function Notification(props){

    if(props.status==false){
        return <Message color="blue"  >
                    <Message.Header style={{ textAlign: "left" }}>Fill Information</Message.Header>
                    <p style={{ textAlign: "left" }}>Please enter your information...</p>
                </Message>;
    }
         return (<Message color={props.color}>
                    <Message.Header style={{ textAlign: "left" }}>{props.title}</Message.Header>
                    <p style={{ textAlign: "left" }}>{props.description}</p>
                </Message>);
}

export default Notification;