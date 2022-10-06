import styles from "../styles/UserModal.module.css"

const UserModal= ({isOpen}) =>{
    
    isOpen && (
        <div className={styles.container}>
           <p>Profile</p>
           <p>Order History</p>
           <p>Logout</p>

        </div>
    ) 
   
}

export default UserModal;