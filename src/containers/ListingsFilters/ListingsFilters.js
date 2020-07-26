import React, { useState } from 'react';
import './ListingsFilters.css';

import HybridInput from '../../components/HybridInput/HybridInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {
  getTransactions,
  applyFilter,
  notifyUser,
} from '../../actions/transactionActions';

import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

const ListingsFilters = ({
  listSizeHandler,
  applyFilter,
  transactions,
  notifyUser,
  getTransactions,
}) => {
  const { register, handleSubmit } = useForm();
  const [showFilter, setShowFilter] = useState(false);

  const onSubmit = (data) => {
    const copyTransactions = [...transactions];
    let tempTransactions = copyTransactions.filter(function (item) {
      for (var key in data) {
        if (item[key] === undefined || item[key] !== data[key])
          return false;
      }
      return true;
    });

    if (tempTransactions.length === 0) {
      notifyUser('Oops, No results!');
      return;
    } else {
      notifyUser(false);
      applyFilter(tempTransactions);
    }
  };

  return (
    <section className="listingsFilters">
      <div className="listings_show-number">
        <form action="">
          <label htmlFor="listings">Show:</label>
          <select
            id="listings"
            onChange={(e) => listSizeHandler(e.target.value)}
          >
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </form>
      </div>
      <div className="general-filter-section">
        <span
          className="general-filter-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          <span>Filter by: All</span>
          <i className="fas fa-caret-down"></i>
        </span>
        {showFilter && (
          <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="generalFilter__dropdown">
              <div className="have__and__need">
                <div>
                  <label htmlFor="have">Have</label>
                  <select
                    id="have"
                    name="sourceCurrency"
                    ref={register}
                  >
                    <option value="USD">USD</option>
                    <option value="NGN">NGN</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="need">Need</label>
                  <select
                    id="need"
                    name="destinationCurrency"
                    ref={register}
                  >
                    <option value="USD">USD</option>
                    <option value="NGN">NGN</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>
              <div className="preffered__rate">
                <div>
                  {/* <HybridInput /> */}
                  {/* <div className="exchange_icon">
                    <i className="exchange fas fa-exchange-alt"></i>
                  </div> */}
                  {/* <HybridInput /> */}
                </div>
              </div>

              {/* <div className="status">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="transactionState"
                  ref={register}
                >
                  <option value="LISTED">LISTED</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div> */}
              <CustomButton loading={false}>
                Apply filters
              </CustomButton>
             <div className="clear-filters" onClick={() => getTransactions()}>Clear Filters</div>
            </div>
          </form>
            
           </>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, {
  getTransactions,
  applyFilter,
  notifyUser,
})(ListingsFilters);
