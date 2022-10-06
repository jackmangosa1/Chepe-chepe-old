import {Modal, useMantineTheme} from "@mantine/core"
import { useState } from "react"
import toast, {Toaster} from "react-hot-toast"
import { useStore } from "../store/store"
import { createOrder } from "../lib/orderHandler"
import styles from "../styles/OrderModal.module.css"
import { useRouter } from "next/router"

const OrderModal  = ({opened, setOpened, paymentMethod}) => {

    const total = typeof window !== 'undefined' &&  localStorage.getItem('total')
    const theme = useMantineTheme()
    const router = useRouter()
    const [formData, setFormData] = useState({})
    const resetCart = useStore((state) => state.resetCart)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const id=  await createOrder({...formData, total, paymentMethod})
        toast.success("Order Placed")
        resetCart()
        {
            typeof window !== 'undefined' && localStorage.setItem('order', id)
        }

        router.push(`/order/${id}`)
    }
    
    const handleInput = (e) => {
        setFormData(
            {...formData, 
            [e.target.name] : e.target.value
            })
    }


    return ( 
        <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={()=> setOpened(null)}
        >
        {/* Modal content */}
        <form action="" className={styles.formContainer}>
            <input type="text" name="name" onChange={handleInput } required placeholder="Name"/>

            <input type="text" name="phone"  onChange={handleInput } required placeholder="Phone Number"/>

            <textarea name="address" onChange={handleInput } placeholder="Address" rows={3}></textarea>

            <span>
                You will pay <span>${total} </span> on delivery 
                
            </span>

            <button type="submit" onClick={handleSubmit} className="btn">Place Order</button>
        </form>
        <Toaster/>

        </Modal>
     );
}
 
export default OrderModal;