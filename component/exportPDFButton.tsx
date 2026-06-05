"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { logoBase64 } from "@/lib/data/logoBase64";

type Props = {
  dataTransaksi: any[];
  totalPendapatan: number;
  prediksiPendapatan: number;
  kategoriFavorit: any;
  formatRupiah: (num: number) => string;
};

const ExportPDFButton = ({
  dataTransaksi,
  totalPendapatan,
  prediksiPendapatan,
  kategoriFavorit,
  formatRupiah,
}: Props) => {

  const handleExportPDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFillColor(42, 74, 161);
    doc.rect(0, 0, pageWidth, 32, "F");
    doc.addImage(logoBase64, "PNG", 15, 6, 20, 20);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("STUDIO FOTO IBUU", pageWidth / 2, 13, {
      align: "center",
    });

    doc.setFontSize(11);
    doc.text("LAPORAN PENDAPATAN BULANAN", pageWidth / 2, 22, {
      align: "center",
    });

    // Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID")}`, 14, 42);
    doc.text("Admin: Sistem", 14, 48);
    doc.text("Periode: Mei 2026", 14, 54);

    // Ringkasan
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(14, 62, 182, 34, 3, 3, "F");

    doc.setFontSize(12);
    doc.text("Ringkasan Pendapatan", 20, 72);

    doc.setFontSize(10);
    doc.text(`Total Transaksi: ${dataTransaksi.length}`, 20, 82);
    doc.text(`Total Pendapatan: ${formatRupiah(totalPendapatan)}`, 105, 82);

    doc.text(`Prediksi Pendapatan: ${formatRupiah(prediksiPendapatan)}`, 20, 90);
    doc.text(`Paket Terlaris: ${kategoriFavorit?.kategori || "-"}`, 105, 90);

    // Tabel
    autoTable(doc, {
      startY: 106,
      head: [["No", "Nama", "Paket", "Tanggal", "Metode Bayar", "Total"]],
      body: dataTransaksi.map((item, index) => [
        index + 1,
        item.nama || "-",
        item.paket || "-",
        item.tanggal || "-",
        item.metodeBayar || item.pembayaran || "-",
        formatRupiah(item.harga || 0),
      ]),
      theme: "grid",
      headStyles: {
        fillColor: [42, 74, 161],
        textColor: [255, 255, 255],
        halign: "center",
      },
      bodyStyles: {
        fontSize: 9,
      },
      columnStyles: {
        0: { halign: "center", cellWidth: 12 },
        5: { halign: "right" },
      },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.text(`Total Pendapatan: ${formatRupiah(totalPendapatan)}`, 14, finalY);

    // Footer
    doc.setFont(undefined, "normal");
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text(
      "Laporan ini dibuat otomatis oleh Sistem Booking Studio Foto.",
      pageWidth / 2,
      287,
      { align: "center" }
    );

    doc.save("laporan-pendapatan.pdf");
  };

  return (
    <button
      onClick={handleExportPDF}
      className="bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      Export PDF
    </button>
  );
};

export default ExportPDFButton;