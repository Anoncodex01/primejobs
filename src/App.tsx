import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Header,
  Hero,
  JobCategories,
  ExploreJobs,
  HowWeWorks,
  Footer,
  GetStartedCTA
} from './components';
import FindJob from './pages/FindJob';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <JobCategories />
                <ExploreJobs />
                <HowWeWorks />
                <GetStartedCTA />
              </>
            } />
            <Route path="/find-job" element={<FindJob />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;