import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import getPhotoUrl from "../utils/profile_photo_extractor.util";
import { authService } from "../services/auth.service";

const Safe = (v) => (v ? v : "—");

const IdCard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------------------------- FETCH STUDENT ---------------------------- */
  useEffect(() => {
    const loadStudent = async () => {
      try {
        const raw = localStorage.getItem("student");
        if (!raw) throw new Error("No student in localStorage");

        const localData = JSON.parse(raw);
        const phone = localData.phone_number || localData.phone;

        if (!phone) throw new Error("Phone number missing");

        const response = await authService.student_details({
          mobile_number: phone,
        });

        const freshStudent = response.data.student;

        // update local storage
        localStorage.setItem("student", JSON.stringify(freshStudent));

        setStudent(freshStudent);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, []);

  /* ---------------------------- LOADING HANDLERS ------------------------- */
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading your ID Card…</p>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg">
          {error || "Unable to load student data"}
        </p>
      </div>
    );
  }

  /* ---------------------------- REST OF YOUR UI -------------------------- */

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

  const normalize = (str) => str?.trim().replace(/\s+/g, " ");
  const photoUrl = getPhotoUrl(student);

  const bgImage = {
    "M.R_College_of_Pharmaceutical_Sciences_&_Research": "/id_cards/MPS.svg",
    "Mother_Teresa_Institute_of_Pharmacy": "/id_cards/MTIP.svg",
    Sahajpath_College_of_Pharmacy: "/id_cards/sahajpath_college_of_pharmacy.svg",
    "M.R_Institute_of_Nursing": "/id_cards/MRGIN.svg",
    "Mother_Teresa_Institute_of_Nursing": "/id_cards/MTIN.svg",
    "Mother_Rijiya_Institute_of_Nursing": "/id_cards/MRIN.svg",
    "M.R_College_of_Education": "/id_cards/MRCE.svg",
    "Mother_Teresa_Institute_of_Education_&_Research": "/id_cards/MTIE.svg",
    "Dr._Shahidullah_Institute_of_Education":
      "/id_cards/Dr_Shahidullah_Institute_of_Education.svg",
    Sahajpath: "/id_cards/Sahajpath.svg",
    "M.R College of Management & Allied Health Sciences": "/id_cards/MMIN.svg",
  };

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

  const mapped = {
    name: normalize(student?.name || ""),
    roll: student?.roll_number || "",
    course: student?.courses?.course_name || "",
    session: student?.session || "",
    phone: student?.phone || "",
    guardian: student?.g_name || "",
    gphone: student?.g_phone || "",
    address: student?.address || "",
    collegeName: (student?.colleges?.college_name || "").split(" ").join("_"),
    blood: student?.blood || "—",
    bgImage:
      bgImage[
      (student?.colleges?.college_name || "").trim().replace(/\s+/g, "_")
      ] || "/id_cards/MMIN.svg",
    color:
      colors[
      (student?.colleges?.college_name || "").trim().replace(/\s+/g, "_")
      ] || "#000000",
    profile_image: photoUrl,
  };

  return (
    <div className="relative min-h-screen select-none overflow-hidden bg-gray-50 pb-12 pt-14 print:bg-white">
      {/* Hanger */}
      <motion.div
        variants={swing}
        animate="swing"
        className="pointer-events-none absolute left-1/2 top-0 z-10 h-[90px] w-px -translate-x-1/2 bg-gray-500/70 print:hidden"
        style={{ transformOrigin: "bottom center" }}
      />
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

      {/* CARD */}
      <motion.div
        variants={swing}
        animate="swing"
        style={{ transformOrigin: "top center" }}
        className="relative mx-auto mt-24 w-[360px] text-black shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-black/5 print:mt-8 print:shadow-none"
      >
        <img src={mapped.bgImage} className="w-full" />

        <div className="absolute top-1/2 left-1/2 h-full w-full -translate-1/2 flex items-center justify-center">
          {mapped.profile_image ? (
            <img
              src={mapped.profile_image}
              alt="Profile"
              className="w-38 h-38 rounded-full absolute top-[200px] -translate-y-1/2"
            />
          ) : (
              <div
                className="w-38 h-38 rounded-full absolute top-[200px] -translate-y-1/2 grid place-content-center"
                style={{ background: mapped.color }}
              >
                <h6 className="text-white text-7xl">
                  {mapped.name.split(" ")[0][0]}
                </h6>
            </div>
          )}

          <div className="mt-44 w-full">
            <h3
              className="text-center text-2xl uppercase"
              style={{ color: mapped.color }}
            >
              <span className="font-bold">{mapped.name.split(" ")[0]}</span>{" "}
              {mapped.name.split(" ")[1]}
            </h3>

            <div className="grid grid-cols-2 gap-10 mt-2 text-sm">
              <div></div>
              <div className="col">
                <ul className="ps-3 font-semibold text-base text-[#656565]">
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
