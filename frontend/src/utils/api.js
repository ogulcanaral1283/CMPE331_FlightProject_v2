import axios from 'axios';
import { FLIGHT_API_URL, CREW_API_URL, AIRCRAFT_API_URL } from '../apiConfig';

export const getFlights = async (airlineId) => {
    const params = airlineId ? { airline_id: airlineId } : {};
    const response = await axios.get(`${FLIGHT_API_URL}/flights/`, { params });
    return response.data;
};

export const createFlight = async (flightData) => {
    const response = await axios.post(`${FLIGHT_API_URL}/flights/`, flightData);
    return response.data;
};

export const getPilots = async (airlineId) => {
    if (airlineId) {
        const response = await axios.get(`${CREW_API_URL}/pilots/airline/${airlineId}`);
        return response.data;
    }
    const response = await axios.get(`${CREW_API_URL}/pilots/`);
    return response.data;
};

export const getCabinCrews = async (airlineId) => {
    const params = airlineId ? { airline_id: airlineId } : {};
    const response = await axios.get(`${CREW_API_URL}/cabin-crews/`, { params });
    return response.data;
};

export const getAircrafts = async (airlineId) => {
    const params = airlineId ? { airline_id: airlineId } : {};
    const response = await axios.get(`${AIRCRAFT_API_URL}/aircrafts/`, { params });
    return response.data;
};
