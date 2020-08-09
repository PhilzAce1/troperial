import React from 'react';
import NewsCard from '../../components/NewsCard/NewsCard';
import blog1 from '../../assets/images/blog1.png'; 
import blog2 from '../../assets/images/blog2.png'; 
import blog3 from '../../assets/images/blog3.png'; 
import './NewsList.css';
const NewsList = () => {
  return (
   
    <div className="news_container">
      <NewsCard img={blog1} headline="EUR/JPY Price Analysis: Euro’s bear trend remains intact vs Japanse yen"/>
      <NewsCard img={blog2} headline="Pound Rises To One-Week Highs Before U.S. Data - REUTERS"/>
      <NewsCard img={blog3} headline="Dollar Steadies Before U.S. Jobs Data, Riskier FX Up On OPEC Hopes - REUTERS"/>
    </div>

  );
};
export default NewsList;
