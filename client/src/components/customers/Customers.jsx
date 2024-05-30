import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Space, Table, Spin, message } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import Add from "./Add";

export const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const searchInput = useRef(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddCustomer = () => {
    setIsAddModalOpen(true);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/customers/get-all"
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error(error);
        message.error("Veri yüklenemedi: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
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
              confirm();
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
            Kapat
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

  const handleDeleteSelected = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Lütfen silinecek müşterileri seçin.");
    } else {
      if (
        window.confirm("Seçili müşterileri silmek istediğinize emin misiniz?")
      ) {
        try {
          await Promise.all(
            selectedRowKeys.map(async (key) => {
              const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/customers/delete-customer`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                  },
                  body: JSON.stringify({ UserId: key }),
                }
              );
              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                  `Silme işlemi başarısız oldu: ${response.status} - ${errorText}`
                );
              }
            })
          );
          message.success("Seçili müşteriler silindi.");
          setCustomers(
            customers.filter(
              (customer) => !selectedRowKeys.includes(customer._id)
            )
          );
          setSelectedRowKeys([]);
        } catch (error) {
          console.error("Silme işlemi hatası:", error);
          message.error("Bir hata oluştu: " + error.message);
        }
      }
    }
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Telefon Numarası",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Adres",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
    },
    {
      title: "İşlem Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      ...getColumnSearchProps("createdAt"),
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
  ];

  return (
    <>
      {loading ? (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      ) : (
        <div>
          <Table
            dataSource={customers}
            rowKey={"_id"}
            columns={columns}
            bordered
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            locale={{
              emptyText: (
                <div>
                  <p>Kayıtlı müşteri bulunmamaktadır.</p>
                  <Button
                    type="link"
                    className="text-black underline"
                    onClick={handleAddCustomer}
                  >
                    Yeni Müşteri Ekle
                  </Button>
                </div>
              ),
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            className="bg-[#d02f28] text-white w-full mt-2 flex items-center justify-center"
            onClick={handleDeleteSelected}
            disabled={selectedRowKeys.length === 0}
          >
            Seçili Müşterileri Sil
          </Button>
        </div>
      )}
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
    </>
  );
};
