import React from "react";
import { Table } from "antd";
import Header from "../components/header/Header";

export const CustomerPage = () => {
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
    
  return <>
  <Header />
      <div className="p-6">
        <h2 className="text-4xl font bold text-center">Müşteriler</h2>
      </div>
      <div className="px-6">
        <Table dataSource={dataSource} columns={columns} bordered />
        <div className="cart-total flex justify-end"></div>
      </div>
  </>;
};
