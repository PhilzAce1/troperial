import React from 'react';
import './PostTrade.css';
import HybridInput from '../HybridInput/HybridInput';
import CustomButton from '../CustomButton/CustomButton';
import InputError from '../InputError/InputError';
const PostTrade = () => {
  return (
    <div className="post__listing-container">
      <h2 className="title">Post a Listing</h2>
      <div className="first__form__group">
        <HybridInput line={true} />
        <HybridInput line={true} />
        <p className="trending__market__rate summary">
          Trending market rate{' '}
          <span className="price__summary">- USD 1 = NGN 470</span>
        </p>
      </div>
      <h4 className="subtitle">Prefferd exchange rate</h4>
      <div className="inline_hybridInput">
        <HybridInput />
        <i className="exchange-desktop fas fa-exchange-alt"></i>
        <HybridInput />
      </div>
      <p className="summary">
        At this rate i'd get{' '}
        <span className="price__summary">$2342</span>
      </p>
      <div className="checkbox__area">
        <input type="checkbox" />
        <p>Show to only trusted traders</p>
      </div>
      <CustomButton loading={false}>Post this Trade</CustomButton>
    </div>
  );
};

export default PostTrade;
