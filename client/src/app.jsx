import React from 'react';
// import axios from 'axios';
import { InfoList } from './InfoList.jsx';
// import MapContainer from './MapContainer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: props.restaurant
    };
    // this.getRestaurantData(props.restaurantId);
  }

  // getRestaurantData (id) {
  //   axios.get(location.origin + '/api/restaurants/' + id + '/sidebar')
  //     .then((response) => {
  //       // console.log('received:', response.data);
  //       this.setState({ restaurant: response.data });
  //     }).catch((err) => {
  //       console.error('Failed to fetch restaurant data from server:', err);
  //     });
  // }

  render() {
    // console.log(this.props);
    if (!this.props.data) {
      return <div> Loading Sidebar... </div>;
    } else {
      return (
        <div className="sidebar-flexbox-col sidebar-app">
          <InfoList restaurant={this.props.data} />
          {/* <MapContainer geometry={this.props.data.geometry} /> */}
        </div>
      );
    }
  }
}
// if (typeof window !== "undefined"){ 
//   ReactDOM.render(<App data={window.initData} />, document.getElementById('sidebar-app'));
// }
export { App };
