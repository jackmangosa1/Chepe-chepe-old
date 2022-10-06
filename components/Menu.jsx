import styles from "../styles/Menu.module.css"
import Image from "next/image";
import {urlFor} from "../lib/client"
import Link from "next/link"


const Menu = ({pizzas}) => {

    return ( 
        <div className={styles.container} id="menu">
            <div className={styles.heading}>
                <span>OUR MENU</span>
                <span>Menu that always</span>
                <span>Make you drool</span>
            </div>

            {/* FOOD */}
            <div className={styles.menu}>
           
                 {pizzas.map((pizza, id) =>{
                    const src = urlFor(pizza.image).url()
                
                return(
                    
                        <div className={styles.pizza} key={id}>
                            <Link href={`./pizza/${pizza.slug.current}`}>
                                <div className={styles.imageWrapper}>
                                    
                                    <Image 
                                        loader= {() => src} 
                                        src={src} 
                                        alt=""
                                        objectFit="cover"
                                        layout="fill"
                                    /> 
                                </div>
                            </Link>
                          
                            <span>{pizza.name} </span>
                            <span><span style={{color: "var(--themeRed)"}}>$</span>{pizza.price[1]}</span>
                           

                        </div>
                )})}  
              
             
            
            </div>
        </div>
     );
}
 
export default Menu ;