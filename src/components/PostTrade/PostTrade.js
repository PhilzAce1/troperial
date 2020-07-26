import React, {
  useState,
  useEffect,
  Fragment,
  useContext,
} from 'react';
import './PostTrade.css';
import close from '../../assets/svgs/close-x.svg';
import HybridInput from '../HybridInput/HybridInput';
import CustomButton from '../CustomButton/CustomButton';
import { connect } from 'react-redux';
import { currency_symbols } from '../../constants/currency_symbols';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { currency_titles } from '../../constants/currency_titles';
import { createTransaction, createUnAuthenticatedUserTransaction } from '../../actions/transactionActions';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../libs/contextLib';
const PostTrade = ({
  title,
  rates,
  createTransaction,
  verified,
  handleBackDrop,
  showCheckBox,
  showCloseBtn,
  createUnAuthenticatedUserTransaction
}) => {
  const history = useHistory();
  const { isAuthenticated } = useContext(AppContext);
  const [values, setValues] = useState({
    sourceAmount: '',
    sourceCurrency: 'USD',
    destinationAmount: '',
    destinationCurrency: 'NGN',
    preferredExchangeRate: '',
    privateListing: false,
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

  const randomCurrency = (currencyObj, destinationCurrency, sourceCurrency) => {
    const keys = Object.keys(currencyObj).filter(value => value !== sourceCurrency && value !== destinationCurrency);
   return keys[keys.length * Math.random() << 0];
  }
  const changeSourceCurrency = (data) => {
    const random = randomCurrency(currency_titles, values.destinationCurrency, values.sourceCurrency);
    if(data === values.destinationCurrency){ 
      setValues({ ...values, sourceCurrency: data, destinationCurrency: random });
    } else {
      setValues({ ...values, sourceCurrency: data });
    }
    
  };

  const changeDestinationCurrency = (data) => {
    setValues({ ...values, destinationCurrency: data });
  };
  const handleSourceAmountChange = (e) => {
    const destinationAmount =
      values.sourceCurrency !== 'NGN'
        ? parseFloat(e.target.value) *
          parseFloat(values.preferredExchangeRate)
        : parseFloat(e.target.value) /
          parseFloat(values.preferredExchangeRate);
    setValues({
      ...values,
      sourceAmount: e.target.value,
      destinationAmount: destinationAmount.toFixed(2),
    });
  };

  const handlePrefferedRateForNeed = (e) => {
    const destinationAmount =
      parseFloat(e.target.value) * parseFloat(values.sourceAmount);
    setValues({
      ...values,
      destinationAmount,
      preferredExchangeRate: e.target.value,
    });
  };
  const handlePrefferedRateForHave = (e) => {
    const destinationAmount =
      parseFloat(values.sourceAmount) / parseFloat(e.target.value);
    setValues({
      ...values,
      destinationAmount,
      preferredExchangeRate: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
          localStorage.setItem(
            'unAuthenticatedUserListing',
            JSON.stringify({
              ...values
            }),
          );
          return history.push('/signin');
    }
    createTransaction({...values, verified});
  };

  useEffect(() => {
    if (
      localStorage.getItem('unAuthenticatedUserListing') &&
      isAuthenticated
    ) {
      const unAuthenticatedUserListing = JSON.parse(
        localStorage.getItem('unAuthenticatedUserListing'),
      );
      createUnAuthenticatedUserTransaction(unAuthenticatedUserListing, verified);
    }
  }, [createUnAuthenticatedUserTransaction, isAuthenticated, verified]);

  return (
    <Fragment>
      <ToastContainer />
      <form
        className="post__listing-container"
        onSubmit={handleSubmit}
      >
        <div className="header">
          <h2 className="title">{title}</h2>
          {showCloseBtn && (
            <button className="close" onClick={handleBackDrop}>
              <img src={close} alt="close" />
              <span>close</span>
            </button>
          )}
        </div>
        <div className="first__form__group">
          <HybridInput
            currency={values.sourceCurrency}
            changeCurrencyHandler={changeSourceCurrency}
            line={true}
            placeholder="1000"
            onChange={handleSourceAmountChange}
            value={values.sourceAmount}
            label="I have"
            type="number"
          />
          <HybridInput
            currency={values.destinationCurrency}
            changeCurrencyHandler={changeDestinationCurrency}
            line={true}
            value={currency_titles[values.destinationCurrency]}
            label="I need"
            readOnly={true}
            selectedCurrency={values.sourceCurrency}
          />
          {rates.length === 0
            ? null
            : filterRatesByCurrency(
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
              value={
                values.sourceCurrency === 'NGN'
                  ? values.preferredExchangeRate
                  : `1.00`
              }
              readOnly={
                values.sourceCurrency === 'NGN' ? false : true
              }
              placeholder={ rates.length === 0
                ? null
                : `${rates
                    .filter(
                      (rate) =>
                        rate.baseCurrency === values.sourceCurrency,
                    )[0]
                    .conversionRates[
                      values.destinationCurrency
                    ].toFixed(2)}`}
              onChange={handlePrefferedRateForHave}
              type="number"
            />
          </div>
          <i className="exchange-desktop fas fa-exchange-alt"></i>
          <div></div>
          <HybridInput
            value={
              values.sourceCurrency !== 'NGN'
                ? values.preferredExchangeRate
                : `1.00`
            }
            currency={values.destinationCurrency}
            onChange={handlePrefferedRateForNeed}
            type="number"
            readOnly={values.sourceCurrency !== 'NGN' ? false : true}
            placeholder={
              rates.length === 0
                ? null
                : `${rates
                    .filter(
                      (rate) =>
                        rate.baseCurrency === values.sourceCurrency,
                    )[0]
                    .conversionRates[
                      values.destinationCurrency
                    ].toFixed(2)}`
            }
          />
        </div>
        {!values.destinationAmount || isNaN(values.destinationAmount) ? null : (
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
        {showCheckBox && (
          <div className="checkbox__area">
            <input
              type="checkbox"
              onChange={() =>
                setValues({
                  ...values,
                  privateListing: !values.privateListing,
                })
              }
              checked={values.privateListing}
            />
            <p>Show to only trusted traders</p>
          </div>
        )}
        <CustomButton loading={false}>Create a listing</CustomButton>
      </form>
    </Fragment>
  );
};

PostTrade.defaultProps = {
  title: 'Post a listing',
  showCheckBox: true,
  showCloseBtn: true,
};
const mapStateToProps = (state) => ({
  rates: state.transaction.rates,
  verified: state.auth.verified,
});
export default connect(mapStateToProps, {
  createTransaction,
  createUnAuthenticatedUserTransaction
})(PostTrade);
