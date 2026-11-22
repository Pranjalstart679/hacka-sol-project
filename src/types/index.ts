export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface BloodBank {
  id: string;
  name: string;
  category: 'Government' | 'Red Cross' | 'Charitable' | 'Private';
  address: string;
  city: string;
  state: string;
  phone: string;
  distanceKm: number;
  latitude: number;
  longitude: number;
  stock: Record<BloodGroup, number>;
  lastUpdated: string;
  is24x7: boolean;
}

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  phone: string;
  city: string;
  distanceKm: number;
  lastDonationDate: string; // YYYY-MM-DD
  isEligible: boolean; // calculated based on 90-day cooldown
  cooldownDaysRemaining: number;
  donationsCount: number;
  referralCode?: string;
}

export interface SOSRequest {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  bloodGroup: BloodGroup;
  unitsNeeded: number;
  hospitalName: string;
  city: string;
  contactPerson: string;
  contactPhone: string;
  urgency: 'CRITICAL' | 'URGENT' | 'STANDARD';
  createdAt: string;
  compatibleGroups: BloodGroup[];
  status: 'BROADCASTED' | 'MATCHED' | 'FULFILLED';
  acceptedDonors: string[]; // donor IDs
}

export interface DonorNotification {
  requestId: string;
  donorId: string;
  patientName: string;
  bloodGroup: BloodGroup;
  hospital: string;
  distanceKm: number;
  units: number;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  timestamp: string;
}
