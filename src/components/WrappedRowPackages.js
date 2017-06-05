import React from 'react';

const WrappedRowPackages = ({packages, Component, selectedId, onClickFn, onErrorFn}) => {
  const wrappedRowPackages = [];
  for (let i = 0; i < packages.length; i += 2) {
    if (!packages[i + 1]) {
      wrappedRowPackages.push(
        <div className="two-packages-row" key={packages[i].name} style={{paddingRight: '10px'}}>
          <Component
            packageDispaly={packages[i]}
            onErrorFn={onErrorFn}
            selectedId={selectedId}
            onClickFn={onClickFn}
          />
          <div className="packageBox-display hide" />
        </div>
      );
    } else {
      wrappedRowPackages.push(
        <div className="two-packages-row" key={packages[i].name}>
          <Component
            packageDispaly={packages[i]}
            onErrorFn={onErrorFn}
            selectedId={selectedId}
            onClickFn={onClickFn} />
          <Component
            packageDispaly={packages[i + 1]}
            onErrorFn={onErrorFn}
            selectedId={selectedId}
            onClickFn={onClickFn}
          />
        </div>
      );
    }
  }

  return <span>{wrappedRowPackages}</span>;
};

export default WrappedRowPackages;
