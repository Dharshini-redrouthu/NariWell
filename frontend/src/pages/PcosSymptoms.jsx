import PageWrapper from "../components/PageWrapper";
import symptomsImg from "../assets/aura_flow.png";
import handImg from "../assets/diff.jpeg";
import "../styles/PcosSymptoms.css";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PcosSymptoms() {

  const [activeImage, setActiveImage] = useState(null);

  // ESC key close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setActiveImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <PageWrapper>

      <div className="pcos-container">

        {/* INTRO */}
        <motion.section
          className="pcos-intro"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1>Understanding PCOS & PCOD</h1>
          <p>
            Polycystic Ovary Syndrome (PCOS) affects hormones,
            metabolism, fertility, and emotional wellbeing.
            Early awareness improves long-term health outcomes.
          </p>
        </motion.section>


        {/* HERO IMAGE */}
        <motion.section
          className="pcos-symptoms-hero"
          initial={{ opacity:0, scale:.95 }}
          whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }}
        >
          <img
            src={symptomsImg}
            alt="PCOS Symptoms"
            onClick={() => setActiveImage(symptomsImg)}
          />
        </motion.section>


        {/* BODY SECTION */}
        <motion.section
          className="pcos-section"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once:true }}
        >

          <div className="pcos-text">
            <h2>How PCOS Affects the Body</h2>
            <p>
              Hormonal imbalance and insulin resistance can
              disrupt ovulation and menstrual cycles.
            </p>
            <p>
              Symptoms may include acne, weight fluctuations,
              mood changes, irregular periods and fertility issues.
            </p>
          </div>

          <div className="pcos-image">
            <img
              src={handImg}
              alt="PCOS Illustration"
              onClick={() => setActiveImage(handImg)}
            />
          </div>

        </motion.section>


        {/* LIGHTBOX PREMIUM */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              className="image-lightbox"
              initial={{ opacity:0, backdropFilter:"blur(0px)" }}
              animate={{ opacity:1, backdropFilter:"blur(12px)" }}
              exit={{ opacity:0 }}
              onClick={() => setActiveImage(null)}
            >
              <motion.img
                src={activeImage}
                initial={{ scale:.8, y:40 }}
                animate={{ scale:1, y:0 }}
                exit={{ scale:.8 }}
                transition={{ type:"spring", stiffness:120 }}
                onClick={(e)=> e.stopPropagation()}
              />

              <span className="close-btn">✕</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </PageWrapper>
  );
}
