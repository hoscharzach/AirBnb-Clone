import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import * as spotActions from '../../store/spots'
import { Redirect, useHistory } from 'react-router-dom'
import imageSvg from '../../assets/images/icons/imagesvg.svg'
import './newspot.css'
import { dataURLtoFile } from '../../utils/functions'

export default function HostForm() {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    let editSpot
    let editSpotImages = []
    if (history?.location?.state?.spot) {
        editSpot = history.location.state.spot
        editSpotImages = editSpot.Images.map(img => ({
            id: img.id, url: img.imageUrl, element: <img key={img.id} onClick={(e) => {
                setPreviewImages(prev => prev.filter(el => el.id !== img.id))
            }} className='aspect-video md:aspect-square object-cover hover:opacity-90 hover:bg-red-500' src={img.imageUrl}></img>
        }))
    }

    const initial = []
    for (let i = 0; i < 5; i++) {
        initial.push({ id: nanoid(), element: <div key={nanoid()} onClick={handleFileClick} className=' flex justify-center items-center w-full aspect-video md:aspect-square border border-dashed border-black active:border-solid'><img src={imageSvg}></img></div> })
    }

    const [errors, setErrors] = useState([])
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState(editSpot?.name || '')
    const [price, setPrice] = useState(editSpot?.price || 10)
    const [directions, setDirections] = useState(editSpot?.directions || '')
    const [country, setCountry] = useState(editSpot?.country || '')
    const [realm, setRealm] = useState(editSpot?.realm || '')
    const [shortDescription, setShortDescription] = useState(editSpot?.shortDescription || '')
    const [longDescription, setLongDescription] = useState(editSpot?.longDescription || '')
    const [bosses, setBosses] = useState(editSpot?.bosses || 0)
    const [bonfires, setBonfires] = useState(editSpot?.bonfires || 0)
    const [stage, setStage] = useState(0)
    const [loading, setLoading] = useState(false)


    // -fill preview images with user images
    //  - map through default images
    //  - if there is a real image at the same index in preview images, render that
    //  - otherwise render the default image
    const [previewImages, setPreviewImages] = useState(editSpot ? editSpotImages : [])
    const [defaultImages, setDefaultImages] = useState(initial)


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

    function handleFileClick(e) {
        const fileInput = document.getElementById("file-upload")
        fileInput.click()
    }


    // only go to next page if the form will validate with current values
    const next = () => {
        setErrors([])
        const a = []

        // validate first stage, name and short description
        if (stage === 0) {
            if (name.length < 5 || name.length > 25) a.push('Title must be between 5-25 characters')
            if (shortDescription.length < 5 || shortDescription.length > 50) a.push('Short description must be between 5-50 characters')
        }
        // validate second page, long description
        else if (stage === 1) {
            if (longDescription.length > 500) a.push('Description must be less than 500 characters.')
            if (longDescription.length < 10) a.push('Description must be at least 10 characters.')
        }
        // validate third page, location
        else if (stage === 2) {
            // const regex = /^[\w\-\s]+$/;

            if (directions.length > 25 || directions.length < 3) a.push('Address must be between 3 and 25 characters')
            if (country.length > 25 || country.length < 3) a.push('Country must be between 3 and 25 characters')
            if (realm.length > 30 || realm.length < 3) a.push('Realm must be between 5 and 30 characters')
            // if (!regex.test(directions)) a.push('Only alphanumeric characters are allowed for the address')
        }
        // validate fourth page, bosses/bonfires
        else if (stage === 3) {

        }
        // validate fifth page, price
        else if (stage === 4) {
            const regExp = /\D+/
            const priceTest = price.replace(regExp, '')
            console.log(Number(priceTest))
            if (priceTest.length !== price.length) a.push('Please enter a valid whole number')
            else if (Number(priceTest) < 1 || Number(priceTest > 100000)) a.push('Please pick a price between 1 and 100,000')

            // validate last page, images
        } else if (stage === 5) {

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
        setDirections('')
        setRealm('')
        setCountry('')
    }

    const onSubmit = async (e) => {
        e.preventDefault()


        if (!editSpot) {
            setLoading(true)
            const tempFiles = previewImages.map(el => dataURLtoFile(el.blob, `${nanoid()}.png`))
            setErrors([])
            const payload = {
                userId: sessionUser.id,
                name,
                longDescription,
                shortDescription,
                price: Math.floor(Number((price))),
                directions,
                country,
                realm,
                bonfires,
                bosses,
                images: tempFiles
            }

            dispatch(spotActions.thunkCreateSpot(payload))
                .then(async (res) => {
                    setLoading(false)
                    reset()
                    history.push(`/spots/${res}`)
                })
                .catch(
                    async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors)
                        setLoading(false)
                    }
                );
        }

        else if (editSpot) {
            setLoading(true)
            const newFiles = []
            const imageUrls = []
            previewImages.forEach(el => {
                el.blob ? newFiles.push(dataURLtoFile(el.blob, `${nanoid()}.png`)) : imageUrls.push(el.url)
            })

            const payload = {
                id: editSpot.id,
                userId: sessionUser.id,
                name,
                longDescription,
                shortDescription,
                price: Math.floor(Number((price))),
                directions,
                country,
                realm,
                bonfires,
                bosses,
                images: newFiles,
                imageUrls

            }

            dispatch(spotActions.thunkUpdateSpot(payload))
                .then(async (res) => {
                    setLoading(false)
                    reset()
                    history.push(`/spots/${editSpot.id}`)
                })
                .catch(async (res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors(data.errors)
                    setLoading(false)
                })
        }


    }

    if (!sessionUser) {
        return (<Redirect to="/" />)
    }

    // select an image or images, have them displayed in staging area
    const verifyAndPreviewFile = (e) => {
        setErrors([])
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpeg']

        // grab the images
        const files = e.target.files
        if (Object.keys(e.target.files).length > 5 - previewImages.length) {
            setErrors(['Only 5 images are allowed'])
            e.target.value = null
            return
        }

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
                    const newId = nanoid()
                    const newImage = ({
                        blob: reader.result,
                        id: newId, element: <img key={nanoid()} onClick={(e) => {
                            setPreviewImages(prev => prev.filter(el => el.id !== newId))
                        }} className='aspect-video md:aspect-square object-cover hover:opacity-90 hover:bg-red-500' src={reader.result}></img>
                    })

                    setPreviewImages(prev => [...prev, newImage])

                }
                img.src = reader.result
            })
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
                <div className='flex flex-col justify-end items-center w-full min-h-2/4 md:h-screen md:w-2/4 relative mb-20 md:m-0'>

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
                                <textarea className='text-2xl w-full border border-black p-3 my-3 rounded-lg' rows={3} type="text" placeholder="Cozy castle with a blacksmith, tons of vendors, and a site of grace" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} ></textarea>
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
                                <div className='text-2xl'>Directions*</div>
                                <div className='text-lg text-gray-500'>Give your guests a general idea of where your place is located.</div>
                                <input className='text-xl w-full border border-black p-3 rounded-lg my-3' rows={6} type="text" placeholder="5 clicks northeast of Stormveil Castle" value={directions} onChange={(e) => setDirections(e.target.value)} ></input>
                                <div className='text-2xl'>Country*</div>
                                <div className='text-lg text-gray-500'>What country does your place reside in?</div>
                                <input className='text-xl w-full border border-black p-3 rounded-lg my-3' rows={6} type="text" placeholder="Liurnia of the Lakes" value={country} onChange={(e) => setCountry(e.target.value)} ></input>
                                <div className='text-2xl'>Realm*</div>
                                <div className='text-lg text-gray-500'>What realm?</div>
                                <input className='text-xl w-full border border-black p-3 rounded-lg my-3' rows={6} type="text" placeholder="The Lands Between" value={realm} onChange={(e) => setRealm(e.target.value)} ></input>

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
                                <div className='text-lg text-gray-500'>Keep in mind, if your guests get killed, they can't pay.</div>
                                <div className='flex w-full items-center gap-2 mb-4 mt-4'>
                                    <button onClick={() => setPrice(prev => Number(prev) > 5 ? Number(prev) - 5 : 1)} disabled={Number(price) <= 1} className='disabled:hover:cursor-not-allowed enabled:hover:border-black border rounded-full text-lg flex justify-center items-center h-8 w-8 p-7 relative enabled:active:scale-95'>-</button>
                                    <span className='text-2xl'>$</span><input type="text" onChange={(e) => setPrice(e.target.value)} value={price} className='text-xl w-32 p-4 h-14 flex placeholder:text-center justify-center items-center border border-gray-400 rounded-lg'></input>
                                    <button disabled={Number(price) >= 100000} onClick={() => setPrice(prev => Number(prev) < 100000 ? Number(prev) + 5 : prev)} className='disabled:hover:cursor-not-allowed enabled:hover:border-black border  rounded-full text-lg flex justify-center items-center h-8 w-8 p-7 enabled:active:scale-95 '>+</button>
                                </div>

                            </div>
                        </div>
                    }
                    {
                        stage === 5 &&
                        <div className='flex flex-col h-full w-full md:h-full md:overflow-y-auto items-center justify-center p-4 mb-4'>
                            <div className='w-4/5 h-3/4 flex flex-col  justify-center items-start max-w-[576px]'>
                                <div className='flex flex-col justify-center w-full'>
                                    {validationErrors}
                                </div>
                                {/* title and button div */}
                                <div className='flex justify-between mb-4 w-full'>
                                    <div className='flex flex-col'>
                                        {
                                            previewImages.length === 5 ? <>
                                                <div className='text-xl font-bold'>Tada! Everything looks good.</div>
                                                <div className='text-lg text-gray-500'>If you agree, go ahead and click submit</div>
                                            </>
                                                :
                                                <>
                                                    <div className='text-xl font-bold'>Please add 5 images*</div>
                                                    <div className='text-lg text-gray-500'>You can select up to 5 images at a time</div>
                                                    <div className='text-lg text-gray-500'>Click or tap an image to remove it</div>
                                                </>
                                        }
                                    </div>
                                    <div className='flex items-start justify-end'>
                                        <button disabled={previewImages.length === 5} onClick={handleFileClick} className='disabled:text-gray-500 disabled:border-gray-500 disabled:hover:cursor-not-allowed p-4 flex justify-center items-center rounded-lg enabled:hover:bg-gray-100 bg-white border w-24 h-9 border-black font-bold mt-1'>Upload</button>
                                        <input style={{ display: 'none' }} id='file-upload' type="file" multiple onChange={verifyAndPreviewFile} accept=".png, .jpg, .jpeg" ></input>

                                    </div>
                                </div>
                                <div className='flex flex-col w-full gap-3 h-full'>
                                    {/* main image */}
                                    <div className='aspect-video w-full'>
                                        {previewImages.length > 0 ? previewImages[0].element : defaultImages[0].element}

                                    </div>

                                    <div className='flex flex-col md:grid md:grid-cols-2 gap-3 md:auto-rows-min'>
                                        {/* map rest of  */}
                                        {defaultImages.slice(1).map((el, i) => previewImages[i + 1]?.element ? previewImages[i + 1].element : el.element)}
                                    </div>
                                </div>
                            </div>
                        </div>

                    }

                    {/* sticky nav bar for next and back buttons */}
                    <div className='flex h-[80px] fixed bottom-0 py-4 md:relative justify-center w-full bg-white border-t'>
                        <div className='w-4/5 flex justify-between items-center'>
                            <button className='font-bold text-md underline hover:bg-slate-100 rounded-lg  p-3' onClick={stage === 0 ? () => history.push('/') : () => setStage(prev => prev - 1)}>{stage === 0 ? 'Home' : 'Back'}</button>
                            <button className='disabled:bg-slate-200 text-base font-semibold rounded-lg py-[14px] px-[24px] text-white bg-[#222222] enabled:hover:bg-black enabled:active:scale-95' disabled={loading || (stage === 5 && previewImages.length < 5)} onClick={stage === 5 ? onSubmit : next}>{stage === 5 ? 'Submit' : 'Next'}</button>

                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}
