import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { userService } from "../../../services/user.service"
import { loadUser, updateUser } from "../../../store/user/user.actions"
import { ImgUploader } from "../../img-uploader"


export function UserProfile({ user }) {
  const loginUser = userService.getLoggedinUser()
  // const user = useSelector(storeState => storeState.userModule.user)


  // const [userToEdit, setUserToEdit] = useState(user)

  useEffect(() => {
    loadUser(user)
  }, [])

  function onUploaded(data) {
    console.log('user', user)
    const newUser = { ...user, imgUrl: data }
    console.log('newUser', newUser)
    updateUser(newUser)
    // userService.update(user._id, data)
    // // setUserToEdit((prevUser) => ({ ...prevUser, imgUrl: data }))
    // console.log(user, data)

  }
  // function onSave() {
  //   if (user) userService.update(user._id, userToEdit.imgUrl)
  // }
  function handleProfileImg() {


  }
  return (

    <div className="user-profile">

      {user && <div className="user-profile-info" >
        {/* <button className="user-profile-btn-online">online</button> */}
        {/* <button onClick={handleProfileImg} className="user-camera-avatar fa-solid fa-camera"></button> */}
        {user && <div className="user-profile-img" ><img src={user.imgUrl}></img></div>}
        {loginUser && (loginUser._id === user._id) && <ImgUploader onUploaded={onUploaded} />}
        {/* <button onClick={onSave}>save img</button> */}
        <h2>{user.username}</h2>
        {/* {user && loginUser && (loginUser._id === user._id) &&<button className="profile-edit-btn fa-solid fa-pencil"></button>} */}
        <button className="profile-edit-preview-btn"> Preview Finderr Profile</button>
        <div className="user-profile-from"><div> <span className="fa-solid fa-location-dot"></span><span className="user-profile-from-name"> From</span></div><span className="user-profile-from-bold">Canada</span></div>
        <div className="user-profile-from"><div> <span className="fa-solid fa-user"></span><span className="user-profile-from-name">Member since</span></div><span className="user-profile-from-bold">Apr 2020</span></div>
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
