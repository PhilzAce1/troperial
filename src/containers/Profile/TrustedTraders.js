import React from 'react';
import verifyIcon from '../../assets/images/troperial-verified.PNG';
import TableHead from '../../components/TableHead/TableHead';
import TableContent from '../../components/TableContent/TableContent';
const TrustedTraders = () => {
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
          />
        </div>
      </div>
    </section>
  );
};

export default TrustedTraders;
