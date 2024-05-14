import Navbar from './navbar.jsx';
import Hero from './hero.jsx';
import Features from './features.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Couriers from './couriers.jsx';
import Pricing from './pricing.jsx';
import Footer from './footer.jsx';
import AboutUs from './aboutUs.jsx';
// Homepage compnent
function HomePage()
{
return(
<>
<div id='home'>
<Navbar />
      <Hero />
      <Features />
      <Couriers />
      {/* <Pricing /> */}
      <AboutUs/>
      <Footer /> 
      </div>

</>

)




}
export default HomePage;