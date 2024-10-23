// API service functions
const api = {
    async fetchPatients() {
        try {
            const response = await axios.get(`${config.API_URL}/patients`);
            return response.data;
        } catch (error) {
            console.error('Error fetching patients:', error);
            throw error;
        }
    },

    async fetchRooms() {
        try {
            const response = await axios.get(`${config.API_URL}/rooms`);
            return response.data;
        } catch (error) {
            console.error('Error fetching rooms:', error);
            throw error;
        }
    },

    async fetchDoctors() {
        try {
            const response = await axios.get(`${config.API_URL}/doctors`);
            return response.data;
        } catch (error) {
            console.error('Error fetching doctors:', error);
            throw error;
        }
    },

    async fetchNurses() {
        try {
            const response = await axios.get(`${config.API_URL}/nurses`);
            return response.data;
        } catch (error) {
            console.error('Error fetching nurses:', error);
            throw error;
        }
    },

    async addPatient(patientData) {
        try {
            const response = await axios.post(`${config.API_URL}/patients`, patientData);
            return response.data;
        } catch (error) {
            console.error('Error adding patient:', error);
            throw error;
        }
    }
};