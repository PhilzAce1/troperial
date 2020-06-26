import React from 'react'
import './XchangeRateBanner.css';
import RateCard from './RateCard';
const XchangeRateBanner = ({position}) => {
    return (
       <div className="banner__container-xchange" style={{position: position}}>
            <div className="exchangeRate__banner">
            <RateCard/>
            <RateCard/>
            <RateCard/>
            <RateCard/>
            <RateCard/>
            <RateCard/>
            <RateCard/>
            <RateCard/>
            <RateCard/>
         
        </div>
       </div>
    )
}

XchangeRateBanner.defaultProps = {
    position: 'relative'
}

export default XchangeRateBanner
