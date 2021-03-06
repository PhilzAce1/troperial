import React from 'react'
import {Link} from 'react-router-dom';
import './EmptyChatView.css';
const EmptyChatView = ({handleBankAccountList}) => {
    return (
        <div className="emptyChatView_container">
         <div>
         <h1>
              Its lonely in here: Go back to the listings page and start a conversation with another trader. Good luck 
            </h1>
            <Link to="/listings" className="emptyChatView_btn">Go back to view listings</Link>
            <button onClick={handleBankAccountList}>bank list</button>
         </div>
        </div>
    )
}

export default EmptyChatView
