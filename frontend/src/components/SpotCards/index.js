import { Link, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import './spot-cards.css'
import star from '../../assets/images/icons/svgexport-14.svg'
import { useEffect, useState } from "react"
import rightArrow from '../../assets/images/icons/rightarrow.svg'
import leftArrow from '../../assets/images/icons/leftarrow.svg'


export default function SpotCard({ spot }) {

    const history = useHistory()
    const [avgStarRating, setAvgStarRating] = useState(null)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (spot.Reviews.length > 0) {
            let numReviews = spot.Reviews.length
            let sum = spot.Reviews.reduce((acc, review) => {
                return acc + review.stars
            }, 0)
            let rating = (sum / numReviews)
            if (rating - Math.floor(rating) === 0) {
                setAvgStarRating(rating.toFixed(1))
            } else {
                setAvgStarRating(rating.toFixed(2))
            }
        }
    }, [spot.Reviews])

    const clickLeft = (e) => {
        e.preventDefault()
        index === 4 ? setIndex(0) : setIndex(prev => prev + 1)
    }

    const clickRight = (e) => {
        e.preventDefault()

        index === 0 ? setIndex(4) : setIndex(prev => prev - 1)
    }

    return (
        <>
            {/* card container */}
            <Link to={`/spots/${spot.id}`} >
                <div className="h-full w-full aspect-square hover:cursor-pointer group relative">
                    {/* card image */}
                    <div className="rounded-xl h-[85%] relative group">
                        <button id="left-button" onClick={clickLeft} className="opacity-0 transition-all w-8 h-8 absolute bg-white group-hover:opacity-75 rounded-full right-4 top-1/2 flex justify-center items-center hover:scale-110 hover:opacity-100 z-50"><img className="w-3 h-3" src={rightArrow}></img></button>
                        <button id="right-button" onClick={clickRight} className="opacity-0 transition-all w-8 h-8 absolute z-50 bg-white group-hover:opacity-75 rounded-full left-4 top-1/2 flex justify-center items-center hover:scale-110 hover:opacity-100 "><img className="w-3 h-3" src={leftArrow}></img></button>
                        <img className="object-cover w-full h-full rounded-xl flex flex-col shadow-lg " src={spot.Images[index]?.imageUrl} alt="" />
                    </div>
                    <div className="flex flex-col pt-2 grow">
                        <div className="flex items-center justify-between">

                            <div className="font-bold">{spot.country}, {spot.realm}</div>
                            {avgStarRating && <div className="flex items-center"><img className="h-[12px] w-[12px] mr-1" src={star} alt="" /> {avgStarRating} </div>}
                            {!avgStarRating && <span>New!</span>}
                        </div>
                        <div className="price-container">
                            <span className="font-bold">${spot.price}</span> night
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
