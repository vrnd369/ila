import React from "react";
import "./ContactUsSection.css";

export default function ContactUsSection() {
  return (
    <div className="contactUsContainer">
      <h1 className="contactUsTitle">
        <span className="contactUsTitleNoBreak">YOUR GET AWAY STARTS</span><br />
        with ONE CALL
      </h1>

      <h2 className="contactUsSubtitle">CONTACT DETAILS</h2>

      <div className="contactUsOfficeContainer">
        <h3 className="contactUsOfficeTitle">ILA CORPORATE OFFICE</h3>
        <p className="contactUsAddress">
          7-2-H50 & H51, Road No. 6 B, Panchavati colony,<br />
          Manikonda- 500089, Telangana State, India
        </p>
      </div>

      <p className="contactUsPhone">
        <span className="contactUsPhoneNumber">7337084477</span> | <span className="contactUsPhoneNumber">7839 56 9999</span> | <span className="contactUsPhoneNumber">7839 65 9999</span>
      </p>

      <a 
        href="https://ilafarms.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="contactUsWebsite"
      >
        WWW.ILAFARMS.COM
      </a>

      <div className="contactUsSocialContainer">
        <a 
          href="https://www.facebook.com/IlaFarms07" 
          target="_blank" 
          rel="noopener noreferrer"
          className="contactUsSocialIcon contactUsFacebook"
          aria-label="Facebook"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <a 
          href="https://www.instagram.com/ila_farms/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="contactUsSocialIcon contactUsInstagram"
          aria-label="Instagram"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
