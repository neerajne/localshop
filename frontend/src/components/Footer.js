import React from "react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#3F5165", marginTop: "1.2rem" }}>
      <div
        className="fs-6 fw-medium"
        style={{
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px",
        }}
      >
        Shop Local , shop Smart
      </div>
      <div
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "#232F3E",
          padding: "0.7rem",
          color: "whitesmoke",
        }}
        className="lh-lg"
      >
        Localshop is the perfect app for those who prefer supporting their local
        shops rather than ordering from big platforms like Amazon or Flipkart.
        With Localshop, you can easily find and purchase products from trusted
        neighborhood stores, all with the convenience of home delivery. No more
        trust issues—shop from familiar local vendors you know, while supporting
        your community. Localshop connects you directly with nearby businesses,
        making your shopping experience easier and more reliable. Shop local,
        shop smart—because your community matters.
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "whitesmoke",
          }}
          className="fs-4"
        >
          <i
            className="bi bi-instagram icons"
            style={{ padding: "0.5rem" }}
          ></i>
          <i className="bi bi-twitter icons"></i>
          <i className="bi bi-facebook icons" style={{ padding: "0.5rem" }}></i>
          <i className="bi bi-envelope icons"></i>
          <i
            className="bi bi-telephone icons"
            style={{ padding: "0.5rem" }}
          ></i>
          <i className="bi bi-whatsapp icons"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
