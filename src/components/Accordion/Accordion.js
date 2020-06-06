import React, {useState} from 'react'
import caret from '../../assets/svgs/green-caret.svg';
import plus from '../../assets/svgs/plus.svg';
import minus from '../../assets/svgs/minus.svg';
import './Accordion.css';
const Accordion = () => {
    const [toggleAccordion, setToggleAccordion] = useState(false);
     
    return (
        <div className="accordion">
            <div className="accordion__header">
                <div className="accordion_title">
                <img src={caret} alt="caret"/>
                <span className="text">How do i create a Troperial Account?</span>
                </div>
                <button onClick={() => setToggleAccordion(!toggleAccordion)} className="accordion__toggleBtn">{!toggleAccordion ? <img src={plus} alt="plus"/> : <img src={minus} alt="plus"/> }</button>
            </div>
          {toggleAccordion && (<div className="accordion__body">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non sequi magni nobis vero voluptate necessitatibus eius inventore vitae ullam maiores.</p>
            </div>)}
        </div>
    )
}

export default Accordion;
