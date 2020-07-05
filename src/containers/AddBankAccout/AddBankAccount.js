import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import HybridInput from '../../components/HybridInput/HybridInput';
import InputError from '../../components/InputError/InputError';
import { currency_titles } from '../../constants/currency_titles';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { getAccount } from '../../actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './AddBankAccount.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { emailRegex } from '../../constants/regex';
const AddBankAccount = ({ accountId, getAccount}) => {
  const { register, handleSubmit, errors } = useForm();
  const [country, setCountry] = useState('USD');

  const changeCurrencyHandler = (data) => {
    setCountry(data);
  };


  const submitNGNAccount = async (data) => {
    const authToken = localStorage.getItem('authToken');
    const { accountName, bvnNumber, accountNumber, primaryBank } = data;

    try {
        await axios.post(
        `https://accounts.api.troperial.com/accounts/${accountId}/externalAccounts/ngn`,
        {
          bvnNumber,
          accountNumber,
          primaryBank,
          accountName,
          externalAccountSubType: 'CURRENT',
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
      console.log(e);
      toast.error('Oops something went wrong, please try again!')
    }
  };
  const submitZelleAccount = async (data) => {
    const authToken = localStorage.getItem('authToken');
    const { zelleEmail, primaryBank } = data;

    try {
         await axios.post(
        `https://accounts.api.troperial.com/accounts/${accountId}/externalAccounts/zelle`,
        {
          zelleEmail,
          primaryBank
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
      console.log(e);
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
    const { routingNumber, accountNumber, primaryBank } = data;

    try {
       await axios.post(
        `https://accounts.api.troperial.com/accounts/${accountId}/externalAccounts/us`,
        {
          routingNumber,
          accountNumber,
          primaryBank,
          externalAccountSubType: 'CURRENT',
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
      console.log(e);
      toast.error('Oops something went wrong, please try again!')
    }
  };
  const submitUKAccount = async (data) => {
    const authToken = localStorage.getItem('authToken');
    const { customerAccountNumber, sortCode, primaryBank } = data;

    try {
         await axios.post(
        `https://accounts.api.troperial.com/accounts/${accountId}/externalAccounts/uk`,
        {
          customerAccountNumber,
          sortCode,
          primaryBank,
          externalAccountSubType: 'CURRENT',
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
      console.log(e);
      toast.error('Oops something went wrong, please try again!')
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

        {errors.primaryBank?.type === 'required' && (
          <InputError>Your primary bank name is required</InputError>
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
