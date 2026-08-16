import { Route, Routes } from 'react-router-dom';
import MarketingLayout from './layouts/MarketingLayout.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import Home from './pages/Home/Home.jsx';
import Services from './pages/Services/Services.jsx';
import Industries from './pages/Industries/Industries.jsx';
import HowItWorks from './pages/HowItWorks/HowItWorks.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Privacy from './pages/Privacy/Privacy.jsx';
import Terms from './pages/Terms/Terms.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Sales from './pages/Sales/Sales.jsx';
import Customers from './pages/Customers/Customers.jsx';
import Distributors from './pages/Distributors/Distributors.jsx';
import Products from './pages/Products/Products.jsx';
import Inventory from './pages/Inventory/Inventory.jsx';
import Finance from './pages/Finance/Finance.jsx';
import Reports from './pages/Reports/Reports.jsx';
import Settings from './pages/Settings/Settings.jsx';
import DesignSystem from './pages/DesignSystem/DesignSystem.jsx';

function App() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/design-system" element={<DesignSystem />} />

      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="sales" element={<Sales />} />
        <Route path="customers" element={<Customers />} />
        <Route path="distributors" element={<Distributors />} />
        <Route path="products" element={<Products />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="finance" element={<Finance />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
