import React, {Fragment} from 'react'
import './TableHead.css';

const TableHead = ({userListing}) => {
    return (
        <Fragment>
        <div className="tableHead__container">
            <div>Home <i className="fas fa-caret-down"></i></div>
            <div>Need <i className="fas fa-caret-down"></i></div>
            <div>Preffered Rate</div>
            {userListing === false ? <div>By</div> : null}
            <div>Status <i className="fas fa-caret-down"></i></div>
            <div>Action</div>
        </div>
        </Fragment>
    )
}

export default TableHead
