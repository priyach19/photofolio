import { useEffect, useState } from "react";
import ImageForm from "../ImageForm/ImageForm";
import Image from "../Image/Image";
import styles from "./imagelist.module.css"
import { db } from "../../firebaseInit";
import { doc, updateDoc,arrayRemove, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';  // toast notification
import 'react-toastify/dist/ReactToastify.css';

// function to render all the images within any Album
export default function ImageList(props){ 
    // open or close  album
    const {openAlbum,setOpenAlbum}=props;
    // to show or hide add image form
    const [showImageForm,setShowImageForm]=useState(false);
    // for updating an image
    const [updateImage,setUpdateImage]=useState(null);
    // imagelist containing all the images in album
    const [imageList,setImageList]=useState([]);
    // for searching image within an album
    const [search,setSearch]=useState('');
    // for image lightbox
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // to redirect back to album list page
    function handleBackClick(e){
        e.preventDefault();
        setOpenAlbum({albumId:"",show:false});
    }

    // get all the images from database 
    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "album",openAlbum.albumId), (doc) => {
            const data=doc.data().imageList;      
            setImageList(data);
        });
    },[]);

    // deleting an image from list
    async function handleImageDelete(image){
        const albumRef = doc(db, 'album', openAlbum.albumId);
        await updateDoc(albumRef,{
            imageList:arrayRemove(image)
        });
        toast.success("Image Successfully Deleted from your Album!");
    }

    // updating any image
    function handleImageEdit(image){
        setUpdateImage(image);
        setShowImageForm(true);
    }

    // open lightbox
    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setIsOpen(true);
    };

    // close lightbox
    const closeLightbox = () => {
        setIsOpen(false);
    };

    return(
        <>
            <ToastContainer />
            <div className={styles.btnContainer}>
                <button className={`${styles.btn} ${styles.backBtn}`} 
                        onClick={handleBackClick}>Back
                </button>

                {/* input box to search image in album */}
                <input type="text" 
                        placeholder="Search Image..." 
                        onChange={(e)=> setSearch(e.target.value)} />
                
                {/* Add image / cancel button */}
                {/* open / hide image form */}
                <button className={`${styles.btn} ${styles.addBtn}`} 
                        onClick={()=>setShowImageForm(!showImageForm)}>
                            {!showImageForm?"Add Image":"Cancel"}
                </button>
            </div>

            {/* image form to add image */}
            <div style={{textAlign:"center"}}>
                {showImageForm && <ImageForm albumId={openAlbum.albumId} 
                                            updateImage={updateImage}
                                            setUpdateImage={setUpdateImage}
                                            setShowImageForm={setShowImageForm} />}
                {/* collection heading on condition */}
                {/* if album is empty it will show different heading */}
                <h1>{imageList.length !== 0 ?"Your Collection":"No Images in Your Collection"}</h1>
            </div>
                
            {/* looping over each image in list and showing them within a box */}
            <div className={styles.imageList}>
                {/* filter function to show search images if user enter something inside search bar */}
                {imageList.filter((image) => {
                    return search.toLocaleLowerCase() === ''
                    ? image
                    :image.name.toLocaleLowerCase().includes(search);
                    // map function to map over each image and show them inside a card
                }).map((image,i) => <Image image={image} 
                                                key={i}
                                                index={i}
                                                handleImageEdit={handleImageEdit} 
                                                handleImageDelete={handleImageDelete} 
                                                openLightbox={openLightbox}
                                                />)}
            </div>

            {/* if user click over an image then light box will get open */}
            {isOpen && (
                // main container
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <div className="lightbox-container">
                        {/* close button to close the light box */}
                        <button className="close-button" onClick={closeLightbox}>
                            Close
                        </button>
                        {/* image of the lightbox */}
                        <img
                            className="lightbox-image"
                            src={imageList[currentImageIndex].link}
                            alt={`pic ${currentImageIndex}`}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

                    