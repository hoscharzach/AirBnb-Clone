// import { useDispatch, useSelector } from 'react-redux'
// import { useState } from 'react'
// import * as spotActions from '../../store/spots'
// import { useHistory } from 'react-router-dom'

// export default function AddListing ({setShowModal}) {
//     const sessionUser = useSelector(state => state.session.user)
//     const dispatch = useDispatch()
//     const history = useHistory()


//     const [errors, setErrors] = useState([])
//     const [name, setName] = useState('')
//     const [description, setDescription] = useState('')
//     const [price, setPrice] = useState('')
//     const [address, setAddress] = useState('')
//     const [city, setCity] = useState('')
//     const [state, setState] = useState('')
//     const [country, setCountry] = useState('')
//     const [lat, setLat] = useState('')
//     const [lng, setLng] = useState('')
//     const [imageUrl, setImageUrl] = useState('')

//     const reset = () => {
//         setErrors([])
//         setName('')
//         setDescription('')
//         setPrice('')
//         setAddress('')
//         setCity('')
//         setCountry('')
//         setLat('')
//         setLng('')
//         setImageUrl('')
//     }

//     const onSubmit = async (e) => {
//         e.preventDefault()
//         setErrors([])

//         const formErrors = []
//         if (description.length < 5) formErrors.push('Description must be at least 5 characters')
//         if (lat < -90 || lat > 90) formErrors.push('Latitude must be between -90 and 90.')
//         if (lng < -180 || lng > 180) formErrors.push('Longitude must be between -180 and 180.')

//         setErrors(formErrors)


//         if (formErrors.length === 0) {
//             const payload = {
//                 userId: sessionUser.id,
//                 name,
//                 description,
//                 price,
//                 address,
//                 city,
//                 state,
//                 country,
//                 lat,
//                 lng,
//                 previewImage: imageUrl
//             }

//             const spotId = await dispatch(spotActions.thunkCreateSpot(payload))
//             reset()
//             setShowModal(false)
//             history.push(`/spots/${spotId}`)


//         }
//     }

//     const nameChange = (e) => setName(e.target.value)
//     const descriptionChange = (e) => setDescription(e.target.value)
//     const priceChange = (e) => setPrice(e.target.value)
//     const addressChange = (e) => setAddress(e.target.value)
//     const cityChange = (e) => setCity(e.target.value)
//     const stateChange = (e) => setState(e.target.value)
//     const countryChange = (e) => setCountry(e.target.value)
//     const latChange = (e) => setLat(e.target.value)
//     const lngChange = (e) => setLng(e.target.value)
//     const imageUrlChange = (e) => setImageUrl(e.target.value)

//     return (

//         <div className='host-form-container'>
//             <ul className='host-form-errors'>
//                 {errors.map((error, i) => (
//                     <li key={i}>{error}</li>
//                 ))}
//             </ul>
//         <h1 className='host-form-title'>Host Form</h1>
//             <form onSubmit={onSubmit}>
//                 <input required type="text" placeholder="Name" value={name} onChange={nameChange} ></input>
//                 <textarea required className='description-field' placeholder="Description" value={description} onChange={descriptionChange} ></textarea>
//                 <input type="number" required placeholder="Price" value={price} onChange={priceChange}></input>
//                 <input required type="text" placeholder="Address" value={address} onChange={addressChange}></input>
//                 <input required type="text" placeholder="City" value={city} onChange={cityChange}></input>
//                 <input required type="text" placeholder="State" value={state} onChange={stateChange} ></input>
//                 <input required type="text" placeholder="Country" value={country} onChange={countryChange} ></input>
//                 <input required type="number" placeholder="Latitude" value={lat} onChange={latChange} ></input>
//                 <input required type="number" placeholder="Longitude" value={lng} onChange={lngChange}></input>
//                 <input required type="text" placeholder="https://image.url" value={imageUrl} onChange={imageUrlChange}></input>
//                 <button>Submit Spot</button>
//             </form>
//         </div>
//     )
// }
