import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Admin Components
import Home from './admin/home/Home';
import Availability from './admin/availability/Availability';
import Account from './admin/account/Account';
import Calendar from './admin/calendar/Calendar';
import Certificate from './admin/certificate/Certificate';
import Notification from './admin/notification/Notification';
import Schedule from './admin/schedule/Schedule';

// Onboarding Components
import Signup from './onboarding/signup/Signup';
import Registration from './onboarding/register/Registration';
import Login from './onboarding/login/Login';
import Landing from './onboarding/landing/Landing';

// User Components
import AccountUser from './user/account/AccountUser';
import CertificateUser from './user/certificate/CertificateUser';
import UploadCertificate from './user/certificate/UploadCertificate';
import HomeUser from './user/home/HomeUser';
import NotificationUser from './user/notification/NotificationUser';

// Case Study Components
import CaseStudy from './deprecated/caseStudy/CaseStudy';
import CSLogin from './deprecated/caseStudy/CSLogin';

// Layouts
import Admin from './layouts/Admin';
import User from './layouts/User';

// Component
import Wrapper from './components/Wrapper';

function App() {
  return (
    <div className="all">
      <Router>
        <Routes>
          {/* Admin Routes with Layout, Wrapped */}
          <Route
            path="/admin"
            element={
              <Wrapper>
                <Admin />
              </Wrapper>
            }
          >
            
          {/* DEFINE DITO ADMIN FOR NO LAYOUTS */}
          {/* 
          <Route path="/admin/test1" element={<Test1 />} />
          <Route path="/admin/test2" element={<Test2 />} />
          <Route path="/admin/test3" element={<Test3 />} /> 
          */}
            <Route path="home" element={<Home />} />
            <Route path="account" element={<Account />} />
            <Route path="notification" element={<Notification />} />
            <Route path="availability" element={<Availability />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="certificate" element={<Certificate />} />
            <Route path="schedule" element={<Schedule />} />
          </Route>

          {/* User Routes with Layout, Wrapped */}
          <Route
            path="/user"
            element={
              <Wrapper>
                <User />
              </Wrapper>
            }
          >
            <Route path="accountUser" element={<AccountUser />} />
            <Route path="certificateUser" element={<CertificateUser />} />
            <Route path="UploadCertificate" element={<UploadCertificate />} />
            <Route path="homeUser" element={<HomeUser />} />
            <Route path="notificationUser" element={<NotificationUser />} />
          </Route>

          {/* Onboarding Routes */}
          <Route path="/" element={<Landing />} />
          <Route
            path="/signup"
            element={
            <Signup />
             
            }
          />
          <Route
            path="/login"
            element={
              <Wrapper>
                <Login />
              </Wrapper>
            }
          />
          <Route
            path="/registration"
            element={
              <Wrapper>
                <Registration />
              </Wrapper>
            }
          />

          {/* Case Study Routes - no layout */}
          <Route path="/caseStudy" element={<CaseStudy />} />
          <Route path="/caseLogin" element={<CSLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;