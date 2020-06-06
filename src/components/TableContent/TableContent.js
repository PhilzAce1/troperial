import React, { Fragment } from 'react';
import SendMessageBtn from '../SendMessageBtn/SendMessageBtn';
import './TableContent.css';

const TableContent = ({
  have,
  need,
  rate,
  by,
  status,
  userListings,
  onClick,
  trustedTraders,
  username,
  totalTransactions,
  action,
  handleMessage,
}) => {
  return (
    <Fragment>
      {trustedTraders === true ? (
        <div className="trustedTraders-content__container">
          <div>
            <p className="tableContent__mobile-title">Username</p>
            <p className="tableContent__table-value">{username}</p>
          </div>
          <div>
            <p className="tableContent__mobile-title">
              Total Transactions
            </p>
            <p className="tableContent__table-value">
              {totalTransactions}
            </p>
          </div>
          <div className="auxilliary__div-container">
            <div className="auxilliary-div"></div>
          </div>
          <div className="auxilliary__div-container">
            <div className="auxilliary-div"></div>
          </div>
          <div>
            <p className="tableContent__mobile-title">Action</p>
            <p className="tableContent__table-value">{action}</p>
          </div>
        </div>
      ) : (
        <div className="tableContent__container">
          <div>
            <p className="tableContent__mobile-title">Have</p>
            {have && (
              <p className="tableContent__table-value">{have}</p>
            )}
          </div>
          <div>
            <p className="tableContent__mobile-title">Need</p>
            {need && (
              <p className="tableContent__table-value">{need}</p>
            )}
          </div>
          <div className="auxilliary__div-container">
            <div className="auxilliary-div"></div>
          </div>
          <div className="auxilliary__div-container">
            <div className="auxilliary-div"></div>
          </div>
          <div>
            <p className="tableContent__mobile-title">
              Preferred Rate
            </p>
            {rate && (
              <p className="tableContent__table-value">{rate}</p>
            )}
          </div>
          {userListings === true ? null : (
            <div>
              <p className="tableContent__mobile-title">By</p>
              {by && (
                <p className="tableContent__table-value">{by}</p>
              )}
            </div>
          )}
          <div>
            <p className="tableContent__mobile-title">status</p>
            {status && (
              <p className="tableContent__table-value">{status}</p>
            )}
          </div>
          <div>
            <p
              className={`tableContent__mobile-title ${
                userListings === true ? null : 'hide'
              }`}
            >
              Action
            </p>
            {userListings === true ? (
              <div className="action_btns">
                <button className="show__matches__btn">
                  Show Matches
                </button>
                <button className="edit__btn">Edit</button>
                <button className="delete__btn" onClick={onClick}>
                  Delete
                </button>
              </div>
            ) : null}

            {userListings === true ? null : (
              <SendMessageBtn
                have={have}
                need={need}
                rate={rate}
                by={by}
                status={status}
              />
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};
TableContent.defaultProps = {
  trustedTraders: false,
};
export default TableContent;
