import styles from "../styles/Carousel.module.css"
import Image from "next/image"
import {urlFor} from "../lib/client";
import { useState, useEffect } from "react";
import { UilAngleLeftB, UilAngleRightB } from '@iconscout/react-unicons'


const Carousel = ({heroImages}) => {
    const transition = {type: "spring", duration: 3}
    const[currentSlide, setCurrentSlide] = useState(0)
    useEffect(()=>{
        setCurrentSlide(0)
    }, [])

    useEffect(()=>{
    if(autoScroll){
        auto()
     }
     return () => clearInterval(slideInterval)
    }, [currentSlide])

    const length = heroImages.length
    const nextSlide = () => {
        setCurrentSlide(currentSlide === length -1 ? 0 : currentSlide + 1)
    }

    const prevSlide = () =>{
        setCurrentSlide(currentSlide === 0 ? length-1 : currentSlide - 1)
    }

    const autoScroll = true;
    let slideInterval;
    let intervalTime=10000;
   
    function auto(){
        slideInterval= setInterval(nextSlide, intervalTime)
    }
    return ( 
        <div className={styles.carousel}>
            <UilAngleLeftB onClick={prevSlide} className={`${styles.arrow} ${styles.prev}`}/>
            <UilAngleRightB onClick={nextSlide} className={`${styles.arrow} ${styles.next}`}/>

            {heroImages.map((HeroImage, index) =>{
                const src = urlFor(HeroImage.image).url()

                return(

                        <div className={index === currentSlide ? `${styles.currentSlide} ${styles.imageContainer}` : styles.imageContainer }   key={index}>
                            {index === currentSlide && (
                            <Image 
                            loader= {() => src} 
                            src={src}
                            alt=""
                            objectFit="cover"
                            layout="responsive"
                            height={50}
                            width={50}
                            /> 
                            )}                  
                        </div>  
                
                        )
                          
                    })}
                         
                </div>
     );
}
 
export default Carousel;