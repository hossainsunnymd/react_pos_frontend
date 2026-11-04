import styles from "../styles/dashboard.module.css";
import PanelLayout from "../components/layouts/PanelLayout";

const DashboardPage = () => {
  return (
    <PanelLayout>
      <div className={styles.content}>
        <h3>Dashboard Content Area</h3>
        <p>This section will display your dashboard content.</p>
      </div>
    </PanelLayout>
  );
};

export default DashboardPage;
