import React from 'react';
import './ChatMessageView.css';
import ChatInput from '../ChatInput/ChatInput';
import dp from '../../../assets/images/profile-picture.png';
import { Scrollbars } from 'react-custom-scrollbars';
import ChatBubble from '../../../components/ChatBubble/ChatBubble';



import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
 


const ChatMessageView = () => {
    const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();
    const userheaderTitle = () => {
        return (
            <button className="user__header-title">
                <img className="user__header-temporary-dp" src={dp} alt="display picture"/>
                <span className="user__header-username">@runo</span>
            </button>
        )
    }
    return (
        <section className="message__view">
            <header className="message__view--header">
                {userheaderTitle()}
            </header>
            <main className="chat-feed">
       

                     <Scrollbars
                     style={{ height: '100%' }}
               
                 autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
 
                >
                          <ScrollToBottom mode="bottom">
                {/* Chat feed */}

           
         

        <ChatBubble fromMe={true}>
            hey i'm runo
        </ChatBubble>
        <ChatBubble>
            hey i'm tega
        </ChatBubble>
        <ChatBubble fromMe={true}>
           cool
        </ChatBubble>
        <ChatBubble fromMe={true}>
            i'm from delta
        </ChatBubble>
        <ChatBubble fromMe={true}>
           cool
        </ChatBubble>
        <ChatBubble fromMe={true}>
            i'm from delta
        </ChatBubble>
        <ChatBubble fromMe={true}>
           cool
        </ChatBubble>
        <ChatBubble fromMe={true}>
            i'm from delta
        </ChatBubble>
        <ChatBubble>
            looks good
        </ChatBubble>
        <ChatBubble>
            looks good
        </ChatBubble>
        </ScrollToBottom>
        </Scrollbars>
     
            </main>
            <section className="message__view--input-container">
               <ChatInput/>
            </section>
        </section>
    )
}

export default ChatMessageView;
