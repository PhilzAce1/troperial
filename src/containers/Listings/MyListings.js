import React, { Fragment, useEffect } from 'react';
import TableContent from '../../components/TableContent/TableContent';
import TableHead from '../../components/TableHead/TableHead';
import { currency_symbols } from '../../constants/currency_symbols';
import { currency_titles } from '../../constants/currency_titles';
import {
  getMyTransactions,
  setEditTransaction,
} from '../../actions/myTransactionActions';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { connect } from 'react-redux';
import { getAllRates } from '../../actions/transactionActions';
const MyListings = ({
  getMyTransactions,
  getAllRates,
  mySortedTransactions,
  loading,
  handleDeleteModal,
  handleEditBackDrop,
  setEditTransaction,
}) => {
  useEffect(() => {
    getMyTransactions();
    getAllRates()
  }, [getMyTransactions, getAllRates]);

  const handleEditTransaction = (
    sourceAmount,
    sourceCurrency,
    destinationCurrency,
    destinationAmount,
    transactionState,
    transactionId,
    accountId,
    personId,
    prefferedRate,
    privateListing,
  ) => {
    const data = {
      sourceAmount,
      sourceCurrency,
      destinationCurrency,
      destinationAmount,
      transactionState,
      transactionId,
      accountId,
      personId,
      prefferedRate,
      privateListing
    }
    setEditTransaction(data);
    handleEditBackDrop();
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
        <TableHead userListing={true} />
        {mySortedTransactions.map((transaction) => {
          const {
            sourceAmount,
            sourceCurrency,
            destinationCurrency,
            destinationAmount,
            transactionState,
            transactionId,
            accountId,
            personId,
            preferredExchangeRate,
            privateListing
          } = transaction;
          return (
            <TableContent
              have={`${currency_symbols[sourceCurrency]} ${sourceAmount}`}
              need={`(${currency_symbols[destinationCurrency]}) ${currency_titles[destinationCurrency]}`}
              rate={sourceCurrency === 'NGN' ? `${currency_symbols[sourceCurrency]} ${preferredExchangeRate} = ${currency_symbols[destinationCurrency]} 1`:`${currency_symbols[sourceCurrency]} 1 = ${currency_symbols[destinationCurrency]} ${preferredExchangeRate}`}
              status={transactionState}
              userListings={true}
              key={transactionId}
              onClick={handleDeleteModal}
              handleEditTransaction={() =>
                handleEditTransaction(
                  sourceAmount,
                  sourceCurrency,
                  destinationCurrency,
                  destinationAmount,
                  transactionState,
                  transactionId,
                  accountId,
                  personId,
                  preferredExchangeRate,
                  privateListing
                )
              }
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
  setEditTransaction,
  getAllRates,
})(MyListings);
