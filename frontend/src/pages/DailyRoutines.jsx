import PageWrapper from "../components/PageWrapper";
import "../styles/DailyRoutines.css";

// Stickers
import celebrating from "../assets/daily_routine_stickers/celebrating_girl.png";
import cute from "../assets/daily_routine_stickers/cute_girl.png";
import water from "../assets/daily_routine_stickers/drink_water_girl.png";
import fruits from "../assets/daily_routine_stickers/eating_fruits_girl.png";
import exciting from "../assets/daily_routine_stickers/exciting_girl.png";
import routine from "../assets/daily_routine_stickers/routine_2girls.png";
import smiling from "../assets/daily_routine_stickers/smiling_girl.png";
import study from "../assets/daily_routine_stickers/study_girl.png";
import style from "../assets/daily_routine_stickers/style_girl.png";
import task from "../assets/daily_routine_stickers/task_complete_girl.png";
import yoga from "../assets/daily_routine_stickers/yoga_girl.png";

const routines = [
  { img: water, title: "Drink Enough Water", desc: "Stay hydrated throughout the day" },
  { img: fruits, title: "Eat Healthy Foods", desc: "Fruits & balanced nutrition" },
  { img: yoga, title: "Exercise / Yoga", desc: "Improve hormones & mental health" },
  { img: study, title: "Stay Focused", desc: "Reduce stress & improve productivity" },
  { img: smiling, title: "Positive Mindset", desc: "Emotional balance matters" },
  { img: style, title: "Healthy Lifestyle", desc: "Consistency builds confidence" },
  { img: task, title: "Complete Daily Goals", desc: "Small wins every day" },
  { img: celebrating, title: "Celebrate Progress", desc: "Every step counts 🎉" },
  { img: routine, title: "Follow a Routine", desc: "Structure improves wellbeing" },
  { img: exciting, title: "Stay Motivated", desc: "You’re doing great!" },
  { img: cute, title: "Self Care Time", desc: "Rest is also productive" },
];

export default function DailyRoutines() {
  return (
    <PageWrapper>
      <div className="daily-container">
        <h1>Healthy Daily Routines 🌿</h1>
        <p className="subtitle">
          Simple habits that support hormonal balance and overall wellness
        </p>

        <div className="routine-grid">
          {routines.map((item, index) => (
            <div className="routine-card" key={index}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
