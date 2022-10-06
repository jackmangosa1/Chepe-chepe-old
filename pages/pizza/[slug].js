import Layout from "../../components/Layout"
import { client } from "../../lib/client";
import Image from "next/image";
import { urlFor } from "../../lib/client";
import styles from "../../styles/Pizza.module.css"
import LeftArrow from "../../assets/arrowLeft.png"
import rightArrow from "../../assets/arrowRight.png"
import { useState } from "react";
import { useStore } from "../../store/store";
import toast, {Toaster} from "react-hot-toast"


const Pizza = ({pizza}) => {

    const src = urlFor(pizza.image).url()
    const [size, setSize] = useState(1)
    const [quantity, setQuantity] = useState(1)

    //handle quantity function 
    const handleQuantity = (type) => {
        type === "increment" 
        ? setQuantity(  prevQuantity => prevQuantity + 1) 
        : quantity === 1
        ? null
        : setQuantity( prevQuantity => prevQuantity -1)
        
    }

    //Add to cart function 
    const addPizza = useStore((state) => state.addPizza)
    const addToCart = () =>{
        addPizza({...pizza, price: pizza.price[size], quantity: quantity, size: size })
        toast.success("Added to cart")
    }

    return ( 
        <Layout>
            <div className={styles.container}>
                <div className={styles.imageWrapper}>
                    <Image 
                    loader={() => src}
                    alt=""
                    src={src}
                    unoptimized
                    layout="fill"
                    objectFit="cover"
                    />
                </div>

                {/* RIGHT SIDE */}
                <div className={styles.right}>
                    <span>{pizza.name}</span>
                    <span>{pizza.details}</span>
                    <span> <span style={{color: "var(--themeRed)"}}>$</span> {pizza.price[size]}</span>
                    <div className={styles.size}>
                        <span>Size</span>
                        <div className={styles.sizeVariants}>
                            <div onClick={() => setSize(0)}
                            className={size === 0 ? styles.selected : ""}
                            >
                            Small</div>

                            <div onClick={() => setSize(1)}
                            className={size === 1 ? styles.selected : ""}
                            >
                            Medium</div>

                            <div onClick={() => setSize(2)}
                             className={size === 2 ? styles.selected : ""}
                            >
                            Large</div>
                        </div>
                    </div>

                    {/* QUANTITY COUNTER */}
                    <div className={styles.quantity}>
                        <span>Quantity</span>
                        <div className={styles.counter}>
                            <Image 
                            src={LeftArrow}
                            height={20}
                            width={20}
                            alt=""
                            objectFit="contain"
                            onClick={() =>handleQuantity("decrement")}
                            />

                            <span>{quantity}</span>

                            <Image 
                            src={rightArrow}
                            height={20}
                            width={20}
                            alt=""
                            objectFit="contain"
                            onClick={() => handleQuantity("increment")}
                            />

                        </div>
                    </div>

                    {/* BUUTONS */}
                    <div className={`btn ${styles.btn}`} onClick={addToCart}>
                        Add to Cart
                    </div>
              

                </div>
                <Toaster/>
               

            </div>

        </Layout>
     );
}
 
export default Pizza;

export async function getStaticPaths(){
    const query = '*[_type=="pizza" && defined(slug.current)][].slug.current'
    const paths = await client.fetch(query)

    return{
        paths: paths.map( (slug) => ({params : {slug}})),
        fallback: 'blocking'
}
}

export async function getStaticProps(context){
    
    const {slug = ""} = context.params
    const query = `*[_type =="pizza" && slug.current == '${slug}'][0]`
    const pizza = await client.fetch(query)

    return{
        props: {
            pizza,

        }
    }
}