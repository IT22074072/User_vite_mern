import jsPDF from "jspdf";
import 'jspdf-autotable'
import DateFormatter from "../DateFormatter/DateFormatter";
import userHeader from "./UserHeader";

class PdfGenerator {
    generatePdf(data, titles, headers) {
        const name = titles
        const pdf_title = name
        const pdf_email = "mailus@s.com"
        const pdf_tel = "+94 76 333 2222"
        const pdf_address = "No 221/B, Kandy Road, Malabe";

        const doc = new jsPDF("portrait", "px", "a4", false)
        const today = new Date()
        const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        const title = `${pdf_title}`;
        doc.setFont("helvetica");
        doc.setTextColor("#000000");

        doc.setFontSize(24);
        doc.text(title, 30, 30);
        doc.setFontSize(12);
        doc.setTextColor("#999999");
        doc.text(`Generated on ${date}`, 30, 40);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor("#000000");
        doc.text("Contact Us", 30, 70);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor("#999999");
        doc.text(`Tel: ${pdf_tel}`, 30, 80);
        doc.text(`Email: ${pdf_email}`, 30, 90);
        doc.text(`Address: ${pdf_address}`, 30, 100);
        doc.line(30, 110, 600, 110);

        doc.setTextColor("#000000");

        doc.setFontSize(20);
        doc.text(`Total number of clients : ${data.length}`, 30, 135);

        // Add table with data
        doc.setTextColor("#999999");
        doc.setFontSize(12);
        doc.setTextColor("#000000");

        doc.autoTable({
            startY: 145,
            head: [userHeader],
            body: data.map((item) => [
                item._id,
                item.email,
                item.username,
                item.isAdmin,
                DateFormatter.formatDate(item.createdAt),
              ]),
            theme: "grid"
        })
        doc.save(`${name}.pdf`)
    }
}
export default PdfGenerator = new PdfGenerator()