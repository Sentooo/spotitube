import React from "react";
import styles from "../../assets/css/admin-header.module.css"; // Import CSS module

function Header() {
  return (
    <header className={`${styles.header} w-100 p-2 row m-0`}>
      <div className="col d-flex align-items-center justify-content-start">
        <h1 className={styles["header-text"]}>SpotiTube</h1>
      </div>
    </header>
  );
}

export default Header;
