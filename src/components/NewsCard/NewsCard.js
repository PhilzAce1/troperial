import React from 'react';
import image from '../../assets/images/news-sample-picture.PNG'; 
import './NewsCard.css';
const NewsCard = ({img}) => {
    return (
        <div className="newsCard">
            <img className="thumbnail-image" src={image} alt="news thumnail"/>
            <p className="card-content">Pound Rises to onw week highs before U.S Data - Reuters</p>
        </div>
    )
}

export default NewsCard
