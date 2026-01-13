import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { LucideEye, LucideShoppingCart, LucideZap } from 'lucide-react';

const SocialProof = ({ productId }) => {
    const { viewers, joinProductRoom, leaveProductRoom } = useContext(SocketContext);
    const viewerCount = viewers[productId] || 1;

    // Mocking some sales data for "WOW" effect
    const [recentSales, setRecentSales] = useState(0);
    const [isLowStock, setIsLowStock] = useState(false);

    useEffect(() => {
        if (productId) {
            joinProductRoom(productId);

            // Randomly set some mock data for demo
            setRecentSales(Math.floor(Math.random() * 5) + 2);
            setIsLowStock(Math.random() > 0.7);

            return () => leaveProductRoom(productId);
        }
    }, [productId]);

    return (
        <div className="flex flex-col gap-3 my-4 animate-fade-in-up">
            {/* Real-time Viewers */}
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-100 w-fit">
                <LucideEye size={16} className="animate-pulse" />
                <span>{viewerCount} {viewerCount === 1 ? 'person is' : 'people are'} viewing this right now</span>
            </div>

            {/* Recent Sales Social Proof */}
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium border border-green-100 w-fit">
                <LucideShoppingCart size={16} />
                <span>Sold {recentSales} times in the last hour</span>
            </div>

            {/* Low Stock Urgency */}
            {isLowStock && (
                <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-sm font-bold border border-red-100 w-fit animate-bounce">
                    <LucideZap size={16} fill="currentColor" />
                    <span>HURRY! Only 2 left in stock!</span>
                </div>
            )}
        </div>
    );
};

export default SocialProof;
