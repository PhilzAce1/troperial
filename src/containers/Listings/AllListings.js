import React, { Fragment, useEffect, useState } from 'react';
import TableContent from '../../components/TableContent/TableContent';
import TableHead from '../../components/TableHead/TableHead';
import { currency_symbols } from '../../constants/currency_symbols';
import { currency_titles } from '../../constants/currency_titles';
import { getTransactions } from '../../actions/transactionActions';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Pagination from 'react-pagination-js';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
const AllListings = ({
  getTransactions,
  sortedTransactions,
  totalElements,
  totalPages,
  loading,
  changeCurrentPage,
  currentPage,
  prevPage,
  nextPage,
  currentSize,
  handleBackDrop,
}) => {
  const [personId, setPersonId] = useState('');
  useEffect(() => {
    getUserPersonId();
    getTransactions();
  }, [getTransactions]);

  const getUserPersonId = async () => {
    const currentUserInfo = await Auth.currentUserInfo();
    try {
      let personId = currentUserInfo.attributes['custom:personId'];
      setPersonId(personId);
    } catch (e) {
      setPersonId('');
      console.log(e);
    }
  };
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
        {sortedTransactions
          .filter((transaction) => transaction.personId !== personId)
          .map((transaction) => {
            const {
              sourceAmount,
              userAlias,
              sourceCurrency,
              destinationCurrency,
              transactionState,
              transactionId,
              personId,
              preferredExchangeRate,
            } = transaction;
            return (
              <TableContent
                have={`${currency_symbols[sourceCurrency]} ${sourceAmount}`}
                need={`(${currency_symbols[destinationCurrency]}) ${currency_titles[destinationCurrency]}`}
                rate={sourceCurrency === 'NGN' ? `${currency_symbols[sourceCurrency]} ${preferredExchangeRate} = ${currency_symbols[destinationCurrency]} 1`:`${currency_symbols[sourceCurrency]} 1 = ${currency_symbols[destinationCurrency]} ${preferredExchangeRate}`}
                by={`@${userAlias}`}
                status={transactionState}
                userListings={false}
                key={transactionId}
                handleBackDrop={handleBackDrop}
                personId={personId}
                transaction={transaction}
              />
            );
          })}
      </div>
      <div className="listing_pagination">
        <Pagination
          currentPage={currentPage}
          totalSize={totalElements}
          sizePerPage={currentSize}
          changeCurrentPage={changeCurrentPage}
          totalPages={totalPages}
          theme="bootstrap"
        />
        <div className="listings_mobile_buttons">
          {currentPage === 1 ? null : (
            <button
              className="listing_previous"
              onClick={() => prevPage()}
            >
              Previous
            </button>
          )}
          <button
            className="listing_showMore"
            onClick={(e) => nextPage()}
          >
            Show More
          </button>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  sortedTransactions: state.transaction.sortedTransactions,
  totalElements: state.transaction.totalElements,
  totalPages: state.transaction.totalPages,
  loading: state.transaction.loading,
  size: state.transaction.size,
});

export default connect(mapStateToProps, {
  getTransactions,
})(AllListings);
