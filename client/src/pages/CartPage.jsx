import Header from "../components/header/Header";
import React, { useState } from "react";
import { Table, Card, Button } from "antd";
import { CreateBill } from "../components/cart/CreateBill";
import PageTitle from "../components/header/PageTitle";
import { useSelector } from "react-redux";

export const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);

  const columns = [
    {
      width: "3%",
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
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      width: "2%",
    },
    {
      title: "Adet",
      dataIndex: "quantity",
      key: "quantity",
      width: "2%",
    },
    {
      title: "Yazdır",
      width: "4%",
      dataIndex: "bill",
      key: "bill",
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
              <span>Ara Toplam</span>
              <span> 549.00₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV %8</span>
              <span className="text-red-600">+43.92₺</span>
            </div>
            <div className="flex justify-between">
              <span>
                <b>Toplam</b>
              </span>
              <b>
                <span>+43.92₺</span>
              </b>
            </div>
            <Button
              type="primary"
              onClick={() => setIsModalOpen(true)}
              size="middle"
              className="bg-green-600 mt-3 w-full"
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};
