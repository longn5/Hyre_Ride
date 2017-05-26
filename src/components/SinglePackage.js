import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as packageActionCreators from '../actions/packages';
import './Package.css';

class SinglePackage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
      value: `${props.singlePackage.category},${props.singlePackage.name},1`
    }
  }

  onSubmit = () => {
    let setValue = !this.state.selected;
    if (!setValue) {
      this.props.packageActions.removeDestinations(this.state.value);
    } else {
      this.props.packageActions.addSelectedDestination(this.state.value);
    }
    this.setState({selected: setValue});
  }

  render() {
    const {singlePackage} = this.props;
    console.log(this.state.selected);
  return (
    <div className="packageBox">
      <div className="packageHeader">
          <span>
            <span>Time you want spend: </span>
            <span>
              <select
                value={this.state.value}
                className={this.state.selected ? 'selected-select' : ''}
                disabled={this.state.selected}
                onChange={(event) => this.setState({value: event.target.value})}>
              <option value={`${singlePackage.category},${singlePackage.name},1`}>1</option>
              <option value={`${singlePackage.category},${singlePackage.name},2`}>2</option>
              <option value={`${singlePackage.category},${singlePackage.name},3`}>3</option>
            </select>
            </span>
        </span>
            <span>
        <span
        onClick={this.onSubmit}
        className={this.state.selected ? 'package-button-selected' : 'package-button'}>
        Select
        </span>
        </span>
      </div>
      <img
        style={{paddingRight: '10px'}}
        width={400}
        src={singlePackage.image} />
      <div className="short-description">
        <span>{singlePackage.description}</span>
        <div className="websiteLink">Learn more at: <a href={singlePackage.website}>Website Link</a></div>
      </div>
    </div>
  );
}
};

const mapStateToProps = state => {
  return ({
    packages: state.packages.destinations
  });
};

const mapDispatchToProps = dispatch => ({
  packageActions: bindActionCreators(packageActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePackage);
