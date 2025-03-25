// scripts.js
async function submitData(endpoint, data) {
    try {
        const response = await fetch(`http://localhost:3000${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            alert('Entry added successfully!');
            // Optionally, reset the form fields after submission
            resetForms();
        } else {
            alert('Error adding entry');
        }
    } catch (error) {
        alert('Error adding entry');
    }
}

async function submitData(endpoint, data) {
    console.log('Submitting to:', endpoint, 'Data:', data); // Log for debugging
    try {
        const response = await fetch(`http://localhost:3000${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Entry added successfully!');
            resetForms();
        } else {
            const errorText = await response.text();
            alert(`Error adding entry: ${errorText}`);
        }
    } catch (error) {
        alert(`Network error: ${error.message}`);
    }
}


function showForm(form) {
    document.querySelectorAll('.form-container').forEach(el => el.style.display = 'none');
    document.getElementById(`${form}-form`).style.display = 'block';
}

function submitDonor() {
    submitData('/donors', {
        name: document.getElementById('donorName').value,
        email: document.getElementById('donorEmail').value,
        phone: document.getElementById('donorPhone').value
    });
}

function submitDonation() {
    submitData('/donations', {
        donor_id: document.getElementById('donorId').value,
        amount: document.getElementById('donationAmount').value,
        date: document.getElementById('donationDate').value
    });
}

function submitVolunteer() {
    submitData('/volunteers', {
        name: document.getElementById('volunteerName').value,
        email: document.getElementById('volunteerEmail').value,
        phone: document.getElementById('volunteerPhone').value
    });
}

function submitBeneficiary() {
    submitData('/beneficiaries', {
        name: document.getElementById('beneficiaryName').value,
        details: document.getElementById('beneficiaryDetails').value
    });
}

function submitOrganization() {
    submitData('/organizations', {
        name: document.getElementById('orgName').value,
        contact: document.getElementById('orgContact').value
    });
}

// Function to reset form fields after submission
function resetForms() {
    document.querySelectorAll('.form-container input').forEach(input => {
        input.value = '';
    });
}

// Initially show the donor form
document.addEventListener('DOMContentLoaded', () => {
    showForm('donor'); // Show the donor form by default
});