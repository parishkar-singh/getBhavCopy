'use client';
import React, { useState } from 'react';
import {createZip, parseCSVFile} from "@/utils/parserUtils";

const Parser: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files)); // Allow multiple file selection
        }
    };

    const downloadZip = async () => {
        setLoading(true);

        try {
            const parsedFiles = await Promise.all(files.map((file) => parseCSVFile(file)));
            const zipBlob = await createZip(parsedFiles);

            const zipName = `${new Date().toISOString().split("T")[0]}.zip`;
            const zipUrl = URL.createObjectURL(zipBlob);

            const link = document.createElement('a');
            link.href = zipUrl;
            link.download = zipName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error creating zip:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>CSV to TXT and ZIP Converter</h1>

            <input
                type="file"
                accept=".csv"
                multiple
                onChange={handleFileUpload}
                className="bg-neutral-900 text-white rounded-2xl p-2"
            />

            {files.length > 0 && (
                <div>
                    <p>Files Selected: {files.map((file) => file.name).join(", ")}</p>
                    <button
                        onClick={downloadZip}
                        disabled={loading}
                        className={`bg-white rounded-2xl text-black p-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : 'Download All as ZIP'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Parser;
