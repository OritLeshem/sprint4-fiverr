import { Link } from "react-router-dom";

export function GigProgarm({ gig }) {
  return <div className="gig-program">

    <h1 className="gig-program-name">Basic</h1>
    <div className="gig-program-info">
      <h2 className="gig-program-price">$ {gig.price}</h2>
      <p>save up to 10% with <span className="gig-program-subscribe">Subscribe to Save</span></p>
      <p><span className="gig-program-basic">** Basic ** 1 </span>{gig.title}</p>
      <p>3 Days Delivery Unlimited Revisions</p>
      <ul>
        <li ><span className="green-check fa-solid fa-check"></span> <span> 1 concept included </span></li>
        <li> <span className="green-check fa-solid fa-check"></span> <span>Include source file</span></li>
        <li><span className="fa-solid fa-check"></span> <span>Logo transparency </span></li>
        <li><span className="green-check fa-solid fa-check"></span> <span>Include 3D mockup</span></li>
        <li><span className="fa-solid fa-check"></span> <span>Vector file</span></li>
      </ul>
      <Link className="gig-program-link-continue" to={`/payment/${gig._id}`} >Continue <span className="fa-solid arrow-rigth"></span></Link>
    </div>
    <div className="contact-seller"><button className="contact-seller-btn" >Contact Seller</button></div>

  </div>
} 