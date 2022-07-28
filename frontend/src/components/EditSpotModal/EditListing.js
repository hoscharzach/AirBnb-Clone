import { useDispatch } from 'react-redux'
import { useState } from 'react'
import * as spotActions from '../../store/spots'

export default function EditListing ({spot, setShowModal}) {
    const dispatch = useDispatch()

    const [errors, setErrors] = useState([])
    const [name, setName] = useState(spot?.name || '')
    const [description, setDescription] = useState(spot?.description || '')
    const [price, setPrice] = useState(spot?.price || '')
    const [address, setAddress] = useState(spot?.address || '')
    const [city, setCity] = useState(spot?.city || '')
    const [state, setState] = useState(spot?.state || '')
    const [country, setCountry] = useState(spot?.country ||'')
    const [lat, setLat] = useState(spot?.lat || '')
    const [lng, setLng] = useState(spot?.lng || '')
    const [imageUrl, setImageUrl] = useState(spot?.previewImage || '')

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const formErrors = []
        if (description.length < 5) formErrors.push('Description must be at least 5 characters')
        if (lat < -90 || lat > 90) formErrors.push('Latitude must be between -90 and 90.')
        if (lng < -180 || lng > 180) formErrors.push('Longitude must be between -180 and 180.')

        setErrors(formErrors)


        if (formErrors.length === 0) {
            const payload = {
                ...spot,
                name,
                description,
                price,
                address,
                city,
                state,
                country,
                lat,
                lng,
                previewImage: imageUrl
            }

            await dispatch(spotActions.thunkUpdateSpot(payload)).catch(
                async (res) => {
                  const data = await res.json();
                  if (data && data.errors) setErrors(data.errors);
                }
              );

              setShowModal(false)

        }
    }

    const nameChange = (e) => setName(e.target.value)
    const descriptionChange = (e) => setDescription(e.target.value)
    const priceChange = (e) => setPrice(e.target.value)
    const addressChange = (e) => setAddress(e.target.value)
    const cityChange = (e) => setCity(e.target.value)
    const stateChange = (e) => setState(e.target.value)
    const countryChange = (e) => setCountry(e.target.value)
    const latChange = (e) => setLat(e.target.value)
    const lngChange = (e) => setLng(e.target.value)
    const imageUrlChange = (e) => setImageUrl(e.target.value)

    return (

        <div className='host-form-container'>
            <ul className='host-form-errors'>
                {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                ))}
            </ul>
        <h1 className='host-form-title'>Edit Listing</h1>
            <form onSubmit={onSubmit}>
                <input required type="text" placeholder="Name" value={name} onChange={nameChange} ></input>
                <textarea required className='description-field' placeholder="Description" value={description} onChange={descriptionChange} ></textarea>
                <input type="number" required placeholder="Price" value={price} onChange={priceChange}></input>
                <input required type="text" placeholder="Address" value={address} onChange={addressChange}></input>
                <input required type="text" placeholder="City" value={city} onChange={cityChange}></input>
                <input required type="text" placeholder="State" value={state} onChange={stateChange} ></input>
                <input required type="text" placeholder="Country" value={country} onChange={countryChange} ></input>
                <input required type="number" placeholder="Latitude" value={lat} onChange={latChange} ></input>
                <input required type="number" placeholder="Longitude" value={lng} onChange={lngChange}></input>
                <input required type="text" placeholder="Image Link" value={imageUrl} onChange={imageUrlChange}></input>
                <button type="submit">Submit Changes</button>
            </form>
        </div>
    )
}
