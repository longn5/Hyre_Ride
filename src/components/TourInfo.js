import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActionCreators from '../actions/auth';

class TourInfo extends React.Component {
  render() {
    return (
      <div>
        <h3>Multonomah Falls</h3>
        <div>$45</div>
        <div>
        The falls drops in two major steps,
        split into an upper falls of 542 feet (165 m)
        and a lower falls of 69 feet (21 m),
        with a gradual 9 foot (3 m) drop in elevation
        between the two, so the total height of the
        waterfall is conventionally given as 620 feet (189 m).
        The two drops are due to a zone of more easily eroded basalt at the base of the upper falls.
        </div>
      </div>
    );
  }
}

export default TourInfo;
