import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet' 
import axios from 'axios';
import './WorldMap.css';

 
class WorldMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 34.145918, 
      lng: -118.153033,
      zoom: 3
    }
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    console.log('inside componentDidMount')
    setInterval(
      () => this.getLocation(),60000
    );
  }
  getLocation(){
    let _this = this;
    console.log('in getLocation')
    
    axios.get("http://api.open-notify.org/iss-now.json")
      .then(function (response) {
        console.log(response.data.iss_position);
        let coordinates = response.data.iss_position;
        _this.setState(state => ({
          lat : coordinates.latitude,
          lng : coordinates.longitude
        }));    
        
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
          />
          <Marker position={position}>
            <Popup>
              <h3>ISS Coordinates:</h3>
              Latitude: {this.state.lat} <br/>
              Longitude: {this.state.lng}
              
            </Popup>
          </Marker>
        </Map>
        <button onClick={this.getLocation}>Get Location</button>
      </div>

    );
  }
}

//ReactDOM.render(<SimpleExample />, document.getElementById('container'))

export default WorldMap;