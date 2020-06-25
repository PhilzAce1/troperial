import React, {
  useState,
  useEffect,
  Fragment,
  useContext,
  useCallback
} from 'react';
import './PostTrade.css';
import HybridInput from '../HybridInput/HybridInput';
import CustomButton from '../CustomButton/CustomButton';
import CustomAlert from '../CustomAlert/CustomAlert';
import { connect } from 'react-redux';
import { getAllRates } from '../../actions/transactionActions';
import { currency_symbols } from '../../constants/currency_symbols';
// import InputError from '../InputError/InputError';

import { getTransactions } from '../../actions/transactionActions';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../libs/contextLib';

import { setStep } from '../../actions/uiActions';
import { CONFIRM_POST_LISTING} from '../../actions/types';
const currency_title = {
  USD: 'United States Dollar',
  NGN: 'Nigerian Naira',
  GBP: 'Pound Sterling',
  CAD: 'Canadian Dollar',
  EUR: 'European Euros',
};
// THIS RATES COMMES FROM THE MAIN RATES IN REDUX
const PostTrade = ({
  title,
  rates,
  getAllRates,
  getTransactions,
  verified,
  setStep
}) => {
  const history = useHistory();
  const { isAuthenticated } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  /**
   * state title: conversionRates
   * data type: Object
   * desc: The conversionRates state is an object that holds all the converstion rates of a particular currency based on the SourceAmount
   */
  const [conversionRates, setConversionRates] = useState(null);
  /**
   * state title: prefferedRate
   * data type: Object
   * desc: This is an object holding the preffered rate for exchange
   * default: { have: '', need: '' }
   */
  const [prefferedRate, setPrefferedRate] = useState({
    have: '',
    need: '',
  });
  /**
   * state title: currency
   * data type: Object
   * desc: The currency is an Object that holds what the currency the user HAS and the currency the user NEEDS
   * default: { have: 'USD', need: 'NGN' }
   */
  const [currency, setCurrency] = useState({
    have: 'USD',
    need: 'NGN',
  });
  /**
   * state title: sourceAmount
   * data type: Number
   * desc: The SourecAmount is the amount of a particular currency which the user has e.g 10, 1000, 100000
   */
  const [sourceAmount, setSourceAmount] = useState('');
  /**
   * state title: calculatedRate
   * data type: Number
   * desc: The calculatedRate is the amount
   */
  const [calculatedRate, setCalculatedRate] = useState(null);
  const [convertedSourceAmount, setConvertedSourceAmount] = useState(
    null,
  );
  const { have, need } = currency;


  const calculateRate = useCallback( (have, need) => {
    need = parseFloat(need);
    have = parseFloat(have);
    const rate = need * have;
    setCalculatedRate(rate);
    if (!sourceAmount) {
      return;
    }
    const expectedValue = parseFloat(sourceAmount) * rate;
    setConvertedSourceAmount(expectedValue);
  }, [sourceAmount])
  const filterRatesByCurrency = useCallback((currency, rates) => {
    if (!rates || rates.length === 0) {return null};
    try {
      const { conversionRates } = rates.filter(
        (rate) => rate.baseCurrency === currency,
      )[0];
      setPrefferedRate({
        have: conversionRates[have],
        need: conversionRates[need],
      })
      calculateRate(conversionRates[have], conversionRates[need])
      setConversionRates(conversionRates);
    }catch(e) {
      alert('Internal System error, chech back in a 10minutes')
    }
  }, [calculateRate, have, need])

  const changeUserHave = (data) => {
    setCurrency({ ...currency, have: data });
    filterRatesByCurrency(data, rates);
  };
  const changeUserNeed = (data) => {
    setCurrency({ ...currency, need: data });
    setPrefferedRate({
      ...prefferedRate,
      need: conversionRates[data],
    });
    calculateRate(conversionRates[have], conversionRates[data])
  };

  const handleSourceAmountChange = (e) => {
    if (!e.target.value) {
      setSourceAmount('');
    } else{
      setSourceAmount(e.target.value);
    }
    if (!calculatedRate || !e.target.value) {
      return setConvertedSourceAmount(null);
    }
    const expectedValue = parseFloat(e.target.value) * calculatedRate;
    setConvertedSourceAmount(expectedValue);
  };


  const handlePrefferedRateForHave = (e) => {
    setPrefferedRate({
      ...prefferedRate,
      have: e.target.value,
    });
    if (!prefferedRate.need || !e.target.value) {
      return setConvertedSourceAmount(null);
    }
    calculateRate(e.target.value, prefferedRate.need);
  };

  const handlePrefferedRateForNeed = (e) => {
    setPrefferedRate({
      ...prefferedRate,
      need: e.target.value,
    });
    if (!e.target.value) {
      return setConvertedSourceAmount(null);
    }
    calculateRate(prefferedRate.have, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(sourceAmount === '' || prefferedRate.have === '' || prefferedRate.need === '') {
      return setError('Please ensure that all fields are correctly filled')
    }
    if (!isAuthenticated) {
      localStorage.setItem(
        'unAuthenticatedUserListing',
        JSON.stringify({
          sourceAmount: sourceAmount,
          sourceCurrency: currency.have,
          destinationAmount: convertedSourceAmount,
          destinationCurrency: currency.need,
          exchangeRate: calculatedRate,
        }),
      );
      return history.push('/signin');
    }
    const currentUserInfo = await Auth.currentUserInfo();
    let personId = currentUserInfo.attributes['custom:personId'];

    setLoading(true);
    try {
        const response = await axios.post(
          `https://transactions.api.troperial.com/accounts/${personId}/transactions`,
          {
            verifiedPerson: verified,
            sourceAmount: sourceAmount,
            sourceCurrency: currency.have,
            destinationAmount: convertedSourceAmount,
            destinationCurrency: currency.need,
            prefferedExchangeRate: calculatedRate,
            personId: personId,
          },
        );
      setStep(CONFIRM_POST_LISTING)
      setLoading(false);
      getTransactions();
      console.log(response, calculatedRate);
    } catch (e) {
      console.log(`ERROR: ${e}`);
      setError('Please kindly verify your account to post more trades. You can no longer post a new listing until you verify your account');
      setLoading(false);
    }
  };

  const postListing = useCallback(async (data) => {
    localStorage.removeItem('unAuthenticatedUserListing');
    const currentUserInfo = await Auth.currentUserInfo();
    let personId = currentUserInfo.attributes['custom:personId'];
    console.log({ ...data, personId, verifiedPerson: verified });
    try {
      const response = await axios.post(
        `https://transactions.api.troperial.com/accounts/${personId}/transactions`,
        { ...data, personId, verifiedPerson: verified },
      );
      setStep(CONFIRM_POST_LISTING);
    } catch (e) {
      console.log(`ERROR: ${e}`);
      setError('Please kindly verify your account to post more trades. You can no longer post a new listing until you verify your account');
      setLoading(false);
    }
  }, [setStep, verified])
  useEffect(() => {
    if (
      localStorage.getItem('unAuthenticatedUserListing') &&
      isAuthenticated
    ) {
      const unAuthenticatedUserListing = JSON.parse(
        localStorage.getItem('unAuthenticatedUserListing'),
      );
      postListing(unAuthenticatedUserListing);
    } else {
      const fetchRates = async () => {
        const fetchedRates = await getAllRates();
        console.log(fetchedRates);
        filterRatesByCurrency(currency.have, fetchedRates);
      };
      fetchRates();
    }
  }, [getAllRates, currency.have, filterRatesByCurrency, isAuthenticated, postListing]);

  return (
    <Fragment>
        <form
          className="post__listing-container"
          onSubmit={handleSubmit}
        >
          <h2 className="title">{title}</h2>
          {error ? <CustomAlert message={error} onClick={() => setError('')}/> : null}
          <div className="first__form__group">
            <HybridInput
              currency={have}
              changeCurrencyHandler={changeUserHave}
              line={true}
              onChange={handleSourceAmountChange}
              value={sourceAmount}
              label="I have"
              type="number"
            />
            <HybridInput
              currency={need}
              changeCurrencyHandler={changeUserNeed}
              line={true}
              value={currency_title[need]}
              readOnly={true}
              label="I need"
            />
          {conversionRates && (
                <p className="trending__market__rate summary">
                Trending market rate{' '}
                <span className="price__summary">
                  -{' '}
                  {`${currency_symbols[have]}${
                    conversionRates[have]
                  } = ${currency_symbols[need]}${
                    have === 'NGN'
                      ? (
                          conversionRates[have] /
                          conversionRates[need]
                        ).toFixed(4)
                      : conversionRates[need]
                  }`}
                </span>
              </p>
          )}
          </div>
          <h4 className="subtitle">Preffered exchange rate</h4>
          <div className="inline_hybridInput">
          <div>
            <HybridInput
              value={prefferedRate.have}
              currency={have}
              onChange={handlePrefferedRateForHave}
              name="have"
              type="number"
            />
          </div>
            <i className="exchange-desktop fas fa-exchange-alt"></i>
           <div>
           </div>
            <HybridInput
              value={prefferedRate.need}
              currency={need}
              onChange={handlePrefferedRateForNeed}
              name="need"
              type="number"
            />
          </div>
          {!convertedSourceAmount ? null : (
            <p className="summary">
              At this rate i'd get{' '}
              <span className="price__summary">
                {`${
                  currency_symbols[need]
                }${convertedSourceAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 4,
                })}`}
              </span>
            </p>
          )}
          {/* <div className="checkbox__area">
            <input type="checkbox" />
            <p>Show to only trusted traders</p>
          </div> */}
          <CustomButton loading={loading}>
            Post this Trade
          </CustomButton>
        </form>
    </Fragment>
  );
};

PostTrade.defaultProps = {
  title: 'Post a listing',
};
const mapStateToProps = (state) => ({
  rates: state.transaction.rates,
  verified: state.auth.verified
});
export default connect(mapStateToProps, {
  getAllRates,
  getTransactions,
  setStep
})(PostTrade);
