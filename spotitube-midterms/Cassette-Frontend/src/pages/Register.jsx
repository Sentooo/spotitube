import { Link } from "react-router-dom";
import { useState } from "react";
import SocialMediaButton from "../Components/SocialMediaButton";
import NameLogo from "../Components/NameLogo";
import useRegister from "../logic/register.logic";
import FormButton from "../Components/FormButton";
import AlertMessage from "../Components/AlertMessage";
import topLogo from "../assets/img/SpotitubeLogo.png";
import websiteLogo from "../assets/img/LogoMid.png";
import googleLogo from "../assets/img/google-logo.png";
import facebookLogo from "../assets/img/facebook-logo.png";
import twtLogo from "../assets/img/Logo_of_Twitter.svg.png";
import "../assets/css/custom.css";
import TermsConditionModal from "../Components/TermsConditionModal";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const {
    formData,
    responseMessage,
    errorMessage,
    isClicked,
    isSubmitting,
    isChecked,
    setIsChecked,
    showModal,
    emailError,
    passwordError,
    disagree,
    handleCloseModal,
    handleChange,
    handleSubmit,
    handleCheckboxChange,
  } = useRegister();
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 vw-100 bg-black">
      <ToastContainer />
      <TermsConditionModal show={show} handleClose={() => setShow(false)} />
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
      <div className="py-4 px-3 rounded bg-black text-white w-35 d-flex flex-column align-items-center">
        <img
          src={websiteLogo}
          alt="Website Logo"
          className="logo-image"
          style={{ width: "200px", height: "auto" }}
        />
        <form className="w-75" onSubmit={handleSubmit}>
          <div className="d-flex flex-column align-items-start justify-content-center gap-1">
            <label
              htmlFor="email"
              className="label-font"
              style={{ fontSize: "1.1rem" }}
            >
              Email:
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
          <div className="d-flex flex-column align-items-start justify-content-center gap-1">
            <label
              htmlFor="password"
              className="label-font"
              style={{ fontSize: "1.1rem" }}
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="form-control rounded-custom fs-6 border-0 bg-transparent border-bottom border-white text-white"
            />
          </div>
          {/* Add radio buttons for user type selection */}
          <div className="d-flex flex-column align-items-center justify-content-center gap-1">
            <label
              className="label-font"
              style={{ fontSize: "1.1rem" }}
            ></label>
            <div className="d-flex gap-3">
              <div className="form-check form-check-inline"></div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-3">
            <button
              type="submit"
              className="btn btn-custom w-50 p-2 rounded-3 text-white fw-bold"
              disabled={!isChecked || isClicked || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Signing Up...
                </>
              ) : (
                "SIGN UP"
              )}
            </button>
          </div>
          <label className="d-flex align-items-center justify-content-center mt-3">
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              className="me-2"
            />
            <span>
              I agree to the <u className="link-light">Terms and Conditions</u>.
            </span>
          </label>
        </form>
        <div className="d-flex w-100 align-items-center justify-content-center gap-3">
          <p className="mt-3"> Sign up using:</p>
        </div>
        <div className="w-30 d-flex flex-row gap-1 mt-4">
          <SocialMediaButton logo={googleLogo} />
          <SocialMediaButton logo={facebookLogo} />
          <SocialMediaButton logo={twtLogo} />
          <div className="fs-custom text-center mt-4"></div>
        </div>
        <p className="text-white">
          Have an account?{" "}
          <u className="link-light">
            <Link to="/login" className="text-white">
              Login
            </Link>
            .
          </u>
        </p>
        <p className="text-white"></p>
        <ToastContainer />
      </div>

      {/* Terms and Conditions Modal */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Terms and Conditions</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Et
                netus et malesuada fames ac. Magnis dis parturient montes
                nascetur ridiculus mus mauris vitae ultricies. In metus
                vulputate eu scelerisque felis imperdiet proin fermentum.
                Fringilla urna porttitor rhoncus dolor purus non enim. Sagittis
                eu volutpat odio facilisis mauris. Bibendum enim facilisis
                gravida neque convallis a. Sed velit dignissim sodales ut eu sem
                integer vitae justo. Id diam vel quam elementum pulvinar etiam.
                Faucibus nisl tincidunt eget nullam. Mauris pharetra et ultrices
                neque ornare aenean euismod elementum nisi. Pretium quam
                vulputate dignissim suspendisse in est ante. Laoreet non
                curabitur gravida arcu ac tortor dignissim. Ac turpis egestas
                maecenas pharetra. Erat velit scelerisque in dictum non
                consectetur a erat nam. Convallis aenean et tortor at risus
                viverra. Aliquam id diam maecenas ultricies mi eget. Pharetra et
                ultrices neque ornare aenean euismod. Eu non diam phasellus
                vestibulum lorem sed risus ultricies tristique. Ac odio tempor
                orci dapibus. Ac tortor vitae purus faucibus ornare suspendisse
                sed nisi lacus. Aliquet enim tortor at auctor urna nunc.
                Placerat in egestas erat imperdiet sed euismod nisi porta lorem.
                Neque aliquam vestibulum morbi blandit cursus risus. Maecenas
                volutpat blandit aliquam etiam erat. Et malesuada fames ac
                turpis egestas integer eget aliquet. Tempor id eu nisl nunc mi.
                Eleifend mi in nulla posuere sollicitudin aliquam. Id aliquet
                lectus proin nibh. Id leo in vitae turpis massa sed elementum
                tempus egestas. Fames ac turpis egestas maecenas pharetra.
                Tortor dignissim convallis aenean et tortor. Volutpat sed cras
                ornare arcu dui vivamus. Et netus et malesuada fames ac turpis
                egestas. Vitae et leo duis ut diam quam nulla. Sed odio morbi
                quis commodo odio aenean sed adipiscing diam. Molestie a iaculis
                at erat pellentesque adipiscing commodo elit at. Et molestie ac
                feugiat sed lectus vestibulum mattis. Sed enim ut sem viverra
                aliquet. Elementum tempus egestas sed sed risus pretium quam
                vulputate. Sed sed risus pretium quam vulputate dignissim
                suspendisse in. Justo eget magna fermentum iaculis. Donec
                ultrices tincidunt arcu non sodales neque sodales. Fermentum
                iaculis eu non diam phasellus vestibulum. Lectus vestibulum
                mattis ullamcorper velit sed. Augue neque gravida in fermentum
                et sollicitudin ac orci phasellus. Habitant morbi tristique
                senectus et netus. A diam sollicitudin tempor id. Nec feugiat
                nisl pretium fusce id velit ut tortor. Cursus vitae congue
                mauris rhoncus. Sagittis purus sit amet volutpat consequat
                mauris nunc congue. Vitae ultricies leo integer malesuada nunc
                vel risus. Lectus magna fringilla urna porttitor rhoncus dolor
                purus non. Purus gravida quis blandit turpis cursus in hac
                habitasse. Sed id semper risus in. Pellentesque adipiscing
                commodo elit at imperdiet dui accumsan sit. Nullam eget felis
                eget nunc lobortis mattis aliquam. Morbi tristique senectus et
                netus et malesuada fames ac. Augue interdum velit euismod in.
                Quisque id diam vel quam elementum. Tincidunt nunc pulvinar
                sapien et ligula ullamcorper malesuada. Lorem ipsum dolor sit
                amet consectetur adipiscing. Faucibus scelerisque eleifend donec
                pretium vulputate. Mauris pellentesque pulvinar pellentesque
                habitant morbi tristique senectus. Mollis nunc sed id semper
                risus in hendrerit gravida rutrum.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Accept and Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
