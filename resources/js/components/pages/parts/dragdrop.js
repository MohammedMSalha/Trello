import react,{Component} from 'react';
import {Draggable, Droppable, DragDropContext} from "react-beautiful-dnd";
import { Grid, Menu,Container,Segment,Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {store} from '../../redux/store';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';


class DragDrop extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            1:{
                title : <Segment ><Header as='h4' inverted color='orange'>
                           Pending
                        </Header></Segment>,
                items : [
                 
                ]
            },
            2:{
                title : <Segment ><Header as='h4' inverted color='brown'>
                            In Progres
                        </Header></Segment>,
                items : []
            },
            3:{
                title : <Segment ><Header as='h4' inverted color='green'>
                            Done
                        </Header></Segment>,
                items : []
            },
            4:{
                title : <Segment ><Header as='h4' inverted color='red'>
                            Rejected
                        </Header></Segment>,
                items : []
            }
        }
       this.handleDrag=this.handleDrag.bind(this);
    }


    async componentDidMount(){
        //POST request with a JSON body using axios
        const auth = { 'Authorization':store.getState().Reducer.data.token_type+' '+store.getState().Reducer.data.access_token};
        console.log(auth);

        try {
              await axios.get('http://127.0.0.1:8000/api/auth/tickets',{headers:auth}).then(
                response=> {
                //this.setState({data:response.data});
                _.map(this.state,(data,key)=>{
                    _.map(response.data,(el,index)=>{
                        if(index==key)  {
                            const newItems = {...this.state[key]};
                            newItems.items = el;
                            this.setState({
                                [key]: newItems
                            });
                        }
                    })
                })
                
            }).catch(error => {
                    //this.setState({loading:false});
                    console.error('There was an error!', error);
                    
            });
        } catch (error) {
            console.log(error);
        }
    }



    /**
    * Handle with Drag Drop event between source and destination board
    * @param {*} data 
    */
    handleDrag(data){
  
         //POST request with a JSON body using axios
         const article = { 'Authorization':store.getState().Reducer.data.token_type+' '+store.getState().Reducer.data.access_token};
          try {
                 axios.put('http://127.0.0.1:8000/api/auth/tickets/'+data.draggableId,{desination:data.destination.droppableId,order:data.destination.index},{headers:article}).then(
                 response=> {
                 if(response.status==202){
                    _.map(this.state,(el,key)=>{
                            if(data.source.droppableId==key)  {
                                const newItems = {...this.state[key]};
                                var index = data.source.index;
                                // array index must be not equeat -1 
                                if (index !== -1) {
                                    const TransferObj= newItems.items.splice(index, 1);
                                    this.setState({[key]: newItems});
                                    //new distination update
                                    const newD = {...this.state[data.destination.droppableId]};
                                    newD.items.push(TransferObj[0]) ;
                                    //set new state ticket (new location in status boards)
                                    this.setState({
                                        [data.destination.droppableId]: newD
                                    }); 
                                }
                            }
                    })
                    toast({
                        type: 'success',
                        icon: 'envelope',
                        title: 'Successful Message',
                        description: 'Ticket status changed successfully',
                        animation: 'bounce',
                        time: 5000,
                    });
                 }else if (response.status==204){
                    toast({
                        type: 'warning',
                        icon: 'envelope',
                        title: 'Warning Message',
                        description: 'Ticket status cannot be changed to same status',
                        animation: 'bounce',
                        time: 5000,
                    });
                 }
                 
             }).catch(error => {
                    toast({
                        type: 'error',
                        icon: 'envelope',
                        title: 'Error Message',
                        description: 'error',
                        animation: 'bounce',
                        time: 5000,
                    });
                     
             });
         } catch (error) {
             console.log(error);
         }
        
    }
  
 


    render(){
     
         return (
            <Container textAlign='center'>
            <Grid>
            <Grid.Row columns={4}>
            <SemanticToastContainer />
            <DragDropContext onDragEnd={e=>this.handleDrag(e)}> 
                {
                    _.map({...this.state},(data,key)=>{               
                        return  (
                        <Grid.Column key={key.toString()}>
                                <h3>{data.title}</h3>
                                <Droppable droppableId={key.toString()}>
                                        {
                                            (provided)=>{
                                                return (
                                                    <div ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    >
                                                        <Menu fluid vertical > 
                                                    {data.items.map(
                                                        (el,index)=>{
                                                            return (
                                                                <Draggable key={el.id.toString()} index={index} draggableId={el.id.toString()}> 
                                                                    {
                                                                        (provided)=>{
                                                                            return (
                                                                                <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                >
                                                                                    <Menu.Item> <Segment>{el.title}</Segment></Menu.Item>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                
                                                                </Draggable>    
                                                            )
                                                        }
                                                    )}
                                                    {provided.placeholder}
                                                      </Menu>
                                                    </div>
                                                ); 
                                            }
                                        }
                                </Droppable>
                        </Grid.Column>
                        );
                    })
                }
            </DragDropContext>
            </Grid.Row>
            </Grid>
            </Container>
        );
    }
}
 
export default connect(null) (DragDrop);