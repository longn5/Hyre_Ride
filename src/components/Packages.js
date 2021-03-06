import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import 'react-responsive-carousel/lib/styles/carousel.css';
import PackageDispaly from './PackageDisplay';
import WrappedRowPackages from './WrappedRowPackages';
import * as packagesActionCreators from '../actions/packages';
import './Packages.css';
import './PackageDisplay.css';

class Packages extends React.Component {
  componentWillMount() {
    this.props.packagesActions.getAllpackages();
  }
  render() {
    return (
      <div style={{marginTop: '60px'}}>
        <h3 style={{display: 'flex', justifyContent: 'center', color: '#3c7eff'}}>
          Pick from one of the packages below to plan your adventure
        </h3>
        <WrappedRowPackages packages={this.props.packages} Component={PackageDispaly} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    packages: state.packages.data,
    loading: state.packages.loading
  });
};

const mapDispatchToProps = dispatch => ({
  packagesActions: bindActionCreators(packagesActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Packages);
