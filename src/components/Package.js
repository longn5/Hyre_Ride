import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as packageActionCreators from '../actions/packages';
import SinglePackage from './SinglePackage';
import './Package.css';

const WrapPackageInRow = ({doublePackages}) => {
  return (
    <div className="winery-row">
      {
         doublePackages[0] &&
           <SinglePackage name={doublePackages[0].name} singlePackage={doublePackages[0]} />
      }
      {
         doublePackages[1] &&
           <SinglePackage name={doublePackages[1].name} singlePackage={doublePackages[1]} />
      }
    </div>
  );
};

class Package extends React.Component {
  componentWillMount() {
    const id = this.props.match.params.packageid;
    this.props.packageActions.getPackage(id);
  }

  render() {
    const packageRows = [];
    const packages = this.props.packages;
    for (let i = 0; i < packages.length; i += 2) {
      packageRows.push(
        <div key={i}>
        <WrapPackageInRow  doublePackages={[packages[i], packages[i + 1]]} />
        </div>
      );
    }
    return (
      <div className="wineries">
        {packageRows}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return ({
    packages: state.packages.data
  });
};

const mapDispatchToProps = dispatch => ({
  packageActions: bindActionCreators(packageActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Package);
