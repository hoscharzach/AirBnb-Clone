import { useSelector } from "react-redux"
import './spot-index.css'
import SpotCard from "../SpotCards"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import * as spotActions from '../../store/spots'


export default function SpotIndex () {
    const spots = useSelector(state => state.spots.normalizedSpots)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(spotActions.thunkLoadAllSpots())
    //   },[dispatch])

    return (
        <div className="spot-display-container">
            <div className="spot-cards-container">
            {Object.values(spots).map(spot => (
                <SpotCard key={spot.id} spotId={spot.id} spot={spot}/>
                ))}
            </div>
        </div>
    )
}
