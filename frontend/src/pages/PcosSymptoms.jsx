import PageWrapper from "../components/PageWrapper";
import img from "../assets/pcos_symptoms.png";
import "../styles/PcosSymptoms.css";

export default function PcosSymptoms() {
  return (
    <PageWrapper>
      <h2>PCOS Symptoms</h2>
      <img src={img} />
    </PageWrapper>
  );
}
