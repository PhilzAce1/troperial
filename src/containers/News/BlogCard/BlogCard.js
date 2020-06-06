import React from 'react';
import image from '../../../assets/images/news-sample-picture.PNG'; 
import './BlogCard.css';
import {Link} from 'react-router-dom';
const NewsCard = ({img}) => {
    return (
        <div className="blogCard">
            <img className="blog-thumbnail-image" src={image} alt="news thumnail"/>
            <div className="blog-thumbnail-title">
                <h1>OPEC+ agreed in principle for 10 million bpd cut for May-June</h1>
            <p className="blog-card-content">
                Pound Rises to onw week highs before U.S Data
                Pound Rises to onw week highs before U.S Data
                Pound Rises to onw week highs before U.S Data
                </p>
            <Link to="/single" className="blog-link">Read more</Link>
            </div>
        </div>
    )
}
export default NewsCard
