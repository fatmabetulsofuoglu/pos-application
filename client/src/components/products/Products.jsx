import { useState } from "react";
import Add from "./Add";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";

export const Products = ({
  categories,
  filtered,
  products,
  setProducts,
  search,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="products-wrapper grid grid-cols-6 gap-4">
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
