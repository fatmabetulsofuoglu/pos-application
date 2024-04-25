import React, { useState } from "react";
import Header from "../components/header/Header";
import { Table } from "antd";
import { PrintBill } from "../components/bills/PrintBill";
import PageTitle from "../components/header/PageTitle";

export const BillPage = () => {
  const dataSource = [
    {
      key: "1",
      name: "Elma",
      price: 3,
      mount: 5,
      bill: "Yazdır"
    },
    {
      key: "2",
      name: "Karpuz",
      price: 1,
      mount: 50,
      bill: "Yazdır"
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
    {
      title: "Yazdır",
      dataIndex: "bill",
      key: "bill",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="px-6">
        <PageTitle>Faturalar</PageTitle>
        <Table dataSource={dataSource} columns={columns} bordered />
        <div className="cart-total flex justify-end"></div>
      </div>
      <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
     
    
    </>
  );
};
