import { useEffect, useState } from "react";
import { Collapse, Button } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import mrLogo from "../assets/mr-logo.jpg"; // ✅ adjust path
import admissionBillTemplate from "../templates/admission_bill.template.html?raw";
import semesterBillTemplate from "../templates/semester_bill.template.html?raw";
import admissionBreakupTemplate from "../templates/admission_fees.template.html?raw";

const { Panel } = Collapse;

export default function PaymentStatusPage() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    try {
      const storedStudent = localStorage.getItem("student");
      if (storedStudent) {
        setStudent(JSON.parse(storedStudent));
      }
    } catch (error) {
      console.error("Failed to load student from localStorage:", error);
    }
  }, []);

  if (!student) {
    return (
      <div className="w-full mx-auto p-6 text-center text-gray-500">
        Loading payment details...
      </div>
    );
  }

  const semesterBills = (student.semester_bills || []).filter((sp) => {
    const keysToIgnore = [
      "id",
      "form_id",
      "created_by",
      "updated_by",
      "created_at",
      "updated_at",
      "deleted_at",
    ];
    return Object.entries(sp).some(
      ([key, value]) =>
        !keysToIgnore.includes(key) &&
        value !== null &&
        value !== "" &&
        value !== 0
    );
  });

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);

    if (isNaN(date)) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const admissionBills = (student.admission_bills || []).filter((bill) => {
    const keysToIgnore = [
      "id",
      "form_id",
      "created_by",
      "updated_by",
      "created_at",
      "updated_at",
      "deleted_at",
      "status",
    ];
    const values = Object.entries(bill)
      .filter(([key]) => !keysToIgnore.includes(key))
      .map(([_, value]) => value);
    return (
      (bill.bill_number && bill.bill_number !== "") ||
      (bill.amount && bill.amount !== "0") ||
      (bill.pay_type && bill.pay_type !== "") ||
      (bill.tran_id && bill.tran_id !== "") ||
      (bill.bank_name && bill.bank_name !== "") ||
      (bill.amount1 && bill.amount1 !== "0") ||
      (bill.bank_name1 && bill.bank_name1 !== "") ||
      (bill.pay_type1 && bill.pay_type1 !== "") ||
      (bill.tran_id1 && bill.tran_id1 !== "") ||
      (bill.ins_amount && bill.ins_amount !== "0") ||
      (bill.ins_due_date && bill.ins_due_date !== "") ||
      (bill.ins_rec_date && bill.ins_rec_date !== "")
    );
  });

  const totalAdmissionFees = Number(student.admission_fees || 0);
  const totalPaid = admissionBills.reduce(
    (sum, b) => sum + Number(b.ins_amount || 0),
    0
  );
  const totalDue = totalAdmissionFees - totalPaid;

  function renderAdmissionBillTemplate(bill, student, dueAfterThis) {
    let template = admissionBillTemplate;

    // ✅ Inject logo
    template = template.replace("{{LOGO_PATH}}", mrLogo);

    // 🔹 Update header with consistent branding - FIXED
    template = template.replace(
      "M. R. GROUP OF COLLEGES & HOSPITALS",
      "M. R. GROUP OF COLLEGES & HOSPITALS"
    );
    template = template.replace(
      "www.mrgroupofcolleges.com",
      "www.mgroupofcolleges.com"
    );

    // 🔹 Student details - FIXED: Use the actual student data
    template = template.replace("Priya Sharma", student.name || "");
    template = template.replace("9876543210", student.phone || "");
    template = template.replace("MRN2023001", student.student_id || "");
    template = template.replace(
      "123 Main Street, Kolkata, West Bengal",
      student.address || ""
    );
    template = template.replace(
      "M. R. College of Nursing",
      student.colleges?.college_name || ""
    );
    template = template.replace(
      "B.Sc Nursing",
      student.courses?.course_name || ""
    );
    template = template.replace("2023-2024", student.session || "");

    // 🔹 Installment details - FIXED: Use actual bill data
    template = template.replace("15-09-2023", formatDate(bill.ins_rec_date));
    template = template.replace("BN20230915001", bill.bill_number || "");

    // First payment row - FIXED: Use actual bill data
    template = template.replace("{{AMOUNT}}", bill.amount || "");
    template = template.replace("{{PAY_TYPE}}", bill.pay_type || "");
    template = template.replace("{{TRAN_ID}}", bill.tran_id || "");
    template = template.replace("{{BANK_NAME}}", bill.bank_name || "");

    // Second payment row (only if available) - FIXED: Use actual bill data
    template = template.replace("{{AMOUNT1}}", bill.amount1 || "");
    template = template.replace("{{PAY_TYPE1}}", bill.pay_type1 || "");
    template = template.replace("{{TRAN_ID1}}", bill.tran_id1 || "");
    template = template.replace("{{BANK_NAME1}}", bill.bank_name1 || "");

    // Totals - FIXED: Use actual amounts
    template = template.replace("{{INS_AMOUNT}}", `₹${bill.ins_amount || "0"}`);
    template = template.replace(
      "{{TOTAL_FEES}}",
      `₹${student.admission_fees || "0"}`
    );
    template = template.replace("{{TOTAL_DUE}}", `₹${dueAfterThis.toString()}`);
    template = template.replace("{{DUE_DATE}}", formatDate(bill.ins_due_date));

    return template;
  }

  function buildSemesterLookup(semesterBills) {
    const lookup = {};
    semesterBills.forEach((sb) => {
      lookup[sb.sem_num] = {
        amount: sb.sem_amount || "",
        amountWord: sb.sem_amount_word || "",
        dueDate: formatDate(sb.sem_due_date) || "",
        recDate: formatDate(sb.sem_rec_date) || "",
        billNo: sb.sem_bill_number || "",
      };
    });
    return lookup;
  }
  function renderSemesterBillTemplate(semBill, student) {
    let template = semesterBillTemplate;

    // Logo
    template = template.replace("{{LOGO_PATH}}", mrLogo);

    // Student details
    template = template.replace("{{STUDENT_NAME}}", student.name || "");
    template = template.replace(
      "{{COURSE}}",
      student.courses?.course_name || ""
    );
    template = template.replace("{{SESSION}}", student.session || "");
    template = template.replace(
      "{{COLLEGE}}",
      student.colleges?.college_name || ""
    );
    template = template.replace("{{PHONE}}", student.phone || "");
    template = template.replace("{{AADHAR}}", student.adhaar_no || "");
    template = template.replace("{{ADDRESS}}", student.address || "");
    template = template.replace("{{GUARDIAN_NAME}}", student.g_name || "");

    template = template.replace("{{GUARDIAN_PHONE}}", student.g_phone || "");
    template = template.replace("{{STUDENT_ID}}", student.student_id || "");
    template = template.replace(
      "{{GUARDIAN_OCCUPATION}}",
      student.g_occu || ""
    );
    template = template.replace(
      "{{TOTAL_COURSE_FEES}}",
      student.course_fees || ""
    );
    template = template.replace(
      "{{TOTAL_COURSE_WORD}}",
      student.course_word || ""
    );
    // Semester details
    template = template.replace("{{SEM_NUM}}", semBill.sem_num || "");
    template = template.replace("{{SEM_AMOUNT}}", semBill.sem_amount || "0");
    template = template.replace(
      "{{SEM_AMOUNT_WORD}}",
      semBill.sem_amount_word || ""
    );
    template = template.replace(
      "{{SEM_DUE_DATE}}",
      formatDate(semBill.sem_due_date)
    );
    template = template.replace(
      "{{SEM_REC_DATE}}",
      formatDate(semBill.sem_rec_date)
    );
    template = template.replace(
      "{{SEM_BILL_NO}}",
      semBill.sem_bill_number || ""
    );

    const lookup = buildSemesterLookup(semesterBills);

    function tdVal(sem, field) {
      return lookup[sem]?.[field] || "";
    }

    // Build table rows
    const firstHalf = `
    <tr>
      <td class="bottom-middle">Amount</td>
      <td class="bottom-middle">${tdVal(1, "amount")}</td>
      <td class="bottom-middle">${tdVal(2, "amount")}</td>
      <td class="bottom-middle">${tdVal(3, "amount")}</td>
      <td class="bottom-middle">${tdVal(4, "amount")}</td>
    </tr>
    <tr>
      <td class="bottom-middle">Due Date</td>
      <td class="bottom-middle">${tdVal(1, "dueDate")}</td>
      <td class="bottom-middle">${tdVal(2, "dueDate")}</td>
      <td class="bottom-middle">${tdVal(3, "dueDate")}</td>
      <td class="bottom-middle">${tdVal(4, "dueDate")}</td>
    </tr>
    <tr>
      <td class="bottom-middle">Received Date</td>
      <td class="bottom-middle">${tdVal(1, "recDate")}</td>
      <td class="bottom-middle">${tdVal(2, "recDate")}</td>
      <td class="bottom-middle">${tdVal(3, "recDate")}</td>
      <td class="bottom-middle">${tdVal(4, "recDate")}</td>
    </tr>
    <tr>
      <td class="bottom-middle">Bill No.</td>
      <td class="bottom-middle">${tdVal(1, "billNo")}</td>
      <td class="bottom-middle">${tdVal(2, "billNo")}</td>
      <td class="bottom-middle">${tdVal(3, "billNo")}</td>
      <td class="bottom-middle">${tdVal(4, "billNo")}</td>
    </tr>
  `;

    const secondHalf = `
    <tr>
      <td class="bottom-middle">Amount</td>
      <td class="bottom-middle">${tdVal(5, "amount")}</td>
      <td class="bottom-middle">${tdVal(6, "amount")}</td>
      <td class="bottom-middle">${tdVal(7, "amount")}</td>
      <td class="bottom-middle">${tdVal(8, "amount")}</td>
    </tr>
    <tr>
      <td class="bottom-middle">Due Date</td>
      <td class="bottom-middle">${tdVal(5, "dueDate")}</td>
      <td class="bottom-middle">${tdVal(6, "dueDate")}</td>
      <td class="bottom-middle">${tdVal(7, "dueDate")}</td>
      <td class="bottom-middle">${tdVal(8, "dueDate")}</td>
    </tr>
    <tr>
      <td class="bottom-middle">Received Date</td>
      <td class="bottom-middle">${tdVal(5, "recDate")}</td>
      <td class="bottom-middle">${tdVal(6, "recDate")}</td>
      <td class="bottom-middle">${tdVal(7, "recDate")}</td>
      <td class="bottom-middle">${tdVal(8, "recDate")}</td>
    </tr>
    <tr>
      <td class="bottom-middle">Bill No.</td>
      <td class="bottom-middle">${tdVal(5, "billNo")}</td>
      <td class="bottom-middle">${tdVal(6, "billNo")}</td>
      <td class="bottom-middle">${tdVal(7, "billNo")}</td>
      <td class="bottom-middle">${tdVal(8, "billNo")}</td>
    </tr>
  `;

    // Inject into template
    template = template.replace("{{SEM1_4_ROWS}}", firstHalf);
    template = template.replace("{{SEM5_8_ROWS}}", secondHalf);

    return template;
  }

  function renderAdmissionBreakupTemplate(student, admissionBills) {
    if (!student || !admissionBills.length) return "";

    let template = admissionBreakupTemplate;

    // Branding
    template = template.replace("{{LOGO_PATH}}", mrLogo);
    template = template.replace(
      "{{COLLEGE_NAME}}",
      "M. R. GROUP OF COLLEGES & HOSPITALS"
    );
    template = template.replace(
      "{{COLLEGE_WEBSITE}}",
      "www.mgroupofcolleges.com"
    );

    // Student details
    template = template.replace("{{STUDENT_NAME}}", student.name || "");
    template = template.replace("{{COURSE_FEES}}", student.course_fees || "");
    template = template.replace(
      "{{COURSE_FEES_WORD}}",
      student.course_word || ""
    );

    template = template.replace("{{PHONE}}", student.phone || "");
    template = template.replace("{{FORM_NUMBER}}", student.form_number || "");
    template = template.replace("{{STUDENT_ID}}", student.student_id || "");
    template = template.replace("{{ADDRESS}}", student.address || "");
    template = template.replace(
      "{{COLLEGE}}",
      student.colleges?.college_name || ""
    );
    template = template.replace(
      "{{COURSE}}",
      student.courses?.course_name || ""
    );
    template = template.replace("{{SESSION}}", student.session || "");

    // Dynamic payment rows
    const paymentRows = admissionBills
      .map(
        (b) => `
    <tr>
      <td class="bottom-middle">${b.amount || "0"}</td>
      <td class="bottom-middle">${b.pay_type || "N/A"}</td>
      <td class="bottom-middle">${b.tran_id || "N/A"}</td>
      <td class="bottom-middle">${b.bank_name || "N/A"}</td>
    </tr>
  `
      )
      .join("");
    template = template.replace("{{PAYMENT_ROWS}}", paymentRows);

    // Totals
    const totalPaid = admissionBills.reduce(
      (sum, b) => sum + Number(b.ins_amount || 0),
      0
    );
    template = template.replace("{{TOTAL_PAID}}", totalPaid.toString());
    template = template.replace(
      "{{ADMISSION_FEES}}",
      student.admission_fees || "0"
    );
    template = template.replace(
      "{{ADMISSION_FEES_WORD}}",
      student.admission_word || ""
    );

    // Installment breakdown
    const installmentAmounts = [
      "Booking",
      "1st Installment",
      "2nd Installment",
      "3rd Installment",
    ]
      .map(
        (_, idx) =>
          `<td class="bottom-middle">${
            admissionBills[idx]?.ins_amount || "Pending"
          }</td>`
      )
      .join("");
    template = template.replace("{{INSTALLMENT_AMOUNTS}}", installmentAmounts);

    const dueDates = admissionBills
      .map(
        (b) =>
          `<td class="bottom-middle">${
            formatDate(b.ins_due_date) || "Pending"
          }</td>`
      )
      .join("");
    template = template.replace("{{INSTALLMENT_DUE_DATES}}", dueDates);

    const recDates = admissionBills
      .map(
        (b) =>
          `<td class="bottom-middle">${
            formatDate(b.ins_rec_date) || "Pending"
          }</td>`
      )
      .join("");
    template = template.replace("{{INSTALLMENT_REC_DATES}}", recDates);

    const billNos = admissionBills
      .map(
        (b) => `<td class="bottom-middle">${b.bill_number || "Pending"}</td>`
      )
      .join("");
    template = template.replace("{{INSTALLMENT_BILL_NOS}}", billNos);

    return template;
  }

  return (
    <div className="w-full mx-auto p-6 space-y-8">
      {/* Admission Fees Acknowledgement */}
      <div>
        <h2 className="text-3xl font-bold text-[#032768] mb-4">
          Admission Fees
        </h2>
        <Collapse
          accordion
          className="bg-transparent border-0"
          expandIconPosition="end"
        >
          {admissionBills.map((bill, idx) => {
            const paidSoFar = admissionBills
              .slice(0, idx + 1)
              .reduce((sum, b) => sum + Number(b.ins_amount || 0), 0);
            const dueAfterThis = totalAdmissionFees - paidSoFar;

            return (
              <Panel
                key={bill.id}
                header={
                  <div className="font-semibold text-lg text-[#032768]">
                    Admission Installment {bill.ins_num} — ₹{bill.ins_amount}
                  </div>
                }
                className="bg-white rounded-xl shadow-md border border-gray-200 text-base"
              >
                <div
                  id={`print-invoice-${bill.id}`}
                  dangerouslySetInnerHTML={{
                    __html: renderAdmissionBillTemplate(
                      bill,
                      student,
                      dueAfterThis
                    ),
                  }}
                />
                <div className="mt-4 text-right">
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#053D7A",
                      borderColor: "#053D7A",
                    }}
                    onClick={() => {
                      const invoiceEl = document.getElementById(
                        `print-invoice-${bill.id}`
                      );
                      if (!invoiceEl) return;

                      const printWindow = window.open("", "_blank");
                      printWindow.document.write(`
                        <html>
                          <head>
                            <title>Invoice - ${
                              bill.bill_number || "Admission"
                            }</title>
                            <style>
                              @media print {
                                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                              }
                            </style>
                          </head>
                          <body>
                            ${invoiceEl.innerHTML}
                          </body>
                        </html>
                      `);
                      printWindow.document.close();
                      printWindow.focus();
                      printWindow.print();
                      printWindow.close();
                    }}
                  >
                    Print Invoice
                  </Button>
                </div>
              </Panel>
            );
          })}
        </Collapse>
      </div>

      {/* Admission Fees Breakup Summary */}
      <div>
        <h2 className="text-3xl font-bold text-[#032768] mb-4">
          Admission Fees Breakup Summary
        </h2>

        <Collapse
          accordion
          className="bg-transparent border-0"
          expandIconPosition="end"
        >
          <Panel
            key="admission-breakup"
            header={
              <div className="font-semibold text-lg text-[#032768]">
                Full Admission Fees Summary
              </div>
            }
            className="bg-white rounded-xl shadow-md border border-gray-200 text-base"
          >
            <div
              id="print-admission-breakup"
              dangerouslySetInnerHTML={{
                __html: renderAdmissionBreakupTemplate(student, admissionBills),
              }}
            />
            <div className="mt-4 text-right">
              <Button
                type="primary"
                style={{ backgroundColor: "#053D7A", borderColor: "#053D7A" }}
                onClick={() => {
                  const invoiceEl = document.getElementById(
                    "print-admission-breakup"
                  );
                  if (!invoiceEl) return;

                  const printWindow = window.open("", "_blank");
                  printWindow.document.write(`
                  <html>
                    <head>
                      <title>Admission Fees Breakup</title>
                      <style>
                        @media print {
                          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                        }
                      </style>
                    </head>
                    <body>
                      ${invoiceEl.innerHTML}
                    </body>
                  </html>
                `);
                  printWindow.document.close();
                  printWindow.focus();
                  printWindow.print();
                  printWindow.close();
                }}
              >
                Print Summary
              </Button>
            </div>
          </Panel>
        </Collapse>
      </div>

      {/* Semester Payment Schedule */}
      <div>
        <h2 className="text-3xl font-bold text-[#032768] mb-4">
          Semester Payment Schedule
        </h2>
        <Collapse
          accordion
          className="bg-transparent border-0"
          expandIconPosition="end"
        >
          {semesterBills.map((sp) => (
            <Panel
              key={sp.id}
              header={
                <div className="font-semibold text-lg text-[#032768]">
                  Semester {sp.sem_num} — ₹{sp.sem_amount}
                </div>
              }
              className="bg-white rounded-xl shadow-md border border-gray-200 text-base"
            >
              <div
                id={`print-semester-${sp.id}`}
                dangerouslySetInnerHTML={{
                  __html: renderSemesterBillTemplate(sp, student),
                }}
              />
              <div className="mt-4 text-right">
                <Button
                  type="primary"
                  style={{ backgroundColor: "#053D7A", borderColor: "#053D7A" }}
                  onClick={() => {
                    const invoiceEl = document.getElementById(
                      `print-semester-${sp.id}`
                    );
                    if (!invoiceEl) return;

                    const printWindow = window.open("");
                    printWindow.document.write(`
                <html>
                  <head>
                    <title>Invoice - Semester ${sp.sem_num}</title>
                    <style>
                      @media print {
                        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                      }
                    </style>
                  </head>
                  <body>
                    ${invoiceEl.innerHTML}
                  </body>
                </html>
              `);
                    printWindow.document.close();
                    printWindow.focus();
                    printWindow.print();
                    printWindow.close();
                  }}
                >
                  Print Invoice
                </Button>
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
}
