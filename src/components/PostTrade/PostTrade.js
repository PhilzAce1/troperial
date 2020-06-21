import React, { useState, useEffect, useContext } from 'react';
import './PostTrade.css';
import HybridInput from '../HybridInput/HybridInput';
import CustomButton from '../CustomButton/CustomButton';
import { connect } from 'react-redux';
import { getAllRates } from '../../actions/transactionActions';
import { currency_symbols } from '../../constants/currency_symbols';
import InputError from '../InputError/InputError';
import { getTransactions } from '../../actions/transactionActions';
import {Auth} from 'aws-amplify';
import axios from 'axios';
import {history} from 'react-router-dom';
import { AppContext } from '../../libs/contextLib';



const currency_title = {
  USD: 'United States Dollar',
  NGN: 'Nigerian Naira',
  GBP: 'Pound Sterling',
  CAD: 'Canadian Dollar',
  EUR: 'European Euros',
};
// THIS RATES COMMES FROM THE MAIN RATES IN REDUX
const PostTrade = ({ title, rates, getAllRates, getTransactions }) => {
  const { isAuthenticated } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [conversionRates, setConversionRates] = useState(null);
  const [prefferedRate, setPrefferedRate] = useState({
    have: '',
    need: ''
  })
 
  const [currencyRate, setCurrencyRate] = useState({
    haveRate: 'NGN',
    needRate: 'NGN',
  });
  const [currency, setCurrency] = useState({
    have: 'NGN',
    need: 'NGN',
  });
  const [sourceAmount, setSourceAmount] = useState('');
  const [calculatedRate, setCalculatedRate] = useState(null);
  const [convertedSourceAmount, setConvertedSourceAmount] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      const fetchedRates = await getAllRates();
      //SET CHOPES
      console.log(fetchedRates)
      filterRatesByCurrency(currency.have, fetchedRates);
    };
    fetchRates();

  }, [getAllRates, currency.have]);


  const filterRatesByCurrency = (currency, rates) => {
    if(!rates || rates.length === 0) {
      return null
    }
    let filteredCurrency = rates.filter(
      (rate) => rate.baseCurrency === currency,
    )[0];
    const { conversionRates } = filteredCurrency;
    setConversionRates(conversionRates);
  };
  const changeUserHave = (data) => {
    setCurrency({ ...currency, have: data });
    setCurrencyRate({ ...currencyRate, haveRate: data });
    //NOTE: THERE SHIULD BE A SCOPED RATES ARRAY
    filterRatesByCurrency(data, rates);
  };
  const changeUserNeed = (data) => {
    setCurrency({ ...currency, need: data });
    setCurrencyRate({ ...currencyRate, needRate: data });
  };
  const changeUserHaveRate = (data) => {
    setCurrencyRate({ ...currencyRate, haveRate: data });
    // setCurrency({ ...currency, have: data });
  };
  const changeUserNeedRate = (data) => {
    setCurrencyRate({ ...currencyRate, needRate: data });
    // setCurrency({ ...currency, need: data });
  };

  const handleSourceAmountChange = (e) => {
    if(!e.target.value){
      setSourceAmount('');
    } else {
      setSourceAmount(e.target.value);
    }
    if(!calculatedRate || !e.target.value) {
      return setConvertedSourceAmount(null)
    }
    const expectedValue = parseFloat(e.target.value) * calculatedRate;
    setConvertedSourceAmount(expectedValue);
  }

  const handlePrefferedRateForHave = (e) => {
      setPrefferedRate({
        ...prefferedRate,
        have: e.target.value
      })
      if(!prefferedRate.need || !e.target.value){
        return setConvertedSourceAmount(null);
      }
      calculateRate(e.target.value, prefferedRate.need)
  }

  const calculateRate = (have, need) => {
    need = parseFloat(need);
    have = parseFloat(have);
    const rate = need * have;
    setCalculatedRate(rate);
    if(!sourceAmount) {
      return
    }
    const expectedValue = parseFloat(sourceAmount)*rate;
    setConvertedSourceAmount(expectedValue);

  }
  const handlePrefferedRateForNeed = (e) => {
    setPrefferedRate({
      ...prefferedRate,
      need: e.target.value
    })
    if(!e.target.value) {
      return setConvertedSourceAmount(null);
    }
    calculateRate(prefferedRate.have, e.target.value);
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    // if(!isAuthenticated){
    //   return history.push('/signin')
    // }
 
    console.log(currency.have, currency.need, sourceAmount, calculatedRate, convertedSourceAmount);
    const currentUserInfo = await Auth.currentUserInfo();
    let personId = currentUserInfo.attributes['custom:personId'];
   
    setLoading(true)
    try {
      const response = await axios.post(`https://transactions.api.troperial.com/accounts/${personId}/transactions`, {
        sourceAmount: sourceAmount,
        sourceCurrency: currency.have,
        destinationAmount: convertedSourceAmount,
        destinationCurrency: currency.need,
        exchangeRate: calculatedRate,
        personId: personId
      })
      setLoading(false);
      getTransactions();
      console.log(response, calculatedRate)
      
    } catch(e) {
        console.log(`ERROR: ${e}`)
        setLoading(false);
    }
   
  }
  const { have, need } = currency;
  const { haveRate, needRate } = currencyRate;
  return (
    <form className="post__listing-container" onSubmit={handleSubmit}>
      <h2 className="title">{title}</h2>
      <div className="first__form__group">
        <HybridInput
          currency={have}
          changeCurrencyHandler={changeUserHave}
          line={true}
          onChange={handleSourceAmountChange}
          value={sourceAmount}
          label="I have"
        />
        <HybridInput
          currency={need}
          changeCurrencyHandler={changeUserNeed}
          line={true}
          value={currency_title[need]}
          readOnly={true}
          label="I need"
        />
     {
       conversionRates === null ? null : (
        <p className="trending__market__rate summary">
        Trending market rate{' '}
        <span className="price__summary">
          -{' '}
          {`${currency_symbols[have]}${conversionRates[have]} = ${
            currency_symbols[need]
          }${
            have === 'NGN'
              ? (
                  conversionRates[have] / conversionRates[need]
                ).toFixed(4)
              : conversionRates[need]
          }`}
        </span>
      </p>
       )
     }
      </div>
      <h4 className="subtitle">Preffered exchange rate</h4>
      <div className="inline_hybridInput">
        <HybridInput
          value={prefferedRate.have}
          currency={haveRate}
          changeCurrencyHandler={changeUserHaveRate}
          readOnly={false}
          onChange={handlePrefferedRateForHave}
          name="have"
        />
        <i className="exchange-desktop fas fa-exchange-alt"></i>
        <HybridInput
          value={prefferedRate.need}
          currency={needRate}
          changeCurrencyHandler={changeUserNeedRate}
          readOnly={false}
          onChange={handlePrefferedRateForNeed}
          name="need"
        />
      </div>
      {
        !convertedSourceAmount ? null : (
          <p className="summary">
          At this rate i'd get{' '}
          <span className="price__summary">
            {`${currency_symbols[need]}${(convertedSourceAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            </span>
        </p>
        )
      }
      <div className="checkbox__area">
        <input type="checkbox" />
        <p>Show to only trusted traders</p>
      </div>
      <CustomButton loading={loading}>Post this Trade</CustomButton>
    </form>
  );
};

PostTrade.defaultProps = {
  title: 'Post a listing',
};
const mapStateToProps = (state) => ({
  rates: state.transaction.rates,
});
export default connect(mapStateToProps, { getAllRates, getTransactions })(PostTrade);
