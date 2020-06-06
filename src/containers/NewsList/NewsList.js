import React from 'react';
import NewsCard from '../../components/NewsCard/NewsCard';
import './NewsList.css';
const NewsList = () => {
  return (
   
    <div className="news_container">
      <NewsCard />
      <NewsCard />
      <NewsCard />
    </div>

  );
};
export default NewsList;
