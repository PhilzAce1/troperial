import React from 'react';
import './FifthSection.css';
import NewsList from '../../NewsList/NewsList';
import {Link} from 'react-router-dom';
import Slide from 'react-reveal/Slide';
const FifthSection = () => {
  return (
    <section className="news_section">
      <div className="header">
        <h1>The Latest market news</h1>
        <p>
        Want to know what’s happening in the market?
        </p>
        <Link className="get-learn-more" to="/">
          Learn More
        </Link>
      </div>
      <Slide bottom>
      <NewsList />
      </Slide>
    </section>
  );
};

export default FifthSection;
