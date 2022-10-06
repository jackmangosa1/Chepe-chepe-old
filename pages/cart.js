import { useStore } from "../store/store";
import Layout from "../components/Layout"
import styles from "../styles/Cart.module.css"
import Image from "next/image";
import {urlFor} from "../lib/client"
import toast, {Toaster} from "react-hot-toast";
import { useState } from "react";
import OrderModal from "../components/OrderModal";


const Cart = () => {
    const [paymentMethod, setPaymentMethod] = useState(null)
    const cartData = useStore((state) => state.cart)
    const removePizza = useStore((state) => state.removePizza)
    const handleRemove = (index) =>{
        removePizza(index)
        toast.error("Item Removed")
    }
    const total = () => cartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0)
    const totalAmount = total()
    
    const handleOnDelivery = () =>{
        totalAmount == 0 
        ? toast.error('Add Items to the cart first') 
        : setPaymentMethod(0)
        typeof window !== 'undifined' && localStorage.setItem('total', total())
    }


    return ( 
        <Layout>
            <div className={styles.container}>

                {/* DETAILS */}
                <div className={styles.details}>
                    <table className={styles.table}>
                        <thead>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </thead>

                        <tbody className={styles.tbody}>
                            {cartData.pizzas.length > 0 && 
                                cartData.pizzas.map((pizza, index) =>{

                                const src = urlFor(pizza.image).url()
                                return(
                                    <tr key={index}>
                                        <td  className={styles.imageTd}>
                                            <Image
                                            loader={() => src}
                                            src={src}
                                            alt=""
                                            objectFit="cover"
                                            width={85}
                                            height={85}
                                            />
                                        </td>

                                        <td>
                                            {pizza.name}
                                        </td>

                                        <td>
                                            {
                                                pizza.size === 0 
                                                ? "Small"
                                                : pizza.size === 1
                                                ? "Medium"
                                                : "Large"
                                            }
                                        </td>

                                        <td>
                                            {pizza.price}
                                        </td>

                                        <td>
                                            {pizza.quantity}
                                        </td>

                                        <td>
                                            {pizza.price * pizza.quantity}
                                        </td>

                                        <td 
                                            onClick={() =>handleRemove(index)}
                                            style={{
                                                color: "var(--themeRed)",
                                                cursor: "pointer"
                                            }}
                                        >x</td>

                                    </tr>
                                )
                               
                             })
                            }

                        </tbody>
                    </table>
                </div>

            {/* SUMMARY */}
                <div className={styles.cart}>
                    <span>Cart</span>
                    
                    <div className={styles.cartDetails}>
                       
                        <div>
                            <span>Items </span>
                            <span>{cartData.pizzas.length}</span>
                        </div>

                        <div>
                            <span>Total </span>
                            <span>${total()}</span>
                        </div>

                        <div className={styles.buttons}>
                            <button className="btn" onClick={handleOnDelivery}>Pay On Delivery</button>
                            <button className="btn">Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster/>
        {/* MODAL */}
        <OrderModal
        opened= {paymentMethod === 0}
        setOpened= {setPaymentMethod}
        paymentMethod={paymentMethod}
        />
        

        </Layout>
     );
}
 
export default Cart;