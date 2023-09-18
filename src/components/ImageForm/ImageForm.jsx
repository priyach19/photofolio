// react hooks
import {useEffect,useRef} from "react"
import styles from "./imageform.module.css"
import {db} from "../../firebaseInit";// firestore database
import { doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore"; 
import { ToastContainer, toast } from 'react-toastify';// toast for notification
import 'react-toastify/dist/ReactToastify.css';

// function to render Image form to add new images to imageList(within album)
export default function ImageForm(props){
    const {albumId,updateImage,setUpdateImage,setShowImageForm} = props;
    const imageNameRef=useRef();  //storing data using ref
    const imageUrlRef=useRef();
    // check whether to update an image or not
    useEffect(()=>{
        if(updateImage){
            imageNameRef.current.value=updateImage.name;
            imageUrlRef.current.value=updateImage.link;
        }
    },[updateImage]);

    // clear form data
    function clearForm(){
        imageNameRef.current.value=null;
        imageUrlRef.current.value=null;
        imageNameRef.current.focus();
    }

    // to update any image within the imagelist
    async function handleUpdateSubmit(e){
        e.preventDefault();
        const oldData={
            name:updateImage.name,
            link:updateImage.link
        };
        const newData={
            name:imageNameRef.current.value,
            link:imageUrlRef.current.value
        };
        // adding new Image
        const albumRef = doc(db, 'album', albumId);
         updateDoc(albumRef,{
            imageList:arrayUnion(newData)
        });
        // removing old image 
        updateDoc(albumRef,{
            imageList:arrayRemove(oldData),
            
        });
        toast.success(" Image Updated !")
        // setting update to false
        setUpdateImage(null);
        // hide the ImageForm
        setShowImageForm(false);
        // clear data within the ImageForm
        clearForm();
    }

    // Function to add a new Image in Image list
    async function handleSubmit(e){
        e.preventDefault();
        // data of the Image
        const data={
            name:imageNameRef.current.value,
            link:imageUrlRef.current.value
        };
        // adding new image inside the array of image in database
        const albumRef = doc(db, 'album', albumId);
        await updateDoc(albumRef,{
            imageList:arrayUnion(data)
        });
        toast.success("New Image Added to your Album!") 
        clearForm();
    }

    return(
        <>
            <ToastContainer />
              <div className="formContainer">
                {/* showing heading of the form with condition */}
                <h1>{!updateImage?"Add an Image":"Update Image"}</h1>

                {/* calling submit function on condition */}
                <form onSubmit={updateImage?handleUpdateSubmit:handleSubmit}>
                    <input type="text"
                        className={styles.inputBox}
                        placeholder="Enter Name"
                        ref={imageNameRef}
                        required/>

                    <input type="text"
                        className={styles.inputBox}
                        placeholder="Enter Url"
                        ref={imageUrlRef}
                        required />
                    <br />

                    {/* to add/update image */}
                    <button className={`${styles.btn} ${styles.add}`}>
                            {/* show add or update on the button   */}
                        {!updateImage?"Add":"Update"}
                    </button>

                    <button className={`${styles.btn} ${styles.clear}`} 
                        onClick={clearForm}>Clear
                    </button>
                </form>
            </div>
        </>
    )
}