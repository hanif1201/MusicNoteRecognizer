import * as Tesseract from "tesseract.js";
import * as FileSystem from "expo-file-system";
import { PDFDocument, rgb } from "pdf-lib";

export const recognizeNotesFromPDF = async (pdfUri) => {
  const pdfData = await FileSystem.readAsStringAsync(pdfUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const {
    data: { text },
  } = await Tesseract.recognize(pdfData, "eng", {
    logger: (info) => console.log(info),
  });

  // Process the recognized text to extract notes
  const notes = extractNotesFromText(text);
  return notes;
};

const extractNotesFromText = (text) => {
  // Implement your logic to extract notes from the recognized text
  return text.split("\n").filter((note) => note.trim() !== "");
};

export const annotatePDF = async (pdfUri, notes) => {
  const existingPdfBytes = await FileSystem.readAsArrayBuffer(pdfUri);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();

  notes.forEach((note, index) => {
    const page = pages[index % pages.length];
    page.drawText(note, {
      x: 50,
      y: 700 - index * 20,
      size: 12,
      color: rgb(0, 0, 0),
    });
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
