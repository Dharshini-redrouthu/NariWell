import PageWrapper from "../components/PageWrapper";
import symptomsImg from "../assets/pcos_symptoms.png";
import handImg from "../assets/hand_pcos.png";
import "../styles/PcosSymptoms.css";

export default function PcosSymptoms() {
  return (
    <PageWrapper>
      <div className="pcos-container">

        {/* Intro */}
        <section className="pcos-intro">
          <h1>What is PCOS?</h1>
          <p>
            Polycystic Ovary Syndrome (PCOS) is a common hormonal condition
            affecting women of reproductive age. It can influence menstrual
            cycles, fertility, hormones, metabolism, and overall well-being.
          </p>
        </section>

        {/* Full-width symptoms image */}
        <section className="pcos-symptoms-hero">
          <img src={symptomsImg} alt="PCOS Symptoms" />
        </section>

        {/* Text + hand image */}
        <section className="pcos-section">
          <div className="pcos-text">
            <h2>How PCOS Affects the Body</h2>
            <p>
              PCOS is caused by hormonal imbalance, especially excess androgens
              (male hormones), which disrupt ovulation. This can lead to irregular
              periods, ovarian cysts, and difficulty in conceiving.
            </p>
            <p>
              Insulin resistance is also common in PCOS, increasing the risk of
              weight gain, diabetes, acne, and long-term health complications
              if left unmanaged.
            </p>
          </div>

          <div className="pcos-image">
            <img src={handImg} alt="PCOS Hand Illustration" />
          </div>
        </section>

      </div>
    </PageWrapper>
  );
}
