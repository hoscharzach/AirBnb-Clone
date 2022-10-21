
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
    const stages = ['nameShortDescription', 'longDescription', 'location', 'bosses/bonfires', 'price', 'images']
    const current = stages[stage]

    if (current === 'nameShortDescription') gradientText = "Let's give your place a title and short description"
    if (current === 'longDescription') gradientText = "Go into a little more detail on your place"
    if (current === 'location') gradientText = "Where is this place located?"
    if (current === 'bosses/bonfires') gradientText = "How many bosses and sites of grace are there?"
    if (current === 'price') gradientText = "Now, set your price"
    if (current === 'images') gradientText = "Let's add some photos of your place"

    const next = () => {
        setErrors([])
        const a = []


        // validate first stage, name and short description
        if (stage === 0) {
            if (name.length < 5 || name.length > 15) a.push('Title must be between 5-20 characters')
            if (shortDescription.length < 5) a.push('Description must be at least 5 characters')
        }
        // validate second page, long description
        else if (stage === 1) {
            if (longDescription.length > 500) a.push('Description must be less than 500 characters.')
            if (longDescription.length < 10) a.push('Description must be at least 10 characters.')
        }
        // validate third page, location
        else if (stage === 2) {
            const regex = /^[\w\-\s]+$/;
            if (address.length > 25 || address.length < 3) a.push('Address must be between 3 and 25 characters')
            if (city.length > 25 || city.length < 3) a.push('City must be between 3 and 25 characters')
            if (country.length > 15 || country.length < 3) a.push('Country must be between 3 and 15 characters')
            if (!regex.test(address)) a.push('Only alphanumeric characters are allowed for the address')
        }
        // validate fourth page, price
        else if (stage === 3) {

        }
        // validate last page, images
        else if (stage === 4) {

        }

        if (a.length === 0) setStage(prev => prev + 1)
        else {
            setErrors(a)
        }
    }

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
            <div className='w-full h-full min-h-screen flex flex-col md:flex-row items-center'>
                {/* gradient */}
                <div className='w-full h-2/4 md:w-2/4 md:h-screen bg flex items-center justify-center p-12 font-bold pt-[5vh] min-h-[260px]'>
                    <div className='text-white text-6xl '>{gradientText}</div>
                </div>
                {/* Form side */}
                <div className='flex flex-col justify-end items-center w-screen min-h-2/4 md:h-screen md:w-2/4 relative mb-20 md:m-0'>

                    {stage === 0 &&
                        <div className=' flex flex-col h-full w-full md:w-full md:h-screen items-center justify-center p-4'>
                            <div className='w-4/5 h-full flex flex-col justify-center items-start max-w-[576px]'>
                                <div className='flex flex-col justify-center w-full'>
                                    {validationErrors}
                                </div>
                                <div className='text-2xl '>Title*</div>

                                <input className='text-xl w-full border border-black p-3 my-3 rounded-lg' type="text" placeholder="Roundtable Hold" rows={2} value={name} onChange={(e) => setName(e.target.value)} ></input>
                                <div className='text-2xl'>Short Description*</div>
                                <div className='text-lg text-gray-500'>Your description should be a short blurb that highlights what makes your place special.</div>
                                <textarea className='text-xl w-full border border-black p-3 my-3 rounded-lg' rows={2} type="text" placeholder="Cozy castle with a blacksmith, tons of vendors, and a site of grace" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} ></textarea>
                            </div>
                        </div>
                    }
                    {stage === 1 &&
                        <div className='flex flex-col h-full w-full md:w-full md:h-screen items-center justify-center p-4'>
                            <div className='w-4/5 h-full flex flex-col justify-center items-start max-w-[576px]'>
                                <div className='flex flex-col justify-center w-full'>
                                    {validationErrors}
                                </div>
                                <div className='text-2xl'>Long Description*</div>
                                <div className='text-lg text-gray-500'>Feel free to talk about your place much more thoroughly here.</div>
                                <textarea className='text-xl w-full border border-black p-3 rounded-lg my-3' rows={6} type="text" placeholder="The Roundtable Hold is a haven for all Tarnished to recover after battle, share knowledge, seek guidance from the Two Fingers, and improve their gear. As such, its main purpose is to preserve the Golden Order, which is only proven by the fact that it becomes derelict and abandoned after the burning of the Erdtree." value={longDescription} onChange={(e) => setLongDescription(e.target.value)} ></textarea>
                            </div>
                        </div>
                    }
                    {stage === 2 &&
                        <div className='flex flex-col h-full w-full md:w-full md:h-full items-center justify-center p-4'>
                            <div className='w-4/5 h-full flex flex-col justify-center items-start max-w-[576px]'>
                                <div className='flex flex-col justify-center w-full'>
                                    {validationErrors}
                                </div>
                                <div className='text-2xl'>Address*</div>
                                <div className='text-lg text-gray-500'>Give your guests a general idea of where your place is located.</div>
                                <input className='text-xl w-full border border-black p-3 rounded-lg my-3' rows={6} type="text" placeholder="5 clicks northeast of Stormveil Castle" value={address} onChange={(e) => setAddress(e.target.value)} ></input>
                                <div className='text-2xl'>Country*</div>
                                <div className='text-lg text-gray-500'>What country does your place reside in?</div>
                                <input className='text-xl w-full border border-black p-3 rounded-lg my-3' rows={6} type="text" placeholder="Liurnia of the Lakes" value={city} onChange={(e) => setCity(e.target.value)} ></input>
                                <div className='text-2xl'>Realm*</div>
                                <div className='text-lg text-gray-500'>What realm?</div>
                                <input className='text-xl w-full border border-black p-3 rounded-lg my-3' rows={6} type="text" placeholder="The Lands Between" value={country} onChange={(e) => setCountry(e.target.value)} ></input>

                            </div>
                        </div>

                    }
                    {stage === 3 &&
                        <div className='flex flex-col h-full w-full md:w-full md:h-screen items-center justify-center p-4'>
                            <div className='w-4/5 h-full flex flex-col justify-center items-start max-w-[576px]'>
                                <div className='flex flex-col justify-center w-full'>
                                    {validationErrors}
                                </div>
                                <div className='text-2xl'>Bonfires/Sites of Grace*</div>
                                <div className='text-lg text-gray-500'>How many safe places can your guests rest at?</div>
                                <div className='flex w-full items-center gap-2 mb-6'>
                                    <button onClick={() => setBonfires(prev => prev > 0 ? prev - 1 : prev)} className='border  rounded-full text-lg flex justify-center items-center h-8 w-8 p-3 relative active:scale-95'>-</button>
                                    <div className='text-xl flex justify-center items-center'>{bonfires}</div>
                                    <button onClick={() => setBonfires(prev => prev < 15 ? prev + 1 : prev)} className='border  rounded-full text-lg flex justify-center items-center h-8 w-8 p-3 active:scale-95 '>+</button>
                                </div>
                                <div className='text-2xl'>Bosses/Minibosses*</div>
                                <div className='text-lg text-gray-500'>What kind of action will your guests find?</div>
                                <div className='flex w-full items-center gap-2 mb-4'>
                                    <button onClick={() => setBosses(prev => prev > 0 ? prev - 1 : prev)} className='border  rounded-full text-lg flex justify-center items-center h-8 w-8 p-3 relative active:scale-95'>-</button>
                                    <div className='text-xl flex justify-center items-center'>{bosses}</div>
                                    <button onClick={() => setBosses(prev => prev < 15 ? prev + 1 : prev)} className='border  rounded-full text-lg flex justify-center items-center h-8 w-8 p-3 active:scale-95 '>+</button>
                                </div>

                            </div>
                        </div>}
                    {stage === 4 &&
                        <div className='flex flex-col h-full w-full md:w-full md:h-screen items-center justify-center p-4'>
                            <div className='w-4/5 h-full flex flex-col justify-center items-start max-w-[576px]'>
                                <div className='flex flex-col justify-center w-full'>
                                    {validationErrors}
                                </div>
                                <div className='text-2xl'>Price*</div>
                                <div className='text-lg text-gray-500'>How many safe places can your guests rest at?</div>
                                <div className='flex w-full items-center gap-2 mb-4'>
                                    <button onClick={() => setBonfires(prev => prev > 0 ? prev - 1 : prev)} className='border border-slate-500 rounded-full text-lg flex justify-center items-center h-8 w-8 p-3 relative active:scale-95'>-</button>
                                    <div className='text-xl flex justify-center items-center'>{bonfires}</div>
                                    <button onClick={() => setBonfires(prev => prev < 15 ? prev + 1 : prev)} className='border  rounded-full text-lg flex justify-center items-center h-8 w-8 p-3 active:scale-95 '>+</button>
                                </div>
                                <div className='text-2xl'>Bosses/Minibosses*</div>
                                <div className='text-lg text-gray-500'>What kind of action will your guests find?</div>
                                <div className='flex w-full items-center gap-2 mb-4'>
                                    <button onClick={() => setBosses(prev => prev > 0 ? prev - 1 : prev)} className='border  rounded-full text-lg flex justify-center items-center h-8 w-8 p-3 relative active:scale-95'>-</button>
                                    <div className='text-xl flex justify-center items-center'>{bosses}</div>
                                    <button onClick={() => setBosses(prev => prev < 15 ? prev + 1 : prev)} className='border  rounded-full text-lg flex justify-center items-center h-8 w-8 p-3 active:scale-95 '>+</button>
                                </div>

                            </div>
                        </div>
                    }
                    {/* sticky nav bar for next and back buttons */}
                    <div className='flex h-[80px] fixed bottom-0 py-4 md:relative justify-center w-full bg-white border-t'>
                        <div className='w-4/5 flex justify-between items-center'>
                            <button className='font-bold text-md underline hover:bg-slate-100 p-2' onClick={stage === 0 ? () => history.push('/') : () => setStage(prev => prev - 1)}>{stage === 0 ? 'Home' : 'Back'}</button>
                            <button className='text-base font-semibold rounded-lg py-[14px] px-[24px] text-white bg-[#222222] hover:bg-black active:scale-95' onClick={next}>Next</button>

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
