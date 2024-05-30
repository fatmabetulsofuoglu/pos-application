import { Customers } from "../components/customers/Customers";
import Header from "../components/header/Header";
import PageTitle from "../components/header/PageTitle";

export const CustomerPage = () => {
  return (
    <>
      <Header />
      <div className="px-6">
        <PageTitle>Müşteriler</PageTitle>
        <Customers />
      </div>
    </>
  );
};