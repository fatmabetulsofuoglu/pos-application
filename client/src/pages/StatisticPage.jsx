import Header from "../components/header/Header";
import { StatisticCard } from "../components/statistics/StatisticCard";

export const StatisticPage = () => {
  return (
    <>
      <Header />
      <div className="p-6">
        <h2 className="text-4xl font bold text-center">İstatistikler</h2>
        <div className="statistic-section">
          <h3 className="text-xl">
            Hoşgeldin <span className="text-green-700 text-xl">admin</span>
          </h3>
          <div className="statictic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={"6"}
              img={"images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={"100.000₺"}
              img={"images/money.png"}
            />
            <StatisticCard
              title={"Toplam Satış"}
              amount={"156"}
              img={"images/sale.png"}
            />
            <StatisticCard
              title={"Toplam Ürün"}
              amount={"67"}
              img={"images/product.png"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
