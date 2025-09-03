import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header, Hero, JobCategories, ExploreJobs, HowWeWorks, GetStartedCTA, Footer, TrustFeatures } from './components';
import { AboutUs } from './components/AboutUs';
import { Solutions as SolutionsSection } from './components/Solutions';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Partners } from './components/Partners';
import { News } from './components/News';
import { BottomCTA } from './components/BottomCTA';
import About from './pages/About';
import Contact from './pages/Contact';
import VisionMission from './pages/VisionMission';
import Solutions from './pages/Solutions';
import TalentAcquisition from './pages/services/TalentAcquisition';
import PerformanceManagement from './pages/services/PerformanceManagement';
import TrainingDevelopment from './pages/services/TrainingDevelopment';
import OrganizationalDesign from './pages/services/OrganizationalDesign';
import JobAnalysis from './pages/services/JobAnalysis';
import VisaPermits from './pages/services/VisaPermits';

// Public pages
import FindJob from './pages/JobSearch';
import JobView from './pages/JobView';
import Companies from './pages/Companies';
import CompanyView from './pages/CompanyProfile';
import JobSearch from './pages/JobSearch';
import CandidateJobSearch from './pages/candidate/JobSearch';
import JobCategoriesPage from './pages/JobCategories';
import CareerHub from './pages/CareerHub';

// Employer pages
import EmployerLayout from './components/employer/EmployerLayout';
import EmployerLogin from './pages/employer/Login';
import EmployerRegister from './pages/employer/Register';
import EmployerDashboard from './pages/employer/Dashboard';
import CreateJob from './pages/employer/CreateJob';
import CompanyProfile from './pages/employer/CompanyProfile';
import Agreements from './pages/employer/Agreements';
import Applications from './pages/employer/Applications';
import JobPostings from './pages/employer/JobPostings';
import Interviews from './pages/employer/Interviews';
import ReferenceCheck from './pages/employer/ReferenceCheck';
import Invoices from './pages/employer/Invoices';
import EnhancedJobPosting from './pages/employer/EnhancedJobPosting';
import Placements from './pages/employer/Placements';
import Analytics from './pages/employer/Analytics';
import Settings from './pages/employer/Settings';

// Candidate pages
import CandidateLayout from './components/candidate/CandidateLayout';
import CandidateLogin from './pages/candidate/Login';
import CandidateRegister from './pages/candidate/Register';
import CandidateDashboard from './pages/candidate/Dashboard';
import CandidateApplications from './pages/candidate/Applications';
import SavedJobs from './pages/candidate/SavedJobs';
import CVBuilder from './pages/candidate/CVBuilder';
import CandidateSettings from './pages/candidate/Settings';
import CandidateApplicationForm from './pages/candidate/ApplicationForm';
import CandidateProfile from './pages/candidate/Profile';

// Admin pages
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCandidates from './pages/admin/Candidates';
import AdminEmployers from './pages/admin/Employers';
import AdminApplications from './pages/admin/Applications';
import AdminInterviews from './pages/admin/Interviews';
import AdminPlacements from './pages/admin/Placements';
import AdminInvoices from './pages/admin/Invoices';
import AdminReports from './pages/admin/Reports';
import AdminCommunications from './pages/admin/Communications';
import AdminPerformance from './pages/admin/Performance';
import AdminSettings from './pages/admin/Settings';
import AdminJobRequirements from './pages/admin/JobRequirements';
import AdminInterviewEvaluation from './pages/admin/InterviewEvaluation';
import CandidateSearch from './pages/admin/CandidateSearch';
import EmployerCandidateSearch from './pages/employer/CandidateSearch';
import ApplicationWorkflow from './pages/admin/ApplicationWorkflow';
import EnhancedSearch from './pages/admin/EnhancedSearch';
import JobPosting from './pages/admin/JobPosting';
import ApplicationManagement from './pages/admin/ApplicationManagement';

