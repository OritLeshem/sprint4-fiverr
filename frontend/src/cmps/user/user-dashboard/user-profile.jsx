import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { userService } from "../../../services/user.service"
import { loadUser, updateUser } from "../../../store/user/user.actions"
import { ImgUploader } from "../../img-uploader"

export function UserProfile() {

  const loginUser = userService.getLoggedinUser()
  const [isSameUser, setIsSameUser] = useState(false)// if loggin ===user
  const [user, setUser] = useState(false)
  const { userId } = useParams()

  const loginStoreUser = useSelector(storeState => storeState.userModule.user)


  useEffect(() => {
    loginUser && loadUser(loginUser._id)
    onSetUser(userId)
    if (userId === loginUser._id) setIsSameUser(true)
    else setIsSameUser(false)


  }, [userId])

  async function onSetUser(userId) {
    try {
      const currUser = await userService.getById(userId)
      setUser(currUser)
    }
    catch (err) {
      console.log("cannot find user")
    }

  }

  function onUploaded(data) {
    const newUser = { ...loginStoreUser, imgUrl: data }
    updateUser(newUser)
  }

  return (
    <div className="user-profile">
      {user && <>
        <div className="user-profile-info" >
          <div className="img-profile-container">
            {isSameUser && <div className="upload-camera fa-solid fa-camera"></div>}
            {isSameUser && <img src={loginStoreUser.imgUrl}></img>}
            {!isSameUser && <img src={user.imgUrl}></img>}

            {isSameUser && <ImgUploader onUploaded={onUploaded} />}
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