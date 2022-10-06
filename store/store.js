import create from "zustand"
import Cookies from "js-cookie"

export const useStore =  create(
    (set) => ({
       //DarkMode
        mode: {
            darkMode: Cookies.get('darkMode') === 'ON' ? true : false
        },

        //Unable darkmode
        darkModeOn: () => 
        set (() => ({
            mode: {
                darkMode: true
            }
        })),

        //Disable dark mode 
        darkModeOff: () =>
        set (() => ({
            mode:{
                darkMode: false
            }
        })),

         //cart 
         cart : {
            pizzas : []
        },

        //Add pizza in cart
        addPizza: (data) =>
        set ((state) => ({
            cart : {
                pizzas : [... state.cart.pizzas, data]
            }
        })),

        //Remove pizza 
        removePizza : (index) =>
        set((state) => ({
            cart : {
                pizzas : state.cart.pizzas.filter((_, i) => i != index)
            }

        })),

        //Empty the cart
        resetCart: () => 
        set(() =>({
            cart: {
                pizzas: []
            }
        })),

        //User info
        userInfo: Cookies.get('userInfo')
        ? JSON.parse(Cookies.get('userInfo'))
        : null,

        
       //User login
       login: (data) =>
       set((state) => ({
            userInfo: {...state.userInfo, data}
       })),

       //User logout 
       logout: () =>
       set(() =>({
        userInfo: null
       }))

      
    })

  
)