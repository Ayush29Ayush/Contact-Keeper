import React from "react";
import Contacts from "../contacts/Contacts";

const Home = () => {
  return (
    <div className="grid-2">
      <div>{/* This will be ContactForm */}</div>
      <div>
          <Contacts />
      </div>
    </div>
  );
};

export default Home;
