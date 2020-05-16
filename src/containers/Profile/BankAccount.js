import React from 'react';
import Banner from '../../components/Banner/Banner';
import BankCards from '../../components/BankCards/BankCards';

const title = 'Add Your Bank Account Details';
const message = 'Add your bank accounts to troperial to make quicker and faster trades. Make sure the account name matches whats on your Verification ID.';
const buttonText = 'Add a new bank';
const BankAccount = () => {
    return (
        <section className="profile-container">
            <Banner hideSvg={true} title={title} message={message}  buttonText={buttonText}/>
            <div className="card_grids">
            <BankCards/>
            <BankCards/>
            <BankCards/>
            </div>
        </section>
    )
}

export default BankAccount