// ScrollToTop component to handle scroll position on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'employer' | 'candidate' | 'admin' | null>(null);

  // Check authentication status on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const type = localStorage.getItem('userType') as 'employer' | 'candidate' | 'admin' | null;
    
    if (token && type) {
      setIsAuthenticated(true);
      setUserType(type);
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* Original Homepage with existing components */}
          <Route path="/" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Hero />
                <AboutUs />
                <SolutionsSection />
                <WhyChooseUs />
                <Partners />
                <News />
                <BottomCTA />
                {/* <JobCategories />
                <ExploreJobs />
                <TrustFeatures /> */}
              </main>
              <Footer />
            </div>
          } />
          
          {/* New Content Pages */}
          <Route path="/about" element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          } />
          
          <Route path="/contact" element={
            <>
              <Header />
              <Contact />
              <Footer />
            </>
          } />
          
          <Route path="/vision-mission" element={
            <>
              <Header />
              <VisionMission />
              <Footer />
            </>
          } />
          
          <Route path="/solutions" element={
            <>
              <Header />
              <Solutions />
              <Footer />
            </>
          } />
          
          <Route path="/services/talent-acquisition" element={
            <>
              <Header />
              <TalentAcquisition />
              <Footer />
            </>
          } />
          
          <Route path="/services/performance-management" element={
            <>
              <Header />
              <PerformanceManagement />
              <Footer />
            </>
          } />
          
          <Route path="/services/training-development" element={
            <>
              <Header />
              <TrainingDevelopment />
              <Footer />
            </>
          } />
          
          <Route path="/services/organizational-design" element={
            <>
              <Header />
              <OrganizationalDesign />
              <Footer />
            </>
          } />
          
          <Route path="/services/job-analysis" element={
            <>
              <Header />
              <JobAnalysis />
              <Footer />
            </>
          } />
          
          <Route path="/services/visa-permits" element={
            <>
              <Header />
              <VisaPermits />
              <Footer />
            </>
          } />
          
          {/* Existing Public Routes */}
          <Route path="/find-job" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <FindJob />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/job/:id" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <JobView />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/companies" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Companies />
              </main>
              <Footer />
            </div>
          } />
          
                     <Route path="/company/:id" element={
             <div className="min-h-screen flex flex-col">
               <Header />
               <main className="flex-1">
                 <CompanyView />
               </main>
               <Footer />
             </div>
           } />
          
          <Route path="/job-search" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <JobSearch />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/job-categories" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <JobCategoriesPage />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/career-hub" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <CareerHub />
              </main>
              <Footer />
            </div>
          } />

          {/* Employer Routes */}
          <Route path="/employer/login" element={<EmployerLogin />} />
          <Route path="/employer/register" element={<EmployerRegister />} />
          <Route path="/employer/dashboard" element={<EmployerLayout><EmployerDashboard /></EmployerLayout>} />
          <Route path="/employer/job/create" element={<EmployerLayout><CreateJob /></EmployerLayout>} />
          <Route path="/employer/company-profile" element={<EmployerLayout><CompanyProfile /></EmployerLayout>} />
          <Route path="/employer/agreements" element={<EmployerLayout><Agreements /></EmployerLayout>} />
          <Route path="/employer/jobs" element={<EmployerLayout><JobPostings /></EmployerLayout>} />
          <Route path="/employer/applications" element={<EmployerLayout><Applications /></EmployerLayout>} />
          <Route path="/employer/interviews" element={<EmployerLayout><Interviews /></EmployerLayout>} />
          <Route path="/employer/reference-check" element={<EmployerLayout><ReferenceCheck /></EmployerLayout>} />
          <Route path="/employer/invoices" element={<EmployerLayout><Invoices /></EmployerLayout>} />
          <Route path="/employer/enhanced-job-posting" element={<EmployerLayout><EnhancedJobPosting /></EmployerLayout>} />
          <Route path="/employer/placements" element={<EmployerLayout><Placements /></EmployerLayout>} />
          <Route path="/employer/analytics" element={<EmployerLayout><Analytics /></EmployerLayout>} />
          <Route path="/employer/candidate-search" element={<EmployerLayout><EmployerCandidateSearch /></EmployerLayout>} />
          <Route path="/employer/settings" element={<EmployerLayout><Settings /></EmployerLayout>} />

          {/* Candidate Routes */}
          <Route path="/candidate/login" element={<CandidateLogin />} />
          <Route path="/candidate/register" element={<CandidateRegister />} />
          <Route path="/candidate/dashboard" element={<CandidateLayout><CandidateDashboard /></CandidateLayout>} />
          <Route path="/candidate/applications" element={<CandidateLayout><CandidateApplications /></CandidateLayout>} />
          <Route path="/candidate/saved-jobs" element={<CandidateLayout><SavedJobs /></CandidateLayout>} />
          <Route path="/candidate/cv-builder" element={<CandidateLayout><CVBuilder /></CandidateLayout>} />
          <Route path="/candidate/application-form" element={<CandidateLayout><CandidateApplicationForm /></CandidateLayout>} />
          <Route path="/candidate/profile" element={<CandidateLayout><CandidateProfile /></CandidateLayout>} />
          <Route path="/candidate/settings" element={<CandidateLayout><CandidateSettings /></CandidateLayout>} />
          <Route path="/candidate/job-search" element={<CandidateLayout><CandidateJobSearch /></CandidateLayout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/candidates" element={<AdminLayout><AdminCandidates /></AdminLayout>} />
          <Route path="/admin/enhanced-search" element={<AdminLayout><EnhancedSearch /></AdminLayout>} />
          <Route path="/admin/job-posting" element={<AdminLayout><JobPosting /></AdminLayout>} />
          <Route path="/admin/application-management" element={<AdminLayout><ApplicationManagement /></AdminLayout>} />
          <Route path="/admin/candidate-search" element={<AdminLayout><CandidateSearch /></AdminLayout>} />
          <Route path="/admin/application-workflow" element={<AdminLayout><ApplicationWorkflow /></AdminLayout>} />
          <Route path="/admin/employers" element={<AdminLayout><AdminEmployers /></AdminLayout>} />
          <Route path="/admin/job-requirements" element={<AdminLayout><AdminJobRequirements /></AdminLayout>} />
          <Route path="/admin/interview-evaluation" element={<AdminLayout><AdminInterviewEvaluation /></AdminLayout>} />
          <Route path="/admin/applications" element={<AdminLayout><AdminApplications /></AdminLayout>} />
          <Route path="/admin/interviews" element={<AdminLayout><AdminInterviews /></AdminLayout>} />
          <Route path="/admin/placements" element={<AdminLayout><AdminPlacements /></AdminLayout>} />
          <Route path="/admin/invoices" element={<AdminLayout><AdminInvoices /></AdminLayout>} />
          <Route path="/admin/reports" element={<AdminLayout><AdminReports /></AdminLayout>} />
          <Route path="/admin/communications" element={<AdminLayout><AdminCommunications /></AdminLayout>} />
          <Route path="/admin/performance" element={<AdminLayout><AdminPerformance /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;