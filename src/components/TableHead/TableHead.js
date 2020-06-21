import React, { Fragment } from 'react';
import './TableHead.css';

const TableHead = ({ userListing, trustedTraders }) => {
  return (
    <Fragment>
      {trustedTraders === true ? (
        <div className="trustedTraders-head__container">
          <div>Username</div>
          <div>Total Transactions</div>
          <div>Action</div>
        </div>
      ) : (
        <div className="tableHead__container">
          <div>
            Have <i className="fas fa-caret-down"></i>
          </div>
          <div>
            Need <i className="fas fa-caret-down"></i>
          </div>
          <div>Preffered Rate</div>
          {userListing === false ? <div>By</div> : null}
          <div>
            Status <i className="fas fa-caret-down"></i>
          </div>
          <div>Action</div>
        </div>
      )}
    </Fragment>
  );
};
TableHead.defaultProps = {
    trustedTraders: false
}
export default TableHead;
