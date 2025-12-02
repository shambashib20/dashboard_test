import { Card, Tag, Tooltip, Divider } from "antd";
import {
  BookOutlined,
  GiftOutlined,
  UserOutlined,
  CalendarOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import React from "react";

/* --------------------------- small utils --------------------------- */
const formatDate = (d) => {
  if (!d) return "—";
  try {
    // supports "19-03-2025" or ISO
    const parts =
      d.includes("-") && d.split("-").length === 3 ? d.split("-") : [];
    const date =
      parts.length === 3 && parts[0].length === 2
        ? new Date(+parts[2], +parts[1] - 1, +parts[0])
        : new Date(d);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return d;
  }
};

const Safe = (v) => (v === undefined || v === null || v === "" ? "—" : v);

/* --------------------------- main page --------------------------- */
const DashboardPage = () => {
  // read student safely
  let student = null;
  try {
    const raw = localStorage.getItem("student");
    student = raw ? JSON.parse(raw) : null;
  } catch {
    student = null;
  }

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

  const studentImg = student.documents.find(
    (doc) => doc.course_document.title === "Colour Photo"
  )?.doc_file;
  if (!student) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Card className="rounded-2xl shadow-md">
          <p className="text-gray-600">
            No student data found. Please log in again.
          </p>
        </Card>
      </div>
    );
  }

  const exactKey = (student?.colleges?.college_name || "")
    .trim()
    .replace(/\s+/g, "_");

  const dynamicColor = colors[exactKey] || "#032768";

  const scholarship = Number(student?.scholarship || 0);
  // const initials =
  //   (student?.name || "")
  //     .split(" ")
  //     .map((s) => s[0])
  //     .slice(0, 2)
  //     .join("")
  //     .toUpperCase() || "ST";

  return (
    <>
      <section className="min-h-screen bg-gray-50 p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl  text-white grid place-items-center font-semibold">
              <img
                src={`https://erp.mrgroupofcolleges.co.in/${studentImg}`}
                className="rounded-full"
                alt=""
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#032768] leading-tight">
                Welcome back, {Safe(student.name)}!
              </h1>
              <p className="text-gray-600">Here’s your academic summary</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Tag color="blue" className="px-3 py-1 rounded-full">
              <SafetyCertificateOutlined /> Verified
            </Tag>

            {/* TODO WHEN ROLL NUMBER WILL BE GIVEN, RENDER THAT! */}
            {/* <Tag color="geekblue" className="px-3 py-1 rounded-full">
              <IdcardOutlined />{" "}
              {Safe(student?.student_id || student?.registration_no)}
            </Tag> */}
            <Tag className="px-3 py-1 rounded-full">
              Session {Safe(student?.session)}
            </Tag>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-full mx-auto">
          {/* Personal Details */}
          <Card
            className="shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-300"
            bodyStyle={{ padding: 0 }}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#032768]/10 p-3 rounded-xl">
                  <UserOutlined className="text-[#032768] text-lg" />
                </div>
                <h3 className="text-xl font-bold text-[#032768] m-0">
                  Personal Details
                </h3>
              </div>

              <div className="space-y-1">
                <DetailItem
                  icon={<BookOutlined />}
                  label="Course Name"
                  value={Safe(student?.courses?.course_name)}
                />
                <DetailItem
                  icon={<CalendarOutlined />}
                  label="Admission Date"
                  value={formatDate(student?.admission_date)}
                />
                <DetailItem
                  icon={<BankOutlined />}
                  label="College"
                  value={Safe(student?.colleges?.college_name)}
                />
                <DetailItem
                  icon={<BookOutlined />}
                  label="Session Enrolled"
                  value={Safe(student?.session)}
                />
              </div>
            </div>

            {/* slim footer bar */}
            <div
              className="h-2 w-full rounded-b-2xl"
              style={{
                background: `linear-gradient(to right, ${dynamicColor}, ${dynamicColor}CC)`
              }}
            />
          </Card>

          {/* Scholarship */}
          {scholarship > 0 ? (
            <Card
              className="shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden"
              bodyStyle={{ padding: 0 }}
            >
              <div className="bg-gradient-to-br from-[#032768] to-blue-900 p-6 min-h-[260px] flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <GiftOutlined className="text-white text-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-white m-0">
                    Scholarship Awarded
                  </h3>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="bg-white/10 rounded-2xl px-6 py-5 mb-3">
                    <span className="text-5xl font-bold text-white block">
                      ₹ {scholarship.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-green-200 font-semibold text-lg m-0">
                      Congratulations! 🎉
                    </p>
                  </div>

                  <p className="text-blue-200 mt-2 text-sm">
                    Scholarship amount credited to your account
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="shadow-lg border-0 rounded-2xl">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#032768] mb-2">
                  Scholarship
                </h3>
                <p className="text-gray-600">
                  No scholarship on record. If you think this is wrong, ping the
                  accounts desk.
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* quick actions / help */}
        <div className="max-w-full mx-auto mt-6">
          <Card className="shadow-lg border-0 rounded-2xl bg-white">
            <div className="p-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[#032768] m-0">
                Need help with your academic journey? Contact your department
                advisor.
              </p>
              <div className="flex gap-2">
                <Tooltip title="Download ID Card">
                  <a
                    href="/id-card"
                    className="px-3 py-2 rounded-xl bg-[#032768] text-white text-sm hover:opacity-95"
                  >
                    Get ID
                  </a>
                </Tooltip>
                <Tooltip title="View Fee Status">
                  <a
                    href="/payment-status"
                    className="px-3 py-2 rounded-xl bg-gray-100 text-[#032768] text-sm hover:bg-gray-200"
                  >
                    Payments
                  </a>
                </Tooltip>
              </div>
            </div>
            <Divider className="m-0" />
            <div className="px-4 py-3 text-xs text-gray-500">
              Data synced from registrar. Last updated:{" "}
              {formatDate(student?.updated_at || student?.created_at)}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

/* ----------------------- reusable detail row ----------------------- */
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between px-3 py-3 rounded-xl group transition-colors hover:bg-gray-50">
    <div className="flex items-center gap-3 min-w-0">
      <span className="text-[#032768] text-base shrink-0">{icon}</span>
      <span className="text-gray-600">{label}</span>
    </div>
    <span className="text-[#032768] font-semibold text-right max-w-[60%] truncate">
      {value}
    </span>
  </div>
);

export default DashboardPage;
