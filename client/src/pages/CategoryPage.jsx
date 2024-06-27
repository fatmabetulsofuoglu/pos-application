import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, Spin, message, Modal } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { orange, red } from "@ant-design/colors";
import Header from "../components/header/Header";
import PageTitle from "../components/header/PageTitle";
import Add from "../components/categories/Add";

export const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/get-all"
        );
        const data = await res.json();
        if (data) {
          const categoriesWithValue = data.map((item) => {
            return { ...item, value: item.title };
          });
          setCategories(categoriesWithValue);
          setFilteredCategories(categoriesWithValue);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const handleAdd = async (values) => {
    const categoryExists = categories.some(
      (category) => category.title.toLowerCase() === values.title.toLowerCase()
    );

    if (categoryExists) {
      message.error("Bu kategori zaten kayıtlı.");
      return;
    }

    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/categories/add",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        console.log("Error response:", errorData);
        throw new Error("Ekleme işlemi başarısız oldu.");
      }
      const newCategory = await res.json();
      message.success("Kategori başarıyla eklendi.");
      setCategories([...categories, newCategory]);
      setFilteredCategories([...filteredCategories, newCategory]);
      setIsAddModalOpen(false);
      addForm.resetFields();
    } catch (error) {
      console.log("Add error:", error);
      message.error("Bir şeyler yanlış gitti.");
    }
  };

  const handleEdit = async (values) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/categories/update-category",
        {
          method: "PUT",
          body: JSON.stringify({ ...values, id: editingItem._id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        console.log("Error response:", errorData);
        throw new Error("Güncelleme işlemi başarısız oldu.");
      }
      const updatedCategory = await res.json();
      message.success("Kategori başarıyla güncellendi.");
      setCategories(categories.map((item) =>
        item._id === editingItem._id ? { ...item, ...values } : item
      ));
      setFilteredCategories(filteredCategories.map((item) =>
        item._id === editingItem._id ? { ...item, ...values } : item
      ));
      setIsEditModalOpen(false);
    } catch (error) {
      console.log("Edit error:", error);
      message.error("Bir şeyler yanlış gitti.");
    }
  };

  const columns = [
    {
      title: "Kategori Adı",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
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
                editForm.setFieldsValue(record);
              }}
              className=" text-slate-600 hover:text-sky-700"
            >
              <EditOutlined
                style={{ verticalAlign: "middle", color: orange[5] }}
              />
              Düzenle
            </Button>

            <Button
              onClick={() => deleteCategory(record._id)}
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
    const { search } = values;
    let filteredData = categories;

    if (search) {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredCategories(filteredData);
  };

  const handleReset = () => {
    form.resetFields();
    setFilteredCategories(categories);
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Silmek istediğinizden emin misiniz?")) {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/delete",
          {
            method: "DELETE",
            body: JSON.stringify({ categoryId: id }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        if (res.ok) {
          message.success("Kategori başarıyla silindi.");
          setCategories(categories.filter((item) => item._id !== id));
          setFilteredCategories(filteredCategories.filter((item) => item._id !== id));
        } else {
          throw new Error("Silme işlemi başarısız oldu.");
        }
      } catch (error) {
        console.log(error);
        message.error("Bir şeyler yanlış gitti.");
      }
    }
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
            <div className="flex items-center">
              Ürün Kategorileri
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="ml-10 flex items-center"
              >
                <PlusOutlined />
                Yeni Kategori Ekle
              </Button>
            </div>
            <Form
              form={form}
              layout="inline"
              onFinish={handleSearchFilter}
              style={{ marginBottom: 16 }}
            >
              <Form.Item name="search">
                <Input placeholder="Kategori Ara" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Filtrele
                </Button>
              </Form.Item>
              <Form.Item>
                <Button onClick={handleReset}>Filtreleri Temizle</Button>
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
            dataSource={filteredCategories}
            columns={columns}
            rowKey={"_id"}
            scroll={{
              y: tableHeight - 400,
            }}
            style={{ height: "100vh" }}
          />
        )}
      </div>
      <Modal
        title="Yeni Kategori Ekle"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
      >
        <Form form={addForm} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            name="title"
            label="Kategori Adı"
            rules={[{ required: true, message: "Kategori Adı gerekli" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Kategori Düzenle"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEdit}
          initialValues={editingItem}
        >
          <Form.Item
            name="title"
            label="Kategori Adı"
            rules={[{ required: true, message: "Kategori Adı gerekli" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryPage;
