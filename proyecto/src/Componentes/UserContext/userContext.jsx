import { createContext, useContext, useState} from "react";

const CartContext = createContext([])

export const useCartContext =  () => useContext(CartContext)

function CartContextProvider({children}) {

    const [cartList, setCartList ] = useState([]);
    const [cartList2, setCartList2 ] = useState([]);

    const addToCart = (item) => {

        const arraysin = cartList.filter(i=> i.id !== item.id);
        const arraycon = cartList.filter(i=> i.id === item.id);

        if (arraycon.length  === 1) {
            setCartList( [...arraysin, item])
        }else{
            setCartList( [...cartList, item])
      }

        
    }

    const eliminarItem = (id) => {
        const array3 = cartList.filter(i=> i.id !== id );
        setCartList( [...array3])

        const array4 = cartList2.filter(i=> i.id !== id );
        setCartList2( [...array4])
    }


    const vaciarCart = () => {
        setCartList( [])
        setCartList2( [])
    }

    const precioTotal = () => {
        return cartList.reduce((acum, prod) => acum + (prod.cantidad * prod.price) , 0)
    }
    const cantidadTotalItem = () => {
        return cartList.reduce((acum, prod) => acum += prod.cantidad , 0)
    }

    return (
        <CartContext.Provider value={{cartList, cartList2, addToCart, vaciarCart,precioTotal,cantidadTotalItem, eliminarItem}}>

        {children}

        </CartContext.Provider>
    )
}

export default CartContextProvider