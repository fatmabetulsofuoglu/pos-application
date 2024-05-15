import { Button, message } from "antd";
import React from "react";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  increase,
  decrease,
  clearCart,
} from "../../redux/cartSlice";

export const CartTotal = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="cart bg-[#ffffff] h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-[#ffffff] text-black border border-[#f0f0f0] px-6 py-5 w-full shadow-sm transition-all text-center min-w-[145px] flex items-center justify-center tracking-wide">
        Sepetim
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cart.cartItems.length > 0 ? (
          cart.cartItems.map((item) => (
            <li className="cart-item flex justify-between" key={item._id}>
              <div className="flex items-center gap-x-1">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-8 h-8 object-cover hover:scale-125 transition duration-500 cursor-pointer"
                  onClick={() => dispatch(deleteProduct(item))}
                ></img>
                <div className="flex flex-col ml-2">
                  <b>{item.title}</b>
                  <span className="text-xs">
                    {item.price}₺ x {item.quantity}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  size="small"
                  className="w-full flex items-center justify-center !rounded-full bg-green-600"
                  onClick={() => dispatch(increase(item))}
                ></Button>
                <span className="text-xs font-bold">{item.quantity}</span>
                <Button
                  type="primary"
                  icon={<MinusCircleOutlined />}
                  size="small"
                  className="w-full flex items-center justify-center !rounded-full bg-red-600"
                  onClick={() => dispatch(decrease(item))}
                ></Button>
              </div>
            </li>
          ))
        ) : (
          <span className="flex items-center justify-center">
            Sepette ürün yok
          </span>
        )}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %{cart.tax}</b>
            <span className="text-[#d02f28]">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b>Toplam: </b>
            <span>
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="large"
            className="w-full bg-blue-700 text-white"
            disabled={cart.cartItems.length === 0}
          >
            Sipariş Oluştur
          </Button>
          <Button
            icon={<ClearOutlined />}
            size="large"
            className="bg-[#d02f28] text-white w-full mt-2 flex items-center justify-center"
            onClick={() => {
              if (window.confirm("Emin misiniz?")) {
                dispatch(clearCart());
                message.success("Sepet temizlendi.");
              }
            }}
            disabled={cart.cartItems.length === 0}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};
