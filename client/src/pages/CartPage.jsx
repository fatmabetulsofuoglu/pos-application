import Header from "../components/header/Header";
import React, { useState } from "react";
import { Table, Card, Button, message } from "antd";
import { CreateBill } from "../components/cart/CreateBill";
import PageTitle from "../components/header/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  increase,
  decrease,
  clearCart,
} from "../redux/cartSlice";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

export const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const columns = [
    {
      width: "4%",
      dataIndex: "img",
      key: "img",
      render: (_, record) => {
        return (
          <img src={record.img} alt="" className="w-20 h-20 object-cover" />
        );
      },
    },
    {
      title: "Ürün Adı",
      width: "8%",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Kategori",
      width: "3%",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      width: "2%",
      render: (_, record) => {
        return <span>{record.price}₺</span>;
      },
    },

    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      width: "2%",
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(increase(record))}
            />
            <span className="font-bold w-6 inline-block text-center">
              {record.quantity}
            </span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
              onClick={() => {
                if (record.quantity === 1) {
                  if (window.confirm("Ürün Silinsin Mi?")) {
                    dispatch(decrease(record));
                    message.success("Ürün Sepetten Silindi.");
                  }
                }
                if (record.quantity > 1) {
                  dispatch(decrease(record));
                }
              }}
            />
          </div>
        );
      },
    },
    {
      width: "4%",
      dataIndex: "bill",
      key: "bill",
      render: (_, record) => {
        return <Button danger 
        onClick={() => {
          if (window.confirm("Emin misiniz?")) {
            dispatch(deleteProduct(record));
            message.success("Ürün sepetten kaldırıldı.");
          }
        }}>Kaldır</Button>;
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <PageTitle>Sepet</PageTitle>
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
        />
        <div className="cart-total flex justify-end mt-5">
          <Card className="w-72">
            <div className="flex justify-between my-2">
              <b>Ara Toplam</b>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <b>KDV %{cart.tax}</b>
              <span className="text-[#d02f28]">
                {(cart.total * cart.tax) / 100 > 0
                  ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between">
              <b>Toplam: </b>
              <span>
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </span>
            </div>
            <Button
              type="primary"
              onClick={() => setIsModalOpen(true)}
              size="middle"
              className="bg-green-600 mt-3 w-full"
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
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};
