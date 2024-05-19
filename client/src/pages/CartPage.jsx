import Header from "../components/header/Header";
import React, { useState } from "react";
import { Table, Card, Button, message } from "antd";
import { CreateBill } from "../components/cart/CreateBill";
import PageTitle from "../components/header/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { red } from "@ant-design/colors";
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
      width: "1%",
      dataIndex: "img",
      key: "img",
      render: (_, record) => {
        return <img src={record.img} alt="" className="w-7 h-7 object-cover" />;
      },
    },
    {
      title: "Ürün Adı",
      width: "6%",
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
      title: "Birim Fiyatı",
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
      width: "3%",
      render: (text, record) => {
        return (
          <div className="flex items-center justify-between">
            <span className="font-bold inline-block text-center">
              {record.quantity} adet
            </span>
            <div className="flex items-center">
              <Button
                type="text"
                icon={<PlusCircleOutlined />}
                className="flex items-center justify-center"
                onClick={() => dispatch(increase(record))}
              />
              <Button
                type="text"
                className="flex items-center justify-center"
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
            <div className="flex items-center">
              <Button
                danger
                onClick={() => {
                  if (window.confirm(record.title + " sepetten silinsin mi?")) {
                    dispatch(deleteProduct(record));
                    message.success("Ürün sepetten kaldırıldı.");
                  }
                }}
              >
                <DeleteOutlined
                  style={{ verticalAlign: "middle", color: red[5] }}
                />
              </Button>
            </div>
          </div>
        );
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
          scroll={{ y: 300 }}
        />
        <div className="cart-total flex justify-end mt-5">
          <Card className="w-72">
            <div className="flex justify-between px-3 py-2">
              <b>Ara Toplam</b>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between px-3 py-2">
              <b>KDV %{cart.tax}</b>
              <span className="text-[#d02f28]">
                {(cart.total * cart.tax) / 100 > 0
                  ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between px-3 py-2">
              <b>Toplam: </b>
              <span>
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
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
                  if (window.confirm("Emin misiniz?")) {
                    dispatch(clearCart());
                    message.success("Sepet temizlendi.");
                  }
                }}
                disabled={cart.cartItems.length === 0}
              >
                Temizle
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};
