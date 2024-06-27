// CustomerPage.jsx
import React, { useState } from "react";
import { Button } from "antd";
import { Customers } from "../components/customers/Customers";
import Header from "../components/header/Header";
import PageTitle from "../components/header/PageTitle";
import Add from "../components/customers/Add";

export const CustomerPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="px-6">
        <PageTitle>
          Müşteriler
          <Button
            className="text-xs px-2 py-1 mx-10 bg-[#fafafa] text-black rounded-md hover:bg-[#E5E7EB] border border-[#E5E7EB]"
            onClick={() => setIsAddModalOpen(true)}
          >
            Yeni Müşteri Ekle
          </Button>
        </PageTitle>
        <Customers />
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
    </>
  );
};
