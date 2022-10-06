import styles from "../styles/Hero.module.css";
import Image from "next/image";
import Cherry from "../assets/cherry.png";
import {UilPhone} from "@iconscout/react-unicons";
import Pizza1 from "../assets/p1.jpg";
import Link from "next/link";
import {urlFor} from "../lib/client";
import Carousel from "./Carousel";


const Hero = ({heroImages}) => {

    return (
        <div className={styles.container}>
            {/* LEFT SIDE */}
            <div className={styles.left}>
                <div className={styles.cherryDiv}>
                    <span>More than faster</span>
                    <Image src={Cherry} alt="" width={40} height={25}/>

                </div>
                <div className={styles.heroText}>
                    <span>Be the fastest</span>
                    <span> In Delivering</span>
                    <span> your 
                        <span style={{color: "var(--themeRed)"}}> Food</span> 
                    </span>
                </div>

                <span className={styles.mission}>
                    Our Mission is to filling your tummy with delicious food and with fast and free delivery
                </span>

                <Link href='#menu'>
                    <button className={`btn ${styles.btn}`}>Order Now</button>
                </Link>
            </div>
            
            

            {/* RIGHT SIDE */}
            <div className={styles.right}>
                <Carousel heroImages={heroImages}/>
                
                <div className={styles.contactUs}>
                    <span>Contact Us</span>
                    <div>
                        <UilPhone color="white"/>
                    </div>
                </div>

                
            </div>
        </div>
     );
}
 
export default Hero;