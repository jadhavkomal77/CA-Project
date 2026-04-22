
import About from "../pages/About";
import Contact from "../pages/Contact";
import Hero from "../pages/Hero";
import PublicCalculator from "../pages/PublicCalculator";
// import Industries from "../pages/Industries";
import Services from "../pages/Services";


const Home = () => {
  return (
    <>
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="services"><Services /></section>
      <section id="calculators"><PublicCalculator /></section>
      <section id="contact"><Contact /></section>
    </>
  );
};

export default Home;
