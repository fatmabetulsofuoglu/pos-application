import { Form, Modal, Input, Select, Button, Card } from "antd";

export const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      onFinish={onFinish}
    >
      <Form layout="vertical">
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
          name="phoneNumber"
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
            <span>Ara Toplam</span>
            <span> 549.00₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>KDV %8</span>
            <span className="text-red-600">+43.92₺</span>
          </div>
          <div className="flex justify-between">
            <span>
              <b>Toplam</b>
            </span>
            <b>
              <span>+43.92₺</span>
            </b>
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
