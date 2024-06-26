import React, { useState, useEffect } from "react";
import { Form, Modal, Input, Select, Button, Card, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
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
        message.error("Müşteriler getirilirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const onFinish = async (values) => {
    try {
      const selectedCustomer = customers.find(
        (customer) => customer._id === values.customerId
      );
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill",
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
            customerName: selectedCustomer.name,
            customerPhone: selectedCustomer.phone,
            subTotal: cart.total,
            tax: (cart.total * cart.tax) / 100,
            total: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
            cartItems: cart.cartItems,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      if (res.status === 200) {
        message.success("Fatura oluşturuldu.");
        setIsModalOpen(false);
        dispatch(clearCart());
        navigate("/bills");
      }
    } catch (error) {
      message.error("Fatura oluşturulamadı.");
      console.error(error);
    }
  };

  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="customerId"
          label="Müşteri Seçiniz"
          rules={[
            {
              required: true,
              message: "Lütfen bir müşteri seçiniz.",
            },
          ]}
        >
          <Select placeholder="Müşteri Seçiniz" loading={loading}>
            {customers.map((customer) => (
              <Select.Option key={customer._id} value={customer._id}>
                {customer.name} - {customer.phone}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="payMethod"
          label="Ödeme Yöntemi"
          rules={[
            { required: true, message: "Ödeme yöntemi seçimi zorunludur." },
          ]}
        >
          <Select placeholder="Ödeme Yöntemi Seçiniz">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>
        <Card className="w-full">
          <div className="flex justify-between my-2">
            <b>Ara Toplam</b>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between my-2">
            <b>KDV %{cart.tax}</b>
            <span className="text-[#d02f28]">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
          <div className="flex justify-between">
            <b>Toplam: </b>
            <span>
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </span>
          </div>
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            size="middle"
            className="bg-green-600 mt-3 w-full"
            htmlType="submit"
          >
            Fatura Oluştur
          </Button>
        </Card>
      </Form>
    </Modal>
  );
};
