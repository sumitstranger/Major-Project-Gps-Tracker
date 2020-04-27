import React,{Component} from 'react';
import './App.css';

 

import MessageCardForm from './Components/MessageCardForm'
import {getMessages,getLocation} from './Components/API'
import MapComp from './Components/Map/MapComp'




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

    getMessages()
        .then(messages=>{
          console.log(messages);
          
          this.setState({
            messages
          })
        })

        getLocation()
        .then(location => {
          this.setState({
            location,
            haveUsersLocation: true,
            zoom: 13
          });
        });
  }


 

render(){
  
  return (
    <div className="map">

      <MapComp 
        location ={this.state.location}
        zoom = {this.state.zoom}
        messages={this.state.messages}
        haveUsersLocation ={ this.state.haveUsersLocation}
      />

      <MessageCardForm 
      sendingMessage={this.state.sendingMessage}
      sentMessage={this.state.sentMessage}
      haveUsersLocation={this.state.haveUsersLocation}
      />
    </div>
  )
}

}
export default App;

