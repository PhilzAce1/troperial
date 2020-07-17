import React, { useState, Fragment } from 'react';
import './EditTrade.css';
import HybridInput from '../../components/HybridInput/HybridInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { connect } from 'react-redux';
import { currency_symbols } from '../../constants/currency_symbols';
import { currency_titles } from '../../constants/currency_titles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editMyTransaction } from '../../actions/myTransactionActions';
import close from '../../assets/svgs/close-x.svg';
const EditTrade = ({
  handleEditBackDrop,
  editMyTransaction,
  title,
  rates,
  sourceAmount,
  sourceCurrency,
  destinationAmount,
  destinationCurrency,
  transactionId,
  accountId,
  prefferedRate,
  privateListing,
}) => {
  const [values, setValues] = useState({
    sourceAmount,
    sourceCurrency,
    destinationAmount: '',
    destinationCurrency,
    transactionId,
    accountId,
    prefferedRate: '',
    privateListing,
  });

  const filterRatesByCurrency = (
    currency,
    rates,
    destinationCurrency = values.destinationCurrency,
  ) => {
    const { conversionRates } = rates.filter(
      (rate) => rate.baseCurrency === currency,
    )[0];
    return (
      <p className="trending__market__rate summary">
        Trending market rate{' '}
        <span className="price__summary">
          -{' '}
          {currency === 'NGN'
            ? `${currency_symbols[destinationCurrency]}${1} = ${
                currency_symbols[currency]
              }${conversionRates[destinationCurrency]}`
            : `${currency_symbols[currency]}${1} = ${
                currency_symbols[destinationCurrency]
              }${conversionRates[destinationCurrency]}`}
        </span>
      </p>
    );
  };
  const changeSourceCurrency = (data) => {
    setValues({ ...values, sourceCurrency: data });
  };
  const changeDestinationCurrency = (data) => {
    setValues({ ...values, destinationCurrency: data });
  };

  const handleSourceAmountChange = (e) => {
    const destinationAmount =
      parseFloat(e.target.value) * parseFloat(values.prefferedRate);
    setValues({
      ...values,
      sourceAmount: e.target.value,
      destinationAmount,
    });
  };

  const handlePrefferedRateForNeed = (e) => {
    const destinationAmount =
      parseFloat(e.target.value) * parseFloat(values.sourceAmount);
    setValues({
      ...values,
      destinationAmount,
      prefferedRate: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values.prefferedRate);
    editMyTransaction(values);
  };
  return (
    <Fragment>
      <ToastContainer />
      <form
        className="post__listing-container"
        onSubmit={handleSubmit}
      >
        <div className="header">
          <h2 className="title">{title}</h2>
          <button className="close" onClick={handleEditBackDrop}>
            <img src={close} alt="close" />
            <span>close</span>
          </button>
        </div>
        <div className="first__form__group">
          <HybridInput
            currency={values.sourceCurrency}
            changeCurrencyHandler={changeSourceCurrency}
            line={true}
            onChange={handleSourceAmountChange}
            value={values.sourceAmount}
            label="I have"
          />
          <HybridInput
            currency={values.destinationCurrency}
            changeCurrencyHandler={changeDestinationCurrency}
            line={true}
            value={currency_titles[values.destinationCurrency]}
            label="I need"
            readOnly={true}
          />
          {filterRatesByCurrency(
            values.sourceCurrency,
            rates,
            values.destinationCurrency,
          )}
        </div>
        <h4 className="subtitle">Preffered exchange rate</h4>
        <div className="inline_hybridInput">
          <div>
            <HybridInput
              currency={values.sourceCurrency}
              value={1}
              readOnly={true}
            />
          </div>
          <i className="exchange-desktop fas fa-exchange-alt"></i>
          <div></div>
          <HybridInput
            value={values.prefferedRate}
            currency={values.destinationCurrency}
            onChange={handlePrefferedRateForNeed}
          />
        </div>
        {!values.destinationAmount ? null : (
          <p className="summary">
            At this rate i'd get{' '}
            <span className="price__summary">
              {`${
                currency_symbols[values.destinationCurrency]
              }${values.destinationAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}`}
            </span>
          </p>
        )}
        <div className="checkbox__area">
          <input type="checkbox" />
          <p>Show to only trusted traders</p>
        </div>
        <CustomButton loading={false}>Edit this Trade</CustomButton>
      </form>
    </Fragment>
  );
};
EditTrade.defaultProps = {
  title: 'Edit listing',
};
const mapStateToProps = (state) => ({
  rates: state.transaction.rates,
  sourceAmount: state.myTransaction.sourceAmount,
  sourceCurrency: state.myTransaction.sourceCurrency,
  destinationAmount: state.myTransaction.destinationAmount,
  destinationCurrency: state.myTransaction.destinationCurrency,
  transactionId: state.myTransaction.transactionId,
  personId: state.myTransaction.personId,
  accountId: state.myTransaction.accountId,
  prefferedRate: state.myTransaction.prefferedRate,
  privateListing: state.myTransaction.privateListing,
});
export default connect(mapStateToProps, { editMyTransaction })(
  EditTrade,
);
