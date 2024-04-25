import { Form, Modal, Table, Input, Button, message } from "antd";
import { orange, green, red } from "@ant-design/colors";
import { SaveOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState({});

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5002/api/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori güncellendi.");
      setCategories(
        categories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Hata!");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch("http://localhost:5002/api/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Kategori silindi.");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Hata");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Kategoriler",
      dataIndex: "title",
      width: 400,
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "Eylemler",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex items-center justify-between ">
            <Button
              onClick={() => setEditingRow(record)}
              className=" text-slate-600 hover:text-sky-700"
            >
              <EditOutlined
                style={{ verticalAlign: "middle", color: orange[5] }}
              />
              Düzenle
            </Button>

            <Button
              htmlType="submit"
              className=" text-slate-600 hover:text-sky-700 px-2 py-0 "
            >
              <SaveOutlined
                style={{ verticalAlign: "middle", color: green[6] }}
              />
              Kaydet
            </Button>

            <Button
              onClick={() => deleteCategory(record._id)}
              className=" text-slate-600 hover:text-sky-700"
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

  return (
    <Modal
      open={isEditModalOpen}
      title="Kategori İşlemleri"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
      width={800}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default Edit;
