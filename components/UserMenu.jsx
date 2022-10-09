import styles from "../styles/UserMenu.module.css";
import Link from "next/link";
import { useStore } from "../store/store";

const UserMenu= ({isOpen, menuFunction}) =>{ 
    //Importing logout from store
    const logout= useStore((state) => state.logout)

    //Function to logout and close the modal
    const LogoutAndClose= () =>{
        menuFunction(false)
        logout()
    }
    

    return(
    isOpen && (
        <div className={styles.container}>
            <Link href='/profile'>
                <p onClick={() => menuFunction(false)}>Profile</p>
            </Link>

            <Link href='/order-history'>
                <p onClick={() => menuFunction(false)}>Order History</p>
            </Link>
            <p onClick={LogoutAndClose}>Logout</p>

        </div>
    )
      
)}

export default UserMenu;