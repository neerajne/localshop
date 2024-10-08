import React, { useEffect, useState } from "react";
import axios from "axios";
import "./hero.css";
import heroIMG from "../assets/newshop.webp";
import stationary from "../assets/st4.jpg";
import Bakery2 from "../assets/bakery.jpg";
import sports from "../assets/sports4.avif";
import grocery from "../assets/grocery.avif";
import electric from "../assets/electric2.jpg";
import homeDecor from "../assets/homedecor.webp";
import clothes from "../assets/clothes.webp";
import restaurent from "../assets/restaurent.webp";
import pharmecy from "../assets/pharmecy.jpg";
import { useShop } from "../context/ShopContext";
import bookstore from "../assets/bookstoresection.avif";

const Hero = () => {
  const { type, setType } = useShop();
  useEffect(() => {
    console.log(type);
  }, [type]);
  return (
    <>
      <div>
        <img
          src={heroIMG}
          alt="Hero"
          style={{ width: "79rem", height: "33rem" }}
          className="img-fluid"
        />
      </div>
      <div
        className="d-flex flex-wrap"
        style={{ justifyContent: "space-evenly" }}
      >
        <div className="mx-5 my-4 shops" style={{ textAlign: "center" }}>
          <img src={bookstore} alt="Shop 1" onClick={() => setType("bookstore")} />
          <p className="fs-6 fw-semibold">Book Store</p>
        </div>
        <div className="mx-5 my-4 shops" style={{ textAlign: "center" }}>
          <img
            src={stationary}
            alt="Shop 2"
            onClick={() => setType("stationary")}
          />
          <p className="fs-6 fw-semibold">Stationary</p>
        </div>
        <div className="mx-5 my-4 shops" style={{ textAlign: "center" }}>
          <img src={Bakery2} alt="Shop 3" onClick={() => setType("bakery")} />
          <p className="fs-6 fw-semibold">Bakeshop</p>
        </div>
        <div className="mx-5 my-4 shops" style={{ textAlign: "center" }}>
          <img
            src={homeDecor}
            alt="Shop 2"
            onClick={() => setType("homedecor")}
          />
          <p className="fs-6 fw-semibold">Home Decor</p>
        </div>
        <div className="mx-5 my-4 shops" style={{ textAlign: "center" }}>
          <img src={restaurent} alt="Shop 2" onClick={() => setType("food")} />
          <p className="fs-6 fw-semibold">Food</p>
        </div>
        <div className="mx-5 my-4 shops" style={{ textAlign: "center" }}>
          <img src={sports} alt="Shop 2" onClick={() => setType("sports")} />
          <p className="fs-6 fw-semibold">Sports</p>
        </div>
        <div className="mx-5 my-4 shops" style={{ textAlign: "center" }}>
          <img src={clothes} alt="Shop 2" onClick={() => setType("garments")} />
          <p className="fs-6 fw-semibold">Garments</p>
        </div>
        <div className="mx-5 my-4 shops" style={{ textAlign: " center" }}>
          <img
            src={pharmecy}
            alt="Shop 2"
            onClick={() => setType("pharmecy")}
          />
          <p className="fs-6 fw-semibold">Pharmacy</p>
        </div>
        <div className="mx-5 my-4 shops" style={{ textAlign: "center" }}>
          <img src={grocery} alt="Shop 2" onClick={() => setType("grocery")} />
          <p className="fs-6 fw-semibold">Grocery</p>
        </div>
        <div className="mx-5 my-4 shops" style={{ textAlign: "center" }}>
          <img
            src={electric}
            alt="Shop 2"
            onClick={() => setType("electronics")}
          />
          <p className="fs-6 fw-semibold">Electronic</p>
        </div>
      </div>
    </>
  );
};

export default Hero;
