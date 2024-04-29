import React from 'react';
import { jsPDF } from 'jspdf';

const TicketPDF = ({ event }) => {
  // This function will be called when the user clicks the download button
  const downloadPDF = () => {
    // Initialize jsPDF
    const doc = new jsPDF();

    // Add a title to the PDF
    doc.setFontSize(20);
    doc.text('Event Ticket', 105, 30, null, null, 'center');

    // Add event details to the PDF
    doc.setFontSize(12);
    doc.text(`Title: ${event.nom}`, 20, 50);
    doc.text(`Date: ${new Date(event.dateDebut).toLocaleDateString()}`, 20, 60);
    doc.text(`Location: ${event.adresse}`, 20, 70);

    // If you want to add an image, you can use doc.addImage here
    // Make sure to preload the image if it's coming from the web

    // Add a footer to the PDF
    doc.text('Thank you for participating!', 105, 280, null, null, 'center');

    // Save the PDF to the user's device
    doc.save(`event-ticket-${event._id}.pdf`);
  };

  return (
    <div>
      <h1>{event.nom}</h1>
      <p>{event.description}</p>
      {/* ... other parts of your component ... */}
      <button onClick={downloadPDF}>
        Download Ticket
      </button>
    </div>
  );
};

export default TicketPDF;

// Example usage of TicketPDF component:
// <TicketPDF event={{ id: '123', title: 'Music Festival', dateDebut: new Date(), adresse: '123 Main St' }} />
