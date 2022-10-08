import styles from "../styles/UserMenu.module.css"
import Link from "next/link";

const UserMenu= ({isOpen}) =>(
    isOpen && (
        <div className={styles.container}>
            <Link href='/profile'>
                <p>Profile</p>
            </Link>

            <Link href='/order-history'>
                <p>Order History</p>
            </Link>

            <p>Logout</p>

        </div>
    )
      
)

export default UserMenu;