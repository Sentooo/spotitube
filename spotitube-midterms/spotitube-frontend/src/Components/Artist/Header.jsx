import React from "react";
import logo from "../../assets/img/SpotitubeLogo.png";
import addMusicLogo from "../../assets/img/create-music.png";
import styles from "../../assets/css/artist-header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import profile from "../../assets/img/1.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div
      className={`row w-100 py-1 m-0 text-light nav artist-header ${[
        styles.nav,
      ]}`}
    >
      <div className="col-2 d-flex align-items-center justify-content-start gap-2">
        <Link to={"/"}>
          <img src={logo} alt="" width={"120px"} />
        </Link>
      </div>
      <div className="col-7 d-flex align-items-center justify-content-center">
        <form className="form-inline my-2 my-lg-0 w-50 position-relative">
          <FontAwesomeIcon
            icon={faSearch}
            className={`position-absolute ${styles["search-icon"]}`}
          />
          <input
            className={`${styles["form-control"]} ${styles["border-main"]} form-control bg-transparent text-light border-2 ${styles["padding-left-2"]}`}
            type="search"
            placeholder=""
            aria-label="Search"
          />
        </form>
      </div>
      <div className="col-3 d-flex align-items-center justify-content-end gap-4">
        <div className={styles["profile"]} title="Account">
          <img src={profile} width={"40px"} className="" />
        </div>
      </div>
    </div>
  );
}

export default Header;
