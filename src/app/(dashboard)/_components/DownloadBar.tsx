import React from 'react';
import { Button } from "@/components/ui/button";

interface DownloadBarProps {
    items: string[];
}

const DownloadBar: React.FC<DownloadBarProps> = ({ items }) => {
    // Sort the items alphabetically before rendering
    const sortedItems = [...items].sort((a, b) => a.localeCompare(b));

    return (
        <div className="w-1/4 flex flex-col justify-between bg-card text-white p-4 rounded-lg">
            <div>
                <h3 className="text-lg font-bold">Download Queue</h3>
                <ul>
                    {sortedItems.length > 0 ? (
                        sortedItems.map((item, index) => (
                            <li key={index} className="p-1 w-fit  px-2 mt-2 bg-neutral-900 rounded">
                                {item}
                            </li>
                        ))
                    ) : (
                        <li className="mt-2">No items selected</li>
                    )}
                </ul>
            </div>
            <Button>Download</Button>
        </div>
    );
};

export default DownloadBar;
