import { Button, Form, Input, message, Modal } from "antd";
import React from "react";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  customers,
  setCustomers,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/customers/add-customer",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        message.success("Müşteri başarıyla eklendi.");
        form.resetFields();
        setCustomers([
          ...customers,
          {
            _id: data._id,
            name: values.name,
            phone: values.phone,
            // Add any other fields here if needed
          },
        ]);
        setIsAddModalOpen(false);
      } else {
        message.error(data.message || "Bir hata oluştu.");
      }
    } catch (error) {
      console.log(error);
      message.error("Bir hata oluştu.");
    }
  };

  return (
    <Modal
      title="Yeni Müşteri Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>

        <Form.Item
          name="name"
          label="İsim"
          rules={[{ required: true, message: "İsim Alanı Boş Geçilemez!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telefon"
          rules={[{ required: true, message: "Telefon Alanı Boş Geçilemez!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Adres"
          rules={[{ required: true, message: "Telefon Alanı Boş Geçilemez!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
