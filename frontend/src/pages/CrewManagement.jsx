import React, { useMemo, useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { getPilots, getCabinCrews } from '../utils/api';
import '../components/layout/AdminLayout.css'; // Reuse existing styles

// Register modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function CrewManagement() {
    const [activeTab, setActiveTab] = useState('pilots');
    const [pilots, setPilots] = useState([]);
    const [crews, setCrews] = useState([]);

    // Get Logged In User's Airline
    const storedAirlineId = localStorage.getItem("airline_id");
    const currentAirlineId = storedAirlineId ? parseInt(storedAirlineId) : null;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [pilotsData, crewsData] = await Promise.all([
                getPilots(currentAirlineId),
                getCabinCrews(currentAirlineId)
            ]);
            setPilots(pilotsData);
            setCrews(crewsData);
        } catch (error) {
            console.error("Error fetching crew data:", error);
        }
    };

    // Pilot Columns
    const pilotColDefs = [
        { field: 'full_name', headerName: 'Name', flex: 1 },
        { field: 'license_level', headerName: 'License', flex: 1 },
        { field: 'flight_hours', headerName: 'Flight Hours', flex: 1 },
        {
            field: 'known_aircrafts',
            headerName: 'Known Aircrafts',
            flex: 1.5,
            valueFormatter: params => params.value ? params.value.join(', ') : ''
        },
        { field: 'nationality', headerName: 'Nationality', flex: 0.8 },
    ];

    // Cabin Crew Columns
    const crewColDefs = [
        { field: 'full_name', headerName: 'Name', flex: 1 },
        { field: 'attendant_type', headerName: 'Type', flex: 1 },
        { field: 'age', headerName: 'Age', flex: 0.5 },
        {
            field: 'known_languages',
            headerName: 'Languages',
            flex: 1.5,
            valueFormatter: params => params.value ? params.value.join(', ') : ''
        },
        { field: 'nationality', headerName: 'Nationality', flex: 0.8 },
    ];

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
    }), []);

    return (
        <AdminLayout title="Personnel Management">
            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #ddd' }}>
                    <button
                        onClick={() => setActiveTab('pilots')}
                        style={{
                            padding: '10px 20px',
                            cursor: 'pointer',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === 'pilots' ? '3px solid var(--color-primary)' : '3px solid transparent',
                            fontWeight: activeTab === 'pilots' ? 'bold' : 'normal',
                            color: activeTab === 'pilots' ? 'var(--color-primary)' : '#666'
                        }}
                    >
                        Pilots
                    </button>
                    <button
                        onClick={() => setActiveTab('crew')}
                        style={{
                            padding: '10px 20px',
                            cursor: 'pointer',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === 'crew' ? '3px solid var(--color-primary)' : '3px solid transparent',
                            fontWeight: activeTab === 'crew' ? 'bold' : 'normal',
                            color: activeTab === 'crew' ? 'var(--color-primary)' : '#666'
                        }}
                    >
                        Cabin Crew
                    </button>
                </div>
            </div>

            <div style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
                <AgGridReact
                    key={activeTab} // Force re-render on tab change
                    rowData={activeTab === 'pilots' ? pilots : crews}
                    columnDefs={activeTab === 'pilots' ? pilotColDefs : crewColDefs}
                    defaultColDef={defaultColDef}
                    rowHeight={50}
                    headerHeight={50}
                />
            </div>
        </AdminLayout>
    );
}
