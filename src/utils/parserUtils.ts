// @ts-ignore
import Papa from 'papaparse';
import JSZip from 'jszip';

interface CSVRow {
    [key: string]: string;
}

const fixedColumns = ['SC_CODE', 'DATE', 'OPEN', 'HIGH', 'LOW', 'CLOSE', 'NET_TURNOV'];

/**
 * Parses a CSV file and returns the corresponding `.txt` file content.
 */
export const parseCSVFile = async (file: File): Promise<{ fileName: string; content: string }> => {
    return new Promise((resolve, reject) => {
        const fileName = file.name.split("_")[0];
        const reader = new FileReader();

        reader.onload = () => {
            Papa.parse<CSVRow>(reader.result as string, {
                header: true,
                skipEmptyLines: true,
                complete: (result: { data: any[]; }) => {
                    const content = result.data
                        .map((row) =>
                            fixedColumns
                                .map((col) => (col === 'DATE' ? fileName : row[col] || ''))
                                .join(',')
                        )
                        .join('\n');

                    resolve({ fileName: `${fileName}.txt`, content });
                },
                error: (error: any) => reject(error),
            });
        };

        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
};

/**
 * Zips multiple files and returns a Blob for download.
 */
export const createZip = async (files: { fileName: string; content: string }[]): Promise<Blob> => {
    const zip = new JSZip();
    files.forEach(({ fileName, content }) => {
        zip.file(fileName, content);
    });

    return zip.generateAsync({ type: 'blob' });
};
