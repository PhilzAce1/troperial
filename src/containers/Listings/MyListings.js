import React, { Fragment } from 'react';
import TableHead from '../../components/TableHead/TableHead';
import TableContent from '../../components/TableContent/TableContent';
const MyListings = ({ handleDeleteModal }) => {
  return (
    <Fragment>
      <div className="table-container">
        <TableHead userListing={true} />
        <TableContent
          have="$1500"
          need="(NGN) Nigerian naira"
          rate="1 USD > NGN 470"
          status="Pending"
          userListings={true}
          onClick={handleDeleteModal}
        />
      </div>
    </Fragment>
  );
};

export default MyListings;
