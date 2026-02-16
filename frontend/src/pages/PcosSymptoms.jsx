import PageWrapper from "../components/PageWrapper";
import symptomsImg from "../assets/aura_flow.png";
import handImg from "../assets/Pcos_wellness.png";
import "../styles/PcosSymptoms.css";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

export default function PcosSymptoms() {
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
            Polycystic Ovary Syndrome (PCOS) is a hormonal condition that affects
            metabolism, fertility, mental health, and physical wellness. Learning
            symptoms early helps in better management and lifestyle adaptation.
          </p>
        </motion.section>


        {/* HERO IMAGE */}
        <motion.section
          className="pcos-symptoms-hero"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <img src={symptomsImg} alt="PCOS Symptoms" />
        </motion.section>


        {/* BODY IMPACT */}
        <motion.section
          className="pcos-section"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >

          <div className="pcos-text">
            <h2>How PCOS Affects the Body</h2>
            <p>
              PCOS involves hormonal imbalance and insulin resistance,
              disrupting ovulation and menstrual cycles.
            </p>
            <p>
              Common effects include acne, weight gain, mood swings,
              irregular periods, and fertility challenges.
            </p>
          </div>

          <div className="pcos-image">
            <img src={handImg} alt="PCOS Illustration" />
          </div>
        </motion.section>


        {/* PCOS VS PCOD */}
        <motion.section
          className="pcos-compare"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >
          <h2>PCOS vs PCOD — Understanding the Difference</h2>

          <div className="compare-grid">

            <div className="compare-card">
              <h3>PCOS</h3>
              <ul>
                <li>Hormonal disorder</li>
                <li>Higher androgen levels</li>
                <li>Ovulation issues</li>
                <li>Requires lifestyle + medical support</li>
              </ul>
            </div>

            <div className="compare-card">
              <h3>PCOD</h3>
              <ul>
                <li>Ovaries produce immature eggs</li>
                <li>Less severe hormonal imbalance</li>
                <li>Often manageable via lifestyle</li>
                <li>More common condition</li>
              </ul>
            </div>

          </div>
        </motion.section>


        {/* SYMPTOMS CARDS */}
        <motion.section
          className="pcos-symptom-cards"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >

          <h2>Common Symptoms</h2>

          <div className="symptoms-grid">
            <div className="symptom-card">Irregular periods</div>
            <div className="symptom-card">Weight gain</div>
            <div className="symptom-card">Acne & oily skin</div>
            <div className="symptom-card">Hair thinning</div>
            <div className="symptom-card">Mood changes</div>
            <div className="symptom-card">Insulin resistance</div>
          </div>

        </motion.section>

      </div>
    </PageWrapper>
  );
}
