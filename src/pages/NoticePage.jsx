import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import demoNoticePdf from '../assets/demo-notice.pdf';



// Mock data notices from your mockData.json
const mockData = {
  notices: [
    {
      id: 1,
      title: "Admission Notice 2025",
      date: "2025-07-30",
      pdfUrl: demoNoticePdf,
    },
    {
      id: 2,
      title: "Exam Schedule Summer 2025",
      date: "2025-06-10",
      pdfUrl: demoNoticePdf,
    },
    {
      id: 3,
      title: "Fee Payment Guidelines",
      date: "2025-05-01",
      pdfUrl: demoNoticePdf,
    },
  ],
};

export default function NoticePage() {
  const [selectedNotice, setSelectedNotice] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h2 className="text-3xl font-bold text-emerald-700">Notices</h2>

      {/* Notices List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockData.notices.map((notice) => (
          <div
            key={notice.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg"
            onClick={() => setSelectedNotice(notice)}
          >
            <h3 className="font-semibold text-lg">{notice.title}</h3>
            <p className="text-sm text-gray-600">
              {new Date(notice.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* PDF Preview */}
      {selectedNotice && (
        <div className="mt-8">
          <button
            className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setSelectedNotice(null)}
          >
            Close Preview
          </button>

          <div className="border rounded shadow p-4">
            <h3 className="text-xl font-bold mb-4">{selectedNotice.title}</h3>

            <Document
              file={selectedNotice.pdfUrl}
              loading={<p>Loading PDF preview...</p>}
              error={<p>Failed to load PDF preview.</p>}
              onLoadError={(error) =>
                console.error("Error loading PDF:", error)
              }
            >
              <Page pageNumber={1} width={600} />
            </Document>

            <a
              href={selectedNotice.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-blue-600 underline"
            >
              Open full PDF
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
