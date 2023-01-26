import { userService } from "../../../services/user.service"
import { updateUser } from "../../../store/user/user.actions"
import { ImgUploader } from "../../img-uploader"

export function UserProfile({ user }) {
  const loginUser = userService.getLoggedinUser()

  function onUploaded(data) {
    console.log('user', user)
    const newUser = { ...user, imgUrl: data }
    console.log('newUser', newUser)
    updateUser(newUser)
  }

  return (
    <div className="user-profile">
      {user && <>
        <div className="user-profile-info" >
          <div className="img-profile-container">
            <div className="upload-camera fa-solid fa-camera"></div>
            <img src={user.imgUrl}></img>
            {loginUser && (loginUser._id === user._id) && <ImgUploader onUploaded={onUploaded} />}
          </div>
          <h2>{user.username}</h2>
        </div>

        <ul className="user-stats-desc">
          <li>
            <div><span className="fa-solid location-dot"></span><span>From</span></div>
            <span>{user.country}</span>
          </li>
          <li>
            <div><span className="fa-solid user"></span><span>Member since</span></div>
            <span>Aug 2018</span>
          </li>
          <li>
            <div><span className="fa-solid clock"></span><span>Avg. Response Time</span></div>
            <span>1 hour</span>
          </li>
          <li>
            <div><span className="fa-solid paper-plan"></span><span>Last Delivery</span></div>
            <span>2 day</span>
          </li>
        </ul>
      </>}
    </div >
  )
}