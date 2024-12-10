document.addEventListener('DOMContentLoaded', () => {
    // Define an asynchronous function inside the event listener
    const init = async () => {
        try {
            // Fetch donors
            const donorResponse = await fetch('/donors');
            if (!donorResponse.ok) {
                throw new Error(`HTTP error! Status: ${donorResponse.status}`);
            }
            const donors = await donorResponse.json();
            const donorTableBody = document.querySelector('#donorTable tbody');
            donors.forEach(donor => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${donor.name}</td>
                    <td>${donor.address}</td>
                    <td>${donor.age}</td>
                    <td>${donor.blood_type}</td>
                    <td>${donor.contact_number}</td>
                    <td>${donor.gender}</td>
                `;
                donorTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching donors:', error);
        }

        try {
            // Fetch patients
            const patientResponse = await fetch('/patients');
            if (!patientResponse.ok) {
                throw new Error(`HTTP error! Status: ${patientResponse.status}`);
            }
            const patients = await patientResponse.json();
            const patientTableBody = document.querySelector('#patientTable tbody');
            patients.forEach(patient => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${patient.name}</td>
                    <td>${patient.address}</td>
                    <td>${patient.age}</td>
                    <td>${patient.blood_type}</td>
                    <td>${patient.contact_number}</td>
                    <td>${patient.gender}</td>
                `;
                patientTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    // Call the async function
    init();
});
