'use client';
import React, { FunctionComponent, useState } from 'react';
import RangeDatePicker from "@/components/ui/RangeDatePicker";
import { SingleDatePicker } from "@/components/ui/SingleDatePicker";
import { Switch } from "@/components/ui/switch";
import {MultiSelect} from "@/components/blocks/MultiSelectIndex";

const OptionsBar: FunctionComponent = () => {
    const [isSinglePicker, setIsSinglePicker] = useState(true);
    const [selectedIndexes, setSelectedIndexes] = useState<string[]>([]);
    const togglePicker = () => {
        setIsSinglePicker((prev) => !prev);
    };

    return (
        <div className="w-1/4 flex flex-col bg-card text-white p-4 rounded-lg">
            {/* Add a switch or button to toggle between the pickers */}
            <div className="flex items-center mb-4">
                <p className="mr-2">Single Date</p>
                <Switch
                    checked={!isSinglePicker}
                    onCheckedChange={togglePicker}
                    className="mr-2"
                />
                <p>Range Date</p>
            </div>

            {isSinglePicker ? (
                <SingleDatePicker />
            ) : (
                <RangeDatePicker />
            )}

            {/* Use the MultiSelect component for selecting indexes */}
            <div className="mt-4">
                <MultiSelect
                    options={[
                        { label: "Tech", value: "tech" },
                        { label: "Pharma", value: "pharma" },
                        { label: "Banking", value: "banking" },
                        { label: "Auto", value: "auto" },
                        { label: "Energy", value: "energy" },
                        { label: "FMCG", value: "fmcg" },
                    ]}
                    onValueChange={setSelectedIndexes}
                    defaultValue={selectedIndexes}
                    placeholder="Select indexes"
                    variant="default"
                    maxCount={3}
                />
            </div>
        </div>
    );
};

export default OptionsBar;
