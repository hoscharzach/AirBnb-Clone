import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import './spot-index.css'
import SpotCard from "../SpotCards"
import * as spotActions from '../../store/spots'

export default function SpotIndex () {
    const spots = useSelector(state => state.spots.list)
    const normalizedSpots = useSelector(state => state.spots.normalizedSpots)
    const dispatch = useDispatch()



    return (
        <div className="spot-display-container">
            {spots.map(spot => (
                <SpotCard key={spot.id} spotId={spot.id} />
            ))}
        </div>
    )
}
