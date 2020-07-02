import React, { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import BankCards from '../../components/BankCards/BankCards';
import { connect } from 'react-redux';
import { getAccount } from '../../actions/authActions';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { currency_titles } from '../../constants/currency_titles';
const title = 'Add Your Bank Account Details';
const message =
  'Add your bank accounts to troperial to make quicker and faster trades. Make sure the account name matches whats on your Verification ID.';
const buttonText = 'Add a new bank';
const BankAccount = ({
  handleBackDrop,
  getAccount,
  accountId,
  accounts,
}) => {
  useEffect(() => {
    getAccount(accountId);
  }, [getAccount, accountId]);

  const renderAccounts = (accounts) => {
    if (accounts === null) {
      return (
        <div className="listings_spinner">
          <ScaleLoader size={150} color={'#0383ef'} loading={true} />
        </div>
      );
    } else if (accounts.length === 0) {
      return <h3>No Accounts</h3>;
    } else {
      return accounts.map((account) => (
        <BankCards
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
        />
      ));
    }
  };

  return (
    <section className="profile-container">
      <Banner
        hideSvg={true}
        title={title}
        message={message}
        buttonText={buttonText}
        onClick={handleBackDrop}
      />
      <div className="card_grids">{renderAccounts(accounts)}</div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  accountId: state.auth.accountId,
  accounts: state.auth.accounts,
});

export default connect(mapStateToProps, { getAccount })(BankAccount);
