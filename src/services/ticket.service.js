// src/services/ticketService.js
import axios from "axios";



export const fetchTicketsByStudent = async (studentName, page = 1, limit = 10) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ticket/fetch-by-student`, {
            student_name: studentName,
            page,
            limit
        });

        return response.data.data;
    } catch (err) {
        console.error("Error fetching tickets:", err);
        throw err;
    }
};


export const createTicket = async (payload) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ticket/create`, payload);
        console.log("API Base URL =", import.meta.env.VITE_BASE_URL);
        return response.data;
    } catch (err) {
        console.error("Error creating ticket:", err);
        throw err;
    }
};