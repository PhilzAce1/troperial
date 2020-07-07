import React, { useEffect, Fragment, useState } from 'react';
import './BankAccountList.css';
import { connect } from 'react-redux';
import BankListCard from './BankListCard';
import CustomButton from '../../components/CustomButton/CustomButton';
import { getAccount } from '../../actions/authActions';
import { addNewAccountDetails } from '../../actions/conversationActions';
import AddBankAccount from '../AddBankAccout/AddBankAccount';
import { sendAccountDetail } from '../../libs/conversationHelpers';
import close from '../../assets/images/Close.png';
const BankAccountList = ({
  handleBankAccountList,
  getAccount,
  addNewAccountDetails,
  accounts,
  accountId,
  conversation,
}) => {
  const [chosen, setChosen] = useState();
  useEffect(() => {
    getAccount(accountId);
  }, [getAccount, accountId]);
  const renderList = (accounts) => {
    function testOnClick(params) {
      addNewAccountDetails(params);
      sendAccountDetail(
        conversation.selectedConversation.id,
        conversation.user.id,
        params,
      );
      handleBankAccountList();
    }
    if (accounts === null) {
      return <h2>Loading Bank Accounts...</h2>;
    } else if (accounts.length === 0) {
      return <AddBankAccount />;
    } else {
      return (
        <Fragment>
          {accounts.map((account) => {
            return (
              <BankListCard
                sortCode={account.sortCode}
                customerAccountNumber={account.customerAccountNumber}
                accountNumber={account.accountNumber}
                bvnNumber={account.bvnNumber}
                primaryBank={account.primaryBank}
                key={account.externalAccountId}
                routingNumber={account.routingNumber}
                externalAccountSubType={
                  account.externalAccountSubType
                }
                currency={account.currency}
                zelleEmail={account.zelleEmail}
                userId={account.userId}
                active={account.externalAccountId === chosen}
                accountName={account.accountName}
                onClick={() => setChosen(account.externalAccountId)}
              />
            );
          })}
          <CustomButton
            loading={false}
            onClickHandler={() => testOnClick(chosen)}
          >
            Send Bank Details
          </CustomButton>
        </Fragment>
      );
    }
  };

  return (
    <div className="handleBankAccountList_modal-bg">
      <div className="handleBankAccountList-modal">
        <div className="closeBtn_container">
          <button
            className="closeBtn_bank-list"
            onClick={handleBankAccountList}
          >
            <img src={close} alt="bin" />
          </button>
        </div>
        {renderList(accounts)}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  accountId: state.auth.accountId,
  accounts: state.auth.accounts,
  conversation: state.conversation,
});
export default connect(mapStateToProps, {
  getAccount,
  addNewAccountDetails,
})(BankAccountList);
