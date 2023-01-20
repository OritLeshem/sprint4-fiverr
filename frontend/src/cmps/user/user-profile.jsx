import { ImgUploader } from "../img-uploader"

export function UserProfile() {
  const user = {
    _id: "u102",
    fullname: "User 2",
    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
    username: "user2",
    password: "secret",
    level: "basic/premium",
    reviews: [
      {
        id: "madeId",
        gig: "{optional-mini-gig}",
        txt: "Very kind and works fast",
        rate: 4,
        by: {
          _id: "u103",
          fullname: "user3",
          imgUrl: "https://cdn.pixabay.com/photo/2021/07/01/02/01/avatar-6377965_960_720.png"
        }
      }
    ],
  }

  return (

    <div className="user-profile">
      User Profile
      <div className="user-profile-info" >
        <button className="user-profile-btn-online">online</button>
        <div className="user-profile-img" ><img src={user.imgUrl}></img></div>
        <h2>{user.username}</h2>
        <button className="profile-edit-btn fa-solid fa-pencil"></button>
        <button className="profile-edit-preview-btn"> Preview Fiverr Profile</button>
        <div><span>From</span> <span className="fa-solid fa-location-dot"></span><span>Canada</span></div>
        <div><span>Member since</span> <span className="fa-solid fa-user"></span><span>Apr 2020</span></div>
      </div>
      <ImgUploader />
      {/* <div className="user-profile-Language">
        <div>Languages</div>
        <div>English  - Basic</div>
        <div>Linked Accounts</div>
        <div>Google</div>
      </div> */}


    </div>
  )
}
