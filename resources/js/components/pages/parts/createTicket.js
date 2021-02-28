import react,{Component} from 'react';
import { Button, Modal,Form,Segment  } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {Formik,Field,ErrorMessage} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { connect } from 'react-redux';
import {store} from '../../redux/store';
import Notification from '../../pages/parts/notification';

class CreateTicket extends Component{
    
    constructor(props){
        super(props);
        this.state={
            open:false,
            notifyStatus:false,
            notifyTitle:'Login Error',
            notifyDescription:'Please try again with correct information',
            notifyColor:'red',
        }

        this.schema=this.schema.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.notify=this.notify.bind(this);

    }




    /**
    * Schema objects are immutable, so each call of a method returns a new schema object. 
    * When using es module syntax, yup exports everything as a named export
    * @field title,description,file
    * @returns Schema
    * @author Mohammed M.Salha
    * @date 24/2/2021
    */
    schema(){
      let schema = yup.object().shape({
        title:yup.string().max(125, "title max length 125").required(),
        description:yup.string().required() ,
        file: yup
        .mixed()
        .required("A file is required")
      });
      return schema;
    }



    handleSubmit(values){
      const auth = { 'Authorization':store.getState().Reducer.data.token_type+' '+store.getState().Reducer.data.access_token};
      try {
                 axios.post('http://127.0.0.1:8000/api/auth/tickets/',values,{'headers':auth}).then(
                response=> {
                 if(response.status==201){
                  window.location.reload();
                 }else if(response.status!=500){
                  this.notify(true,'Error','Something went wrong, please try again','red');
                 }
                  
              }).catch(error => {
                 this.notify(true,'Error','Something went wrong, please try again','red');

            });
          } catch (error) {
                this.notify(true,'Error','Something went wrong, please try again','red');
          }
    }


    /**
     * Update notification status
     * @param {*} status 
     * @param {*} title 
     * @param {*} desc 
     * @param {*} color 
     */
    notify(status,title,desc,color){
      this.setState({
        notifyStatus:status,
        notifyTitle:title,
        notifyDescription:desc,
        notifyColor:color
      })
    }



    render(){
        return (
            <Modal
            onClose={() => this.setState({open:false}) }
            onOpen={() =>  this.setState({open:true}) }
            open={this.state.open}
            trigger={<Button color='violet' >CREATE TICKET</Button>}
          >
            <Modal.Header>Create New Ticket</Modal.Header>
            <Modal.Content>
              <Modal.Description>
              <Notification status={this.state.notifyStatus} color={this.state.notifyColor}  title={this.state.notifyTitle} description={this.state.notifyDescription} />
                <Formik
                initialValues={{title:'',description:'',file:''}}
                onSubmit={(values)=>this.handleSubmit(values)}
                validationSchema={
                  this.schema()
                }
                >
                  { props =>(
                      
                  <Form size='large' onSubmit={props.handleSubmit} encType={'multipart/form-data'}>
                    <Segment stacked>
                      <div className="field">
                        <div className="ui fluid left icon input">
                            <Field  type="text" name="title" placeholder='Enter Ticket Title' />
                            <i aria-hidden="true" className="ticket icon"></i>
                        </div> 
                            <ErrorMessage name='title' component="div" className="ui pointing red basic label" /> 
                      </div> 
                      <div className="field">  
                        <div className="ui fluid left icon input">
                            <Field
                              placeholder='Enter Description'
                              type='textarea'
                              name="description"   
                            />
                        <i aria-hidden="true" className="edit icon"></i>
                        </div>  
                        <ErrorMessage name='description' component="div" className="ui pointing red basic label"/>        
                      </div>             
                      <div className="ui fluid left icon input">
                            <Field id="file" type="file" name="file" placeholder='Upload File' />
                            <i aria-hidden="true" className="file icon"></i>
                      </div> 
                      <ErrorMessage name='file' component="div" className="ui pointing red basic label"/>        

                      </Segment>
                      <Modal.Actions>
                        <Button color='black' onClick={() => this.setState({open:false}) }>
                          Close
                        </Button>
                        <Button   type='submit'
                          content="Create"
                          labelPosition='right'
                          icon='checkmark'
                          positive
                        />
                      </Modal.Actions>
                   
                  </Form>
            
                      )}
                </Formik>
              </Modal.Description>
            </Modal.Content>
           
          </Modal>
        );
    }
}
export default connect(null) (CreateTicket);