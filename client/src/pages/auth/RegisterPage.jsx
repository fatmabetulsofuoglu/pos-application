import { Button, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <img
            src="https://www.motifsoft.com/wp-content/uploads/2023/11/MotifSoft-logo-colored-1.png"
            width="200px"
            alt="MOTİF SOFT"
            className="mb-5"
          ></img>
          <Form layout="vertical">
            <Form.Item
              label="Kullanıcı Adı"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Kullanıcı adı alanı boş bırakılamaz!",
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="E-posta Adresiniz"
              name="email"
              rules={[
                {
                  required: true,
                  message: "E-posta alanı boş bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Şifre alanı boş bırakılamaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Şifre Tekrar"
              name="passwordAgain"
              rules={[
                {
                  required: true,
                  message: "Şifre tekrar alanı boş bırakılamaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full"
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-20 w-full">
            Bir hesabınız mı var? <Link to="/login" className="text-blue-700">&nbsp;Giriş Yap</Link>
          </div>
        </div>
        <div className="xl:w-4/6 min-w-[600px]"></div>
      </div>
    </div>
  );
};
