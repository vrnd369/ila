import React from "react";

export default function MasterplanSection() {
  return (
    <>
      <h1 className="masterplanTitle">
        NATURE LEADS<br />the DESIGN
      </h1>

      <div className="masterplanSpaceContainer">
        <h2 className="masterplanSpaceTitle">
          SPACE MEASURED IN CALM<br />NOT JUST YARDS
        </h2>

        <p className="masterplanSpaceText">
          A range of premium Farm Villa Plot sizes will be<br />
          offered. Final pricing and inventory will be<br />
          shared at the time of formal launch.
        </p>

        <div className="masterplanPlotsContainer">
          <div className="plotRow">
            <span className="plotSize">1000-2000 SQ. YDS</span>
            <span className="plotDivider">—</span>
            <span className="plotCount">29 PLOTS</span>
          </div>

          <div className="plotRow">
            <span className="plotSize">2000 SQ. YDS</span>
            <span className="plotDivider">—</span>
            <span className="plotCount">139 PLOTS</span>
          </div>

          <div className="plotRow">
            <span className="plotSize">2000-2500 SQ. YDS</span>
            <span className="plotDivider">—</span>
            <span className="plotCount">23 PLOTS</span>
          </div>

          <div className="plotRow">
            <span className="plotSize">2500-3000 SQ. YDS</span>
            <span className="plotDivider">—</span>
            <span className="plotCount">15 PLOTS</span>
          </div>

          <div className="plotRow">
            <span className="plotSize">3000-3600 SQ. YDS</span>
            <span className="plotDivider">—</span>
            <span className="plotCount">04 PLOTS</span>
          </div>
        </div>
      </div>

      <div className="masterplanConvenienceContainer">
        <h2 className="masterplanConvenienceTitle">
          REDEFINING CONVENIENCE at MOINABAD
        </h2>

        <p className="masterplanConvenienceText">
          Nestled in a green zone with no high-rises in sight,<br />
          ILA is just 35 minutes from the airport and minutes<br />
          from Hyderabad&apos;s key destinations.
        </p>

        <div className="masterplanMapsTravelContainer">
          <a
            href="https://www.google.com/maps/place/ILA/@17.3494429,78.2444799,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcbeb00460f5f27:0xa1d006ddeb80d098!8m2!3d17.3494429!4d78.2444799!16s%2Fg%2F11x78gkt65?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="masterplanMapsButton"
          >
            <span className="mapsButtonText">GOOGLE MAPS</span>
            <span className="mapsButtonIcon"></span>
          </a>

          <ul className="masterplanTravelList">
            <li className="masterplanTravelItem">
              <span className="masterplanTravelNumber">5</span> MINS{" "}
              <span className="travelFrom">from</span> PRAGATHI RESORTS
            </li>
            <li className="masterplanTravelItem">
              <span className="masterplanTravelNumber">10</span> MINS{" "}
              <span className="travelFrom">from</span> EXPERIAN
            </li>
            <li className="masterplanTravelItem">
              <span className="masterplanTravelNumber">10</span> MINS{" "}
              <span className="travelFrom">from</span> RENOWNED INTERNATIONAL SCHOOLS
            </li>
            <li className="masterplanTravelItem">
              <span className="masterplanTravelNumber">25</span> MINS{" "}
              <span className="travelFrom">from</span> THE FINANCIAL DISTRICT
            </li>
            <li className="masterplanTravelItem">
              <span className="masterplanTravelNumber">30</span> MINS{" "}
              <span className="travelFrom">from</span> IBS
            </li>
            <li className="masterplanTravelItem">
              <span className="masterplanTravelNumber">35</span> MINS{" "}
              <span className="travelFrom">from</span> THE INTERNATIONAL AIRPORT
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
