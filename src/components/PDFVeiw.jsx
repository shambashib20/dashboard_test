import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFPreview({ fileUrl }) {
    const [numPages, setNumPages] = useState(null);

    return (
        <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
            <Page pageNumber={1} width={250} />
        </Document>
    );
}

export default PDFPreview
