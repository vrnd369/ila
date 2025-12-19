import React from "react";

export default function AboutSection() {
  return (
    <>
      <h1 className="aboutTitle">DESIGNED FOR a DEEPER PURPOSE</h1>
      <p className="aboutText">
        Today's market is more than a transaction; it carries 
        deep emotional significance across generations. Buying 
        land is a milestone for many.
      </p>
      <p className="aboutText">
        Modern families are craving more than ownership; they 
        own spaces with purpose. A place that nurtures and 
        balances, connections and reassures investment values.
      </p>
      <p className="aboutText">
        iLA meets this need with a community where land, 
        lifestyle, and legacy live in harmony.
      </p>

      <div className="aboutEthosContainer">
        <h2 className="aboutEthosTitle">THE ETHOS WE STAND BY:</h2>
        <ul className="aboutEthosList">
          <li className="aboutEthosPoint">A sanctuary from<br />the rush of city life.</li>
          <li className="aboutEthosPoint">Life is shaped by silence,<br />balance, and purpose.</li>
          <li className="aboutEthosPoint">Thoughtful, nature-first<br />living philosophy.</li>
          <li className="aboutEthosPoint">A return to what truly<br />matters — space, stillness,<br />and connection</li>
        </ul>
        <p className="aboutEthosText">
          This vision of living takes form through iLA's carefully 
          planned spaces, crafted for those who want more than just 
          ownership.
      </p>
    </div>
    </>
  );
}
