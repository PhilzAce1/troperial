import React from 'react';
import './NewsCard.css';
const NewsCard = ({img, headline}) => {
    return (
        <div className="newsCard">
            <img className="thumbnail-image" src={img} alt="news thumnail"/>
            <p className="card-content">{headline}</p>
        </div>
    )
}

export default NewsCard
