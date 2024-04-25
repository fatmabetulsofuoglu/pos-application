import React from "react";
import Header from "../components/header/Header";
import PageTitle from "../components/header/PageTitle";
import Edit from "../components/products/Edit";

export const ProductPage = () => {
  return (
    <>
      <Header />
      <div className="px-6">
        <PageTitle>Ürünler</PageTitle>
        <Edit />
      </div>
    </>
  );
};
