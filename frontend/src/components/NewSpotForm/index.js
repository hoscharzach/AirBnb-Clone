
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import * as spotActions from '../../store/spots'
import { Redirect, useHistory } from 'react-router-dom'

export default function HostForm() {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const [errors, setErrors] = useState([])

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    //     useEffect(() => {
    //         const errors = []
    //         if (name.length < 5) errors.push('Name must be at least 5 characters')
    //         if (name.length > 20) errors.push('Name must be less than 20 characters')
    //         if (description.length < 5) errors.push('Description must be at least 5 characters')
    //         if (address.length < 3) errors.push('Address must be at least 3 characters')
    //         if (price > 100000) errors.push('Price must be less than $100,000')
    //         if (imageUrl.length > 150) errors.push('Image url is too long')

    //         setErrors(errors)
    //         if (errors.length > 0 && hasSubmitted === true) {
    //             setDisableSubmit(true)
    //         } else setDisableSubmit(false)

    // }, [name, description, address, city, state, country, price, imageUrl])

    // const reset = () => {
    //     setErrors([])
    //     setName('')
    //     setDescription('')
    //     setPrice('')
    //     setAddress('')
    //     setCity('')
    //     setCountry('')
    //     setImageUrl('')
    // }

    const onSubmit = async (e) => {
        e.preventDefault()

        setErrors([])
        const payload = {
            userId: sessionUser.id,
            name,
            description,
            price: Math.floor(price),
            address,
            city,
            state,
            country,
            lat: 1,
            lng: 1,
            previewImage: imageUrl
        }

        dispatch(spotActions.thunkCreateSpot(payload))
            .then(async (res) => {
                history.push(`/spots/${res}`)
            })
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                }
            );


    }

    if (!sessionUser) {
        return (<Redirect to="/" />)
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

        <div className='host-form-container'>
            <ul className='host-form-errors'>
                {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                ))}
            </ul>
            <h1 className='host-form-title'>Create New Listing</h1>
            <form className='create-listing-form' onSubmit={onSubmit}>
                <input id='create-listing-top-input' required type="text" minLength="5" maxLength="20" placeholder="Name" value={name} onChange={nameChange} ></input>
                <input type="text" minLength="5" maxLength="200" required className='description-field' placeholder="Description" value={description} onChange={descriptionChange} ></input>
                <input type="number" required placeholder="Price" value={price} onChange={priceChange}></input>
                <input required type="text" maxLength="150" placeholder="Address" minLength="3" value={address} onChange={addressChange}></input>
                <input required type="text" maxLength="50" placeholder="City" value={city} onChange={cityChange}></input>
                <input required type="text" maxLength="50" placeholder="State" value={state} onChange={stateChange} ></input>
                <input required type="text" maxLength="40" placeholder="Country" value={country} onChange={countryChange} ></input>
                <input id='create-listing-bottom-input' maxLength="150" required type="text" placeholder="https://image.url" value={imageUrl} onChange={imageUrlChange}></input>
                <button type='submit' id='create-new-listing-button'>Create Listing</button>
            </form>
        </div>
    )
}
