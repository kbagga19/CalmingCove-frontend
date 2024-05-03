import React from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import AboutSection from "../../components/AboutSection/AboutSection.jsx";
import HeroSection from "../../components/HeroSection/HeroSection.jsx";
import SliderHomeComponent from "../../components/SliderHomeComponent/SliderHomeComponent.jsx";
import ResourcesSection from "../../components/ResourcesSection/ResourcesSection.jsx";
import SubscriptionSection from "../../components/SubscriptionSection/SubscriptionSection.jsx";
import FAQSection from "../../components/FAQSection/FAQSection.jsx";
import HomePageTest from "../../components/HomePageComponents/HomePageTest.jsx";
import HomePageTherapists from "../../components/HomePageComponents/HomePageTherapists.jsx";
import HomePageBlogs from "../../components/HomePageComponents/HomePageBlogs.jsx";
import HomePageSupport from "../../components/HomePageComponents/HomePageSupport.jsx";

const HomePage = () => {
  return (
    <div>
      <Navbar isHomePage={true} />
      <HeroSection />
      <AboutSection />
      {/*<ResourcesSection /> */}
      <SliderHomeComponent/>
      {/* <HomePageTest/>
      <HomePageTherapists/>
      <HomePageBlogs/>
      <SubscriptionSection />
      <HomePageSupport/> */}
      <SubscriptionSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default HomePage;
