import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'

import { SlideGigPreview } from '../slide/slide-gig-preview'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { updateGig } from '../../store/gig/gig.actions'
import { gigService } from '../../services/gig.service'


export function GigPreview({ gig }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [heart, setHeart] = useState(false)
    const [gigToEdit, setGigToEdit] = useState(gigService.getEmptyGig())

    useEffect(() => {
        if (user) {
            if (gig.wishList.includes(user._id)) {
                setHeart(true)
            }
        } else {
            setHeart(false)
        }
    }, [user])

    function getTxtToShow(txt, length) {
        return (txt.length < length) ? txt : txt.substring(0, length + 1) + '...'
    }

    async function onHandleHeart() {
        try {

            console.log("hi")
            let index = gig.wishList.indexOf(user._id)
            if (index > -1) {
                gig.wishList.splice(index, 1)
                setHeart(false)

            } else {
                gig.wishList.push(user._id)
                setHeart(true)


            }
            console.log("gig.wishlist", gig.wishList)
            await updateGig({ ...gig })
        }
        catch (err) {
            console.log(err)
        }






    }

    return <>
        <Link to={`/gig/${gig._id}`} className="img-container">
            <SlideGigPreview gig={gig} />
        </Link>

        <div className="content">
            <div className="owner-info">
                <img src={gig.owner && gig.owner.imgUrl} alt="" />
                <div className="owner">
                    <Link to={`/user/${gig.owner._id}`}>{gig.owner && gig.owner.fullname}</Link>
                    <span>{gig.owner && gig.owner.level}</span>
                </div>
            </div>
            <Link className="title" to={`/gig/${gig._id}`}>
                <div className="long-txt">
                    <span>{getTxtToShow(gig.title, 60)}</span>
                </div>
            </Link>
            <div className="rate">
                <Box sx={{ '& > legend': { mt: 2 } }}>
                    <Rating value={gig.owner.rate} name="half-rating-read" size="small"
                        precision={0.5} max={1} readOnly />
                </Box>
                <div>{gig.owner && gig.owner.rate}</div>
                <div className='ratings-count'>({gig.owner && gig.owner.ratingsCount})</div>

            </div>

        </div>

        <footer>
            <div className="btn-container">
                <button onClick={onHandleHeart} className="fa-solid heart" title="save to list" style={heart ? { color: "red" } : { color: "#b5b6ba" }}></button>
            </div>
            <Link className="price" to={`/gig/${gig._id}`}>
                <small>Starting at</small>
                <span>
                    ${gig.price}
                    <sup>00</sup>
                </span>
            </Link>
        </footer>
    </>
}

// async function onHandleHeart(gig) {
//     try {
//         console.log('heart', heart)
//         setHeart(!heart)
//         console.log('heart', heart)

//         setGigToEdit(gig)
//         console.log('gigToEdit', gigToEdit.wishList)


//         if (user && heart) {
//             // gig.wishList.push(user._id)
//             // setGigToEdit({ ...gig })
//             setGigToEdit({ ...gig, wishList: [...gig.wishList, user._id] })

//             console.log('gigToEdit', gigToEdit._id)
//             console.log("add it to list", gig.wishList.length)
//         }
//         // if (user && !heart) {
//         //     let index = gig.wishList.indexOf(user._id)
//         //     gig.wishList.splice(index, 1)
//         //     setGigToEdit({ ...gig, wishList: [...gig.wishList, user._id] })
//         //     console.log("took it of")
//         // }
//         await updateGig(gigToEdit)

//     } catch (err) {
//         console.log('Cannot save gig: ', err)
//     }
// }

