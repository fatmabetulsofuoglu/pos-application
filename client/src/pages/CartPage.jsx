import Header from "../components/header/Header";
import React, { useState } from "react";
import { Table, Card, Button } from "antd";
import { CreateBill } from "../components/cart/CreateBill";
import PageTitle from "../components/header/PageTitle";

export const CartPage = () => {
  const dataSource = [
    {
      key: "1",
      name: "Elma",
      price: 3,
      mount: 5,
    },
    {
      key: "2",
      name: "Karpuz",
      price: 1,
      mount: 50,
    },
  ];
  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Fiyat",
      dataIndex: "mount",
      key: "mount",
    },
    {
      title: "Adet",
      dataIndex: "price",
      key: "price",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="px-6">
        <PageTitle>Sepet</PageTitle>
        <Table dataSource={dataSource} columns={columns} bordered />
        <div className="cart-total flex justify-end">
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
