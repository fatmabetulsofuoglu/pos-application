import React, { useState, useEffect } from "react";
import { Table } from "antd";
import Header from "../components/header/Header";
import PageTitle from "../components/header/PageTitle";

export const CustomerPage = () => {
  const [billItem, setBillItem] = useState([]);

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch("http://localhost:5002/api/bills/get-all");
        const data = await res.json();
        setBillItem(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBills();
  }, []);

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhone",
      key: "customerPhone",
    },
    {
      title: "İşlem Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <PageTitle>Müşteriler</PageTitle>
        <Table
          dataSource={billItem}
          rowKey={"_id"}
          columns={columns}
          bordered
        />
        <div className="cart-total flex justify-end"></div>
      </div>
    </>
  );
};
