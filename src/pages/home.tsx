import { Home as Render } from "../components/templates/home";
import styles from './pages.module.scss';
export default function HomePage () {
  return (
    <div className={styles.home}>
      <Render />
    </div>
  );
};