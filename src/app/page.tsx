// src/app/page.tsx
"use client";



import LandingBasket from "./components/LandingBasket";
import CourseDescription from "./components/CourseDescription";
import styles from "./page.module.css";
import Lectures from "./components/Lectures";
import Assignments from "./components/Assignments";
import FinalProject from "./components/FinalProject";
import CourseCalendar from "./components/CourseCalendar";
import Resources from "./components/Resources";
import Staff from "./components/Staff";
import NavBar from "./components/NavBar";
import FryerBackground from "./components/FryerBackground";
import TemperatureGauge from "./components/TemperatureGauge";
import DeepFriedOverlay from "./components/DeepFriedOverlay";

export default function Home() {
  return (
    <main className={styles.main}>
      <FryerBackground />
      <DeepFriedOverlay />
      {/* <TemperatureGauge /> */}
      <NavBar />
      
      <div className={styles.scrollContainer}>
        <section id="landing-page" className={styles.section} style={{ minHeight: '100vh' }}>
          <LandingBasket />
          <CourseDescription />
        </section>

        <section id="lectures" className={styles.section}>
          <Lectures />
        </section>

        <section id="assignments" className={styles.section}>
          <Assignments />
        </section>

        {/* <section id="final-project" className={styles.section}>
          <FinalProject />
        </section> */}

        <section id="calendar" className={styles.section}>
          <CourseCalendar />
        </section>

        <section id="resources" className={styles.section}>
          <Resources />
        </section>

        <section id="staff" className={styles.section}>
          <Staff />
        </section>
      </div>
    </main>
  );
}
