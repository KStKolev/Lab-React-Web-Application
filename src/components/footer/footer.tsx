import * as styles from "./footer.m.scss";
import epicGamesLogo from "../../assets/images/footer/epicGamesLogo.svg";
import riotGamesLogo from "../../assets/images/footer/riotGames.svg";
import rockstarGamesLogo from "../../assets/images/footer/rockstarGamesLogo.svg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <h1 className={styles.slogan}>Incredible Convenient</h1>
      <div className={styles.footerContent}>
        <address className={`${styles.footerContainer} ${styles.addressContainer}`}>
          <p>Kolyo.Kolev@ventionTeams.com</p>
          <p>Students Labs Vention {year}</p>
        </address>
        <div className={styles.footerContainer}>
          <a href="https://www.rockstargames.com" target="_blank" rel="noopener noreferrer">
            <img src={rockstarGamesLogo} className={`${styles.logo} ${styles.smallerLogo}`} alt="Rockstar Games Logo" />
          </a>

          <a href="https://www.epicgames.com" target="_blank" rel="noopener noreferrer">
            <img src={epicGamesLogo} className={`${styles.logo} ${styles.smallerLogo}`} alt="Epic Games Logo" />
          </a>

          <a href="https://www.riotgames.com" target="_blank" rel="noopener noreferrer">
            <img src={riotGamesLogo} className={`${styles.logo} ${styles.biggerLogo}`} alt="Riot Games Logo" />
          </a>
        </div>
      </div>
    </footer>
  );
}
