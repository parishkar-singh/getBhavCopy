'use client';
import React from 'react';
import SelectorCard from "@/components/blocks/SelectorCard";
import DownloadBar from "@/app/(dashboard)/_components/DownloadBar";
import OptionsBar from "@/app/(dashboard)/_components/OptionsBar";
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from "@/redux/store";
import {addItem, removeItem} from "@/redux/selectedItemsSlice";
import {Button} from "react-day-picker";


const Dashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedItems = useSelector((state: RootState) => state.selectedItems.items);

    const handleSubmit = (item: string) => {
        dispatch(addItem(item));
        console.log(`${item} added to download queue.`);
    };

    const handleCancel = (item: string) => {
        dispatch(removeItem(item));
        console.log(`${item} removed from download queue.`);
    };
    const handleRouteToParser = () => {
        window.location.href = "/parser";
    };

    return (
        <div className="flex flex-col gap-10">

            <h1 className="text-white text-center text-3xl  font-black">BhavCopy Downloader <button  onClick={handleRouteToParser} className={`bg-green-500 rounded-3xl px-2`}>Parser</button></h1>
            <button>PARSER</button>
            <div className={`w-full flex justify-between gap-10`}>
                <div className="w-1/2 grid grid-cols-2 gap-4">
                    <SelectorCard
                        title="NSE data"
                        description="Add NSE to download queue"
                        onSubmit={() => handleSubmit("NSE data")}
                        onCancel={() => handleCancel("NSE data")}
                        isAdded={selectedItems.includes("NSE data")}
                    />
                    <SelectorCard
                        title="BSE data"
                        description="Add BSE to download queue"
                        onSubmit={() => handleSubmit("BSE data")}
                        onCancel={() => handleCancel("BSE data")}
                        isAdded={selectedItems.includes("BSE data")}
                    />
                    <SelectorCard
                        title="Options Data"
                        description="Add options to download queue"
                        onSubmit={() => handleSubmit("Options Data")}
                        onCancel={() => handleCancel("Options Data")}
                        isAdded={selectedItems.includes("Options Data")}
                    />
                    <SelectorCard
                        title="Future data"
                        description="Add Future to download queue"
                        onSubmit={() => handleSubmit("Future data")}
                        onCancel={() => handleCancel("Future data")}
                        isAdded={selectedItems.includes("Future data")}
                    />
                </div>
                <OptionsBar />
                {/* Display the Download Bar with selected items */}
                <DownloadBar items={selectedItems} />
            </div>
        </div>
    );
};

export default Dashboard;
