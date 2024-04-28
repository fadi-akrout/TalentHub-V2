import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const generatePDF = (candidate) => {

    const doc = new jsPDF();

    doc.text('CV', 14, 16);
    doc.setFontSize(10);

    // Informations personnelles
    doc.text(`Name: ${candidate.name} ${candidate.lastname}`, 14, 30);
    doc.text(`Email: ${candidate.email}`, 14, 40);
    doc.text(`Phone: ${candidate.phoneNumber}`, 14, 50);
    doc.text(`LinkedIn: ${candidate.linkedinProfile}`, 14, 60);
    // ... ajoutez d'autres informations personnelles ici

    // Expérience
    doc.text('Experience', 14, 80);
    autoTable(doc, {
        startY: 85,
        head: [['Years of Experience', 'Last Position']],
        body: [
            [`${candidate.nbrYearsOfExperience}`]
            // ... ajoutez d'autres expériences ici
        ],
    });

    // Éducation
    doc.text('Education', 14, doc.lastAutoTable.finalY + 10);
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 15,
        head: [['Diploma']],
        body: [
            [`${candidate.diploma}`],
            // ... ajoutez d'autres diplômes ici
        ],
    });

    // Compétences
    doc.text('Skills', 14, doc.lastAutoTable.finalY + 10);
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 15,
        body: candidate.skills.map(skill => [skill]),
    });

    // Langues
    doc.text('Languages', 14, doc.lastAutoTable.finalY + 10);
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 15,
        body: candidate.languages.map(language => [language]),
    });

    // Sauvegarder le PDF
    doc.save(`${candidate.name} ${candidate.lastname}.pdf`);
};

const PDFGeneratorButton = ({ candidate }) => {
    return (
        <button onClick={() => generatePDF(candidate)}>Generate PDF</button>
    );
};

export default PDFGeneratorButton;
