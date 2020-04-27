import React from 'react';

import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import AntPath from "react-leaflet-ant-path";

import userIconURL from './user_location.svg'
import messageIconURL from './message_location.svg'

// import { AntPath, antPath } from 'leaflet-ant-path';
    
// // Usethe constructor...
// let antPolyline = new AntPath(latlngs, options);

// // ... or use the factory
// antPolyline = antPath(latlngs, options);   

// antPolyline.addTo(map);

const options = { use: L.polyline, delay: 400, dashArray: [10,20], weight: 5, color: "#0000FF", pulseColor: "#FFFFFF" };

const myIcon = L.icon({
    iconUrl: userIconURL,
    iconSize: [50, 82],
    iconAnchor: [0, 82],
    popupAnchor: [25, -50], 
  });
  
  const messageIcon = L.icon({
    iconUrl: messageIconURL,
    iconSize: [50, 82],
    iconAnchor: [0, 82],
    popupAnchor: [25, -50],
  });

 
const mapComp =  (props)=>{
    const position = [props.location.lat, props.location.lng]
    let polyline =   [[],[position] ]
    
    for (let key in props.messages){
   polyline[0].push([+props.messages[key].latitude,+props.messages[key].longitude])
    }
    console.log(polyline);
    

    
    return(
        <Map className="map" center={position} zoom={props.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />{ props.haveUsersLocation?
       
        <Marker 
          icon={myIcon}
          position={position}>
        </Marker>
          : ''
        } 
        {/* {props.messages.map(message=>(
          <Marker 
          key = {message._id}
          position={[message.latitude,message.longitude]}
          icon={messageIcon}>
          <Popup>
            <em>{message.name}:</em> {message.message}
          </Popup>
        </Marker> 
        ))} */}
        
          <AntPath positions={polyline} options={options} />  
        
      </Map>
    )
}

export default mapComp