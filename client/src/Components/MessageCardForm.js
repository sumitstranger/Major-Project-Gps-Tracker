import React from 'react';
import { Card, CardTitle, CardText} from 'reactstrap';


const MessageCardForm = (props)=>{
    return(
<Card body className="message-form" style={{position:'absolute'}} >
    <CardTitle>Welcome to Guest app</CardTitle>
    <CardText>Leave a message with your location</CardText>
    <CardText>Thanks for stoppingby!</CardText>
 
    {props.haveUsersLocation ?
            <p>Last Location </p>
    :  props.sendingMessage || !props.haveUsersLocation ?   
  
    <video alt="Loading..." 
           autoPlay
           loop 
           src="https://i.giphy.com/media/BCIRKxED2Y2JO/giphy.mp4" ></video>
    
    : <CardText>Thanks for submitting a message!</CardText>

    }
</Card>
    
    )}

export default MessageCardForm;