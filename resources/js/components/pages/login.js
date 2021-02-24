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
import axios from 'axios';


class Login extends Component{

constructor(props){

    super(props);
    this.submit= this.submit.bind(this);
    this.schema= this.schema.bind(this);

    
}
 
/**
 * send login post request 
 * @param {*} email 
 * @param {*} password 
 * @author Mohammed M.Salha
 * @date 24/2/2021
 */
async loginUser(email,password){
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/login');
  } catch (error) {
    console.log(error);
  }
}

submit(values){
  
}


/**
* Schema objects are immutable, so each call of a method returns a new schema object. 
* When using es module syntax, yup exports everything as a named export
* @field email,password
* @returns Schema
* @author Mohammed M.Salha
* @date 24/2/2021
*/
schema(){
  let schema = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().required()
  });
  return schema;
}
 




/**
* Render function for Login form
* @returns login form
* @author Mohammed M.Salha
* @date 24/2/2021
*/
render(){
    return (
      <div>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                  Login
            </Header>
            <Formik
               initialValues={{email:'',password:''}}
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
                          <Field  type="email" name="email" placeholder='E-mail address' />
                          <i aria-hidden="true" className="user icon"></i>
                      </div> 
                          <ErrorMessage name='email' component="div" className="ui pointing red basic label" value={props.value.email} /> 
                    </div> 
                    <div className="field">  
                      <div className="ui fluid left icon input">
                          <Field
                            placeholder='Enter Password'
                            type='password'
                            name="password"   
                            value={props.value.password}
                          />
                      <i aria-hidden="true" className="lock icon"></i>
                      </div>  
                      <ErrorMessage name='password' component="div" className="ui pointing red basic label"/>        
                    </div>             
                          <Button color='teal' fluid size='large' type='submit' >
                          Login
                          </Button>

                  </Segment>
                </Form>
          
                     )}
              </Formik>
          <Message>
            New to us ? <a href='#'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
      </div>
    );
}
}

export default Login;


