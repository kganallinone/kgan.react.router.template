import { useEffect, useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export default function DocxPreviewer() {
  const [docxUrl, setDocxUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateDocx = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/template/fpe-template.docx");
      const arrayBuffer = await response.arrayBuffer();

      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.setData({
        a1: "x",
        b1: "o",
        caseNumber: "Desma",
        screeningDate: "June 15, 2025",
        PhilHealthIdNumber: "Manila",
      });

      try {
        doc.render();
      } catch (error) {
        console.error("Template rendering failed:", error);
        setError("Failed to render the document template");
        return;
      }

      const blob = doc.getZip().generate({ type: "blob" });
      const url = URL.createObjectURL(blob);
      setDocxUrl(url);
    } catch (err) {
      console.error("Error generating DOCX:", err);
      setError("Failed to generate the document");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateDocx();

    // Clean up the object URL when component unmounts
    return () => {
      if (docxUrl) {
        URL.revokeObjectURL(docxUrl);
      }
    };
  }, []);

  return (
    <div className="p-4 max-w-full">
      <h2 className="mb-4 text-xl font-semibold">DOCX Native Preview</h2>

      {loading && <p>Generating DOCX file...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {docxUrl && (
        <>
          {/* Improved iframe implementation */}
          <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden">
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                docxUrl
              )}`}
              title="DOCX Preview"
              width="100%"
              height="100%"
              frameBorder="0"
            />
          </div>

          {/* Download option */}
          <div className="mt-4">
            <a
              href={docxUrl}
              download="filled-template.docx"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Download DOCX
            </a>
          </div>
        </>
      )}
    </div>
  );
}
