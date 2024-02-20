import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const createPrescription = (req, res, next) => {
  // get prescription infos

  const prescriptionData = req.body;

  // create new prescriptions
  const doc = new PDFDocument({
    size: "A4",
    layout: "portrait",
    font: "Helvetica",
  });

  doc
    .font("Helvetica-Bold")
    .fillColor("#ADD8E6")
    .fontSize(16)
    .text(`Dr. ${prescriptionData.docName}`);
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .text(`${prescriptionData.profession}`);

  const professionYPosition = doc.y;
  doc
    .lineWidth(3)
    .fillOpacity(0.8)
    .fillAndStroke("#ADD8E6", "#ADD8E6")
    .moveTo(70, professionYPosition)
    .lineTo(260, professionYPosition)
    .stroke();

  doc.moveDown(0.5);

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(`${prescriptionData.docAddress}`);
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(`${prescriptionData.docCityAndZipCode}`);
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(`Tél du cabinet: ${prescriptionData.docPhone}`);

  doc.moveDown(5);

  doc
    .font("Helvetica")
    .fillColor("black")
    .text(
      `${prescriptionData.docCityAndZipCode}, le ${prescriptionData.generationDate}`,
      { align: "right" }
    );

  doc.moveDown(5);

  doc.text(
    `${prescriptionData.patientGender} ${prescriptionData.patientSName} ${prescriptionData.patientFName}`,
    { align: "left" }
  );

  doc.text(
    `${prescriptionData.patientAge}ans, ${prescriptionData.patientWeight}kg`
  );

  doc.moveDown(3);

  prescriptionData.prescriptions.forEach((prescription) => {
    doc.fontSize(12).text(`${prescription.medication}, ${prescription.dosage}`);
    doc.fontSize(12).text(`${prescription.instructions}`);
    doc.moveDown(2);
  });

  // generate unique name for prescription

  const timestamp = Date.now();
  const uniqueId = Math.random().toString(36);
  const fileName = `prescription${timestamp}_${uniqueId}.pdf`;

  // create path for the new created prescription

  const folderPath = path.join(
    new URL(".", import.meta.url).pathname,
    "../prescriptions"
  );
  const filePath = path.join(folderPath, fileName);

  // if prescriptions dir does'nt exists create one

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  doc.end();

  // send doc in res

  writeStream.on("finish", function () {
    res.sendFile(
      path.join("prescriptions", fileName),
      { root: "." },
      function (err) {
        if (err) {
          console.error("Error sending PDF file :", err);
          return res.status(500).end();
        } else {
          console.log("PDF file sent successfully !");
        }
      }
    );
  });
};
