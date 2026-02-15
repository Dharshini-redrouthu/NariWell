import PageWrapper from "../components/PageWrapper";
import "../styles/Home.css";
import "../styles/glass.css"; // ✅ ADD THIS

import hero from "../assets/logos/logo1.png";

import drinkWater from "../assets/daily_routine_stickers/drink_water_girl.png";
import yogaGirl from "../assets/daily_routine_stickers/yoga_girl.png";
import eatingFruits from "../assets/daily_routine_stickers/eating_fruits_girl.png";
import smilingGirl from "../assets/daily_routine_stickers/smiling_girl.png";

export default function Home() {
  return (
    <PageWrapper>
      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="home-text">
          <h1>
            Empowering <span>Women’s Health</span> <br />
            Through Intelligent Care
          </h1>

          <p>
            NariWell is an AI-powered health companion designed to help women
            understand PCOS early, adopt healthy routines, and feel confident
            about their bodies and minds.
          </p>

          <a href="/predict" className="cta">
            Test for PCOS
          </a>
        </div>

        {/* ✅ GLASS CARD APPLIED */}
        <div className="home-image glass-image">
          <img src={hero} alt="Women health illustration" />
        </div>
      </section>
{/* PREMIUM FEATURES */}
<section className="features">

  <div className="feature-card feature-glass">
    <h3>AI PCOS Prediction</h3>
    <p>Smart analysis using health indicators to detect risks early.</p>
  </div>

  <div className="feature-card feature-glass">
    <h3>Daily Routine Tracking</h3>
    <p>Healthy habit reminders designed for women's wellness.</p>
  </div>

  <div className="feature-card feature-glass">
    <h3>Personalized Insights</h3>
    <p>AI-driven suggestions for lifestyle and hormonal balance.</p>
  </div>

</section>

      {/* STICKER PREVIEW */}
      <section className="sticker-section">
        <h2>Healthy Daily Habits 🌸</h2>

        <div className="stickers">
          <div className="sticker-card glass-image">
            <img src={drinkWater} alt="Drink water" />
            <p>Stay Hydrated</p>
          </div>

          <div className="sticker-card glass-image">
            <img src={yogaGirl} alt="Yoga" />
            <p>Practice Yoga</p>
          </div>

          <div className="sticker-card glass-image">
            <img src={eatingFruits} alt="Eat healthy" />
            <p>Eat Fresh Fruits</p>
          </div>

          <div className="sticker-card glass-image">
            <img src={smilingGirl} alt="Positive mood" />
            <p>Positive Mindset</p>
          </div>
        </div>
      </section>

      {/* COPYRIGHT / BRAND WATERMARK */}
      <div className="brand-watermark">
        © NariWell • Caring for Women with Technology
      </div>
    </PageWrapper>
  );
}
