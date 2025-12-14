import React from 'react'
import Hero from '../components/Hero'
import LesionSlider from '../components/LesionSlider'
import Footer from '../components/Footer'
import HowItWorks from '../components/HowItWorks'
import Vision from '../components/Vision'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LesionSlider/>
      <HowItWorks/>
      <Vision/>
    </div>
  )
}

export default Home