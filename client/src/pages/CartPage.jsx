import Header from "../components/header/Header";
import React, { useState, useRef } from "react";
import { Button, Card, Input, message, Space, Table } from "antd";
import { CreateBill } from "../components/cart/CreateBill";
import PageTitle from "../components/header/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, ShoppingCartOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
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
import { Link } from "react-router-dom";

export const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Lütfen silinecek ürünleri seçin.");
    } else {
      if (
        window.confirm(
          "Seçili ürünleri sepetten kaldırmak istediğinize emin misiniz?"
        )
      ) {
        selectedRowKeys.forEach((key) => {
          const selectedProduct = cart.cartItems.find(
            (item) => item._id === key
          );
          dispatch(deleteProduct(selectedProduct));
        });
        message.success("Seçili ürünler sepetten kaldırıldı.");
        setSelectedRowKeys([]);
      }
    }
  };

  const columns = [
    {
      dataIndex: "img",
      key: "img",
      width: "20%",
      render: (_, record) => {
        return <img src={record.img} alt="" className="w-7 h-7 object-cover" />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      width: "40%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Birim Fiyatı",
      dataIndex: "price",
      key: "price",
      width: "20%",
      render: (_, record) => {
        return <span>{record.price}₺</span>;
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Adet",
      dataIndex: "quantity",
      key: "quantity",
      width: "20%",
      render: (text, record) => (
        <div className="flex items-center justify-between">
          <span className="font-bold">{record.quantity} adet</span>
          <div className="flex items-center">
            <Button
              type="text"
              icon={<PlusCircleOutlined />}
              className="flex items-center justify-center"
              onClick={() => dispatch(increase(record))}
            />
            <Button
              type="text"
              icon={<MinusCircleOutlined />}
              className="flex items-center justify-center"
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
        </div>
      ),
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <PageTitle>Sepet</PageTitle>
        <div className="flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen">
          <div className="w-full overflow-auto">
            {cart.cartItems.length > 0 && (
              <p className="py-2">{`Sepetinizde ${cart.cartItems.length} ürün bulunmaktadır.`}</p>
            )}
            <Table
              dataSource={cart.cartItems}
              columns={columns}
              rowKey={"_id"}
              bordered
              pagination={false}
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              locale={{
                emptyText: (
                  <div>
                    <p>Sepetinizde ürün bulunmamaktadır.</p>
                    <Button type="link" className="text-black underline">
                      <Link to="/">Ürünleri Göster</Link>
                    </Button>
                  </div>
                ),
              }}
              scroll={{ y: 400 }}
            />
          </div>
          <div className="cart-total flex justify-end mt-2">
            <div className="overflow-auto max-h-[calc(100vh - 112px)]">
              <Card>
                <div className="flex justify-between px-2 py-2">
                  <b>Ara Toplam</b>
                  <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
                </div>
                <div className="flex justify-between px-2 py-2">
                  <b>KDV %{cart.tax}</b>
                  <span className="text-[#d02f28]">
                    {cart.total * (cart.tax / 100) > 0
                      ? `+${(cart.total * (cart.tax / 100)).toFixed(2)}`
                      : 0}
                    ₺
                  </span>
                </div>
                <div className="flex justify-between px-2 py-2">
                  <b>Toplam: </b>
                  <span>
                    {cart.total + cart.total * (cart.tax / 100) > 0
                      ? (cart.total + cart.total * (cart.tax / 100)).toFixed(2)
                      : 0}
                    ₺
                  </span>
                </div>
                <div className="py-4 px-2">
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    className="w-full bg-blue-700 text-white text-sm"
                    onClick={() => setIsModalOpen(true)}
                    disabled={cart.cartItems.length === 0}
                  >
                    Sipariş Oluştur
                  </Button>
                  <Button
                    icon={<ClearOutlined />}
                    className="bg-[#d02f28] text-white w-full mt-2 flex items-center justify-center"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Sepeti temizlemek istediğinize emin misiniz?"
                        )
                      ) {
                        dispatch(clearCart());
                        message.success("Sepet temizlendi.");
                      }
                    }}
                    disabled={cart.cartItems.length === 0}
                  >
                    Temizle
                  </Button>
                  <Button
                    icon={<DeleteOutlined />}
                    className="bg-[#d02f28] text-white w-full mt-2 flex items-center justify-center"
                    onClick={handleDeleteSelected}
                    disabled={selectedRowKeys.length === 0}
                  >
                    Seçili Ürünleri Sepetten Kaldır
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};
