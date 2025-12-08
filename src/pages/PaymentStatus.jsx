import { useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import GlobalLoader from "../components/GlobalLoader";

function PaymentStatus() {
  const [activeTab, setActiveTab] = useState("installments");

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH STUDENT DETAILS FROM API
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

        setStudent(response.data.student);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, []);

  // LOADING UI
  if (loading) {
    return (
      <GlobalLoader />
    );
  }

  // ERROR UI
  if (error || !student) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="p-6 bg-white rounded-lg shadow-md text-red-600">
          {error || "Unable to load student payment data"}
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "installments", label: "Admissions Fees Installments" },
    { id: "breakup", label: "Admission Fees Breakup Summary" },
    { id: "semester", label: "Semester Payments" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4">

      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-100">
        <div className="flex items-start justify-between">


          <div className="flex-1 pr-6">
            <h2 className="text-3xl font-bold text-[#032768]">Payment Status</h2>
            <p className="text-gray-600 mt-2">
              View and manage your payment details
            </p>
          </div>


          <div className="w-px bg-gray-300 h-20 mx-4"></div>


          <div className="flex-1 pl-6 text-right">
            <h3 className="text-3xl font-bold text-[#032768]">Course Fees</h3>
            <p className="text-gray-600 text-2xl  mt-2">₹{student.course_fees}</p>
          </div>

        </div>
      </div>


      {/* Tabs */}
      <div className="flex space-x-1 bg-white p-2 rounded-lg shadow-sm border border-gray-100 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 rounded-md flex-1 text-center
              ${
                activeTab === tab.id
              ? "bg-[#032768] text-white shadow-md cursor-pointer"
              : "text-gray-600 hover:text-[#032768] hover:bg-gray-50 cursor-pointer"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {activeTab === "installments" && (
          <AdmissionsInstallments student={student} />
        )}
        {activeTab === "breakup" && <AdmissionsBreakUps student={student} />}
        {activeTab === "semester" && <SemesterPayments student={student} />}
      </div>
    </div>
  );
}

export default PaymentStatus;


