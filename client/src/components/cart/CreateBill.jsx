import { Form, Modal, Input, Select, Button, Card, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch("http://localhost:5002/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: (cart.total * cart.tax) / 100,
          total: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status === 200) {
        message.success("Fatura oluşturuldu.");
        setIsModalOpen(false);
        dispatch(clearCart());
        navigate("/bills");
      }
    } catch (error) {
      message.danger("Fatura oluşturulamadı.");
      console.log(error);
    }
  };

  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      onFinish={onFinish}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="customerName"
          label="Müşterinin Adı"
          rules={[
            {
              required: true,
              message: "Müşteri adı alanı zorunludur.",
            },
          ]}
        >
          <Input placeholder="Müşterinin Adını Yazınız" />
        </Form.Item>
        <Form.Item
          name="customerPhone"
          label="Telefon Numarası"
          rules={[
            { required: true, message: "Müşteri telefonu alanı zorunludur." },
          ]}
        >
          <Input placeholder="Bir Telefon Numarası Yazınız" />
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
