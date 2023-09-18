import { useEffect, useState } from "react"
import styles from "./albumlist.module.css"
import Album from "../Album/Album"
import AlbumForm from "../AlbumForm/AlbumForm"
import ImageList from "../ImageList/ImageList"
import { db } from "../../firebaseInit"   // firestore database
import { collection, onSnapshot} from "firebase/firestore";

// function to show all the album in database and render form to add a new album in list
export default function AlbumList(){
    const [albumList,setAlbumList] = useState([]);   // variables to store data
    const [showAlbumForm,setShowAlbumForm]=useState(false);  // to show albumForm or not (by default false)
    const [openAlbum,setOpenAlbum]=useState({albumId:"",open:false});   // to open any album (by default false)

    // get data from Database when the app renders
    useEffect(()=>{
        // getting realtime updates from database
        const unsub = onSnapshot(collection(db, "album"), (snapShot) => {
            const card = snapShot.docs.map((doc) => {
                return{
                    id:doc.id,
                    ...doc.data()
                }
            });
            setAlbumList(card);   // storing all the albums within local state variable
        });
    },[]);
    
    return(
        <>
            <div className={styles.mainContainer}>
                {!openAlbum.open?(
                    // if there is no album to open then render form to add new album
                    <>
                        <div className={styles.albumForm}>
                            {showAlbumForm && <AlbumForm />}
                        </div>
                        <div className={styles.header}>
                            <span> Albums</span>
                            {/* button to show or hide album form  */}
                            <button className={styles.btn} 
                                onClick={()=>setShowAlbumForm(!showAlbumForm)}>
                                    {!showAlbumForm?"Create Album":"Cancel"
                            }</button>
                        </div>

                        <div className={styles.albumContainer}>
                            {/* looping over all the albums in array and showing them one by one */}
                            {albumList.map((card,i)=> <Album key={i} 
                                                        info={card} 
                                                        setOpenAlbum={setOpenAlbum}/>)}
                        </div>
                    </>
                ):<ImageList openAlbum={openAlbum} 
                            setOpenAlbum={setOpenAlbum} />}

            </div>
        </>
    )
}