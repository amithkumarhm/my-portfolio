import React from 'react'
import HeroSection from '../components/home/HeroSection'
import About from '../components/about/About'
import Skills from '../components/skills/Skills'
import Projects from '../components/projects/Projects'

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <About />
            <Skills />
            <Projects />
        </>
    )
}

export default HomePage