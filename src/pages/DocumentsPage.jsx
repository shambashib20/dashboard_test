import React from "react";

/* ----------------------- tiny utils ----------------------- */
const Safe = (v) => (v ? v : "—");
const getExt = (path = "") => (path.split(".").pop() || "").toLowerCase();
const isPdf = (path = "") => getExt(path) === "pdf";
const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const DocTypeBadge = ({ ext }) => {
  const map = {
    pdf: { label: "PDF", classes: "bg-red-100 text-red-700" },
    jpg: { label: "JPG", classes: "bg-amber-100 text-amber-700" },
    jpeg: { label: "JPEG", classes: "bg-amber-100 text-amber-700" },
    png: { label: "PNG", classes: "bg-emerald-100 text-emerald-700" },
    webp: { label: "WEBP", classes: "bg-emerald-100 text-emerald-700" },
  };
  const item = map[ext] || {
    label: ext.toUpperCase() || "FILE",
    classes: "bg-gray-100 text-gray-700",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${item.classes}`}
    >
      {item.label}
    </span>
  );
};

const IconFile = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6 2a2 2 0 0 0-2 2v16.5A1.5 1.5 0 0 0 5.5 22h13a1.5 1.5 0 0 0 1.5-1.5V8.5L14 2H6zm8 1.5 5.5 5.5H14V3.5z" />
  </svg>
);

/* ----------------------- card ----------------------- */
function DocumentCard({ title, url, createdAt }) {
  const ext = getExt(url);
  const fileUrl = `${import.meta.env.VITE_EXTERNAL_API}${url}`;


  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fileUrl);
    } catch {
      // ignore
    }
  };

  return (
    <div className="group relative overflow-hidden  border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      {/* preview area with fixed aspect ratio */}
      <div className="relative aspect-[4/3] w-full bg-gray-50">
        {isPdf(url) ? (
          <iframe
            title={title || "Document preview"}
            src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="h-full w-full"
          />
        ) : (
          <img
            src={fileUrl}
            alt={title || "Document image"}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        )}

        {/* top overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <DocTypeBadge ext={ext} />
          <div className="rounded-full bg-black/40 px-2 py-1 text-[10px] font-medium text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
            Preview
          </div>
        </div>
      </div>

      {/* meta + actions */}
      <div className="flex flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-[15px] font-semibold text-[#032768]">
          {Safe(title) || "Untitled Document"}
        </h3>
        <p className="text-xs text-gray-500">
          Uploaded on: {fmtDate(createdAt)}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#032768] px-3 py-2 text-sm font-medium text-white transition hover:opacity-95"
          >
            <IconFile className="h-4 w-4 text-white" />
            View
          </a>
          <a
            href={fileUrl}
            download
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Download
          </a>
          <button
            onClick={copyLink}
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            aria-label="Copy link"
            title="Copy link"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------- page ----------------------- */
function DocumentsPage() {
  // get student object from localStorage safely
  let student = null;
  try {
    const raw = localStorage.getItem("student");
    student = raw ? JSON.parse(raw) : null;
  } catch {
    student = null;
  }

  const docs = student?.documents || [];

  if (!student || docs.length === 0) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <div className="mb-3 rounded-2xl bg-blue-50 px-3 py-1 text-xs font-semibold text-[#032768]">
          Documents
        </div>
        <h2 className="mb-1 text-xl font-semibold text-gray-700">
          No documents found
        </h2>
        <p className="max-w-md text-sm text-gray-500">
          Please upload your admission documents or try logging in again.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8 bg-gray-50 py-7">
      <div className="mb-6 flex items-end justify-between ">
        <div>
          <h2 className="text-3xl font-bold text-[#032768]">
            Your Uploaded Documents
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Preview, download, or copy a shareable link. PDFs open in a new tab
            with native controls.
          </p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <a
            href="/documents/upload"
            className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Upload New
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc, idx) => (
          <DocumentCard
            key={idx}
            title={doc?.course_document?.title}
            url={doc?.doc_file}
            createdAt={doc?.created_at}
          />
        ))}
      </div>
    </div>
  );
}

export default DocumentsPage;
