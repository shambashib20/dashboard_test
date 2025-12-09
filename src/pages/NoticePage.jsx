import { useEffect, useState } from "react";
import { noticeService } from "../services/notice.service";

import { Document, Page } from "react-pdf";
import GlobalLoader from "../components/GlobalLoader";


export const collegeMap = {
  MR_PHARMA: {
    name: "M.R College of Pharmaceutical Sciences & Research", color: "#45897C",
  },
  MT_PHARMA: {
    name: "Mother Teresa Institute of Pharmacy", color: "#D06F83",
  },
  SAHAJPATH_PHARMA: {
    name: "Sahajpath College of Pharmacy", color: "#7066AF",
  },
  MM_NURSING: { name: "Mother Mary Institute of Nursing", color: "#5C5485", },
  MR_NURSING: { name: "M.R Institute of Nursing", color: "#1579AB", },
  RIJIYA_NURSING: { name: "Mother Rijiya Institute of Nursing", color: "#006030", },
  MR_EDU: { name: "M.R_College_of_Education", color: "#3A3B95", },
  MT_EDU_RESEARCH: { name: "Mother Teresa Institute of Education & Research", color: "#845A70", },
  SHAHIDULLAH_EDU: { name: "Dr. Shahidullah Institute of Education", color: "#4B6293", },
  SAHAJPATH: { name: "Sahajpath", color: "#896F54", },
  MR_MANAGEMENT: { name: "M.R College of Management & Allied Health Sciences", color: "#D9822B", },
};
function normalize(str) {
  return String(str)
    .toLowerCase()
    .replace(/[\s._-]+/g, "")
    .trim();
}

function getCollegeEnumKeyByName(collegeName) {
  const normalizedName = normalize(collegeName);

  return Object.keys(collegeMap).find((key) => {
    const mappedName = collegeMap[key].name;
    return normalize(mappedName) === normalizedName;
  });
}

export default function NoticePage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const student = JSON.parse(localStorage.getItem("student"));
  const collegeName = student?.colleges?.college_name;
  console.log(collegeName, 'ksksk')

  const collegeKey = getCollegeEnumKeyByName(collegeName);
  console.log(collegeKey, 'ksksk')

  useEffect(() => {
    async function fetchNotices() {
      try {
        if (!collegeKey) {
          console.error("College key not found for:", collegeName);
          setLoading(false);
          return;
        }

        const response = await noticeService.getNotices({
          collegeKey,
          page: 1,
          limit: 20,
        });

        setNotices(response.items || []);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotices();
  }, [collegeKey]);

  if (loading) {
    return <GlobalLoader />
  }

  const handleDownload = (pdfUrl) => {
    if (!pdfUrl) return;

    // simplest: open in new tab (browser will show or download)
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full mx-auto p-6 space-y-8">
      {/* TITLE */}
      <h2 className="text-3xl font-bold text-[#032768] mb-4">Notices</h2>

      {/* NOTICE CARDS */}
      <div className="space-y-4">
        {notices.length === 0 && (
          <p className="text-gray-600">No notices available for your college.</p>
        )}

        {notices.map((notice) => (
          <div
            key={notice._id}
            className="border rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition"
          >
            <div>
              <h3 className="font-semibold text-lg">{notice.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(notice.noticeDate).toLocaleDateString("en-GB")}
              </p>
            </div>

            <button
              onClick={() => handleDownload(notice.pdfUrl)}
              className="ml-4 px-4 py-2 rounded bg-[#032768] text-white text-sm hover:bg-[#021b4a] transition"
              disabled={!notice.pdfUrl}
            >
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
