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

    // Custom Blue Marker for User Location
    const userIcon = L.divIcon({
      className: 'custom-user-pin',
      html: `
        <div style="background-color: #2563eb; width: 22px; height: 22px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(37,99,235,0.7); display: flex; align-items: center; justify-content: center;">
          <div style="width: 6px; height: 6px; background-color: white; border-radius: 50%;"></div>
        </div>
      `,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });

    const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup(`<strong>Your Location</strong><br/>${userLocation.label}`);
    markersRef.current.push(userMarker);

    // Red Markers for Blood Banks
    bloodBanks.forEach((bank) => {
      const isSelected = bank.id === selectedBankId;
      const bankIcon = L.divIcon({
        className: 'custom-bank-pin',
        html: `
          <div style="background-color: ${isSelected ? '#991b1b' : '#dc2626'}; width: ${isSelected ? '32px' : '26px'}; height: ${isSelected ? '32px' : '26px'}; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: ${isSelected ? '14px' : '11px'};">
            +
          </div>
        `,
        iconSize: isSelected ? [32, 32] : [26, 26],
        iconAnchor: isSelected ? [16, 16] : [13, 13],
      });

      const totalStock = Object.values(bank.stock).reduce((a, b) => a + b, 0);

      const marker = L.marker([bank.latitude, bank.longitude], { icon: bankIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: system-ui; max-width: 220px; font-size: 12px; color: #1e293b;">
            <div style="font-size: 9px; font-weight: bold; text-transform: uppercase; color: #dc2626; margin-bottom: 2px;">
              ${bank.category} • ${bank.is24x7 ? '24x7' : 'Standard'}
            </div>
            <strong style="font-size: 13px; color: #0f172a; display: block; margin-bottom: 4px;">${bank.name}</strong>
            <p style="margin: 0 0 6px 0; color: #64748b; font-size: 11px;">${bank.address}</p>
            <div style="background: #f1f5f9; padding: 4px 6px; border-radius: 6px; margin-bottom: 6px; font-weight: bold;">
              Total Units Available: <span style="color: #16a34a;">${totalStock} Units</span>
            </div>
            <div style="display: flex; gap: 4px;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=${bank.latitude},${bank.longitude}" target="_blank" style="display: inline-block; background: #dc2626; color: white; text-decoration: none; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: bold;">
                Google Maps ↗
              </a>
              <a href="tel:${bank.phone}" style="display: inline-block; background: #0f172a; color: white; text-decoration: none; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: bold;">
                Call
              </a>
            </div>
          </div>
        `);

      if (onSelectBank) {
        marker.on('click', () => onSelectBank(bank));
      }

      markersRef.current.push(marker);
    });

    return () => {
      // Map stays managed by ref
    };
  }, [userLocation, bloodBanks, selectedBankId]);

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm z-0">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-md text-[11px] font-bold text-slate-700 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Your GPS
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 ml-2"></span> Blood Center
      </div>
    </div>
  );
};
