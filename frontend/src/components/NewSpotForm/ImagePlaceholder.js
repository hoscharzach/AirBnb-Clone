import imageSvg from '../../assets/images/icons/imagesvg.svg'

export default function ImagePlaceholder({ handleFileClick, primary }) {


    return (
        <>
            {
                primary ?
                    <div onClick={handleFileClick} className='min-h-[300px] flex justify-center items-center w-full aspect-video border border-dashed border-black active:border-solid'><img src={imageSvg}></img></div> :
                    <div onClick={handleFileClick} className='min-h-[300px] flex justify-center items-center w-full aspect-video md:aspect-square border border-dashed border-black active:border-solid'><img src={imageSvg}></img></div>
            }
        </>
    )
}
