import React, { useEffect, useState, useRef } from "react";
import Header from "../components/header/Header";
import { PrintBill } from "../components/bills/PrintBill";
import PageTitle from "../components/header/PageTitle";
import { PrinterOutlined } from "@ant-design/icons";
import { gray } from "@ant-design/colors";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItem, setBillItem] = useState();
  const [customer, setCustomer] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Ara`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Ara
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Sıfırla
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrele
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            kapat
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps("customerName"),
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
      {billItem ? (
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
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
      <PrintBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        customer={customer}
      />
    </>
  );
};
