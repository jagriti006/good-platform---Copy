import React, { useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { setCookie } from "./../../utils/cookie.util";

function CookieBanner() {
  const [showbanner, setBanner] = useState(true);

  const acceptCookie = () => {
    setCookie("cookied", true, 300);
    setBanner(false);
  };
  return (
    <>
      {showbanner && (
        <div
          className="row"
          style={{
            padding: "20px 50px",
            justifyContent: "space-between",
            position: "fixed",
            bottom: 0,
            borderTop: "1px solid #ccc",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 10px #888888",
          }}
        >
          <p
            className="col-md-10"
            style={{
              fontSize: "12px",
              lineHeight: "17px",
              letterSpacing: ".1px",
              padding: "0 30px 0 0",
            }}
          >
            We use cookies to analyse, assess, verify and track traffic. For the purpose of better service to you we
            might share information about use of our site with social media and API integrators. We have updated our
            Privacy Policy effective October 11, 2021. Please{" "}
            <a className="privacy-btn" href="/privacy-policy">
              click here
            </a>{" "}
            to read our updated Policy.
          </p>
          <button
            style={{
              backgroundColor: "black",
              border: "none",
              color: "white",
              padding: "12px 28px",
              cursor: "pointer",
              maxHeight: "40px",
              fontSize: "12px",
              position: "relative",
            }}
            onClick={acceptCookie}
          >
            Accept
          </button>
        </div>
      )}
    </>
  );
}

export default CookieBanner;
