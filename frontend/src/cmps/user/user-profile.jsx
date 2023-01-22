import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { userService } from "../../services/user.service"
import { loadUser } from "../../store/user/user.actions"
import { ImgUploader } from "../img-uploader"


export function UserProfile() {
  const loginUser = userService.getLoggedinUser()
  let user = useSelector(storeState => storeState.userModule.watchedUser)

  // const [userToEdit, setUserToEdit] = useState(user)

  useEffect(() => {
    loadUser(loginUser._id)
  }, [])
  function onUploaded(data) {
    const newUser = { ...user, imgUrl: data }
    userService.update(user._id, data)
    // setUserToEdit((prevUser) => ({ ...prevUser, imgUrl: data }))
    console.log(user, data)

  }
  // function onSave() {
  //   if (user) userService.update(user._id, userToEdit.imgUrl)
  // }
  return (

    <div className="user-profile">
      User Profile
      {user && <div className="user-profile-info" >
        <button className="user-profile-btn-online">online</button>
        {user && <div className="user-profile-img" ><img src={user.imgUrl}></img></div>}
        <ImgUploader onUploaded={onUploaded} />
        {/* <button onClick={onSave}>save img</button> */}
        <h2>{user.username}</h2>
        <button className="profile-edit-btn fa-solid fa-pencil"></button>
        <button className="profile-edit-preview-btn"> Preview Finderr Profile</button>
        <div><span>From</span> <span className="fa-solid fa-location-dot"></span><span>Canada</span></div>
        <div><span>Member since</span> <span className="fa-solid fa-user"></span><span>Apr 2020</span></div>
      </div>}

      {/* <div className="user-profile-Language">
        <div>Languages</div>
        <div>English  - Basic</div>
        <div>Linked Accounts</div>
        <div>Google</div>
      </div> */}


    </div>
  )
}
