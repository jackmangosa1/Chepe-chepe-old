import styles from "../styles/UserMenu.module.css";
import Link from "next/link";
import { useStore } from "../store/store";

const UserMenu= ({isOpen}) =>{ 
    //Importing logout from store
    const logout= useStore((state) => state.logout)

    return(
    isOpen && (
        <div className={styles.container}>
            <Link href='/profile'>
                <p>Profile</p>
            </Link>

            <Link href='/order-history'>
                <p>Order History</p>
            </Link>
            <p onClick={logout}>Logout</p>

        </div>
    )
      
)}

export default UserMenu;