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
import Notification from '../pages/parts/notification';



class Register extends Component{

  constructor(props){
      super(props);
      this.submit= this.handleRegister.bind(this);
      this.schema= this.schema.bind(this);
      this.state={
        loading:false,
        disabled:false,
        message :'',
        notifyStatus:false,
        notifyTitle:'Login Error',
        notifyDescription:'Please try again with correct information',
        notifyColor:'red',
      }
      this.notify=this.notify.bind(this);
  }
  



  handleRegister(values){

          this.setState({
              loading:true,
              disabled:true
          });
          const data = {
          name:values.name,
          email:values.email,
          password:values.password,
          password_confirmation : values.confirm_password
          }
          try {
                axios.post('http://127.0.0.1:8000/api/auth/register',data).then(
                response=> {
                  console.log(response);
                if(response.status==201){
                  this.notify(true,'Success','You have successfully Register. Please login now','green');
                  setTimeout(() => { 
                    this.props.history.push('/login');
                }, 5000)
                }else if(response.status==400){
                  this.setState({
                    loading:false,
                    disabled:false,
                });
                this.notify(true,'Login Error','This account is already registered','red');

                }
                
            }).catch(error => {
              this.setState({
                loading:false,
                disabled:false,
            });
            this.notify(true,'Login Error','Something went wrong, please try again later','red');
  
            });
        } catch (error) {
            this.setState({
              loading:false,
              disabled:false,
            });
            this.notify(true,'Login Error','Something went wrong, please try again later','red');

        }
  }






      /**
       * this to manage notification
       * @param {*} $status 
       * @param {*} $title 
       * @param {*} $desc 
       * @param {*} $color 
       */
    notify($status,$title,$desc,$color){
      this.setState({
        notifyStatus:$status,
        notifyTitle:$title,
        notifyDescription:$desc,
        notifyColor:$color
      })
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
              <Notification status={this.state.notifyStatus} color={this.state.notifyColor}  title={this.state.notifyTitle} description={this.state.notifyDescription} />
              <Formik
                initialValues={{name:'',email:'',password:'',confirm_password:''}}
                onSubmit={(values)=>this.handleRegister(values)}
                validationSchema={
                  this.schema()
                }
                >
                  { props =>(
                      
                  <Form size='large' onSubmit={props.handleSubmit}>
                    <Segment stacked>
                      <div className="field">
                        <div className="ui fluid left icon input">
                            <Field  type="name" name="name" placeholder='Name' />
                            <i aria-hidden="true" className="user icon"></i>
                        </div> 
                            <ErrorMessage name='name' component="div" className="ui pointing red basic label"/> 
                      </div> 
                      <div className="field">
                        <div className="ui fluid left icon input">
                            <Field  type="email" name="email" placeholder='E-mail Address' />
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
                            />
                            <i aria-hidden="true" className="user icon"></i>
                        </div> 
                            <ErrorMessage name='confirm_password' component="div" className="ui pointing red basic label"/> 
                      </div> 
                          
                            <Button loading={this.state.loading} disabled={this.state.loading} color='teal' fluid size='large' type='submit' >
                            Sign Up
                            </Button>
                    </Segment>
                  </Form>
            
                      )}
                </Formik>
            <Message>
              you have account ? <a href='/login'>Login</a>
            </Message>
          </Grid.Column>
        </Grid>
        </div>
      );
  }
}

export default Register;


