import React, {Fragment} from 'react'
import Hero from './Hero/Hero'
import SecondSection from './SecondSection/SecondSection'
import ThirdSection from './ThirdSection/ThirdSection'
import FourthSection from './FourthSection/FourthSection'
import FifthSection from './FifthSection/FifthSection'
import Footer from '../../components/Footer/Footer'
const Home = () => {
    return (
       <Fragment>
           <Hero/>
           <SecondSection/>
           <ThirdSection/>
           <FourthSection/>
           <FifthSection/>
           <Footer/>
       </Fragment>
    )
}

export default Home;
