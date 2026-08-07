import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { CampusLifePage } from './pages/CampusLifePage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { AdminPage } from './pages/AdminPage';

import { AdmissionsModal } from './components/modals/AdmissionsModal';
import { TourModal } from './components/modals/TourModal';
import { SearchModal } from './components/modals/SearchModal';
import { FacilityDetailModal } from './components/modals/FacilityDetailModal';
import { PopupsDisplay } from './components/PopupsDisplay';

import { CampusFacility } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [subTab, setSubTab] = useState<string | undefined>(undefined);

  const [admissionsModalOpen, setAdmissionsModalOpen] = useState(false);
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<CampusFacility | null>(null);

  const handleNavigatePage = (page: string, targetSubTab?: string) => {
    setCurrentPage(page);
    setSubTab(targetSubTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      <div>
        {/* Sticky Header with 4 Core Menus */}
        <Header
          currentPage={currentPage}
          onNavigatePage={handleNavigatePage}
          onOpenAdmissions={() => setAdmissionsModalOpen(true)}
          onOpenTour={() => setTourModalOpen(true)}
          onOpenSearch={() => setSearchModalOpen(true)}
        />

        {/* Dynamic Page Router */}
        <main className="min-h-[70vh]">
          {currentPage === 'home' && (
            <HomePage
              onOpenAdmissions={() => setAdmissionsModalOpen(true)}
              onOpenTour={() => setTourModalOpen(true)}
              onNavigatePage={handleNavigatePage}
              onSelectFacility={(facility) => setSelectedFacility(facility)}
            />
          )}

          {currentPage === 'about' && (
            <AboutPage
              initialSubTab={subTab || 'principal'}
              onOpenAdmissions={() => setAdmissionsModalOpen(true)}
              onOpenTour={() => setTourModalOpen(true)}
            />
          )}

          {currentPage === 'academics' && (
            <AcademicsPage
              initialSubTab={subTab || 'overview'}
              onOpenAdmissions={() => setAdmissionsModalOpen(true)}
              onOpenTour={() => setTourModalOpen(true)}
            />
          )}

          {currentPage === 'campus-life' && (
            <CampusLifePage
              initialSubTab={subTab || 'facilities'}
              onSelectFacility={(facility) => setSelectedFacility(facility)}
              onOpenTour={() => setTourModalOpen(true)}
              onOpenAdmissions={() => setAdmissionsModalOpen(true)}
            />
          )}

          {currentPage === 'admissions' && (
            <AdmissionsPage
              initialSubTab={subTab || 'process'}
              onOpenAdmissionsModal={() => setAdmissionsModalOpen(true)}
              onOpenTourModal={() => setTourModalOpen(true)}
            />
          )}

          {currentPage === 'admin' && (
            <AdminPage
              onOpenAdmissions={() => setAdmissionsModalOpen(true)}
              onOpenTour={() => setTourModalOpen(true)}
              onNavigateHome={() => handleNavigatePage('home')}
            />
          )}
        </main>
      </div>

      {/* Comprehensive Footer */}
      <Footer
        onOpenAdmissions={() => setAdmissionsModalOpen(true)}
        onOpenTour={() => setTourModalOpen(true)}
        onNavigatePage={handleNavigatePage}
      />

      {/* Active School Popups for Website Visitors */}
      <PopupsDisplay
        onOpenAdmissions={() => setAdmissionsModalOpen(true)}
        onOpenTour={() => setTourModalOpen(true)}
      />

      {/* Interactive Modals */}
      <AdmissionsModal
        isOpen={admissionsModalOpen}
        onClose={() => setAdmissionsModalOpen(false)}
      />

      <TourModal
        isOpen={tourModalOpen}
        onClose={() => setTourModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigatePage={handleNavigatePage}
      />

      <FacilityDetailModal
        facility={selectedFacility}
        onClose={() => setSelectedFacility(null)}
        onOpenTour={() => setTourModalOpen(true)}
      />
    </div>
  );
}
