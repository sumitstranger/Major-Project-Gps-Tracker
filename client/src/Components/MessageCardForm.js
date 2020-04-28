import React from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';
import Moment from 'react-moment';

const MessageCardForm = (props) => {
  return (
    <Card body className='message-form' style={{ position: 'absolute' }}>
      {props.haveUsersLocation ? (
        <p>
          Last Location time:
          <Moment fromNow>{props.date}</Moment>
        </p>
      ) : props.sendingMessage || !props.haveUsersLocation ? (
        <video
          alt='Loading...'
          autoPlay
          loop
          src='https://i.giphy.com/media/BCIRKxED2Y2JO/giphy.mp4'
        ></video>
      ) : (
        <CardText>Thanks for submitting a message!</CardText>
      )}
    </Card>
  );
};

export default MessageCardForm;
