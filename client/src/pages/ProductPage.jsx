import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  Space,
  Spin,
} from "antd";
import { orange, red } from "@ant-design/colors";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Header from "../components/header/Header";
import PageTitle from "../components/header/PageTitle";

export const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/products/get-all"
        );
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/get-all"
        );
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün başarıyla güncellendi.");
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return values;
          }
          return item;
        })
      );
      setFilteredProducts(
        filteredProducts.map((item) => {
          if (item._id === editingItem._id) {
            return values;
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  const deleteProduct = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL + "/api/products/delete-product",
          {
            method: "DELETE",
            body: JSON.stringify({ productId: id }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        message.success("Ürün başarıyla silindi.");
        setProducts(products.filter((item) => item._id !== id));
        setFilteredProducts(filteredProducts.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
      }
    }
  };

  
  const columns = [
    {
      dataIndex: "img",
      width: "3%",
      render: (_, record) => {
        return (
          <img
            src={record.img}
            alt=""
            className="w-8 h-8 object-cover hover:scale-125 transition duration-500 cursor-pointer"
          />
        );
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },

    {
      title: "Fiyat",
      dataIndex: "price",
      width: "2%",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Kategori",
      dataIndex: "category",
      width: "6%",
    },
    {
      title: "Eylem",
      dataIndex: "action",
      width: "5%",
      render: (_, record) => {
        return (
          <div className="flex items-center justify-start ">
            <Button
              onClick={() => {
                setIsEditModalOpen(true);
                setEditingItem(record);
              }}
              className=" text-slate-600 hover:text-sky-700"
            >
              <EditOutlined
                style={{ verticalAlign: "middle", color: orange[5] }}
              />
              Düzenle
            </Button>

            <Button
              onClick={() => deleteProduct(record._id)}
              className=" text-slate-600 hover:text-sky-700 mx-4"
            >
              <DeleteOutlined
                style={{ verticalAlign: "middle", color: red[5] }}
              />
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  const [tableHeight, setTableHeight] = useState(window.innerHeight);

  const updateTableHeight = () => {
    setTableHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateTableHeight);
    return () => {
      window.removeEventListener("resize", updateTableHeight);
    };
  }, []);

  const handleSearchFilter = (values) => {
    const { search, category } = values;
    let filteredData = products;

    if (search) {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filteredData = filteredData.filter((item) => item.category === category);
    }

    setFilteredProducts(filteredData);
  };

  return (
    <>
      <Header />
      <div className="px-6">
        <PageTitle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Ürünler</span>
            <Form
              layout="inline"
              onFinish={handleSearchFilter}
              style={{ marginBottom: 16 }}
            >
              <Form.Item name="search">
                <Input placeholder="Ürün Adı Ara" />
              </Form.Item>
              <Form.Item name="category">
                <Select
                  showSearch
                  placeholder="Kategori Seç"
                  optionFilterProp="children"
                  style={{ width: 200 }}
                >
                  {categories.map((category) => (
                    <Select.Option key={category._id} value={category.title}>
                      {category.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Filtrele
                </Button>
              </Form.Item>
            </Form>
          </div>
        </PageTitle>

        {loading ? (
          <Spin
            size="large"
            className="absolute top-1/2 h-screen w-screen flex justify-center"
          />
        ) : (
          <Table
            bordered
            dataSource={filteredProducts}
            columns={columns}
            rowKey={"_id"}
            scroll={{
              y: tableHeight - 400,
            }}
            style={{ height: "100vh" }}
          />
        )}
        <Modal
          title="Yeni Ürün Ekle"
          open={isEditModalOpen}
          onCancel={() => setIsEditModalOpen(false)}
          footer={false}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            initialValues={editingItem}
          >
            <Form.Item
              name="title"
              label="Ürün Adı"
              rules={[
                { required: true, message: "Ürün Adı Alanı Boş Geçilemez!" },
              ]}
            >
              <Input placeholder="Ürün adı giriniz." />
            </Form.Item>
            <Form.Item
              name="img"
              label="Ürün Görseli"
              rules={[
                {
                  required: true,
                  message: "Ürün Görseli Alanı Boş Geçilemez!",
                },
              ]}
            >
              <Input placeholder="Ürün görseli giriniz." />
            </Form.Item>
            <Form.Item
              name="price"
              label="Ürün Fiyatı"
              rules={[
                { required: true, message: "Ürün Fiyatı Alanı Boş Geçilemez!" },
              ]}
            >
              <Input placeholder="Ürün fiyatı giriniz." />
            </Form.Item>
            <Form.Item
              name="category"
              label="Kategori Seç"
              rules={[
                { required: true, message: "Kategori Alanı Boş Geçilemez!" },
              ]}
            >
              <Select
                showSearch
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.title ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.title ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.title ?? "").toLowerCase())
                }
                options={categories}
              />
            </Form.Item>
            <Form.Item className="flex justify-end mb-0">
              <Button type="primary" htmlType="submit">
                Güncelle
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default ProductPage;
