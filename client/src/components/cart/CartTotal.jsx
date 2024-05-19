import { Button, message } from "antd";
import React from "react";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  increase,
  decrease,
  clearCart,
} from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export const CartTotal = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
                  <span className="text-xs">
                    <b>{item.title}</b>
                  </span>
                  <span className="text-xs">
                    {item.price}₺ x {item.quantity} adet
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <Button
                  type="text"
                  icon={<PlusCircleOutlined />}
                  size="small"
                  className="flex items-center justify-center"
                  onClick={() => dispatch(increase(item))}
                ></Button>
                <Button
                  type="text"
                  icon={<MinusCircleOutlined />}
                  size="small"
                  className="flex items-center justify-center"
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
        <div className="border-t border-b px-3 py-2">
          <div className="flex justify-between p-1">
            <span className="text-sm">
              <b>Ara Toplam</b>
            </span>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between p-1">
            <span className="text-sm">
              <b>KDV %{cart.tax}</b>
            </span>
            <span className="text-[#d02f28]">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="border-b">
          <div className="flex justify-between px-3 py-2">
            <span className="text-sm">
              <b>Toplam: </b>
            </span>
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
            icon={<ShoppingCartOutlined />}
            className="w-full bg-blue-700 text-white text-sm"
            disabled={cart.cartItems.length === 0}
            onClick={() => navigate("/cart")}
          >
            Sipariş Oluştur
          </Button>
          <Button
            icon={<ClearOutlined />}
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
