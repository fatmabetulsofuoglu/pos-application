import { useState } from "react";
import { message } from "antd";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import "./style.css";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
    message.success(item.title + " sepete eklendi.");
  };

  return (
    <div
      className="product-item border bg-white hover:shadow-lg select-none hover:scale-110 transition duration-500 cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {isHovered && ( // isHovered durumuna göre ribbon'ı görüntüler
        <div className="ribbon">
          <span>{item.price}₺</span>
        </div>
      )}
      <div className="product-img flex justify-center items-center py-2">
        <img
          src={item.img}
          alt=""
          className="h-20 w-20 object-cover"
        />
      </div>
      <div className="product-info flex flex-col px-3 py-2 border-t ">
        <span className="text text-xs font-bold">{item.title}</span>
      </div>
    </div>
  );
};

export default ProductItem;
