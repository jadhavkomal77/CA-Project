
import About from "../pages/About";
import ClientsSection from "../pages/ClientsSection";
import Contact from "../pages/Contact";
import ContactQR from "../pages/ContactQR";

import Hero from "../pages/Hero";
import PublicCalculator from "../pages/PublicCalculator";
import Services from "../pages/Services";


const Home = () => {
  return (
    <>
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="services"><Services /></section>  
      <section id="calculators"><PublicCalculator /></section>
      {/* <section id="clientsSection"><ClientsSection /></section> */}
      <section id="contactQR"><ContactQR /></section>
      <section id="contact"><Contact /></section>
    </>
  );
};

export default Home;
