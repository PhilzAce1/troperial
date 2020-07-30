import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import HybridInput from '../../components/HybridInput/HybridInput';
import InputError from '../../components/InputError/InputError';
import { currency_titles } from '../../constants/currency_titles';
import { optionsUS, optionsNG, optionsUK, optionsEU, optionsCD } from '../../constants/banks';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { getAccount } from '../../actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './AddBankAccount.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Select from 'react-select';
import { connect } from 'react-redux';
import { emailRegex } from '../../constants/regex';
const AddBankAccount = ({ accountId, getAccount}) => {
  const { register, handleSubmit, errors } = useForm();
  const [country, setCountry] = useState('USD');
  const [selectedBank, setSelectedBank] = useState(null);
  const [accountType, setAccountType] = useState(null);

  const accountTypeOpts = [
    {
      label: 'CURRENT',
      value: 'CURRENT'
    },
    {
      label: 'SAVINGS',
      value: 'SAVINGS'
    }
  ]
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '10px',
      marginTop: '10px',
      padding: '4px 0',
      // borderWidth:'1px',
      // borderColor: "#e8e8e8"
    }),
  };

  const changeCurrencyHandler = (data) => {
    setCountry(data)
    setSelectedBank(null)
  };
  const handleSelectedBank = selectedOption =>  setSelectedBank(selectedOption);
  const handleAccountType = selectedOption =>  setAccountType(selectedOption);



  const submitNGNAccount = async (data) => {
    const authToken = localStorage.getItem('authToken');
    const { accountName, bvnNumber, accountNumber} = data;

    try {
        await axios.post(
        `https://accounts.api.troperial.com/accounts/${accountId}/externalAccounts/ngn`,
        {
          bvnNumber,
          accountNumber,
          primaryBank: selectedBank.value,
          accountName,
          externalAccountSubType: accountType.value,
        },
        {
          headers: {
            Authorization: authToken,
          },
        },
      );
      toast.success('Account Successfully Added!')
      setSelectedBank(null);
      setAccountType(null)
      getAccount(accountId)
    } catch (e) {
      console.log(e);
      setSelectedBank(null);
      setAccountType(null)
      toast.error('Oops something went wrong, please try again!')
    }
  };
  const submitZelleAccount = async (data) => {
    const authToken = localStorage.getItem('authToken');
    const { zelleEmail, phoneNumber } = data;

    try {
         await axios.post(
        `https://accounts.api.troperial.com/accounts/${accountId}/externalAccounts/zelle`,
        {
          zelleEmail,
          primaryBank: selectedBank.value,
          phoneNumber
        },
        {
          headers: {
            Authorization: authToken,
          },
        },
      );
      toast.success('Account Successfully Added!')
      getAccount(accountId)
    } catch (e) {
      console.log(e.response);
      toast.error('Oops something went wrong, please try again!')
    }
  }
  const submitCashAppAccount = async (data) => {
    const authToken = localStorage.getItem('authToken');
    const { userId } = data;

    try {
       await axios.post(
        `https://accounts.api.troperial.com/accounts/${accountId}/externalAccounts/cashapp`,
        {
         userId
        },
        {
          headers: {
            Authorization: authToken,
          },
        },
      );
      toast.success('Account Successfully Added!')
      getAccount(accountId);
    } catch (e) {
      console.log(e);
      toast.error('Oops something went wrong, please try again!')
    }
  }
  const submitUSDAccount = async (data) => {
    const authToken = localStorage.getItem('authToken');
    const { accountName, routingNumber, accountNumber } = data;

    try {
       await axios.post(
        `https://accounts.api.troperial.com/accounts/${accountId}/externalAccounts/us`,
        {
          routingNumber,
          accountName,
          accountNumber,
          primaryBank: selectedBank.value,
          externalAccountSubType: accountType.value,
        },
        {
          headers: {
            Authorization: authToken,
          },
        },
      );
      toast.success('Account Successfully Added!')
      setSelectedBank(null);
      setAccountType(null)
      getAccount(accountId)
    } catch (e) {
      console.log(e.response);
      toast.error('Oops something went wrong, please try again!')
      setSelectedBank(null);
      setAccountType(null)
    }
  };
  const submitUKAccount = async (data) => {
    const authToken = localStorage.getItem('authToken');
    const { accountName, customerAccountNumber, sortCode  } = data;

    try {
         await axios.post(
        `https://accounts.api.troperial.com/accounts/${accountId}/externalAccounts/uk`,
        {
          customerAccountNumber,
          sortCode,
          primaryBank: selectedBank.value,
          accountName,
          externalAccountSubType: accountType.value,
        },
        {
          headers: {
            Authorization: authToken,
          },
        },
      );
      toast.success('Account Successfully Added!')
      setSelectedBank(null);
      setAccountType(null)
      getAccount(accountId)
    } catch (e) {
      console.log(e);
      toast.error('Oops something went wrong, please try again!')
      setSelectedBank(null);
      setAccountType(null)
    }
  };

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
        <Select value={selectedBank} onChange={handleSelectedBank} placeholder="Select Bank" styles={customStyles} options={optionsNG} />
        <Select value={accountType} onChange={handleAccountType} placeholder="Account Type" styles={customStyles} options={accountTypeOpts} />
        <CustomInput
          placeholder="Account Name"
          showError={errors.accountName ? true : false}
          register={register({
            required: true,
          })}
          name="accountName"
          label="Account Name"
        />
        <CustomButton loading={false}>Add Bank</CustomButton>
      </form>
    );
  };
  const renderUK = () => {
    return (
      <form onSubmit={handleSubmit(submitUKAccount)}>
        {errors.customerAccountNumber?.type === 'required' && (
          <InputError>Your account number is required</InputError>
        )}
        <CustomInput
          placeholder="Account Number"
          showError={errors.customerAccountNumber ? true : false}
          register={register({
            required: true,
          })}
          name="customerAccountNumber"
          label="Account Number"
        />
        {errors.sortCode?.type === 'required' && (
          <InputError>Your sort code is required</InputError>
        )}
        <CustomInput
          placeholder="sort code"
          showError={errors.sortCode ? true : false}
          register={register({
            required: true,
          })}
          name="sortCode"
          label="sort code"
        />
               {errors.accountName?.type === 'required' && (
          <InputError>Your account name is required</InputError>
        )}
        <CustomInput
          placeholder="Account Name"
          showError={errors.accountName ? true : false}
          register={register({
            required: true,
          })}
          name="accountName"
          label="Account Name"
        />
        <Select value={selectedBank} onChange={handleSelectedBank} placeholder="Select Bank" styles={customStyles} options={country === 'GBP' ? optionsUK : optionsEU} />
        <Select value={accountType} onChange={handleAccountType}  placeholder="Account Type" styles={customStyles} options={accountTypeOpts} />
        <CustomButton loading={false}>Add Bank</CustomButton>
      </form>
    );
  };

  const renderZelle = () => {
    return (
      <form onSubmit={handleSubmit(submitZelleAccount)}>
        {errors.zelleEmail?.type === 'required' && (
          <InputError>Please provide a valid zelle email</InputError>
        )}
        <CustomInput
          showError={errors.zelleEmail ? true : false}
          register={register({
            required: true,
            pattern: emailRegex,
          })}
          name="zelleEmail"
          label="Zelle Email"
          placeholder="Your Zelle Email"
        />
        {errors.phoneNumber?.type === 'required' && (
          <InputError>Please provide a valid phone number</InputError>
        )}
        <CustomInput
          showError={errors.phoneNumber ? true : false}
          register={register({
            required: true
          })}
          name="phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
        />
       
        <Select value={selectedBank} onChange={handleSelectedBank} placeholder="Select Bank" styles={customStyles} options={country === 'USD' ? optionsUS : optionsCD} />
        <CustomButton loading={false}>Add Bank</CustomButton>
      </form>
    );
  };
  const renderCashApp = () => {
    return (
      <form onSubmit={handleSubmit(submitCashAppAccount)}>
        {errors.userId?.type === 'required' && (
          <InputError>Please provide a valid zelle email</InputError>
        )}
        <CustomInput
          showError={errors.userId ? true : false}
          register={register({
            required: true,
          })}
          name="userId"
          label="User ID"
          placeholder="Your CashApp ID"
        />
        <CustomButton loading={false}>Add Bank</CustomButton>
      </form>
    );
  };
  const renderUS = () => {
    return (
      <form onSubmit={handleSubmit(submitUSDAccount)}>
        {errors.routingNumber?.type === 'required' && (
          <InputError>Your routing code is required</InputError>
        )}
        <CustomInput
          placeholder="ABA/ACH routing code"
          showError={errors.routingNumber ? true : false}
          register={register({
            required: true,
          })}
          name="routingNumber"
          label="Routing Number"
        />
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
           {errors.accountName?.type === 'required' && (
          <InputError>Your account name is required</InputError>
        )}
        <CustomInput
          placeholder="Account Name"
          showError={errors.accountName ? true : false}
          register={register({
            required: true,
          })}
          name="accountName"
          label="Account Name"
        />
        <Select value={selectedBank} onChange={handleSelectedBank} placeholder="Select Bank" styles={customStyles} options={country === 'USD' ? optionsUS : optionsCD} />
        <Select value={accountType} onChange={handleAccountType}  placeholder="Account Type" styles={customStyles} options={accountTypeOpts} />
        <CustomButton loading={false}>Add Bank</CustomButton>
      </form>
    );
  };

  const renderUSOptions = () => {
    return (
      <Tabs>
        <TabList>
          <div className="scrolling-addBank-wrapper">
            <Tab>Bank Accounts</Tab>
            <Tab>Zelle</Tab>
            <Tab>CashApp</Tab>
          </div>
        </TabList>
        <TabPanel>{renderUS()}</TabPanel>
        <TabPanel>{renderZelle()}</TabPanel>
        <TabPanel>{renderCashApp()}</TabPanel>
      </Tabs>
    );
  };
  const renderBankInputFields = (country) => {
    if (country === 'NGN') {
      return renderNGN();
    } else if (country === 'USD' || country === 'CAD') {
      return renderUSOptions();
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
          line={false}
          onChange={null}
          readOnly={true}
          value={currency_titles[country]}
          label="currency"
        />
      </div>
      <div>
      <ToastContainer />
        {renderBankInputFields(country)}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accountId: state.auth.accountId,
});

export default connect(mapStateToProps, {getAccount})(AddBankAccount);
