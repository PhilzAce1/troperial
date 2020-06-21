import React, { Fragment, useEffect } from 'react';
import TableContent from '../../components/TableContent/TableContent';
import TableHead from '../../components/TableHead/TableHead';
import { currency_symbols } from '../../constants/currency_symbols';
import { currency_titles } from '../../constants/currency_titles';
import { getMyTransactions } from '../../actions/myTransactionActions';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Pagination from 'react-pagination-js';
import { connect } from 'react-redux';
const MyListings = ({
  getMyTransactions,
  mySortedTransactions,
  loading,
  handleBackDrop,
  handleDeleteModal 
}) => {
  useEffect(() => {
    getMyTransactions();
  }, [getMyTransactions]);
  if (loading) {
    return (
      <div className="listings_spinner">
        <ScaleLoader size={150} color={'#0383ef'} loading={true} />
      </div>
    );
  }
  return (
    <Fragment>
      <div className="table-container">
        <TableHead userListing={false} />
        {mySortedTransactions.map((transaction) => {
          const {
            sourceAmount,
            destinationAmount,
            userAlias,
            sourceCurrency,
            destinationCurrency,
            transactionState,
            transactionId,
          } = transaction;
          return (
            <TableContent
              have={`${currency_symbols[sourceCurrency]} ${sourceAmount}`}
              need={`(${currency_symbols[destinationCurrency]}) ${currency_titles[destinationCurrency]}`}
              rate={`USD 1 > NGN 470`}
              status={transactionState}
              userListings={true}
              key={transactionId}
              onClick={handleDeleteModal}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  mySortedTransactions: state.myTransaction.mySortedTransactions,
  loading: state.myTransaction.loading,
});

export default connect(mapStateToProps, {
  getMyTransactions,
})(MyListings);
