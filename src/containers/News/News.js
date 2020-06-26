import React from 'react'
import Footer from '../../components/Footer/Footer';
import HomeNavBar from '../../components/HomeNavBar/NavBar';
import XchangeRateBanner from '../XchangeRateBanner/XchangeRateBanner';
import './News.css';
import BlogCard from './BlogCard/BlogCard';
const News = () => {
    return (
        <section className="news__container">
        <header className="news__header">
          <XchangeRateBanner/>
          <HomeNavBar />
          <div className="page-introduction-title">
            <div>
              <h1>Market News</h1>
              <p>
                Get the hottest market news about currency and other things
                on Troperial
              </p>
            </div>
          </div>
        </header>
        <main className="news-list">
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
        </main>
        <Footer/>
        </section>
    )
}

export default News
