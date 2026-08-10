import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopBar from '../components/marketing/TopBar';
import MarketingNavbar from '../components/marketing/MarketingNavbar';
import MarketingFooter from '../components/marketing/MarketingFooter';
import RequestDemoModal from '../components/marketing/RequestDemoModal';

export default function MarketingLayout() {
  const [demoOpen, setDemoOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <TopBar />
      <MarketingNavbar onRequestDemo={() => setDemoOpen(true)} />
      <div className="overflow-x-hidden">
        <Outlet context={{ openDemo: () => setDemoOpen(true) }} />
      </div>
      <MarketingFooter />
      <RequestDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
