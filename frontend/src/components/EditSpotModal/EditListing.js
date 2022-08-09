import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import * as spotActions from '../../store/spots'
import x from '../../assets/images/icons/x-symbol-svgrepo-com.svg'

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
    const [imageUrl, setImageUrl] = useState(spot?.previewImage || '')
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
            const errors = []
            if (name.length < 5) errors.push('Name must be at least 5 characters')
            if (name.length > 20) errors.push('Name must be less than 20 characters')
            if (description.length < 5) errors.push('Description must be at least 5 characters')
            if (address.length < 3) errors.push('Address must be at least 2 characters')

            setErrors(errors)
            if (errors.length > 0 && hasSubmitted === true) {
                setDisableSubmit(true)
            } else setDisableSubmit(false)

    }, [name, description, address, city, state, country])

    const onSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        if (errors.length === 0) {
            const payload = {
                ...spot,
                name,
                description,
                price,
                address,
                lat: 1.00,
                lng: 1.00,
                city,
                state,
                country,
                previewImage: imageUrl
            }

            await dispatch(spotActions.thunkUpdateSpot(payload))
            setShowModal(false)

        }
    }
    const clickX = (e) => {
        setShowModal(false)
      }

    const nameChange = (e) => setName(e.target.value)
    const descriptionChange = (e) => setDescription(e.target.value)
    const priceChange = (e) => setPrice(e.target.value)
    const addressChange = (e) => setAddress(e.target.value)
    const cityChange = (e) => setCity(e.target.value)
    const stateChange = (e) => setState(e.target.value)
    const countryChange = (e) => setCountry(e.target.value)
    const imageUrlChange = (e) => setImageUrl(e.target.value)

    return (
    <>
        <div className="close-out-button" onClick={clickX}>
          <img className="x" src={x} alt=""></img>
        </div>

        <div className="entire-modal-wrapper">

        <div className="modal-header">
            <div className="header-text">
              Edit Listing
            </div>
        </div>
        <div className='modal-body-wrapper'>
            <div className='host-form-container'>
                <ul className='host-form-errors'>
                    {hasSubmitted && errors.map((error, i) => (
                        <li key={i}>{error}</li>
                        ))}
                </ul>
                <form className='create-listing-form' onSubmit={onSubmit}>
                    <input id='create-listing-top-input' required type="text" placeholder="Name" value={name} minLength="5" maxLength="20" onChange={nameChange} ></input>
                    <input types="text" required className='description-field' placeholder="Description" value={description} onChange={descriptionChange} ></input>
                    <input type="number" min="0" required placeholder="Price" value={price} onChange={priceChange}></input>
                    <input required type="text" placeholder="Address" value={address} onChange={addressChange}></input>
                    <input required type="text" placeholder="City" value={city} onChange={cityChange}></input>
                    <input required type="text" placeholder="State" value={state} onChange={stateChange} ></input>
                    <input required type="text" placeholder="Country" value={country} onChange={countryChange} ></input>
                    <input id='create-listing-bottom-input' required type="url" placeholder="Image Link" value={imageUrl} onChange={imageUrlChange}></input>
                    <button id='signup-submit-button' type="submit" disabled={disableSubmit}>Submit Changes</button>
                </form>
            </div>
            </div>
        </div>
    </>
    )
}
