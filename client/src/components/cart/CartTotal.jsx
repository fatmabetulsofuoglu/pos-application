import { Button } from 'antd';
import React from 'react';
import { ClearOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';


export const CartTotal = () => {
    return (
        <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
            <h2 className="bg-gray-800 text-center py-4 text-white font-bold tracking-wide">Sepetteki Ürünler</h2>
            <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
                <li className="cart-item flex justify-between">
                    <div class="flex items-center gap-x-1">
                        <img src="https://www.agfresh.com.tr/public/uploads/elma.webp" alt="" className="w-8 h-8 object-cover"></img>
                        <div className="flex flex-col ml-2">
                            <b>Elma</b>
                            <span className="text-xs">12₺ x 2</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Button type="primary" icon={<PlusCircleOutlined />} size="small" className="w-full flex items-center justify-center !rounded-full bg-green-600"></Button>
                        <span className="text-xs">1</span>
                        <Button type="primary" icon={<MinusCircleOutlined />} size="small" className="w-full flex items-center justify-center !rounded-full bg-red-600"></Button>
                        
                    </div>
                </li>
            </ul>
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
                    <Button type="primary" size="large" className="w-full bg-blue-700 text-white">Sipariş Oluştur</Button>
                    <Button type="primary" icon={<ClearOutlined />} size="large" className="w-full mt-2 flex items-center justify-center" danger>Temizle</Button>
                </div>
            </div>
        </div>
    );
};
