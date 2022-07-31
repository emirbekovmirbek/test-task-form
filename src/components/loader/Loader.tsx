import React from 'react';
import './loader.css'

type PropsType = {
  loading: boolean
}
const Loader: React.FC<PropsType> = ({loading}) => {
  return (
    <div className={`loader ${loading && 'loader--active'}`}>
      <div className="lds-roller">
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
    </div>
  );
};

export default Loader;