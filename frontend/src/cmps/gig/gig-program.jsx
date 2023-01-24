import { useState } from "react";
import { Link } from "react-router-dom";

export function GigProgram({ gig }) {
  const [program, setProgram] = useState(1)

  function handleProgram(num) {
    if (num === 1) setProgram(1)
    if (num === 2) setProgram(2)
    if (num === 3) setProgram(3)
  }

  return <div className="gig-details-side">
    <div className="gig-program">
      <div className="gig-program-name">
        <button onClick={() => handleProgram(1)}>Basic</button>
        <button onClick={() => handleProgram(2)}>Standard </button>
        <button onClick={() => handleProgram(3)}>Premium </button>
      </div>

      {program === 1 && <div className="gig-program-info">
        <h2 className="gig-program-price">${gig.price}</h2>
        <p>Save up to 10% with <span className="gig-program-subscribe">Subscribe to Save</span></p>
        <p><span className="gig-program-basic">** Basic ** 1 </span>{gig.title}</p>
        <p>3 Days Delivery 3 Revisions</p>
        <ul>
          <li ><span className="green-check fa-solid fa-check"></span> <span> 1 concept included </span></li>
          <li> <span className="green-check fa-solid fa-check"></span> <span>Include source file</span></li>
          <li><span className="fa-solid fa-check"></span> <span>Logo transparency </span></li>
          <li><span className="green-check fa-solid fa-check"></span> <span>Include 3D mockup</span></li>
          <li><span className="fa-solid fa-check"></span> <span>Vector file</span></li>
        </ul>
        <Link className="gig-program-link-continue" to={`/payment/${gig._id}`}>Continue<span className="fa-solid arrow-rigth"></span></Link>
      </div>}
      {program === 2 && <div className="gig-program-info">
        <h2 className="gig-program-price">${gig.price + 5}</h2>
        <p>Save up to 15% with <span className="gig-program-subscribe">Subscribe to Save</span></p>
        <p><span className="gig-program-basic">** Standard ** 2 </span>{gig.title}</p>
        <p>2 Days Delivery 5 Revisions</p>
        <ul>
          <li ><span className="green-check fa-solid fa-check"></span> <span> 2 concept included </span></li>
          <li> <span className="green-check fa-solid fa-check"></span> <span>Include source file</span></li>
          <li><span className="fa-solid fa-check"></span> <span>Logo transparency </span></li>
          <li><span className="green-check fa-solid fa-check"></span> <span>Include 3D mockup</span></li>
          <li><span className="fa-solid fa-check"></span> <span>Vector file</span></li>
        </ul>
        <Link className="gig-program-link-continue" to={`/payment/${gig._id}`}>Continue<span className="fa-solid arrow-rigth"></span></Link>
      </div>}
      {program === 3 && <div className="gig-program-info">
        <h2 className="gig-program-price">${gig.price + 15}</h2>
        <p>Save up to 20% with <span className="gig-program-subscribe">Subscribe to Save</span></p>
        <p><span className="gig-program-basic">** Premium ** 3 </span>{gig.title}</p>
        <p>1 Days Delivery Unlimited Revisions</p>
        <ul>
          <li ><span className="green-check fa-solid fa-check"></span> <span> 3 concept included </span></li>
          <li> <span className="green-check fa-solid fa-check"></span> <span>Include source file</span></li>
          <li><span className="fa-solid fa-check"></span> <span>Logo transparency ++ Social Media Kit </span></li>
          <li><span className="green-check fa-solid fa-check"></span> <span>VIP Support</span></li>
          <li><span className="fa-solid fa-check"></span> <span>Vector file</span></li>
        </ul>
        <Link className="gig-program-link-continue" to={`/payment/${gig._id}`}>Continue<span className="fa-solid arrow-rigth"></span></Link>
      </div>}
    </div>
    <div className="contact-seller"><button className="contact-seller-btn" >Contact Seller</button></div>
  </div>
} 