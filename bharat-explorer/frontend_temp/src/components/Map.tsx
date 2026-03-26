"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

function LocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const map = useMapEvents({
    locationfound(e: any) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, 12); // Zoom in close enough to see the city
      setIsLocating(false);
    },
    locationerror(e: any) {
      setIsLocating(false);
      alert("Could not access your location. Please check your browser permissions or ensure you are using a secure connection (HTTPS / localhost).");
    }
  });

  return (
    <>
      {position && (
        <Marker position={position}>
          <Popup><div className="font-bold text-center">You are here! <br/><span className="text-xs text-slate-500 text-center">Live Location</span></div></Popup>
        </Marker>
      )}
      
      {/* Custom Control Button */}
      <div className="leaflet-top leaflet-right z-[1000] absolute right-4 top-4">
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsLocating(true);
            map.locate({ enableHighAccuracy: true, timeout: 10000 });
          }}
          disabled={isLocating}
          className={`${isLocating ? 'bg-slate-100 text-slate-400' : 'bg-white text-slate-700 hover:text-orange-500 hover:bg-slate-50'} border-2 border-slate-200 p-2.5 rounded-xl shadow-lg font-bold flex items-center gap-2 transition-all cursor-pointer pointer-events-auto`}
        >
          {isLocating ? (
             <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="M12 20v2"/><path d="M2 12h2"/><path d="M20 12h2"/><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>
          )}
          <span className="hidden sm:inline">{isLocating ? 'Locating...' : 'Locate Me'}</span>
        </button>
      </div>
    </>
  );
}

export default function InteractiveMap() {
  useEffect(() => {
    // Hack to fix leaflet marker images with Next.js
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  // Center on India
  const position: [number, number] = [20.5937, 78.9629];

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl relative z-0">
      <MapContainer 
        center={position} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <LocationMarker />
        <Marker position={[27.1751, 78.0421]}>
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-lg text-slate-900">Taj Mahal</h3>
              <p className="text-sm text-slate-600">Historical monument in Agra.</p>
              <img src="https://images.unsplash.com/photo-1564507592224-2fc358a9d0a6?w=400&q=80" className="mt-2 rounded-lg shadow-sm w-full h-32 object-cover" alt="Taj Mahal" />
              <button onClick={() => window.location.href='/destinations'} className="mt-3 w-full bg-orange-500 text-white text-sm py-1.5 rounded-md font-semibold hover:bg-orange-600 transition">View Details</button>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
