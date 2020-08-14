import React, {useState, useEffect} from 'react';
import verifyIcon from '../../assets/images/troperial-verified.PNG';
import TableHead from '../../components/TableHead/TableHead';
import TableContent from '../../components/TableContent/TableContent';
import {connect} from 'react-redux';
import axios from 'axios';
const TrustedTraders = ({handleDeleteTrustedTradersModal, accountId, personId}) => {
  const [trustedTraders, setTrustedTraders] = useState([]);

  const getTrustedTraders = async () => {
    const response = await axios.get(`${process.env.REACT_APP_TRANSACTIONS_API}/accounts/${accountId}/traderprofile`);
     console.log(response)
  }

  useEffect(() => {
    getTrustedTraders();
  }, [getTrustedTraders])

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
        <div className="table-container">
          <TableHead trustedTraders={true} />
          <TableContent
            trustedTraders={true}
            action="buy"
            username="Runo"
            totalTransactions={21}
            handleDeleteTrustedTradersModal={handleDeleteTrustedTradersModal}
          />
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  accountId: state.auth.accountId,
  personId: state.auth.personId
})
export default connect(mapStateToProps, null)(TrustedTraders);
