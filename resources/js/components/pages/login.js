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
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Notification from '../pages/parts/notification';
import { connect } from 'react-redux';
import setLoginState from '../redux/actions/loginActions';

class Login extends Component{

  constructor(props){
      super(props);
      this.state={
        user:{
          id:null,
          name:null,
          token:'',
          isLogged:false
        },
        email:'',
        password:'',
        loading:false,
        notifyStatus:false,
        notifyTitle:'Login Error',
        notifyDescription:'Please try again with correct information',
        notifyColor:'red',
        
      }
      this.submit= this.submit.bind(this);
      this.schema= this.schema.bind(this);
      this.loginUser= this.loginUser.bind(this);
      this.notify= this.notify.bind(this);

  }
  
  /**
   * send login post request 
   * @param {*} email 
   * @param {*} password 
   * @author Mohammed M.Salha
   * @date 24/2/2021
   */
  async loginUser(){

    //POST request with a JSON body using axios
    const article = { email: this.state.email ,password:this.state.password};
    try {
          await axios.post('http://127.0.0.1:8000/api/auth/login',article).then(
          response=> {
            console.log(response)
            const user = response ;
            //change notification message to successfully login
            this.notify(true,'Success','You have successfully logged in. Please wait','green');
            this.setState({
              user:user
            })
            this.props.loginUser(user);
            //reload page
            window.location.reload();

        }).catch(error => {
              this.setState({loading:false});
              //change notification message to error 
              this.notify(true,'Login Error','Please try again with correct information','red');

      });
    } catch (error) {
              this.notify(true,'Login Error','Please try again with correct information','red');
    }
  }




   /**
     * update notification status
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
  * Submit form login
  * @param {*} values 
  * @author Mohammed M.Salha
  * @date 24/2/2021
  */
  submit(values){
    this.setState({loading:true});
    this.setState({
      email:values.email,
      password:values.password
    });

    //Send Post Request Via Axios
    this.loginUser();
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
              <Notification status={this.state.notifyStatus} color={this.state.notifyColor}  title={this.state.notifyTitle} description={this.state.notifyDescription} />
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
                            <ErrorMessage name='email' component="div" className="ui pointing red basic label" /> 
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
                            <Button loading={this.state.loading} disabled={this.state.loading}  color='teal' fluid size='large' type='submit' >
                            Login
                            </Button>

                    </Segment>
                  </Form>
            
                      )}
                </Formik>
            <Message>
              New to us ? <a href='/register'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
        </div>
      );
  }
}

 
const mapDispatchToProps = (dispatch) =>{
  return {
    loginUser : (userInfo)=> dispatch(setLoginState(userInfo))
  };
};
export default connect(null ,mapDispatchToProps )(Login);


