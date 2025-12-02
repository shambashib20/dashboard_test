import { motion } from "framer-motion";
import getPhotoUrl from "../utils/profile_photo_extractor.util";

/* ---------- helpers ---------- */
// const getInitials = (name) => {
//   if (!name) return "ST";
//   const parts = name.trim().split(/\s+/);
//   const first = parts[0]?.[0] || "";
//   const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
//   return (first + last).toUpperCase();
// };

const Safe = (v) => (v ? v : "—");

/* ---------- component ---------- */
const IdCard = () => {
  let student = null;
  try {
    const raw = localStorage.getItem("student");
    student = raw ? JSON.parse(raw) : null;
  } catch {
    student = null;
  }

  if (!student) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">
          No student data found. Please log in again.
        </p>
      </div>
    );
  }

  const swing = {
    swing: {
      rotate: [-2.5, 2.5],
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 4.5,
        ease: "easeInOut",
      },
    },
  };
  const normalize = (str) =>
    str?.trim().replace(/\s+/g, " ");
  const photoUrl = getPhotoUrl(student);

  const bgImage = {
    "M.R_College_of_Pharmaceutical_Sciences_&_Research": "/id_cards/MPS.svg",



    "Mother_Teresa_Institute_of_Pharmacy": "/id_cards/MTIP.svg",




    Sahajpath_College_of_Pharmacy: "/id_cards/sahajpath_college_of_pharmacy.svg",



    "M.R_Institute_of_Nursing": "/id_cards/MRGIN.svg",
    "Mother_Teresa_Institute_of_Nursing":
      "/id_cards/MTIN.svg",





    Mother_Rijiya_Institute_of_Nursing:
      "/id_cards/MRIN.svg",
    "M.R_College_of_Education": "/id_cards/MRCE.svg",
    "Mother_Teresa_Institute_of_Education_&_Research": "/id_cards/MTIE.svg",
    "Dr._Shahidullah_Institute_of_Education":
      "/id_cards/Dr_Shahidullah_Institute_of_Education.svg",
    Sahajpath: "/id_cards/Sahajpath.svg",
    "M.R College of Management & Allied Health Sciences": "/id_cards/MMIN.svg",
  };

  // colors map: exact-key -> hex color
  const colors = {
    "M.R_College_of_Pharmaceutical_Sciences_&_Research": "#45897C",
    "Mother_Teresa_Institute_of_Pharmacy": "#D06F83",
    Sahajpath_College_of_Pharmacy: "#7066AF",
    "M.R_Institute_of_Nursing": "#5C5485",
    "Mother_Teresa_Institute_of_Nursing": "#1579AB",
    Mother_Rijiya_Institute_of_Nursing: "#006030",
    "M.R_College_of_Education": "#3A3B95",
    "Mother_Teresa_Institute_of_Education_&_Research": "#845A70",
    "Dr._Shahidullah_Institute_of_Education": "#4B6293",
    Sahajpath: "#896F54",
    "M.R College of Management & Allied Health Sciences": "#D9822B",
  };

  const key = student?.colleges?.college_name.split(" ").join("_");
  console.log(key, 'key')
  const exactKey = (student?.colleges?.college_name || "")
    .trim()
    .replace(/\s+/g, "_");
  const mapped = {
    name: normalize(student?.name || ""),
    roll: (student?.roll_number || ""),
    course: (student?.courses?.course_name || ""),
    session: (student?.session || ""),
    phone: (student?.phone || ""),
    guardian: (student?.g_name || ""),
    gphone: (student?.g_phone || ""),
    address: (student?.address || ""),
    collegeName: (student?.colleges?.college_name || "").split(" ").join("_"),
    blood: (student?.blood || "—"),
    bgImage:
      bgImage[
      (student?.colleges?.college_name || "").split(" ").join("_")
      ] || "/id_cards/MMIN.svg",
    color:
      colors[
      (student?.colleges?.college_name || "").split(" ").join("_")
      ] || "#000000",
    profile_image: photoUrl,
  };

  console.log(mapped.name, 'nsns')

  return (
    <div className="relative min-h-screen select-none overflow-hidden bg-gray-50 pb-12 pt-14 print:bg-white">
      {/* Top actions (hidden in print) */}
      <div className="pointer-events-auto fixed right-4 top-4 z-50 flex gap-2 print:hidden">
        {/* <button
          onClick={() => window.print()}
          className="rounded-xl bg-[#032768] px-3 py-2 text-sm font-medium text-white shadow hover:opacity-95"
        >
          Print / Save PDF
        </button> */}
      </div>

      {/* Hanger */}
      <motion.div
        variants={swing}
        animate="swing"
        className="pointer-events-none absolute left-1/2 top-0 z-10 h-[90px] w-px -translate-x-1/2 bg-gray-500/70 print:hidden"
        style={{ transformOrigin: "bottom center" }}
      />
      {/* Threads to the sides for depth */}
      <motion.div
        variants={swing}
        animate="swing"
        className="pointer-events-none absolute left-[calc(50%-140px)] top-2 z-10 h-[72px] w-px bg-gray-400/60 print:hidden"
        style={{ transformOrigin: "bottom center" }}
      />
      <motion.div
        variants={swing}
        animate="swing"
        className="pointer-events-none absolute left-[calc(50%+140px)] top-2 z-10 h-[72px] w-px bg-gray-400/60 print:hidden"
        style={{ transformOrigin: "bottom center" }}
      />

      {/* Card */}
      <motion.div
        variants={swing}
        animate="swing"
        style={{ transformOrigin: "top center" }}
        className="relative mx-auto mt-24 w-[360px] text-black shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-black/5 print:mt-8 print:shadow-none"
      >
        <img
          src={mapped.bgImage}
          alt={student?.colleges?.college_name}
          className="w-full"
        />

        <div className=" absolute top-1/2 flex items-center justify-center h-full w-full left-1/2 -translate-1/2 content">
          {mapped.profile_image ? (
            <img
              src={mapped.profile_image}
              alt="Profile Image"
              className="w-38 h-38 rounded-full  absolute top-[200px] -translate-y-1/2"
            />
          ) : (
            <div style={{ background: mapped.color }} className="w-38 h-38 rounded-full  absolute top-[200px] -translate-y-1/2 grid place-content-center ">
              <h6 className="text-white text-7xl
              ">{mapped.name.split(" ")[0].split("")[0]}</h6>
            </div>
          )}

          <div className="mt-44 w-full">
            <h3
              style={{ color: mapped.color }}
              className="text-center text-2xl uppercase  "
            >
              {" "}
              <span className="font-bold">
                {mapped.name.split(" ")[0]}
              </span>{" "}
              {mapped.name.split(" ")[1]}
            </h3>
            <div className="grid grid-cols-2 gap-10 mt-2 text-sm">
              <div className="col"></div>
              <div className="col">
                <ul className="ps-3  font-semibold text-base text-[#656565]">
                  <li>{mapped.roll}</li>
                  <li>{mapped.course}</li>
                  <li>{mapped.session}</li>
                  <li>{mapped.gphone}</li>
                  <li>{mapped.blood}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* print styles */}
      <style>{`
        @media print {
          @page { size: A4; margin: 16mm; }
          .print\\:hidden { display: none !important; }
          .print\\:bg-white { background: #fff !important; }
          .print\\:mt-8 { margin-top: 2rem !important; }
          .print\\:shadow-none { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
};

export default IdCard;
