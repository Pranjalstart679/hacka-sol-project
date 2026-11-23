import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BloodBank } from '../types';
import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';

interface InteractiveMapProps {
  userLocation: { lat: number; lng: number; label: string };
  bloodBanks: BloodBank[];
  selectedBankId?: string;
  onSelectBank?: (bank: BloodBank) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  userLocation,
  bloodBanks,
  selectedBankId,
  onSelectBank,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet map instance
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [userLocation.lat, userLocation.lng],
        zoom: 11,
        zoomControl: true,
      });

      // Real OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 11);
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Custom Marker for User Location
    const userIcon = L.divIcon({
      className: 'custom-user-pin',
      html: `
        <div style="background-color: #0f172a; width: 18px; height: 18px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center;">
          <div style="width: 6px; height: 6px; background-color: #38bdf8; border-radius: 50%;"></div>
        </div>
      `,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup(`<strong>Active Reference Point</strong><br/>${userLocation.label}`);
    markersRef.current.push(userMarker);

    // Red Markers for Blood Banks
    bloodBanks.forEach((bank) => {
      const isSelected = bank.id === selectedBankId;
      const bankIcon = L.divIcon({
        className: 'custom-bank-pin',
        html: `
          <div style="background-color: ${isSelected ? '#7f1d1d' : '#991b1b'}; width: ${isSelected ? '28px' : '22px'}; height: ${isSelected ? '28px' : '22px'}; border-radius: 4px; border: 1.5px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-family: monospace; font-size: ${isSelected ? '12px' : '10px'};">
            +
          </div>
        `,
        iconSize: isSelected ? [28, 28] : [22, 22],
        iconAnchor: isSelected ? [14, 14] : [11, 11],
      });

      const totalStock = Object.values(bank.stock).reduce((a, b) => a + b, 0);

      const marker = L.marker([bank.latitude, bank.longitude], { icon: bankIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif; max-width: 220px; font-size: 12px; color: #1e293b;">
            <div style="font-size: 9px; font-family: monospace; font-weight: bold; text-transform: uppercase; color: #991b1b; margin-bottom: 2px;">
              ${bank.category} • ${bank.is24x7 ? '24x7' : 'Standard'}
            </div>
            <strong style="font-size: 13px; color: #0f172a; display: block; margin-bottom: 4px;">${bank.name}</strong>
            <p style="margin: 0 0 6px 0; color: #64748b; font-size: 11px;">${bank.address}</p>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 4px 6px; border-radius: 4px; margin-bottom: 6px; font-family: monospace; font-size: 11px;">
              Total In Stock: <span style="color: #15803d; font-weight: bold;">${totalStock} Units</span>
            </div>
            <div style="display: flex; gap: 4px;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=${bank.latitude},${bank.longitude}" target="_blank" style="display: inline-block; background: #991b1b; color: white; text-decoration: none; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-family: monospace; font-weight: bold;">
                Maps ↗
              </a>
              <a href="tel:${bank.phone}" style="display: inline-block; background: #0f172a; color: white; text-decoration: none; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-family: monospace; font-weight: bold;">
                Helpline
              </a>
            </div>
          </div>
        `);

      if (onSelectBank) {
        marker.on('click', () => onSelectBank(bank));
      }

      markersRef.current.push(marker);
    });


  }, [userLocation, bloodBanks, selectedBankId, onSelectBank]);

  useEffect(() => () => {
    mapInstanceRef.current?.remove();
    mapInstanceRef.current = null;
    markersRef.current = [];
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] rounded-lg overflow-hidden border border-neutral-300 z-0">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute top-3 right-3 z-[1000] bg-white px-3 py-1.5 rounded border border-neutral-300 text-[10px] font-mono text-neutral-800 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-slate-900"></span> Active Reference
        <span className="w-2 h-2 rounded bg-red-800 ml-2"></span> Storage Center
      </div>
    </div>
  );
};
