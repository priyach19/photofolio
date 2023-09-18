import styles from "./album.module.css";

export default function Album(props){
    // info about the album and to open an album
    var {info,setOpenAlbum}=props;

    // onClick open the Album's content
    function handleClick(){
        setOpenAlbum({albumId:info.id,open:true});
    }

    return(
        <>
            <div className={styles.cardContainer} >
              <div className={styles.cardImage} onClick={handleClick}>  </div>
                {/* album name*/}
                <div className={styles.cardName}>
                    {info.Albumname}
                </div>
            </div>
        </>
    )
}