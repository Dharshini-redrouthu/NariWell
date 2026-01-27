// frontend/src/pages/Contact.jsx
import PageWrapper from "../components/PageWrapper";
import "../styles/Contact.css";

export default function Contact() {
  return (
    <PageWrapper>
      <div className="contact-container">
        <h1>
    Get in Touch <span className="heart">💌</span>
      </h1>

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
    </PageWrapper>
  );
}
