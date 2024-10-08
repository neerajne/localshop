import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const shopContext = createContext();

export const ShopProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setrole] = useState(null);
  const [type, setType] = useState("bookstore");
  const [shops, setShops] = useState([]);
  const [shopProduct, setShopProduct] = useState([]);
  const [searchShopResult, setSearchShopResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [shopId, setShopId] = useState();
  const [orderAddRemove, setOrderAddRemove] = useState("add");
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, [navigate]);

  const value = {
    user,
    setUser,
    role,
    setrole,
    type,
    setType,
    shops,
    shopId,
    setShopId,
    searchTerm,
    setSearchTerm,
    setShops,
    shopProduct,
    setShopProduct,
    searchShopResult,
    setSearchShopResult,
    orderAddRemove,
    setOrderAddRemove,
  };

  return <shopContext.Provider value={value}>{children}</shopContext.Provider>;
};

// Hook for consuming the shop context
export const useShop = () => {
  const context = useContext(shopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
