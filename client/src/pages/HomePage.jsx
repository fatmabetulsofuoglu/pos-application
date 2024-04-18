import { useEffect, useState } from "react";
import { CartTotal } from "../components/cart/CartTotal";
import { Categories } from "../components/categories/Categories";
import Header from "../components/header/Header";
import { Products } from "../components/products/Products";

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5002/api/categories/get-all");
        const data = await res.json();
        console.log(data);
        setCategories(data)
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  console.log(categories);

  return (
    <>
      <Header />
      <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24">
        <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
          <Categories categories={categories} setCategories={setCategories}></Categories>
        </div>
        <div className="products flex-[8] max-h-[calc(100vh-_-112px)] overflow-y-auto">
          <Products />
        </div>
        <div className="cart-wrapper min-w-[180px] md:-mr-[24px] md:-mt-[24px] border">
          <CartTotal />
        </div>
      </div>
    </>
  );
};

export default HomePage;
