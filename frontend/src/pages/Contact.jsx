// frontend/src/pages/Contact.jsx

import PageWrapper from "../components/PageWrapper";
import "../styles/Contact.css";

import waveVideo from "../assets/cute_girl_waves_hand.mp4";
import { motion } from "framer-motion";

export default function Contact() {

  return (
    <PageWrapper>

      <div className="contact-container">

        <motion.h1
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
        >
          Get in Touch <span className="heart">💌</span>
        </motion.h1>

        <p className="contact-subtitle">
          We’d love to hear from you. Questions, feedback, or collaboration ideas?
        </p>

        <div className="contact-card">
          <h3>Email Us</h3>

          <a href="mailto:nariwell.ai@gmail.com">
            nariwell.ai@gmail.com
          </a>

          <p className="contact-note">
            We usually respond within 24 hours 🌸
          </p>
        </div>

      </div>


      {/* ⭐ ULTRA PREMIUM END SECTION */}
      {/* ⭐ PREMIUM VISIT AGAIN SECTION */}

<section className="visit-section">

  {/* LEFT SIDE VIDEO */}
  <video
  className="premium-video"
  src={waveVideo}
  autoPlay
  loop
  muted
  playsInline
/>



  {/* RIGHT SIDE TEXT */}
  <div className="visit-text">

      <h2>Visit Again! 🌸</h2>

      <p>
        Your wellness journey continues with NariWell.
        Stay healthy, stay confident, and come back anytime.
      </p>

  </div>

</section>

    </PageWrapper>
  );
}
