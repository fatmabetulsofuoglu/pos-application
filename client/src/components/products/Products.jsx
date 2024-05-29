import { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";
import { Spin } from "antd";

export const Products = ({
  categories,
  filtered,
  products,
  setProducts,
  search,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  return (
    <div className="products-wrapper grid grid-cols-6 gap-4">
      <div className="product-item flex flex-col justify-center items-center border bg-white hover:shadow-lg select-none hover:scale-110 transition duration-500 cursor-pointer">
        <PlusOutlined
          className="md:text-2xl"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>
      <div className="product-item flex flex-col justify-center items-center border bg-white hover:shadow-lg select-none hover:scale-110 transition duration-500 cursor-pointer">
        <EditOutlined
          className="md:text-2xl"
          onClick={() => navigate("/products")}
        />
      </div>
      {filtered
        .filter((product) => product.title?.toLowerCase().includes(search))
        .map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}

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
