
import About from "../pages/About";
import Contact from "../pages/Contact";
import Hero from "../pages/Hero";
import Industries from "../pages/Industries";
import Projects from "../pages/CaseStudies";
import Services from "../pages/Services";
// import FAQ from "../pages/FAQ";
// import Testimonials from "../pages/Testimonials";

const Home = () => {
  return (
    <>
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="services"><Services /></section>
      <section id="casestudies"><Projects /></section>
      <section id="industries"><Industries /></section>
      {/* <section id="testimonials"><Testimonials /></section> */}
      {/* <section id="faq"><FAQ /></section> */}
      <section id="contact"><Contact /></section>
    </>
  );
};

export default Home;
