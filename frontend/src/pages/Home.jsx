import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import SeasonalBanner from '../components/SeasonalBanner'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection/>
      <SeasonalBanner />
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
