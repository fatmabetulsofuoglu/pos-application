import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { Table, Button } from "antd";
import { PrintBill } from "../components/bills/PrintBill";
import PageTitle from "../components/header/PageTitle";
import { PrinterOutlined } from "@ant-design/icons";
import { gray } from "@ant-design/colors";

export const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItem, setBillItem] = useState();
  const [customer, setCustomer] = useState();

  console.log(customer);

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
      title: "Müşteri Telefon",
      dataIndex: "customerPhone",
      key: "customerPhone",
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "payMethod",
      key: "payMethod",
    },
    {
      title: "Oluşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
    {
      title: "Ara Toplam + KDV",
      key: "subTotalAndTax",
      render: (text, record) => {
        const subTotal = record.subTotal;
        const tax = record.tax;
        return `${subTotal + "₺ + " + tax + "₺"}`;
      },
    },
    {
      title: "Toplam",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Yazdır",
      dataIndex: "print",
      key: "print",
      render: (_, record) => {
        return (
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setCustomer(record);
            }}
          >
            <PrinterOutlined
              style={{ verticalAlign: "middle", color: gray[5] }}
            />
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <PageTitle>Faturalar</PageTitle>
        <Table
          dataSource={billItem}
          columns={columns}
          rowKey={"_id"}
          bordered
        />
        <div className="cart-total flex justify-end"></div>
      </div>
      <PrintBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        customer={customer}
      />
    </>
  );
};
