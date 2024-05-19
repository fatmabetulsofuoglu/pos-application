import { message } from "antd";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
    message.success(item.title+ " sepete eklendi.")
  };

  return (
    <div
      className="product-item border bg-white hover:shadow-lg select-none hover:scale-110 transition duration-500 cursor-pointer"
      onClick={handleClick}
    >
      <div className="product-img flex justify-center items-center py-2">
        <img
          src={item.img}
          alt=""
          className="h-20 w-20 object-cover"
        />
      </div>
      <div className="product-info flex flex-col px-3 py-2 border-t ">
        <span className="text text-xs font-bold">{item.title}</span>
        <span className="text text-xs">{item.price}₺</span>
      </div>
    </div>
  );
};

export default ProductItem;
