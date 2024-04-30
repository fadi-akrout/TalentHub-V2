import jsPDF from 'jspdf';
import axios from 'axios';

const generatePDFOffers = async (offerId) => {
  const doc = new jsPDF();
  let pageIndex = 1;
let title="";

    try {
      const response = await axios.get(`http://localhost:3500/offers/getoffer/${offerId}`);
      const offer = response.data;

      if (pageIndex > 1) {
        doc.addPage(); // Add a new page for each offer except the first
      }

      doc.setFontSize(16);
      doc.text(`Title: ${offer.Title}`, 14, 20); // Assuming each offer has a Title property

      doc.setFontSize(10);

      doc.text(`Experience Required: ${offer.Experience_required}`, 14, 30);
      doc.text(`Salary: ${offer.Salary}`, 14, 40);
      doc.text(`Speciality: ${offer.Speciality}`, 14, 50);
      doc.text(`Job Type: ${offer.JobType}`, 14, 60);
      doc.text(`Job City: ${offer.JobCity}`, 14, 70);

      // Optionally add more details or format differently

      pageIndex++;
      title=`${offer.Title}`
    } catch (error) {
      console.error(`Error fetching offer ${offerId}: ${error}`);
    }
  

  doc.save(`${title}.pdf`);
};

export default generatePDFOffers;