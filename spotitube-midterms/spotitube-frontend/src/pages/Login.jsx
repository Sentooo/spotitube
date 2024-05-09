import { Link } from "react-router-dom";
import "../assets/css/custom.css";
import SocialMediaButton from "../Components/SocialMediaButton";
import NameLogo from "../Components/NameLogo";
import useLogin from "../logic/login.logic";
import FormButton from "../Components/FormButton";
import AlertMessage from "../Components/AlertMessage";
import topLogo from "../assets/img/SpotitubeLogo.png";
import websiteLogo from "../assets/img/LogoMid.png";
import googleLogo from "../assets/img/google-logo.png";
import facebookLogo from "../assets/img/facebook-logo.png";
import twtLogo from "../assets/img/Logo_of_Twitter.svg.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  //login logics and hooks
  const {
    formData,
    responseMessage,
    errorMessage,
    isClicked,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useLogin();

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 vw-100 bg-black">
      <ToastContainer />
      {responseMessage && (
        <AlertMessage type="success" message={responseMessage} />
      )}
      {errorMessage && <AlertMessage type="danger" message={errorMessage} />}

      <img
        src={topLogo}
        alt="Top Logo"
        className="top-logo position-absolute top-0 start-0"
        style={{ width: "150px", height: "auto" }}
      />
      <div className="py-4 px-3 rounded bg-black text-white w-35 d-flex flex-column align-items-center position-relative">
        <img
          src={websiteLogo}
          alt="Website Logo"
          className="logo-image"
          style={{ width: "200px", height: "auto" }}
        />
        <form className="w-75" onSubmit={handleSubmit}>
          <div className="w-100 d-flex flex-column align-items-start justify-content-center gap-1">
            <label
              htmlFor="email"
              className="label-font"
              style={{ fontSize: "1.1rem" }}
            >
              Username or Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="form-control rounded-custom fs-6 border-0 bg-transparent border-bottom border-white text-white"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="label-font"
              style={{ fontSize: "1.1rem" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="form-control fs-6 rounded-custom border-0 bg-transparent border-bottom border-white text-white"
            />
          </div>
          <div className="fs-custom text-center">
            <p className="text-white">
              Not Registered?{" "}
              <u className="link-light">
                <Link to="/register" className="text-white">
                  Sign up
                </Link>
                .
              </u>
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-3">
            <button
              type="submit"
              className="btn btn-custom w-50 p-2 rounded-3 text-white fw-bold"
              disabled={isClicked || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging In...
                </>
              ) : (
                "LOGIN"
              )}
            </button>
          </div>
          <div className="mt-2 fs-custom text-center">
            <p className="cursor-pointer">
              <u>Forgot your Password?</u>
            </p>
          </div>
        </form>
        <div className="d-flex w-100 align-items-center justify-content-center gap-3">
          <p className="mt-3"> Login using:</p>
        </div>
        <div className="w-30 d-flex flex-row gap-1 mt-4">
          <SocialMediaButton logo={googleLogo} />
          <SocialMediaButton logo={facebookLogo} />
          <SocialMediaButton logo={twtLogo} />
          <div className="fs-custom text-center mt-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
