import React, { Component } from "react";
import './Tile.css';
import {Link} from 'react-router-dom';

class Tile extends Component {
 
  render() {
    return (
    <div className="Tile">
    <Link to=""><img src={this.props.imgURL} alt={this.props.author} /></Link>
    </div>);
    }
}
export default Tile;