import { Button, Form, Input, message, Modal } from "antd";
import React from "react";

const Add = ({ isAddModalOpen, setIsAddModalOpen, setProducts }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // API'ye yeni müşteri bilgilerini gönder
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/customers/add-customer",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        // Hata durumunda Modal içerisinde hata mesajını göster
        throw new Error(data.message || "Bir hata oluştu.");
      }

      setIsAddModalOpen(false);
      // Formu sıfırla
      form.resetFields();
      // Başarı durumunda Modal içerisinde başarılı mesajı göster
      message.success("Yeni müşteri eklendi.");
    } catch (error) {
      console.error("Error:", error);
      // Hata durumunda Modal içerisinde hata mesajını göster
      message.error("Müşteri kaydedilemedi!");
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
          rules={[{ required: true, message: "Adres Alanı Boş Geçilemez!" }]}
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
