import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import HybridInput from '../../components/HybridInput/HybridInput';
import InputError from '../../components/InputError/InputError';
import { currency_titles } from '../../constants/currency_titles';
import './AddBankAccount.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { connect } from 'react-redux';
const AddBankAccount = ({accountId}) => {
  const { register, handleSubmit, errors, watch } = useForm();
  const [country, setCountry] = useState('USD');

  //Todo - create select country component
  const changeCurrencyHandler = (data) => {
    setCountry(data);
  };

  const submitNGNAccount = async (data) => {
    const {bvnNumber,
    accountNumber,
    primaryBank,
    } = data; 
   try {
    const response = await axios.post(`https://accounts.api.troperial.com/accounts/${accountId}/externalAccounts/ngn`, {
      bvnNumber,
      accountNumber,
      primaryBank,
      externalAccountSubType: 'CURRENT'
    }, {
        headers: {
          Authorization: localStorage.getItem('authToken')
        }
      });
    console.log(response)
   } catch (e) {
     console.log(e)
   }

  };
  const submitUSDAccount = () => {};
  const submitUKAccount = () => {};

  const renderNGN = () => {
    return (
      <form onSubmit={handleSubmit(submitNGNAccount)}>
        {errors.accountNumber?.type === 'required' && (
          <InputError>Your account number is required</InputError>
        )}
        <CustomInput
          placeholder="Account Number"
          showError={errors.accountNumber ? true : false}
          register={register({
            required: true,
          })}
          name="accountNumber"
          label="Account Number"
        />
        {errors.bvnNumber?.type === 'required' && (
          <InputError>Your BVN is required</InputError>
        )}
        <CustomInput
          placeholder="BVN"
          showError={errors.bvnNumber ? true : false}
          register={register({
            required: true,
          })}
          name="bvnNumber"
          label="BVN"
        />
        {errors.primaryBank?.type === 'required' && (
          <InputError>Your bank name is required</InputError>
        )}
        <CustomInput
          placeholder="Bank Name"
          showError={errors.primaryBank ? true : false}
          register={register({
            required: true,
          })}
          name="primaryBank"
          label="Bank Name"
        />
        {/* {errors.accName?.type === 'required' && (
          <InputError>Your account name is required</InputError>
        )}
        <CustomInput
          placeholder="Account Name"
          showError={errors.bvn ? true : false}
          register={register({
            required: true,
          })}
          name="accName"
          label="Account Name"
        /> */}
        <CustomButton loading={false}>Add Bank</CustomButton>
      </form>
    );
  };
  const renderUK = () => {
    return (
      <form>
        <CustomInput placeholder="Account Number" />
        <CustomInput placeholder="sort code" />
        <CustomInput placeholder="Bank Name" />
        <CustomButton loading={false}>Add Bank</CustomButton>
      </form>
    );
  };
  const renderUS = () => {
    return (
      <form>
        <CustomInput placeholder="Account Number" />
        <CustomInput placeholder="ABA/ACH routing code" />
        <CustomInput placeholder="Account Name" />
        <CustomInput placeholder="Bank Name" />
        <CustomButton loading={false}>Add Bank</CustomButton>
      </form>
    );
  };
  const renderBankInputFields = (country) => {
    if (country === 'NGN') {
      return renderNGN();
    } else if (country === 'USD' || country === 'CAD') {
      return renderUS();
    } else if (country === 'GBP') {
      return renderUK();
    } else {
      return renderUK();
    }
  };
  return (
    <div className="addBank">
      <h1 className="title">Add a New Bank</h1>

      <div>
        <p>Select The currency that will go into this bank account</p>
        <HybridInput
          currency={country}
          changeCurrencyHandler={changeCurrencyHandler}
          line={true}
          onChange={null}
          readOnly={true}
          value={currency_titles[country]}
          line={false}
          label="currency"
        />
      </div>
      <div>{renderBankInputFields(country)}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accountId: state.auth.accountId,
 
});

export default connect(mapStateToProps, null)(AddBankAccount);
