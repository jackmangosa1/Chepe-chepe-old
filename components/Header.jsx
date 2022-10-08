import styles from "../styles/Header.module.css"
import Image from "next/image"
import Logo from "../assets/logo.png"
import {UilShoppingBag, UilReceipt, UilSun, UilMoon} from "@iconscout/react-unicons"
import  {useStore}  from "../store/store"
import Link from "next/link"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import UserMenu from "./UserMenu"

const Header = () => {
    
    const [order, setOrder] = useState("")
    useEffect(() =>{
        setOrder(localStorage.getItem("order"))
    }, [])
    

    const items = useStore((state) => state.cart.pizzas.length)
    const darkMode = useStore((state) => state.mode.darkMode)
    const darkModeOn = useStore((state) => state.darkModeOn)
    const darkModeOff = useStore((state) => state.darkModeOff)
    const userInfo= useStore((state) => state.userInfo)
    console.log(userInfo)
    //User modal state
    const [userModal, setUserModal]= useState(false)

    const handlerDarkMode= () =>{
       darkMode ? darkModeOff() : darkModeOn()
       const newMode= !darkMode
       Cookies.set('darkMode', darkMode ? 'ON' : 'OFF')
    }
    const handleUserModal= () =>{
        setUserModal((prevState) => !prevState)
    }
    

    return ( 
        <div className={styles.header}>
            {/* LOGO SIDE */}
            <div className={styles.logo}>
                <Image src={Logo} alt="" width={50} height={50}/> 
                <span>Chepe-chepe</span>
            </div>

            {/* MENU SIDE */}
            <ul className={styles.menu}>
                <li>
                   <Link href='../'>Home</Link>
                </li>

                <li>
                    <Link href='#menu'>Menu</Link>
                </li>

                <li>
                    <Link href=''>Contact</Link>
                </li>

                <li>
                    <Link href=''>Services</Link>
                    </li>
            </ul>

            {/* RIGTH SIDE */}
            <div className={styles.rightSide}>
                <div className={styles.toggler} >
                    <UilSun className={!darkMode && `${styles.active}`} onClick={handlerDarkMode}/>
                    <UilMoon  className={ darkMode &&  `${styles.active}`} onClick={handlerDarkMode}/>
                </div>
                
                {userInfo 
                    ? <p className={styles.user} onClick={handleUserModal} >{userInfo.data.name}</p> 
                    : (
                        <>
                            <Link href="/login">
                                <button className={` btn ${styles.login}`}>Login</button>
                        
                            </Link>
            
                            <Link href="/register">
                                <button className={`btn ${styles.signUp}`}>Register</button>
                            </Link>
                        </>
                        
    
                )}
                    
                
                <UserMenu
                isOpen={userModal}
                />
               
                <Link href="/cart">
                    <div className={styles.cart}>
                        <UilShoppingBag size={35} color="#2E2E2E"/>
                        <div className={styles.badge}>{items}</div>
                    </div>
                </Link>

                {order && (
                    <Link href={`/order/${order}`}>
                        <div className={styles.cart}>
                            <UilReceipt size={35} color='#2E2E2E'/>
                            {order != "" && <div className={styles.badge}>1</div>}

                        </div>
                    </Link>
                )}
               
            </div>
        </div>
            
     );
}
 
export default Header;