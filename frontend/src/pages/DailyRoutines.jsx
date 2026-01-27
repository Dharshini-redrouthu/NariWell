import PageWrapper from "../components/PageWrapper";
import "../styles/DailyRoutines.css";
import yoga from "../assets/daily_routine_stickers/yoga_girl.png";

export default function DailyRoutines() {
  return (
    <PageWrapper>
      <h2>Healthy Daily Routines 🌿</h2>
      <img src={yoga} />
    </PageWrapper>
  );
}
