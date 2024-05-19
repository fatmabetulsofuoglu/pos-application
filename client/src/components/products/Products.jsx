import { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";



export const Products = ({ categories }) => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate("/products");

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:5002/api/products/get-all");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  });

  return (
    <div className="products-wrapper grid grid-cols-6 gap-4">
      {products.map((item) => (
        <ProductItem item={item} key={item._id} />
      ))}
      <div
        className="category-item"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl" />
      </div>
      <div
        className="category-item min-h-[150px]"
        onClick={() => navigate("/products")}
      >
        <EditOutlined className="md:text-2xl" />
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
};
