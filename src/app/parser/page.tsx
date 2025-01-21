'use client';
import React, { useState } from 'react';
import { processFilesAndCreateZip } from '@/utils/parserUtils';

const Parser: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedFileType, setSelectedFileType] = useState<string>('');

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files));
        }
    };

    const handleSelectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFileType(event.target.value);
    };

    const handleProcessFiles = async () => {
        if (!files.length) {
            alert('No files selected. Please upload files to proceed.');
            return;
        }

        setLoading(true);

        try {
            const zipBlob = await processFilesAndCreateZip(files, selectedFileType);

            // Download the generated ZIP file
            const zipUrl = URL.createObjectURL(zipBlob);
            const link = document.createElement('a');
            link.href = zipUrl;
            link.download = `ProcessedFiles_${new Date().toISOString().split('T')[0]}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error processing files:', error);
            alert('Error processing files. Check the console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-bold">CSV to TXT Processor</h1>
            <div className="p-2 rounded-2xl flex justify-center items-center w-fit gap-5 bg-neutral-900">
                <label htmlFor="selector">Choose the file type to process:</label>
                <select
                    className="bg-black text-white rounded-2xl p-2 px-4"
                    name="selector"
                    id="selector"
                    value={selectedFileType}
                    onChange={handleSelectorChange}
                >
                    <option value="">Auto-detect</option>
                    <option value="nse">NSE</option>
                    <option value="bse">BSE</option>
                    <option value="nsefo">NSEFO</option>
                </select>
            </div>
            <input
                type="file"
                accept=".csv"
                multiple
                onChange={handleFileUpload}
                className="bg-neutral-900 w-fit text-white rounded-2xl p-2"
            />

            {files.length > 0 && (
                <div>
                    <p>Files Selected: {files.map((file) => file.name).join(', ')}</p>
                    <button
                        onClick={handleProcessFiles}
                        disabled={loading}
                        className={`bg-white rounded-2xl text-black p-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : 'Process Files'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Parser;
