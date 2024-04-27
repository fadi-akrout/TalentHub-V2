import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const generatePDFOffers = (offers) => {
    const doc = new jsPDF();

    // Check if there are offers to print
    if (!offers.length) {
        console.log("No offers to generate PDF");
        return;
    }

    offers.forEach((offer, index) => {
        if (index > 0) {
            doc.addPage(); // Add a new page for each offer except the first
        }

        doc.setFontSize(16);
        doc.text(`Title: ${offer.Title}`, 14, 20); // Assuming each offer has a Title property

        doc.setFontSize(10);

        doc.text(`Experience Required: ${offer.Experience_required}`, 14, 50);
        doc.text(`Domain: ${offer.Domain}`, 14, 60);
        doc.text(`Speciality: ${offer.Speciality}`, 14, 80);
        doc.text(`Job Type: ${offer.JobType}`, 14, 90);


        // Optionally add more details or format differently
    });

    doc.save('Job_Offers.pdf');
};

export default generatePDFOffers;
