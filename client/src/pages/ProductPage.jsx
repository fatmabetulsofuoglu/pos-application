import React from "react";
import Header from "../components/header/Header";
import Edit from "../components/products/Edit";
import PageTitle from "../components/header/PageTitle";

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
