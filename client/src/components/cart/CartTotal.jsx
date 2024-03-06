import { Button } from 'antd';
import React from 'react';
import ClearOutLined from '@ant-design/icons';

export const CartTotal = () => {
    return (
        <div className="cart h-full max-h-[calc(94vh_-_90px)] flex flex-col">
            <h2 className="bg-gray-800 text-center py-4 text-white font-bold tracking-wide">Sepetteki Ürünler</h2>
            <div className="cart-items">
                <div className="cart-item">cart item</div>
            </div>
            <div className="cart-totals mt-auto">
                <div className="border-t border-b">
                    <div className="flex justify-between p-2">
                        <b>Ara Toplam</b>
                        <span>99₺</span>
                    </div>
                    <div className="flex justify-between p-2">
                        <b>KDV %8</b>
                        <span className="text-red-700">+7.92₺</span>
                    </div>
                </div>
                <div className="border-b mt-4">
                    <div className="flex justify-between p-2">
                        <b className="text-lg text-green-500">Genel Toplam</b>
                        <span className="text-xl">99₺</span>
                    </div>
                </div>
                <div className="py-4 px-2">
                    <Button size="large" className="w-full bg-blue-700 text-white">Sipariş Oluştur</Button>
                    <Button type="primary" size="large" className="w-full mt-2 flex items-center justify-center" icon={<ClearOutLined />} danger>Temizle</Button>
                </div>
            </div>
        </div>
    );
};
