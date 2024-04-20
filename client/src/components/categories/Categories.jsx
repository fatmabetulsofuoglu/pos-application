import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import Add from "./Add";
import Edit from "./Edit";
import "./style.css";

export const Categories = ({ categories, setCategories }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <ul className="flex gap-4 md:flex-col text-lg">
      <li className="category-item">
        <span className="">Tümü</span>
      </li>
      {categories.map((item) => (
        <li className="category-item" key={item.key}>
          <span>{item.title}</span>
        </li>
      ))}
      <li
        className="category-item !bg-green-600 hover:opacity-80"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl" />
      </li>
      <li
        className="category-item !bg-orange-400 hover:opacity-80"
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined className="md:text-2xl" />
      </li>
      <Add
        categories={categories}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        setCategories={setCategories}
      />
      <Edit
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};
