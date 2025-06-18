
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import About from '@/components/About';
import Impact from '@/components/Impact';
import Partners from '@/components/Partners';
import Leaderboard from '@/components/Leaderboard';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <Impact />
        <Leaderboard />
        <Partners />
        <About />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