function AdmissionsInstallments({ student }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedInstallment, setSelectedInstallment] = useState(null);

  const filteredBills =
    student?.admission_bills?.filter(
      (ins) => ins.bill_number && ins.bill_number.trim() !== ""
    ) || [];

  if (filteredBills.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">💳</div>
        <h3 className="text-xl text-[#032768] font-light mb-2">
          No Installments Found
        </h3>
        <p className="text-gray-600">
          There are no admission installments available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid gap-4">
        {filteredBills.map((ins, index) => (
          <div
            key={ins.id}
            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 bg-white hover:bg-gray-50"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    ins.status === "Done" ? "bg-green-500" : "bg-amber-500"
                  }`}
                ></div>
                <div className="text-left">
                  <h4 className="font-medium text-[#032768]">
                    Installment {ins.ins_num}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Bill No: {ins.bill_number}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ins.status === "Done"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {ins.status}
                </span>
                <span className="text-lg font-semibold text-[#032768]">
                  ₹{ins.amount}
                </span>
                <span className="text-gray-400">
                  {openIndex === index ? "▲" : "▼"}
                </span>
              </div>
            </button>

            {/* Expanded Content */}
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p><span className="text-gray-600">Amount in Words:</span></p>
                  <p className="text-[#032768]">{ins.amount_word}</p>

                  <p><span className="text-gray-600">Payment Type:</span></p>
                  <p className="text-[#032768]">{ins.pay_type}</p>

                  <p><span className="text-gray-600">Due Date:</span></p>
                  <p className="text-[#032768]">
                    {ins.ins_due_date
                      ? new Date(ins.ins_due_date).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <p><span className="text-gray-600">Received Date:</span></p>
                  <p className="text-[#032768]">
                    {ins.ins_rec_date
                      ? new Date(ins.ins_rec_date).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedInstallment(ins)}
                  className="mt-4 px-4 py-2 bg-[#032768] text-white rounded-md cursor-pointer"
                >
                  View Full Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL — UI UNCHANGED */}
      {selectedInstallment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden">
            <div className="bg-[#032768] text-white p-6 flex justify-between">
              <h2 className="text-xl font-light">
                Installment {selectedInstallment.ins_num} Details
              </h2>
              <button
                onClick={() => setSelectedInstallment(null)}
                className="text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Bill Number", value: selectedInstallment.bill_number },
                  { label: "Amount", value: `₹${selectedInstallment.amount}` },
                  { label: "Amount in Words", value: selectedInstallment.amount_word },
                  { label: "Payment Type", value: selectedInstallment.pay_type },
                  {
                    label: "Due Date",
                    value: selectedInstallment.ins_due_date
                      ? new Date(selectedInstallment.ins_due_date).toLocaleDateString()
                      : "N/A",
                  },
                  {
                    label: "Received Date",
                    value: selectedInstallment.ins_rec_date
                      ? new Date(selectedInstallment.ins_rec_date).toLocaleDateString()
                      : "N/A",
                  },
                  { label: "Status", value: selectedInstallment.status },
                  { label: "Transaction ID", value: selectedInstallment.tran_id || "N/A" },
                  { label: "Bank Name", value: selectedInstallment.bank_name || "N/A" },
                  {
                    label: "Created At",
                    value: new Date(selectedInstallment.created_at).toLocaleString(),
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <p className="text-[#032768]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* ============================================================
    BREAKUP TAB
============================================================ */
function AdmissionsBreakUps({ student }) {
  const bills = student?.admission_bills || [];
  const validBills = bills.filter(
    (d) => Number(d.ins_amount ?? 0) > 0
  );
  if (!validBills.length) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">📊</div>
        <h3 className="text-xl text-[#032768] font-light mb-2">
          No Data Available
        </h3>
        <p className="text-gray-600">
          Admission fee breakdown is not available.
        </p>
      </div>
    );
  }



  const total = validBills.reduce(
    (sum, d) => sum + Number(d.ins_amount ?? 0),
    0
  );

  const paid = validBills
    .filter((d) => d.status === "Done")
    .reduce((sum, d) => sum + Number(d.amount ?? 0), 0);

  const pending = total - paid;

  const completedCount = validBills.filter(
    (d) => d.status === "Done"
  ).length;

  const pendingCount = validBills.filter(
    (d) => d.status !== "Done"
  ).length;

  const stats = [
    { label: "Total Fees", value: `₹${total}`, icon: "💰" },
    { label: "Paid Amount", value: `₹${paid}`, icon: "✅" },
    { label: "Pending Amount", value: `₹${pending}`, icon: "⏳" },
    { label: "Total Installments", value: validBills.length, icon: "📋" },
    { label: "Completed", value: completedCount, icon: "✔️" },
    { label: "Pending", value: pendingCount, icon: "🔄" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-light text-[#032768]">{stat.value}</div>
            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#032768]">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#032768]">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#032768]">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#032768]">
                Bill No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#032768]">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#032768]">
                Paid Date
              </th>
            </tr>
          </thead>




          <tbody className="bg-white divide-y divide-gray-200">
            {validBills.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{d.ins_num}</td>
                <td className="px-6 py-4">₹{d.amount || d.ins_amount || 0}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      d.status === "Done"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {d.status === "Done" ? "✅ Done" : "⏳ Pending"}
                  </span>
                </td>
                <td className="px-6 py-4">{d.bill_number || "—"}</td>
                <td className="px-6 py-4">
                  {d.ins_due_date
                    ? new Date(d.ins_due_date).toLocaleDateString()
                    : "—"}
                </td>
                <td className="px-6 py-4">
                  {d.ins_rec_date
                    ? new Date(d.ins_rec_date).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


/* ============================================================
    SEMESTER PAYMENTS TAB
============================================================ */
function SemesterPayments({ student }) {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [openModal, setOpenModal] = useState(null);

  const filteredData =
    student?.semester_bills?.filter((sem) => sem.sem_amount !== null) || [];

  if (filteredData.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">🎓</div>
        <h3 className="text-xl text-[#032768] font-light mb-2">
          No Semester Payments
        </h3>
        <p className="text-gray-600">
          No semester payments available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        {filteredData.map((sem) => (
          <div
            key={sem.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md"
          >
            <button
              className="w-full p-6 bg-white hover:bg-gray-50 flex justify-between"
              onClick={() =>
                setOpenAccordion(openAccordion === sem.id ? null : sem.id)
              }
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#032768]/10 rounded-full flex justify-center items-center">
                  <span className="text-[#032768] font-semibold">
                    {sem.sem_num}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-[#032768]">
                    Semester {sem.sem_num}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Bill No: {sem.sem_bill_number || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-[#032768]">
                  {sem.sem_amount || "N/A"}
                </span>
                <span className="text-gray-400">
                  {openAccordion === sem.id ? "▲" : "▼"}
                </span>
              </div>
            </button>

            {openAccordion === sem.id && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Amount in Words:</span>
                    <p className="text-[#032768]">{sem.sem_amount_word || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Due Date:</span>
                    <p className="text-[#032768]">{sem.sem_due_date || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <p className="text-[#032768]">{sem.status || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Payment Type:</span>
                    <p className="text-[#032768]">{sem.pay_type || "N/A"}</p>
                  </div>
                </div>

                <button
                  className="mt-4 px-4 py-2 bg-[#032768] text-white rounded-md cursor-pointer"
                  onClick={() => setOpenModal(sem)}
                >
                  View Complete Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="bg-[#032768] text-white p-6 flex justify-between">
              <h2 className="text-xl font-light">
                Semester {openModal.sem_num} Complete Details
              </h2>
              <button
                className="text-white text-2xl"
                onClick={() => setOpenModal(null)}
              >
                ×
              </button>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "ID", value: openModal.id },
                  { label: "Form ID", value: openModal.form_id },
                  {
                    label: "Bill Number",
                    value: openModal.sem_bill_number || "N/A",
                  },
                  { label: "Amount", value: openModal.sem_amount || "N/A" },
                  {
                    label: "Amount in Words",
                    value: openModal.sem_amount_word || "N/A",
                  },
                  { label: "Payment Type", value: openModal.pay_type || "N/A" },
                  { label: "Transaction ID", value: openModal.tran_id || "N/A" },
                  { label: "Bank Name", value: openModal.bank_name || "N/A" },
                  { label: "Amount 1", value: openModal.sem_amount1 || "N/A" },
                  {
                    label: "Amount Word 1",
                    value: openModal.sem_amount_word1 || "N/A",
                  },
                  {
                    label: "Payment Type 1",
                    value: openModal.pay_type1 || "N/A",
                  },
                  {
                    label: "Transaction ID 1",
                    value: openModal.tran_id1 || "N/A",
                  },
                  {
                    label: "Bank Name 1",
                    value: openModal.bank_name1 || "N/A",
                  },
                  { label: "Due Date", value: openModal.sem_due_date || "N/A" },
                  {
                    label: "Received Date",
                    value: openModal.sem_rec_date || "N/A",
                  },
                  { label: "Status", value: openModal.status || "N/A" },
                  { label: "Created By", value: openModal.created_by },
                  { label: "Updated By", value: openModal.updated_by },
                  { label: "Created At", value: openModal.created_at },
                  { label: "Updated At", value: openModal.updated_at },
                  { label: "Deleted At", value: openModal.deleted_at || "N/A" },
                ].map((item, index) => (
                  <div key={index}>
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <p className="text-[#032768]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
