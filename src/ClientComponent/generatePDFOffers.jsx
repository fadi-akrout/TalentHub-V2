import jsPDF from 'jspdf';
import axios from 'axios';

const generatePDFOffers = async (offerId) => {
  const doc = new jsPDF();
  let pageIndex = 1;
  let title = "";

  try {
    const response = await axios.get(`http://localhost:3500/offers/getoffer/${offerId}`);
    const offer = response.data;

    if (pageIndex > 1) {
      doc.addPage(); // Add a new page for each offer except the first
    }

    doc.addImage(
      `${offer.profileImage}`,
      'JPEG',
      0,
      0,
      doc.internal.pageSize.getWidth(),
      doc.internal.pageSize.getHeight()
    );

    doc.setFontSize(20); // Increase the font size to 20
    doc.setTextColor('red'); // Set the text color to red
    doc.text(`Title: ${offer.Title}`, doc.internal.pageSize.getWidth() / 2, 20, {
      align: 'center',
    }); // Center the text

    doc.setFontSize(14); // Reset the font size to 14
    doc.setTextColor('black'); // Reset the text color to black

    doc.text(`Experience Required: ${offer.Experience_required}`, 14, 40);
    doc.text(`Salary: ${offer.Salary}`, 14, 50);
    doc.text(`Speciality: ${offer.Speciality}`, 14, 60);
    doc.text(`Job Type: ${offer.JobType}`, 14, 70);
    doc.text(`Job City: ${offer.JobCity}`, 14, 80);

    // Optionally add more details or format differently

    pageIndex++;
    title = `${offer.Title}`;
  } catch (error) {
    console.error(`Error fetching offer ${offerId}: ${error}`);
  }

  doc.save(`${title}.pdf`);
};

export default generatePDFOffers;