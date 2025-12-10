import React, { useMemo, useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { getFlights, getPilots, getCabinCrews, getAircrafts, createFlight } from '../utils/api';

// Register modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function RosterManagement() {
    const [rowData, setRowData] = useState([]);
    const [pilots, setPilots] = useState([]);
    const [crews, setCrews] = useState([]);
    const [aircrafts, setAircrafts] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFlight, setNewFlight] = useState({
        flight_number: '',
        origin_airport: '',
        destination_airport: '',
        departure_time: '',
        arrival_time: '',
        aircraft_id: '',
        pilot_ids: [],
        crew_ids: [],
        status: 'Scheduled',
        airline_id: 1
    });

    // Get Logged In User's Airline
    const storedAirlineId = localStorage.getItem("airline_id");
    const currentAirlineId = storedAirlineId ? parseInt(storedAirlineId) : null;
    // If no airline_id (e.g. superadmin or error), might want to show all or handle differently.
    // For now assuming we just pass what we have.

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [flightsData, pilotsData, crewsData, aircraftsData] = await Promise.all([
                getFlights(currentAirlineId),
                getPilots(currentAirlineId),
                getCabinCrews(currentAirlineId),
                getAircrafts(currentAirlineId)
            ]);

            const formattedFlights = flightsData.map(f => ({
                ...f,
                aircraft: aircraftsData.find(a => a.aircraft_id === f.aircraft_id)?.model || f.aircraft_id,
            }));

            setRowData(formattedFlights);
            setPilots(pilotsData);
            setCrews(crewsData);
            setAircrafts(aircraftsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleCreate = async () => {
        try {
            await createFlight({
                ...newFlight,
                airline_id: currentAirlineId,
                departure_time: new Date(newFlight.departure_time).toISOString(),
                arrival_time: new Date(newFlight.arrival_time).toISOString(),
                aircraft_id: parseInt(newFlight.aircraft_id),
                pilot_ids: newFlight.pilot_ids.map(id => parseInt(id)),
                crew_ids: newFlight.crew_ids.map(id => parseInt(id))
            });
            setIsModalOpen(false);
            fetchData();
            setNewFlight({
                flight_number: '', origin_airport: '', destination_airport: '',
                departure_time: '', arrival_time: '', aircraft_id: '',
                pilot_ids: [], crew_ids: [], status: 'Scheduled', airline_id: 1
            });
        } catch (error) {
            console.error("Error creating flight:", error);
            alert("Failed to create flight");
        }
    };

    const handleMultiSelectChange = (e, field) => {
        const values = Array.from(e.target.selectedOptions, option => option.value);
        setNewFlight({ ...newFlight, [field]: values });
    };

    const [colDefs] = useState([
        { field: 'flight_number', headerName: 'Flight No', flex: 1 },
        { field: 'origin_airport', headerName: 'Origin', flex: 1 },
        { field: 'destination_airport', headerName: 'Dest', flex: 1 },
        { field: 'departure_time', headerName: 'Departure', flex: 1.5 },
        { field: 'aircraft', headerName: 'Aircraft', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
    ]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
    }), []);

    return (
        <AdminLayout title="Roster & Schedule Management">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        padding: '10px 20px',
                        background: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    + Create New Flight
                </button>
            </div>

            <div style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    rowHeight={50}
                    headerHeight={50}
                />
            </div>

            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white', padding: '2rem', borderRadius: '8px', width: '500px',
                        maxHeight: '90vh', overflowY: 'auto'
                    }}>
                        <h2>Create New Flight</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <input
                                placeholder="Flight Number (e.g., TK-101)"
                                value={newFlight.flight_number}
                                onChange={(e) => setNewFlight({ ...newFlight, flight_number: e.target.value })}
                                style={styles.input}
                            />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    placeholder="Origin"
                                    value={newFlight.origin_airport}
                                    onChange={(e) => setNewFlight({ ...newFlight, origin_airport: e.target.value })}
                                    style={styles.input}
                                />
                                <input
                                    placeholder="Destination"
                                    value={newFlight.destination_airport}
                                    onChange={(e) => setNewFlight({ ...newFlight, destination_airport: e.target.value })}
                                    style={styles.input}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ flex: 1 }}>
                                    <label>Departure</label>
                                    <input
                                        type="datetime-local"
                                        value={newFlight.departure_time}
                                        onChange={(e) => setNewFlight({ ...newFlight, departure_time: e.target.value })}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label>Arrival</label>
                                    <input
                                        type="datetime-local"
                                        value={newFlight.arrival_time}
                                        onChange={(e) => setNewFlight({ ...newFlight, arrival_time: e.target.value })}
                                        style={styles.input}
                                    />
                                </div>
                            </div>

                            <select
                                value={newFlight.aircraft_id}
                                onChange={(e) => setNewFlight({ ...newFlight, aircraft_id: e.target.value })}
                                style={styles.input}
                            >
                                <option value="">Select Aircraft</option>
                                {aircrafts.map(a => (
                                    <option key={a.aircraft_id} value={a.aircraft_id}>
                                        {a.model} (ID: {a.aircraft_id})
                                    </option>
                                ))}
                            </select>

                            <label>Assign Pilots (Hold Ctrl to select multiple)</label>
                            <select
                                multiple
                                value={newFlight.pilot_ids}
                                onChange={(e) => handleMultiSelectChange(e, 'pilot_ids')}
                                style={{ ...styles.input, height: '100px' }}
                            >
                                {pilots.map(p => (
                                    <option key={p.pilot_id} value={p.pilot_id}>
                                        {p.full_name} ({p.license_level})
                                    </option>
                                ))}
                            </select>

                            <label>Assign Cabin Crew (Hold Ctrl to select multiple)</label>
                            <select
                                multiple
                                value={newFlight.crew_ids}
                                onChange={(e) => handleMultiSelectChange(e, 'crew_ids')}
                                style={{ ...styles.input, height: '100px' }}
                            >
                                {crews.map(c => (
                                    <option key={c.attendant_id} value={c.attendant_id}>
                                        {c.full_name} ({c.attendant_type})
                                    </option>
                                ))}
                            </select>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                                <button onClick={handleCreate} style={styles.btnPrimary}>Create</button>
                                <button onClick={() => setIsModalOpen(false)} style={styles.btnSecondary}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

const styles = {
    input: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        width: '100%',
        boxSizing: 'border-box'
    },
    btnPrimary: {
        flex: 1,
        padding: '10px',
        background: 'var(--color-primary)',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    btnSecondary: {
        flex: 1,
        padding: '10px',
        background: '#eee',
        color: '#333',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};
