import React from 'react';
import './ListingsFilters.css';
import HybridInput from '../../components/HybridInput/HybridInput';
import CustomButton from '../../components/CustomButton/CustomButton';

const ListingsFilters = () => {
  return (
    <form action="">
      <section className="listingsFilters">
        <div className="listings_show-number">
          <label for="listings">Show:</label>
          <select id="listings">
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="9">10</option>
          </select>
        </div>
        <div class="general-filter-section">
          <span className="general-filter-btn">
            <span>Filer by: All</span>{' '}
            <i className="fas fa-caret-down"></i>
          </span>
          <div className="generalFilter__dropdown">
            <div className="have__and__need">
              <div>
                <label for="have">Have</label>
                <select id="have">
                  <option value="USD">USD</option>
                  <option value="NGN">NGN</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div>
                <label for="need">Need</label>
                <select id="need">
                  <option value="USD">USD</option>
                  <option value="NGN">NGN</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <div className="preffered__rate">
              <div>
                <HybridInput />
                <div className="exchange_icon">
                  <i className="exchange fas fa-exchange-alt"></i>
                </div>
                <HybridInput />
              </div>
            </div>
            <div className="status">
              <label for="status">Status</label>
              <select id="status">
                <option value="Pending">Pending</option>
                <option value="completed">NGN</option>
              </select>
            </div>
            <CustomButton loading={false}>Apply filters</CustomButton>
          </div>
        </div>
      </section>
    </form>
  );
};

export default ListingsFilters;
