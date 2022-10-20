
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import * as spotActions from '../../store/spots'
import { Redirect, useHistory } from 'react-router-dom'
import './newspot.css'

export default function HostForm() {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()


    const [errors, setErrors] = useState([])


    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [images, setImages] = useState([])
    const [shortDescription, setShortDescription] = useState('')
    const [longDescription, setLongDescription] = useState('')
    const [previewImages, setPreviewImages] = useState([])
    const [bosses, setBosses] = useState(0)
    const [bonfires, setBonfires] = useState(0)
    const [stage, setStage] = useState(0)


    // code for the different parts of the form
    let gradientText
    const stages = ['nameShortDescription', 'longDescription', 'location', 'price', 'images']
    const current = stages[stage]
    if (current === 'nameShortDescription') gradientText = "Let's give your place a title and short description"
    if (current === 'longDescription') gradientText = "Go into a little more detail on your place"
    if (current === 'location') gradientText = "Where is this place located?"
    if (current === 'price') gradientText = "How much per night?"
    if (current === 'images') gradientText = "Let's add some photos of your place"

    useEffect(() => {
        setErrors([])
        const a = []

        if (stage === 0) {
            if (name.length < 5 || name.length > 15) a.push('Title must be between 5-20 characters')
            if (shortDescription.length < 5) a.push('Description must be at least 5 characters')
        } else if (stage === 1) {
            if (longDescription.length > 500) a.push('Description must be less than 500 characters.')
        }

        // if (address.length < 3) a.push('Address must be at least 3 characters')
        // if (price > 100000) a.push('Price must be less than $100,000')
        // if (imageUrl.length > 150) a.push('Image url is too long')

        setErrors(a)
        if (errors.length === 0) {
            onSubmit()
            reset()
        }

        // setErrors(errors)
        // if (errors.length > 0 && hasSubmitted === true) {
        //     setDisableSubmit(true)
        // } else setDisableSubmit(false)

    }, [name, shortDescription, longDescription, address, city, state, country, price, imageUrl])

    const reset = () => {
        setErrors([])
        setName('')
        setShortDescription('')
        setLongDescription('')
        setPrice('')
        setBonfires(0)
        setBosses(0)
        setAddress('')
        setCity('')
        setCountry('')
        setImageUrl('')
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        setErrors([])
        const payload = {
            userId: sessionUser.id,
            name,
            longDescription,
            shortDescription,
            price: Math.floor(price),
            address,
            city,
            state,
            country,
            bonfires,
            bosses,
            lat: 1,
            lng: 1,
            previewImage: imageUrl,
            images
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

    // select an image or images, have them displayed in staging area
    const verifyAndPreviewFile = (e) => {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpeg']

        // grab the images
        const files = e.target.files

        // if image is invalid
        Object.values(files).forEach(file => {
            if (!allowedTypes.includes(file.type)) {
                setErrors(prev => [...prev, `${file.name} is not jpg, jpeg or png`])
            }
        })

        // for each image uploaded, verify them as valid images and then store them in preview images
        Object.values(files).forEach(file => {
            const img = document.createElement('img')
            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.addEventListener('load', () => {
                img.onerror = (err) => {
                    setErrors([`${file.name} is an invalid image, please try a different one`])
                }

                img.onload = () => {
                    setPreviewImages(prev => [...prev, reader.result])
                }

                img.src = reader.result
            })
            img.src = ''
        })

        e.target.value = null
    }

    let validationErrors = (
        <ul className='flex flex-col items-center justify-center text-sm text-red-600 mb-2'>
            {errors.map((error, i) => (
                <li key={i}>{error}</li>
            ))}
        </ul>
    )

    return (
        <>
            <div className='w-full h-screen flex flex-col md:flex-row items-center'>
                {/* gradient */}
                <div className='w-full h-2/4 md:w-2/4 md:h-screen bg flex items-center justify-center p-12 font-bold pt-[5vh]'>
                    <div className='text-white text-6xl'>{gradientText}</div>
                </div>
                {/* Form side */}
                <div className='flex flex-col justify-center items-center w-screen h-2/4 md:h-screen md:w-2/4 relative min-h-[400px]'>

                    {current === 'nameShortDescription' &&
                        <div className='flex flex-col h-full w-full md:w-full md:h-screen items-center justify-center p-4'>
                            <div className='w-4/5 h-full flex flex-col justify-center items-start'>
                                <div className='flex flex-col justify-center w-full'>
                                    {validationErrors}
                                </div>
                                <div className='text-2xl '>Title*</div>

                                <input className='text-lg w-full border p-1 my-3' type="text" placeholder="Roundtable Hold" rows={2} value={name} onChange={(e) => setName(e.target.value)} ></input>
                                <div className='text-2xl'>Short Description*</div>
                                <div className='text-lg text-gray-500'>Your description should highlight what makes your place special.</div>
                                <textarea className='text-lg w-full border p-1 my-3' rows={2} type="text" placeholder="Cozy castle with a blacksmith, tons of vendors, and a site of grace" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} ></textarea>
                            </div>
                        </div>
                    }
                    {current === 'longDescription' &&
                        <div>

                        </div>
                    }
                    {/* sticky nav bar for next and back buttons */}
                    <div className='flex sticky bottom-0 h-[100px] py-4 justify-center w-full bg-white rounded-t-lg border-t'>
                        <div className='w-4/5 flex justify-between items-center'>
                            <button className='font-bold text-md underline hover:bg-slate-100 p-2 rounded-lg' onClick={stage === 0 ? () => history.push('/') : () => setStage(prev => prev - 1)}>{stage === 0 ? 'Home' : 'Back'}</button>
                            <button className='text-base font-semibold rounded-lg py-[14px] px-[24px] text-white bg-[#222222] hover:bg-black active:scale-95' onClick={() => setStage(prev => prev + 1)}>Next</button>

                        </div>
                    </div>
                </div>
                {/* <input type="text" className='description-field' placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} ></input>
                        <input type="number" placeholder="Price" value={price} onChange={priceChange}></input>
                        <input type="text" placeholder="Address" minLength="3" value={address} onChange={addressChange}></input>
                        <input type="text" placeholder="City" value={city} onChange={cityChange}></input>
                        <input type="text" placeholder="State" value={state} onChange={stateChange} ></input>
                        <input type="text" placeholder="Country" value={country} onChange={countryChange} ></input> */}

            </div>

            {current === 'images' &&
                <>
                    <div className='flex flex-col items-center'>
                        <ul className='text-red-600'>
                            {errors.map((error, i) => (
                                <li key={i}>{error}</li>
                            ))}
                        </ul>

                        <input type="file" multiple onChange={verifyAndPreviewFile} accept="image/png, image/jpeg image/jpg" ></input>
                        {previewImages.length > 0 &&
                            <div className='w-2/4 grid grid-cols-2'> {previewImages.map(img => (
                                <img className='w-full aspect-square' key={Math.random() * 1000} src={img}></img>
                            ))}
                            </div>}
                        <button onClick={() => setStage(prev => prev - 1)}>Back</button>
                        <button onClick={() => setStage(prev => prev + 1)}>Next</button>
                    </div>
                </>
            }
        </>
    )
}
