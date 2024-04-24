import { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";

export const Products = ({categories}) => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(async () => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5002/api/products/get-all");
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {products.map((item) => (
        <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none">
          <div className="product-img">
            <img
              src={item.img}
              alt={item.title}
              className="h-28 object-cover w-full border-b"
            ></img>
          </div>
          <div className="product-info flex flex-col p-3">
            <span className="font-bold">{item.title}</span>
            <span>{item.price} ₺</span>
          </div>
        </div>
      ))}
      <div
        className="category-item !bg-green-600 hover:shadow-lg"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl" />
      </div>
      <div
        className="category-item !bg-orange-400 hover:shadow-lg"
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
