import React, {useState, useEffect} from 'react';
import verifyIcon from '../../assets/images/troperial-verified.PNG';
import TableHead from '../../components/TableHead/TableHead';
import TableContent from '../../components/TableContent/TableContent';
import {connect} from 'react-redux';
import { setDeleteTrustedTradersId, getTrustedTraders } from '../../actions/myTransactionActions';
const TrustedTraders = ({handleDeleteTrustedTradersModal, accountId, personId, setDeleteTrustedTradersId, getTrustedTraders, trustedTraders, loadingTrustedTraders}) => {
  const handleRemoveTrustedTrader = (accountId, personId, userAlias) => {
    console.log(accountId, personId)
    setDeleteTrustedTradersId({accountId, personId, userAlias});
    handleDeleteTrustedTradersModal();
  }

  useEffect(() => {
    getTrustedTraders(accountId, personId);
  }, [])


    if(loadingTrustedTraders) {
      return <p>Loading...</p>
    }
  return (
    <section className="trusted__traders">
      <div className="trusted_traders-info">
        <img src={verifyIcon} alt="trusted traders" />
        <div>
          <h2 className="heading">Who is a trusted trader?</h2>
          <p className="trusted_traders-message">
            A trusted trader is ...
          </p>
        </div>
      </div>
      <div>
       {trustedTraders.length === 0 ? <p>You have no trusted Trader</p> : (
          <div className="table-container">
          <TableHead trustedTraders={true} />
          {trustedTraders.map(trader => (
             <TableContent
             trustedTraders={true}
             username={trader.traderPersonAlias}
             totalTransactions={"---"}
             handleRemoveTrustedTrader={() => handleRemoveTrustedTrader(trader.traderAccountId, trader.traderPersonId, trader.traderPersonAlias)}
           />
          ))}
          </div>
       )}
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  accountId: state.auth.accountId,
  personId: state.auth.personId,
  loadingTrustedTraders: state.myTransaction.loadingTrustedTraders,
  trustedTraders: state.myTransaction.trustedTraders
})
export default connect(mapStateToProps, {setDeleteTrustedTradersId, getTrustedTraders })(TrustedTraders);
