// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setUpEventListeners();
});

// Initialize application
function initializeApp() {
    fetchAndDisplayData();
    // Refresh data periodically
    setInterval(fetchAndDisplayData, config.REFRESH_INTERVAL);
}

// Set up event listeners
function setUpEventListeners() {
    document.getElementById('addPatientForm').addEventListener('submit', handleAddPatient);
}

// Fetch and display all data
async function fetchAndDisplayData() {
    try {
        const [patients, rooms, doctors, nurses] = await Promise.all([
            api.fetchPatients(),
            api.fetchRooms(),
            api.fetchDoctors(),
            api.fetchNurses()
        ]);

        updateDashboardStats(patients, rooms, doctors);
        updatePatientsList(patients);
        updateRoomsList(rooms);
        updateStaffList(doctors, nurses);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Update dashboard statistics
function updateDashboardStats(patients, rooms, doctors) {
    document.getElementById('totalPatients').textContent = patients.length;
    document.getElementById('availableRooms').textContent = rooms.filter(room => room.Availability).length;
    document.getElementById('activeDoctors').textContent = doctors.length;
}

// Update patients list
function updatePatientsList(patients) {
    const patientsList = document.getElementById('patientsList');
    patientsList.innerHTML = patients.map(patient => `
        <tr>
            <td>${patient.P_ID}</td>
            <td>${patient.Name}</td>
            <td>${patient.Age}</td>
            <td>${patient.Cause}</td>
        </tr>
    `).join('');
}

// Update rooms list
function updateRoomsList(rooms) {
    const roomsList = document.getElementById('roomsList');
    roomsList.innerHTML = rooms.map(room => `
        <tr>
            <td>${room.R_ID}</td>
            <td>${room.Type}</td>
            <td>
                <span class="status ${room.Availability ? 'available' : 'occupied'}">
                    ${room.Availability ? 'Available' : 'Occupied'}
                </span>
            </td>
        </tr>
    `).join('');
}

// Update staff list
function updateStaffList(doctors, nurses) {
    const staffList = document.getElementById('staffList');
    const staffData = [
        ...doctors.map(doctor => ({
            name: doctor.Name,
            role: 'Doctor',
            department: doctor.Dept
        })),
        ...nurses.map(nurse => ({
            name: nurse.Name,
            role: 'Nurse',
            department: 'Nursing'
        }))
    ];

    staffList.innerHTML = staffData.map(staff => `
        <tr>
            <td>${staff.name}</td>
            <td>${staff.role}</td>
            <td>${staff.department}</td>
        </tr>
    `).join('');
}

// Handle adding new patient
async function handleAddPatient(e) {
    e.preventDefault();
    
    const newPatient = {
        Name: document.getElementById('patientName').value,
        Age: document.getElementById('patientAge').value,
        Mob_No: document.getElementById('patientMobile').value,
        Cause: document.getElementById('patientCause').value,
        DOB: new Date().toISOString().split('T')[0],
        Gender: 'Not Specified',
        Admission_Date: new Date().toISOString().split('T')[0],
        Caregiver_Phone: document.getElementById('patientMobile').value,
        Caregiver_Name: 'To Be Assigned',
        Appointment: new Date().toISOString().replace('T', ' ').split('.')[0]
    };

    try {
        await api.addPatient(newPatient);
        hideAddPatientModal();
        fetchAndDisplayData();
        document.getElementById('addPatientForm').reset();
    } catch (error) {
        alert('Error adding patient. Please try again.');
    }
}

// Modal functions
function showAddPatientModal() {
    document.getElementById('addPatientModal').style.display = 'block';
}

function hideAddPatientModal() {
    document.getElementById('addPatientModal').style.display = 'none';
}