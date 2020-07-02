import React, {useEffect, Fragment, useState} from 'react';
import './BankAccountList.css';
import { connect } from 'react-redux';
import BankListCard from './BankListCard';
import CustomButton from '../../components/CustomButton/CustomButton';
import { getAccount } from '../../actions/authActions';
import { Scrollbars } from 'react-custom-scrollbars';

const BankAccountList = ({handleBankAccountList, getAccount, accounts, accountId}) => {
    const [chosen, setChosen] = useState();
    useEffect(() => {
        getAccount(accountId);
    },[getAccount, accountId]);


    const renderList = () => {
        return (
            <Fragment>
            {!accounts ? 'loading' : (
                <Fragment>
                   {accounts.map(account => {
                       return (
                        <BankListCard 
                        sortCode={account.sortCode}
                        customerAccountNumber={account.customerAccountNumber}
                        accountNumber={account.accountNumber}
                        bvnNumber={account.bvnNumber}
                        primaryBank={account.primaryBank}
                        key={account.externalAccountId}
                        routingNumber={account.routingNumber}
                        externalAccountSubType={account.externalAccountSubType}
                        currency={account.currency}
                        zelleEmail={account.zelleEmail}
                        userId={account.userId}
                        active={account.externalAccountId === chosen}
                        onClick={() => setChosen(account.externalAccountId)}
                        />
                       )
                   })}
                <CustomButton loading={false}>Send Bank Details</CustomButton>
                </Fragment>
            )}
            </Fragment>
        )
    }

  return (
      
    <div className="handleBankAccountList_modal-bg">
      
       <div className="handleBankAccountList-modal">
       {/* <Scrollbars 
       autoHideTimeout={1000}
   
       style={{ width:'auto', height: '80vh' }}
       > */}
           <button onClick={handleBankAccountList}>close</button>
       {renderList()}
       {/* </Scrollbars> */}
       </div>
    
    </div>
 
  );
};
const mapStateToProps = (state) => ({

  accountId: state.auth.accountId,
 accounts: state.auth.accounts,

});

BankAccountList.defaultProps = {
  
};
export default connect(mapStateToProps, {getAccount})(BankAccountList);
