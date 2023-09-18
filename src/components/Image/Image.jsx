 import styles from "./image.module.css"
// to show all the images within an album
export default function Image(props){
    const {image,index,handleImageEdit,handleImageDelete,openLightbox}=props;
    return(
        //showing images with buttons edit and delete
        <>
            <div className={styles.imageCard}>
                <div className={styles.imageBox}>
                    <img src={image.link} alt="pic" onClick={() => openLightbox(index)}/>
                </div>
                <div className={styles.imageInfo}>
                    {image.name}
                    {/* for edit */}
                    <button className={`${styles.imageBtn} ${styles.editBtn}`} 
                        onClick={()=>handleImageEdit(image)}>Edit
                    </button>

                    {/* for delete */}
                    <button className={`${styles.imageBtn} ${styles.deleteBtn}`} 
                        onClick={()=>handleImageDelete(image)}>X
                    </button>
                </div>
            </div>
        </>
    )
}