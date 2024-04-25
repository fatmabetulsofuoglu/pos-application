import { Button } from "antd";
import React from "react";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

export const CartTotal = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="cart bg-[#ffffff] h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-[#ffffff] text-black border border-[#f0f0f0] px-6 py-5 w-full shadow-sm transition-all text-center min-w-[145px] flex items-center justify-center tracking-wide">
        Sepetim
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cartItems.map((item) => (
          <li className="cart-item flex justify-between">
            <div class="flex items-center gap-x-1">
              <img
                src="https://www.agfresh.com.tr/public/uploads/elma.webp"
                alt=""
                className="w-8 h-8 object-cover"
              ></img>
              <div className="flex flex-col ml-2">
                <b>Elma</b>
                <span className="text-xs">12₺ x 2</span>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                size="small"
                className="w-full flex items-center justify-center !rounded-full bg-green-600"
              ></Button>
              <span className="text-xs font-bold">1</span>
              <Button
                type="primary"
                icon={<MinusCircleOutlined />}
                size="small"
                className="w-full flex items-center justify-center !rounded-full bg-red-600"
              ></Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>99₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %8</b>
            <span className="text-[#d02f28]">+7.92₺</span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b >Genel Toplam: </b>
            <span>106.92₺</span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="large"
            className="w-full bg-blue-700 text-white"
          >
            Sipariş Oluştur
          </Button>
          <Button
            icon={<ClearOutlined />}
            size="large"
            className="bg-[#d02f28] text-white w-full mt-2 flex items-center justify-center"
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};
