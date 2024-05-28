import Header from "../components/header/Header";
import { StatisticCard } from "../components/statistics/StatisticCard";
import React, { useState, useEffect } from "react";
import { Area, Pie } from "@ant-design/plots";
import PageTitle from "../components/header/PageTitle";
import { Spin } from "antd";

export const StatisticPage = () => {
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("posUser"));

  const asyncFetch = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/get-all");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log("fetch data failed", error);
    }
  };

  const getProducts = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await asyncFetch();
      await getProducts();
      setLoading(false);
    };
    fetchData();
  }, []);

  const config = {
    data,
    xField: "createdAt",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data,
    angleField: "total",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Toplam\n Kazanç",
      },
    },
  };

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.total + total, 0);
    return amount.toFixed(2) + "₺";
  };

  return (
    <>
      <Header />
      {loading ? (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      ) : (
        <div className="px-6">
          <PageTitle>
            İstatistikler
            <p className="text-sm pt-3">
              Hoşgeldin{" "}
              <span className="text-green-700 text-sm">{user.username}</span>
            </p>
          </PageTitle>
          <div className="statistic-section mb-20">
            <div className="statictic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-2 gap-2">
              <StatisticCard
                title={"Toplam Müşteri"}
                amount={data?.length}
                img={"images/user.png"}
              />
              <StatisticCard
                title={"Toplam Kazanç"}
                amount={totalAmount()}
                img={"images/money.png"}
              />
              <StatisticCard
                title={"Toplam Satış"}
                amount={data?.length}
                img={"images/sale.png"}
              />
              <StatisticCard
                title={"Toplam Ürün"}
                amount={products?.length}
                img={"images/product.png"}
              />
            </div>
            <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
              <div className="lg:w-1/2 lg:h-72 h-72">
                <Area {...config} />
              </div>
              <div className="lg:w-1/2 lg:h-72 h-72">
                <Pie {...config2} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
