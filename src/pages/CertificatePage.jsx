import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * CertificatePage
 * - expects sidebar to be already present in layout.
 * - shows a list of certificate cards in center area, opens modal with HTML preview,
 *   and downloads PDF of the preview using html2canvas + jsPDF.
 *
 * Usage: drop this component into your page where the sidebar exists.
 */

const college = JSON.parse(localStorage.getItem("student"))?.colleges;

console.log(college);

const sampleDocs = [
  {
    id: "cert-2",
    title: "Experience Letter (multi-page)",
    pages: [
      `<div class="certificate-page" 
     style="position: relative; box-sizing: border-box; border:1px solid red; font-family: Georgia, serif; background: white; width: 794px; height: 1123px;">

  <!-- Background image -->
  <img src="/id_cards/template1.jpg" 
       style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;" />

  <!-- Centered title -->
  <div style="position: absolute; top: 0px; left: 0; text-align: center; width:100%">
  <h4 style=" text-align:right; margin-top:150px; width: 610px; margin-inline:auto"> <strong> Date – 10/12/2024</strong></h4>
    <h3 style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px; margin-top:40px;  text-decoration: underline;">
      ADMISSION CONFIRMATION LETTER
    </h3>
    <p style="margin-top:30px; text-align:justify;  width: 610px; margin-inline:auto">This is to certify that <strong> Miss. Suparna Mondal</strong>, daughter of <strong> Mr. Ramsankar Mondal</strong>, has been admitted to the <strong> B.Sc Nursing Course</strong> at our institution for the academic session <strong> 2024-2028</strong>. Her admission has been granted under a merit seat as per the guidelines and permission of the <strong> Department of Health and Family Welfare, Government of West Bengal</strong>, and the norms set by the <strong> West Bengal Nursing Council</strong> and the <strong>Indian Nursing Council</strong></p>

    <p style="text-align: start; margin-top: 10px;  width: 610px; margin-inline:auto"><strong>Course Fee Structure:</strong></p>

    <p style="text-align: start; margin-top: 10px;  width: 610px; margin-inline:auto" >The total fee for the entire four-years <strong> B.Sc Nursing Course </strong> program is <strong>Rs. 6,00,000/- (Rupees Six Lakhs Only),</strong> payable as per the following schedule:</p>



    <div style="    width: 730px;
    margin: 30px 5px 0 auto; ">
    

    <!-- Table -->
     <table  role="table" style="width:100%;border-collapse:collapse;table-layout:fixed;border:3px solid #111;background:rgba(255,255,255,0.95);">
    <thead>
      <tr>
        <th colspan="10" style="border: 1px solid #111; vertical-align: middle; padding-bottom:8px; padding-top:0; text-align: center; font-size: 18px; font-weight: 800;">
          FEES STRUCTURE<br>Academic Session - 2024-2028
        </th>
      </tr>
      <tr>
        <th style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px; vertical-align:bottom;">Particulars</th>
        <th style="border:1px solid #111;padding:0px 2px 8px;font-size:11px;text-align:center; font-weight:100; vertical-align:bottom;">Admission</th>
        <th style="border:1px solid #111;padding:0px 2px 8px;font-size:11px;text-align:center; font-weight:100; vertical-align:bottom;">1st<span style="display:block">Semester</span></th>
        <th style="border:1px solid #111;padding:0px 2px 8px;font-size:11px;text-align:center; font-weight:100; vertical-align:bottom;">2nd<span style="display:block">Semester</span></th>
        <th style="border:1px solid #111;padding:0px 2px 8px;font-size:11px;text-align:center; font-weight:100; vertical-align:bottom;">3rd<span style="display:block">Semester</span></th>
        <th style="border:1px solid #111;padding:0px 2px 8px;font-size:11px;text-align:center; font-weight:100; vertical-align:bottom;">4th<span style="display:block">Semester</span></th>
        <th style="border:1px solid #111;padding:0px 2px 8px;font-size:11px;text-align:center; font-weight:100; vertical-align:bottom;">5th<span style="display:block">Semester</span></th>
        <th style="border:1px solid #111;padding:0px 2px 8px;font-size:11px;text-align:center; font-weight:100; vertical-align:bottom;">6th<span style="display:block">Semester</span></th>
        <th style="border:1px solid #111;padding:0px 2px 8px;font-size:11px;text-align:center; font-weight:100; vertical-align:bottom;">7th<span style="display:block">Semester</span></th>
        <th style="border:1px solid #111;padding:0px 2px 8px;font-size:11px;text-align:center; font-weight:100; vertical-align:bottom;">8th<span style="display:block">Semester</span></th>
      </tr>
    </thead>

      <tbody>
        <!-- Admission Fees row -->
        <tr>
          <td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:700;text-align:left;font-size:12px">Admission Fee</td>
          <td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:100;text-align:left;font-size:12px">ddddd</td>
          <td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:100;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:100;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:100;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:100;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:100;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:100;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:100;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:100;text-align:left;font-size:12px"></td>
        </tr>

        <!-- Tuition Fees row -->
        <tr>
          <td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:700;text-align:left;font-size:12px">Tuition Fees</td>
          <td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px  ;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
        </tr>

        <!-- Equipment & Computer -->
        <tr>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px">Equipment &amp; Computer</td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
        </tr>

        <!-- Book & Stationery -->
        <tr>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px">Book &amp; Stationery</td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
        </tr>

        <!-- Others Fees -->
        <tr>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px">Others Fees Payable to Institute</td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
        </tr>

        <!-- Hostel -->
        <tr>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px">Hostel</td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
        </tr>

        <!-- Total -->
        <tr>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px">Total</td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
          <td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td><td style="border:1px solid #111;padding:0px 5px 8px;width:120px; font-weight:700;text-align:left;font-size:12px"></td>
        </tr>

        <!-- Grand total row spanning columns -->
        <tr>
          <td style="border:1px solid #111;padding:0px 5px 8px ;font-weight:700; font-size: 11px; text-align:left"">GRAND TOTAL</td>
          <td colspan="9" style="border:1px solid #111;padding:0px 5px 8px;text-align:center;font-weight:700;></td>
        </tr>
      </tbody>
    </table>

    </div>
   
  </div>

   

</div>
`,
      `<div class="certificate-page" 
     style="position: relative; box-sizing: border-box; border:1px solid red; font-family: Georgia, serif; background: white; width: 794px; height: 1123px;">

  <!-- Background image -->
  <img src="/id_cards/template1.jpg" 
       style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;" />

  <!-- Centered title -->
  <div style="position: absolute; top: 0px; left: 0; text-align: center; width:100%">
 <div style="text-align:left; margin-top:150px; width: 610px; margin-inline:auto">
 <div style="font-family:'Times New Roman', serif; font-size:13pt; line-height:1.5;">

  <h3 style="margin: 220px 0 8px 0;
    font-size: 14pt;
    font-weight: 700;">
    Additional Charges:
  </h3>

  <ul style=" margin: 0 0 16px 20px;
    padding: 0 0 0 20px;
   ">
    <li style="margin-bottom:6px;  list-style: disc;">
      <strong>Dress/Uniform Charges:</strong>
      Not included in the above fee.
    </li>
    <li style="margin-bottom:6px;  list-style: disc;">
      <strong>Books and Study Materials:</strong>
      To be purchased separately.
    </li>
    <li style="margin-bottom:6px;  list-style: disc;">
      <strong>Examination Fees:</strong>
      Excluded and to be paid as applicable.
    </li>
  </ul>

  <p style="margin:80px 0 12px 0;">
    <strong>Eligibility:</strong>
    10+2 Science [P-C-B/P-C-M], aggregate 45% (English Mandatory),
    NEET/JENPAS Entrance Examination Rank Card (Mandatory).
  </p>

  <p style="margin:20px 0 12px 0;">
    <strong>Seat booking amount:</strong>
    Rs. 20,000/- (non-refundable). This amount will be adjusted
    against the admission fee.
  </p>

  <p style="margin:60px 0 12px 0; font-weight:600; font-size:22px;">
    <strong>Regards,</strong>
  </p>

</div>
 </div>
   


  </div>

   

</div>
`,
      `<div class="certificate-page" 
     style="position: relative; box-sizing: border-box; border:1px solid red; font-family: Georgia, serif; background: white; width: 794px; height: 1123px;">

  <!-- Background image -->
  <img src="/id_cards/template1.jpg" 
       style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;" />

  <!-- Centered title -->
  <div style="position: absolute; top: 0px; left: 0; text-align: center; width:100%">
 
<div style=" font-size:11pt; line-height:1.5; margin-top:150px; width: 610px; margin-inline:auto">

  <!-- DATE -->
  <p style="text-align:right; margin:0 0 20px 0; font-weight:600;">
   Date: 10-12-2024
  </p>

  <!-- ADDRESS -->
  <p style="margin:0 0 16px 0; text-align:left; font-weight:600;">
    To,<br>
    The Branch Managers,<br>
    All Branches of All Banks
  </p>

  <!-- SUBJECT -->
  <p style="margin:20px 0 16px 0; text-align:right; text-decoration:underline; font-weight:600;">
    <strong>Subject: Placement Record and Institutional Updates</strong>
  </p>

  <!-- BODY TEXT -->
  <p style="margin:0 0 16px 0;text-align:left; ">
    Respected Sir/Madam,
  </p>

  <p style="margin:0 0 16px 0; text-align:left; ">
    With due respect, I would like to inform you that <strong>${college?.college_name}</strong> 
    has obtained <strong>NOC, Recognition, Affiliation, and Subaffiliation</strong> from the <strong>Government of 
    West Bengal, West Bengal Nursing Council (WBNC), West Bengal University of Health Sciences (WBUHS), 
    and Indian Nursing Council (INC)</strong> to conduct the <strong>GNM and B.Sc. Nursing courses</strong> from the academic 
    session 2021–22 onwards.
  </p>

  <p style="margin:0 0 16px 0; text-align:left; ">
    Since this is the third academic year of our institution, we currently do not have a full set of 
    placement records to share. However, we are pleased to inform you that last year we initiated 
    collaborations with several <strong>reputed companies and hospitals</strong> that have expressed their interest 
    in conducting <strong>on-campus recruitment drives</strong> at our institution.
  </p>

  <!-- HOSPITAL LIST -->
  <p style="margin:0 0 10px 0; text-align:left; ">
    Furthermore, we take pride in the fact that we own and operate two well-known hospitals:
  </p>

  <ol style="    margin: 24px 0 20px 20px;
    padding: 0 0px 0 50px;
    text-align: left;">
    <li style="list-style:decimal">
      <strong>M.R. Hospital, Bira</strong> – A 450-bedded super-specialty hospital.
    </li>
    <li style="list-style:decimal">
      <strong>Mother Teresa Multispecialty Hospital, Basirhat</strong> – A 250-bedded multi-specialty 
      hospital offering advanced care.
    </li>
  </ol>

  <p style="margin:0 0 20px 0; text-align:left; ">
    These hospitals provide practical training and internship opportunities to our students, ensuring 
    they are well-prepared for their professional careers. With this infrastructure and industry 
    connections, we are confident that we will <strong> successfully place our students</strong> in reputable healthcare 
    organizations upon completion of their courses.
  </p>

  <p style="margin:0 0 20px 0; text-align:left; ">
    We look forward to your support and cooperation. Should you require any additional information, 
    please feel free to contact us.
  </p>

  <p style="margin:0 0 20px 0; text-align:left; ">
    Thanking you in anticipation.
  </p>

  <!-- REGARDS -->
  <p style="margin:0; text-align:left; font-weight:600; font-size:22px;">
    <strong>Regards,</strong>
  </p>

</div>

  </div>

   

</div>
`,
    ],
    thumbnail: null,
  },
];
function waitForImagesToLoad(container) {
  const imgs = Array.from(container.querySelectorAll("img"));
  if (!imgs.length) return Promise.resolve();
  return Promise.all(
    imgs.map((img) => {
      return new Promise((res) => {
        if (img.complete) return res();
        img.onload = () => res();
        img.onerror = () => res(); // resolve even if error (we'll still try)
      });
    })
  );
}
export default function CertificatePage() {
  const [docs] = useState(sampleDocs);
  const [selected, setSelected] = useState(null); // {id, title, pages}
  const [isOpen, setIsOpen] = useState(false);
  const previewRef = useRef(null);

  const openModal = (doc) => {
    setSelected(doc);
    setIsOpen(true);
    // scroll to top of modal if desired
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelected(null);
  };

  // download as PDF using html2canvas + jspdf
  const downloadPDF = async () => {
    if (!selected) return;
    try {
      const pdf = new jsPDF({
        unit: "px",
        format: "a4",
        orientation: "portrait",
      });

      const A4_PX_WIDTH = 794;
      const A4_PX_HEIGHT = 1123;

      for (let i = 0; i < selected.pages.length; i++) {
        const wrapper = document.createElement("div");
        wrapper.style.position = "fixed";
        wrapper.style.left = "-10000px";
        wrapper.style.top = "0";
        wrapper.style.zIndex = "-10000";
        wrapper.style.width = `${A4_PX_WIDTH}px`;
        wrapper.style.height = `${A4_PX_HEIGHT}px`;
        wrapper.style.boxSizing = "border-box";
        wrapper.style.background = "white";
        wrapper.style.overflow = "hidden"; // Prevent overflow

        // Create a clean copy of the HTML with proper dimensions
        let pageHTML = selected.pages[i];

        // Ensure the root element has proper dimensions
        pageHTML = pageHTML.replace(
          'style="position: relative; box-sizing: border-box; border:1px solid red; font-family: Georgia, serif; background: white; width: 794px; height: 1123px;"',
          'style="position: relative; box-sizing: border-box; font-family: Georgia, serif; background: white; width: 100%; height: 100%; overflow: hidden;"'
        );

        // Fix table width issues
        pageHTML = pageHTML.replace(
          'style="width: 740px; padding-inline: 6px; margin-left: auto; margin-top:40px"',
          'style="width: 720px; padding-inline: 6px; margin: 40px auto 0 auto;"'
        );

        wrapper.innerHTML = pageHTML;
        document.body.appendChild(wrapper);

        // Wait a bit for layout to stabilize
        await new Promise((resolve) => setTimeout(resolve, 100));
        await waitForImagesToLoad(wrapper);

        const canvas = await html2canvas(wrapper, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false, // Disable logging for better performance
          removeContainer: true,
          width: A4_PX_WIDTH,
          height: A4_PX_HEIGHT,
          windowWidth: A4_PX_WIDTH,
          windowHeight: A4_PX_HEIGHT,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        if (i > 0) pdf.addPage();

        // Add image to fill the entire PDF page
        pdf.addImage(
          imgData,
          "PNG",
          0,
          0,
          pdfWidth,
          pdfHeight,
          undefined,
          "FAST"
        );

        document.body.removeChild(wrapper);
      }

      const filename = `${selected.title.replace(/\s+/g, "_")}_${
        selected.id
      }.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("PDF generation failed. Check console for details.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Documents</h2>

      <div style={styles.grid}>
        {docs.map((doc) => (
          <div key={doc.id} style={styles.card}>
            <div style={styles.thumb}>
              {/* If thumbnail exists show it else show simple icon */}
              {doc.thumbnail ? (
                <img
                  src={doc.thumbnail}
                  alt={doc.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={styles.thumbPlaceholder}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="#aaa"
                      strokeWidth="1.2"
                    ></rect>
                    <path
                      d="M7 9h10M7 13h6"
                      stroke="#aaa"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </div>
              )}
            </div>

            <div style={styles.cardBody}>
              <div style={{ fontWeight: 600 }}>{doc.title}</div>
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button style={styles.openBtn} onClick={() => openModal(doc)}>
                  Open
                </button>
                <button
                  style={styles.smallBtn}
                  onClick={() => {
                    setSelected(doc);
                    downloadPDF();
                  }}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && selected && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                {selected.title}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={styles.smallBtn} onClick={downloadPDF}>
                  Download as PDF
                </button>
                <button style={styles.closeBtn} onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>

            <div style={styles.modalBody} ref={previewRef}>
              {/* Render each page stacked vertically for user preview */}
              {selected.pages.map((html, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: 20,
                    display: "flex",
                    justifyContent: "center",
                  }}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- styles ---------- */
const styles = {
  container: {
    padding: 24,
    minHeight: "80vh",
    background: "#fafafa",
  },
  heading: {
    margin: 0,
    marginBottom: 16,
    fontFamily: "Inter, sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 16,
  },
  card: {
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  thumb: {
    height: 140,
    background: "#f4f4f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbPlaceholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    padding: 12,
  },
  openBtn: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #2b6cb0",
    background: "#2b6cb0",
    color: "white",
    cursor: "pointer",
  },
  smallBtn: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    background: "white",
    cursor: "pointer",
  },
  closeBtn: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    width: "85%",
    maxWidth: 980,
    maxHeight: "90vh",
    background: "white",
    borderRadius: 8,
    overflow: "auto",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottom: "1px solid #eee",
    position: "sticky",
    zIndex: 99,
    top: 0,
    background: "white",
  },
  modalBody: {
    padding: 16,
  },
};
