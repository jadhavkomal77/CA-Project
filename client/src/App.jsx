import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ===== ADMIN ===== */
import AdminLogin from "./Auth/AdminLogin";
import AdminRegister from "./Auth/AdminRegister";
import AdminProtected from "./shere/AdminProtected";
import AdminHome from "./Auth/AdminHome";
import AdminProfile from "./Auth/AdminProfile";
import AdminDashboard from "./Auth/AdminDashboard";
import AdminHero from "./admin/AdminHero";
import AdminAbout from "./admin/AdminAbout";
import AdminServices from "./admin/AdminServices";
import AdminNavbar from "./admin/AdminNavbar";
import AdminProjects from "./admin/AdminProjects";
/* ===== PUBLIC ===== */
import PublicLayout from "./layout/PublicLayout";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Home from "./layout/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Contact from "./pages/Contact";
import AddAdminProject from "./admin/AddAdminProject";
import AdminPricing from "./admin/AdminPricing";
import AdminContacts from "./admin/AdminContacts";
import AdminFooter from "./admin/AdminFooter";
import AdminServicesList from "./admin/AdminServicesList";
import AdminServiceEdit from "./admin/AdminServiceEdit";
import NotFound from "./layout/NotFound";
import WhatsappSettings from "./admin/WhatsappSettings";
import Testimonials from "./pages/Testimonials";
import Industries from "./pages/Industries";
import FAQ from "./pages/FAQ";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetails from "./pages/CaseStudyDetails";
import AboutDetails from "./pages/AboutDetails";
import PublicCalculator from "./pages/PublicCalculator";
import AdminCalculators from "./admin/AdminCalculators";



function App() {
  return (
    <BrowserRouter>
      <Routes>

       {/*  PUBLIC  */}
        <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Hero />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:slug" element={<ServiceDetails />} />
              <Route path="casestudies" element={<CaseStudies />} />
              <Route path="casestudies/:slug" element={<CaseStudyDetails />} />
              <Route path="about-details" element={<AboutDetails />} />
              <Route path="publiccalculator" element={<PublicCalculator />} />

              <Route path="testimonials" element={<Testimonials />} />
              <Route path="industries" element={<Industries />} />
              <Route path="faq" element={<FAQ />} />
            
              <Route path="contact" element={<Contact />} />
            
              <Route path="*" element={<NotFound />} />
      </Route>


        {/*  ADMIN AUTH  */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminregister" element={<AdminRegister />} />

        {/*  ADMIN PANEL  */}
        <Route
            path="/admin"
               element={<AdminProtected> <AdminDashboard /> </AdminProtected> }>
                
          <Route index element={<AdminHome />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="navbar" element={<AdminNavbar />} />

          <Route path="calculater" element={<AdminCalculators />} />

          <Route path="hero" element={<AdminHero />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="addservices" element={<AdminServices />} />
          <Route path="serviceslist" element={<AdminServicesList />} />
          <Route path="services/edit/:id" element={<AdminServiceEdit />} />
          {/* PROJECTS */}
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<AddAdminProject />} />  
          <Route path="projects/edit/:id" element={<AddAdminProject />} /> 

        
          <Route path="pricing" element={<AdminPricing />} /> 
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="whatsappsettings" element={<WhatsappSettings />} />
          <Route path="footer" element={<AdminFooter />} />
        
           <Route path="*" element={<NotFound />} />
           </Route>
        
               <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
