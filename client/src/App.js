import React,{Component} from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import Joi from 'joi'
import { Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input } from 'reactstrap';

import userIconURL from './user_location.svg'
import messageIconURL from './message_location.svg'

var myIcon = L.icon({
  iconUrl: userIconURL,
  iconSize: [50, 82],
  iconAnchor: [0, 82],
  popupAnchor: [25, -50],
});

var messageIcon = L.icon({
  iconUrl: messageIconURL,
  iconSize: [50, 82],
  iconAnchor: [0, 82],
  popupAnchor: [25, -50],
});


const schema = Joi.object().keys({
  name: Joi.string().min(1).max(100).required(),
  message: Joi.string().min(1).max(500).required(),
})

const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/messages' :'https://live-gps-location.herokuapp.com/api/v1/messages'

class App extends Component{
  state = {
    location:{
      lat: 51.50561254,
      lng: -0.09221545,
    },
    haveUsersLocation:false,
    zoom: 2,
    userMessage:{
      name:'',
      message:''
    },
    sendingMessage: false,
    sentMessage:false,
    messages:[]
  }

  componentDidMount(){

    fetch(API_URL).then(res=>res.json())
        .then(messages=>{
          this.setState({
            messages
          })
        })

    navigator.geolocation.getCurrentPosition((position)=>{
      this.setState({
        location:{
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        haveUsersLocation:true,
        zoom:13
      })
    },()=>{
      fetch('https://ipapi.co/json')
        .then(res=>res.json())
        .then(location=>{
          this.setState({
            location:{
              lat: location.latitude,
              lng: location.longitude
            },
            haveUsersLocation:true,
            zoom:13
          })
        })
    })
  }

  formIsValid = () =>{
    const userMessagelocal ={
      name: this.state.userMessage.name,
      message: this.state.userMessage.message
    }
    const result =  Joi.validate(userMessagelocal,schema)

    return !result.error && this.state.haveUsersLocation ? true : false
  }

  formSubmited= (event) =>{
      event.preventDefault();
      console.log(this.state.userMessage);
      
      if (this.formIsValid()){
        this.setState({
          sendingMessage:true
        })
        fetch(API_URL,{
          method: 'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify({
            name: this.state.userMessage.name,
            message: this.state.userMessage.message,
            longitude: this.state.location.lng,
            latitude:this.state.location.lat
          })
        }).then(res=> res.json())
          .then(message=>{
            console.log(message)
           setTimeout(() => {
              this.setState({
                sendingMessage:false,
                sentMessage:true
              })
            }, 4000);
            
            
          })
      }
  }
  valueChanged= (event)=>{
    const {name,value} = event.target
    this.setState((prevState)=>({
      userMessage:{
        ...prevState.userMessage,
        [name]:value
      }
    }))
  }
render(){
  
  const position = [this.state.location.lat, this.state.location.lng]
  return (
    <div className="map">
      <Map className="map" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />{ this.state.haveUsersLocation?
        <Marker 
          icon={myIcon}
          position={position}>
        </Marker>
          : ''
        } 
        {this.state.messages.map(message=>(
          <Marker 
          key = {message._id}
          position={[message.latitude,message.longitude]}
          icon={messageIcon}>
          <Popup>
            <em>{message.name}:</em> {message.message}
          </Popup>
        </Marker> 
        ))}
      </Map>
        <Card body className="message-form" style={{position:'absolute'}} >
          <CardTitle>Welcome to Guest app</CardTitle>
          <CardText>Leave a message with your location</CardText>
          <CardText>Thanks for stoppingby!</CardText>
          {!this.state.sendingMessage && !this.state.sentMessage && this.state.haveUsersLocation ?
          <Form onSubmit={this.formSubmited}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input 
              onChange={this.valueChanged}
              type="text" 
              name="name" 
              id="name" 
              placeholder="Enter your name" />
          </FormGroup>
          <FormGroup>
            <Label for="message">Message</Label>
            <Input 
              onChange={this.valueChanged}
              type="textarea" 
              name="message" 
              id="message" 
              placeholder="Enter your message" />
          </FormGroup>
          <Button type="submit" color="info" disabled={!this.formIsValid}>Submit</Button>
          </Form>
          :  this.state.sendingMessage || !this.state.haveUsersLocation ? 
            <video alt="Loading..." autoPlay loop src="https://i.giphy.com/media/BCIRKxED2Y2JO/giphy.mp4" ></video>
             : <CardText>Thanks for submitting a message!</CardText>

          }
        </Card>
    </div>
  )
}

}
export default App;
