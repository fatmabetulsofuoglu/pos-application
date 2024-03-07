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
          <div className="statictic-cards grid grid-cols-4 my-10 gap-10">
            <StatisticCard title={"Toplam Müşteri"} amount={"10"}/>
            <StatisticCard title={"Toplam Müşteri"} amount={"10"}/>
            <StatisticCard title={"Toplam Müşteri"} amount={"10"}/>
            <StatisticCard title={"Toplam Müşteri"} amount={"10"}/>
          </div>
        </div>
      </div>
    </>
  );
};
