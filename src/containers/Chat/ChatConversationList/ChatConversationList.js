import React from 'react'
import './ChatConversationList.css';
import { Scrollbars } from 'react-custom-scrollbars';
import UserConvoButton from '../../../components/UserConvoButton/UserConvoButton';
const ChatConversationList = () => {
    return (
        <section className="conversation__list">
              <Scrollbars
            
                style={{ height: '100%'}}
                 autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}>
            <h2>Conversations</h2>
            <input type="text"  placeholder="Search" className="conversation__list--search-bar"/>

            <UserConvoButton/>
            <UserConvoButton/>
            <UserConvoButton/>
            <UserConvoButton/>
            <UserConvoButton/>
            <UserConvoButton/>
            <UserConvoButton/>
            <UserConvoButton/>
            <UserConvoButton/>
            <UserConvoButton/>
            <UserConvoButton/>
            <UserConvoButton/>
            <UserConvoButton/>
            <UserConvoButton/>
            <UserConvoButton/>
            </Scrollbars>
        </section>
    )
}

export default ChatConversationList
