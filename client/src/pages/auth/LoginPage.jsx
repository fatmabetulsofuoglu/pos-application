import { Button, Form, Input, Carousel, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
export const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5002/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();
      console.log(user);

      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
        message.success("Giriş işlemi gerçekleştirildi.");
        navigate("/");
        setLoading(false);
      } else if (res.status === 404) {
        message.error("Kullanıcı bulunamadı");
      } else if (res.status === 403) {
        message.error("Kullanıcı adı ya da şifre hatalı!");
      }
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <img
            src="https://www.motifsoft.com/wp-content/uploads/2023/11/MotifSoft-logo-colored-1.png"
            width="300px"
            alt="MOTİF SOFT"
            className="pb-10"
          />
          <div className="pb-10 text-center">
            <h3 className="text-4xl pb-3">Giriş Yap</h3>
            <p>Merhaba, devam etmek için lütfen giriş yapınız.</p>
          </div>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <div className="flex justify-between items-center">
                <Checkbox>Beni Hatırla</Checkbox>
                <Link>Şifremi Unuttum</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full bg-[#d02f28] text-white"
                size="large"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Henüz bir hesabınız yok mu?&nbsp;
            <Link to="/register" className="text-[#d02f28]">
              Şimdi kaydol
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#d02f28] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  img="/images/responsive.svg"
                  title="Responsive"
                  desc="Tüm Cihaz Boyutlarıyla Uyumluluk"
                />
                <AuthCarousel
                  img="/images/statistic.svg"
                  title="İstatistikler"
                  desc="Geniş Tutulan İstatistikler"
                />
                <AuthCarousel
                  img="/images/customer.svg"
                  title="Müşteri Memnuniyeti"
                  desc="Deneyim Sonunda Üründen Memnun Müşteriler"
                />
                <AuthCarousel
                  img="/images/admin.svg"
                  title="Yönetici Paneli"
                  desc="Tek Yerden Yönetim"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
