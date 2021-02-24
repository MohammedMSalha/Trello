/**
* Register component using Semantic Ui React & Formik(Less Code & best handle with form event) & YUP (for validation using schema)
* @author Mohammed M.Salha
* @date 24/2/2021
*/

import React,{Component} from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {Formik,Field,ErrorMessage} from 'formik';
import * as yup from 'yup';



class Register extends Component{

constructor(props){
    super(props);
    this.submit= this.submit.bind(this);
    this.schema= this.schema.bind(this);
}
 



submit(values){
  console.log(values);
}





/**
* Schema objects are immutable, so each call of a method returns a new schema object. 
* @field name,email,password,confirm_password
* @returns Schema
* @author Mohammed M.Salha
* @date 24/2/2021
*/
schema(){

  let schema = yup.object().shape({
    name: yup.string().min(4).required(), 
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirm_password: yup.string().min(8).required('Confirm Password Required')
    .oneOf([yup.ref('password'), null], 
    'Passwords must match')
  });
  return schema;

}
 




/**
* Render function return Login form
* @author Mohammed M.Salha
* @date 24/2/2021
*/
render(){
    return (
      <div>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                  Register
            </Header>
            <Formik
               initialValues={{name:'',email:'',password:'',confirm_password:''}}
               onSubmit={(values)=>this.submit(values)}
               validationSchema={
                 this.schema()
               }
              >
                 { props =>(
                    
                <Form size='large' onSubmit={props.handleSubmit}>
                  <Segment stacked>
                    <div className="field">
                      <div className="ui fluid left icon input">
                          <Field  type="name" name="name" placeholder='Name' value={props.value.name}/>
                          <i aria-hidden="true" className="user icon"></i>
                      </div> 
                          <ErrorMessage name='name' component="div" className="ui pointing red basic label"/> 
                    </div> 
                    <div className="field">
                      <div className="ui fluid left icon input">
                          <Field  type="email" name="email" placeholder='E-mail Address' value={props.value.email}/>
                          <i aria-hidden="true" className="user icon"></i>
                      </div> 
                          <ErrorMessage name='email' component="div" className="ui pointing red basic label"/> 
                    </div> 
                    <div className="field">  
                      <div className="ui fluid left icon input">
                          <Field
                            placeholder='Enter Password'
                            type='password'
                            name="password"   
                            autoComplete="off"
                            value={props.value.password}
                          />
                      <i aria-hidden="true" className="lock icon"></i>
                      </div>  
                      <ErrorMessage name='password' component="div" className="ui pointing red basic label"/> 
                    </div>  
                    <div className="field">
                      <div className="ui fluid left icon input">
                      <Field
                            placeholder='Repeat Password'
                            type='password'
                            name="confirm_password"   
                            value={props.value.confirm_password}
                          />
                          <i aria-hidden="true" className="user icon"></i>
                      </div> 
                          <ErrorMessage name='confirm_password' component="div" className="ui pointing red basic label"/> 
                    </div> 
                        
                          <Button color='teal' fluid size='large' type='submit' >
                          Sign Up
                          </Button>
                  </Segment>
                </Form>
          
                     )}
              </Formik>
          <Message>
            you have account ? <a href='#'>Login</a>
          </Message>
        </Grid.Column>
      </Grid>
      </div>
    );
}
}

export default Register;


