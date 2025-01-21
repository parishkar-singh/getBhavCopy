import JSZip from 'jszip';
// @ts-ignore
import Papa from 'papaparse';

const columnMapping = new Map<string, { columns: string[]; folder: string }>([
    ['nse', { columns: ['SYMBOL', 'DATE', 'OPEN', 'HIGH', 'LOW', 'CLOSE', 'TOTTRDVAL'], folder: 'NSEBSE' }],
    ['bse', { columns: ['SC_CODE', 'DATE', 'OPEN', 'HIGH', 'LOW', 'CLOSE', 'NET_TURNOV'], folder: 'NSEBSE' }],
    ['nsefo', { columns: ['SYMBOL', 'EXPIRY_DT', 'STRIKE_PR', 'OPTION_TYP', 'OPEN', 'HIGH', 'LOW', 'CLOSE', 'OPEN_INT'], folder: 'NSEEFO' }],
]);

/**
 * Processes a single file by parsing its content and creating a TXT representation.
 */
export const processFile = async (file: File, selectedFileType: string): Promise<{ folder: string; fileName: string; content: string }> => {
    const fileType = selectedFileType || file.name.split('_')[1]?.split('.')[0]?.toLowerCase();
    const mapping = columnMapping.get(fileType);

    if (!mapping) {
        throw new Error(`Invalid file type: ${fileType}`);
    }

    const { columns, folder } = mapping;
    const fileContent = await file.text();
    const rows = Papa.parse(fileContent, { header: true, skipEmptyLines: true }).data;

    const content = rows
        .map((row: any) => columns.map((col) => (col === 'DATE' ? file.name.split('_')[0] : row[col] || '')).join(','))
        .join('\n');

    return {
        folder,
        fileName: `${file.name.split('_')[0]}_${fileType}.txt`,
        content,
    };
};

/**
 * Processes multiple files and organizes them into a zip structure.
 */
export const processFilesAndCreateZip = async (files: File[], selectedFileType: string): Promise<Blob> => {
    const zip = new JSZip();
    const folders = new Map<string, JSZip>();

    for (const file of files) {
        const { folder, fileName, content } = await processFile(file, selectedFileType);

        if (!folders.has(folder)) {
            folders.set(folder, zip.folder(folder)!);
        }

        folders.get(folder)!.file(fileName, content);
    }

    return zip.generateAsync({ type: 'blob' });
};
