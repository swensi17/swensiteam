import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import SecuritySection from './components/SecuritySection';
import Process from './components/Process';

import AfterMoney from './components/AfterMoney';
import PoolRules from './components/PoolRules';
import FAQ from './components/FAQ';
import CompaniesSection from './components/CompaniesSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#FF3B30] selection:text-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <CompaniesSection />
        <SecuritySection />
        <Process />

        <AfterMoney />
        <PoolRules />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;