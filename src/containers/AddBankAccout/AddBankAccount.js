import React from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import Select from 'react-select';
import './AddBankAccount.css';
const AddBankAccount = () => {
    const options = [
        { value: 'Gurantee Trust Bank', label: 'Gurantee Trust Bank' },
        { value: 'Wells Fargo', label: 'Wells Fargo' },
        { value: 'Citi Bank', label: 'Citi Bank' },
      ];

      const customStyles = {
        control: (provided) => ({
          ...provided,
          borderRadius: '10px',
          marginTop: '10px',
          padding: '4px 0',
        }),
      };
    return (
        <div className="addBank">
        <h1 className="title">Add a New Bank</h1>
           <form>
           <Select styles={customStyles} options={options} placeholder="Select Bank" />
            <CustomInput placeholder="Account Number"/>
            <CustomInput placeholder="ABA/ACH routing code"/>
            <CustomInput  placeholder="Account Name" />
            <CustomButton loading={false}>Add Bank</CustomButton>
           </form>
        </div>
    )
}

export default AddBankAccount
