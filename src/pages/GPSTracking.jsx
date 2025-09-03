import React, { useState, useEffect } from 'react';
import { Vehicle } from '@/api/entities';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon issue with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


export default function GPSTracking() {
  const [vehicles, setVehicles] = useState([]);
  
  useEffect(() => {
      async function loadVehicles() {
          const data = await Vehicle.list();
          // Filter vehicles that have location data for the map
          setVehicles(data.filter(v => v.live_latitude && v.live_longitude));
      }
      loadVehicles();
  }, []);

  if (vehicles.length === 0) {
      return <div className="p-6">Loading vehicle locations... No vehicles with GPS data found.</div>
  }

  const centerPosition = [vehicles[0].live_latitude, vehicles[0].live_longitude];

  return (
    <div className="h-full w-full">
      <MapContainer center={centerPosition} zoom={12} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {vehicles.map(vehicle => (
            <Marker key={vehicle.id} position={[vehicle.live_latitude, vehicle.live_longitude]}>
                <Popup>
                    <b>{vehicle.make} {vehicle.model}</b><br/>
                    Plate: {vehicle.license_plate}<br/>
                    Status: {vehicle.status}<br/>
                    Fuel: {vehicle.fuel_level || 'N/A'}%
                </Popup>
            </Marker>
        ))}
      </MapContainer>
    </div>
  );
}