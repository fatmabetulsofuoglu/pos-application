import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge, Input, message, Dropdown, Menu } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./style.css";

const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış yaptınız");
    }
  };

  const managementMenu = (
    <Menu className="management-menu">
      <Menu.Item key="1">
        <Link to="/products" className="menu-item">
          <ProductOutlined className="menu-icon" />
          <span className="menu-text">Tüm Ürünler</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/categories" className="menu-item">
          <ApartmentOutlined className="menu-icon" />
          <span className="menu-text">Kategoriler</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/bills" className="menu-item">
          <CopyOutlined className="menu-icon" />
          <span className="menu-text">Faturalar</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/customers" className="menu-item">
          <UserOutlined className="menu-icon" />
          <span className="menu-text">Müşteriler</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/statistic" className="menu-item">
          <BarChartOutlined className="menu-icon" />
          <span className="menu-text">İstatistikler</span>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header-container">
      <header className="header-content">
        <div className="logo">
          <Link to="/">
            <img
              src="https://www.motifsoft.com/wp-content/uploads/2023/11/MotifSoft-logo-colored-1.png"
              width="200px"
              alt="MOTİF SOFT"
            />
          </Link>
        </div>
        <div
          className="header-search"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            className="search-input"
            size="large"
            placeholder="Ürün Ara..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links">
          <Link
            to={"/"}
            className={`menu-link ${pathname === "/" ? "active" : ""}`}
          >
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Anasayfa</span>
          </Link>
          <Dropdown overlay={managementMenu} trigger={["hover"]}>
            <div className="menu-link">
              <ProductOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Yönetim</span>
            </div>
          </Dropdown>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 6]}
            className="md:flex hidden"
          >
            <Link
              to={"/cart"}
              className={`menu-link ${pathname === "/cart" ? "active" : ""}`}
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Sepet</span>
            </Link>
          </Badge>
          <div onClick={logOut}>
            <Link className="menu-link">
              <LogoutOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Çıkış</span>
            </Link>
          </div>
        </div>
        <Badge
          count={cart.cartItems.length}
          offset={[0, 6]}
          className="md:hidden flex"
        >
          <Link
            to={"/cart"}
            className={`menu-link ${pathname === "/cart" ? "active" : ""}`}
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="md:text-xs text-[10px]">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
