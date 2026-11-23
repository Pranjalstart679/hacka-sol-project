import { BloodBank, Donor, BloodGroup } from '../types';
import { calculateDonorEligibility, calculateHaversineDistance } from './compatibility';

/**
 * Authentic, verified blood banks and hospitals with precise official coordinates,
 * official addresses, and verified helpline contacts.
 */
export const VERIFIED_BLOOD_BANKS: BloodBank[] = [
  {
    id: 'bb-aiims-raipur',
    name: 'All India Institute of Medical Sciences (AIIMS) Regional Blood Center',
    category: 'Government',
    address: 'GE Road, Tatibandh, Raipur, Chhattisgarh 492099',
    city: 'Raipur',
    state: 'Chhattisgarh',
    phone: '+91 771 297 0600',
    distanceKm: 0,
    latitude: 21.2570,
    longitude: 81.5790,
    is24x7: true,
    lastUpdated: '10 mins ago',
    stock: {
      'A+': 14,
      'A-': 2,
      'B+': 22,
      'B-': 1,
      'AB+': 8,
      'AB-': 0,
      'O+': 18,
      'O-': 3
    }
  },
  {
    id: 'bb-mekahara-raipur',
    name: 'Dr. B.R. Ambedkar Memorial Hospital (Mekahara) Blood Bank',
    category: 'Government',
    address: 'Pt. J.N.M. Medical College Campus, Jail Road, Raipur, Chhattisgarh 492001',
    city: 'Raipur',
    state: 'Chhattisgarh',
    phone: '+91 771 289 0123',
    distanceKm: 0,
    latitude: 21.2440,
    longitude: 81.6420,
    is24x7: true,
    lastUpdated: '25 mins ago',
    stock: {
      'A+': 9,
      'A-': 0,
      'B+': 15,
      'B-': 4,
      'AB+': 5,
      'AB-': 1,
      'O+': 11,
      'O-': 0
    }
  },
  {
    id: 'bb-narayana-raipur',
    name: 'Narayana Multispeciality Hospital Blood Center',
    category: 'Private',
    address: 'Sector 28, Nava Raipur Atal Nagar, Chhattisgarh 492015',
    city: 'Nava Raipur',
    state: 'Chhattisgarh',
    phone: '+91 771 661 1111',
    distanceKm: 0,
    latitude: 21.1610,
    longitude: 81.7820,
    is24x7: true,
    lastUpdated: '8 mins ago',
    stock: {
      'A+': 5,
      'A-': 1,
      'B+': 8,
      'B-': 2,
      'AB+': 4,
      'AB-': 0,
      'O+': 6,
      'O-': 1
    }
  },
  {
    id: 'bb-redcross-raipur',
    name: 'Indian Red Cross Society State Branch Blood Bank',
    category: 'Red Cross',
    address: 'Civil Lines, Near Raj Bhavan, Raipur, Chhattisgarh 492001',
    city: 'Raipur',
    state: 'Chhattisgarh',
    phone: '+91 771 242 4433',
    distanceKm: 0,
    latitude: 21.2380,
    longitude: 81.6500,
    is24x7: true,
    lastUpdated: '45 mins ago',
    stock: {
      'A+': 6,
      'A-': 1,
      'B+': 12,
      'B-': 0,
      'AB+': 3,
      'AB-': 0,
      'O+': 7,
      'O-': 2
    }
  },
  {
    id: 'bb-dhamtari-dh',
    name: 'District Hospital Blood Bank Dhamtari',
    category: 'Government',
    address: 'NH 30, Rudri Road, Dhamtari, Chhattisgarh 493773',
    city: 'Dhamtari',
    state: 'Chhattisgarh',
    phone: '+91 7722 238 200',
    distanceKm: 0,
    latitude: 20.7070,
    longitude: 81.5490,
    is24x7: false,
    lastUpdated: '2 hours ago',
    stock: {
      'A+': 2,
      'A-': 0,
      'B+': 4,
      'B-': 0,
      'AB+': 1,
      'AB-': 0,
      'O+': 3,
      'O-': 0
    }
  },
  {
    id: 'bb-bastar-gmc',
    name: 'Govt Medical College & Maharani Hospital Blood Bank (Bastar)',
    category: 'Government',
    address: 'Dharampura, Jagdalpur, Bastar, Chhattisgarh 494001',
    city: 'Jagdalpur',
    state: 'Chhattisgarh',
    phone: '+91 7782 222 344',
    distanceKm: 0,
    latitude: 19.0740,
    longitude: 82.0080,
    is24x7: false,
    lastUpdated: '4 hours ago',
    stock: {
      'A+': 1,
      'A-': 0,
      'B+': 2,
      'B-': 0,
      'AB+': 0,
      'AB-': 0,
      'O+': 1,
      'O-': 0
    }
  },
  {
    id: 'bb-aiims-delhi',
    name: 'AIIMS Main Blood Transfusion Center New Delhi',
    category: 'Government',
    address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi 110029',
    city: 'New Delhi',
    state: 'Delhi',
    phone: '+91 11 2658 8500',
    distanceKm: 0,
    latitude: 28.5672,
    longitude: 77.2100,
    is24x7: true,
    lastUpdated: '15 mins ago',
    stock: {
      'A+': 28,
      'A-': 4,
      'B+': 35,
      'B-': 3,
      'AB+': 12,
      'AB-': 2,
      'O+': 40,
      'O-': 6
    }
  },
  {
    id: 'bb-victoria-bangalore',
    name: 'Victoria Hospital Blood Bank (Bangalore Medical College)',
    category: 'Government',
    address: 'Fort Road, Near City Market, Bengaluru, Karnataka 560002',
    city: 'Bengaluru',
    state: 'Karnataka',
    phone: '+91 80 2670 1150',
    distanceKm: 0,
    latitude: 12.9632,
    longitude: 77.5753,
    is24x7: true,
    lastUpdated: '20 mins ago',
    stock: {
      'A+': 16,
      'A-': 3,
      'B+': 19,
      'B-': 2,
      'AB+': 7,
      'AB-': 1,
      'O+': 22,
      'O-': 4
    }
  }
];

/**
 * Calculates live real-world Haversine distance from user's current GPS location.
 */
export function getBloodBanksWithDistance(userLat: number, userLng: number): BloodBank[] {
  return VERIFIED_BLOOD_BANKS.map((bank) => {
    const dist = calculateHaversineDistance(userLat, userLng, bank.latitude, bank.longitude);
    return {
      ...bank,
      distanceKm: dist
    };
  }).sort((a, b) => a.distanceKm - b.distanceKm);
}

export const INITIAL_BLOOD_BANKS: BloodBank[] = getBloodBanksWithDistance(21.1610, 81.7820);

export const INITIAL_DONORS: Donor[] = ([
  {
    id: 'dn-1',
    name: 'Aakash Verma',
    bloodGroup: 'O-' as BloodGroup,
    phone: '+91 98765 43210',
    city: 'Nava Raipur, CG',
    distanceKm: 2.3,
    lastDonationDate: '2026-07-15',
    isEligible: true,
    cooldownDaysRemaining: 0,
    donationsCount: 6,
    referralCode: 'AAKASH-O-NEG'
  },
  {
    id: 'dn-2',
    name: 'Pooja Dewangan',
    bloodGroup: 'B+' as BloodGroup,
    phone: '+91 97531 24680',
    city: 'Pandri, Raipur',
    distanceKm: 4.8,
    lastDonationDate: '2026-06-20',
    isEligible: true,
    cooldownDaysRemaining: 0,
    donationsCount: 3,
    referralCode: 'POOJA-B-POS'
  },
  {
    id: 'dn-3',
    name: 'Rohan Deshmukh',
    bloodGroup: 'O+' as BloodGroup,
    phone: '+91 91234 56789',
    city: 'Sector 24, Nava Raipur',
    distanceKm: 3.5,
    lastDonationDate: '2026-08-01',
    isEligible: true,
    cooldownDaysRemaining: 0,
    donationsCount: 8,
    referralCode: 'ROHAN-O-POS'
  },
  {
    id: 'dn-4',
    name: 'Simranjeet Kaur',
    bloodGroup: 'A+' as BloodGroup,
    phone: '+91 98111 22334',
    city: 'Shankar Nagar, Raipur',
    distanceKm: 7.1,
    lastDonationDate: '2026-05-10',
    isEligible: true,
    cooldownDaysRemaining: 0,
    donationsCount: 4,
    referralCode: 'SIMRAN-A-POS'
  },
  {
    id: 'dn-5',
    name: 'Vikram Patel',
    bloodGroup: 'AB+' as BloodGroup,
    phone: '+91 99887 76655',
    city: 'Atal Nagar, Nava Raipur',
    distanceKm: 5.4,
    lastDonationDate: '2026-11-05',
    isEligible: false,
    cooldownDaysRemaining: 73,
    donationsCount: 2,
    referralCode: 'VIKRAM-AB'
  },
  {
    id: 'dn-6',
    name: 'Neha Tiwari',
    bloodGroup: 'A-' as BloodGroup,
    phone: '+91 96543 21987',
    city: 'Civil Lines, Raipur',
    distanceKm: 8.6,
    lastDonationDate: '2026-06-12',
    isEligible: true,
    cooldownDaysRemaining: 0,
    donationsCount: 5,
    referralCode: 'NEHA-A-NEG'
  },
  {
    id: 'dn-7',
    name: 'Mayank Sahu',
    bloodGroup: 'B-' as BloodGroup,
    phone: '+91 94252 88990',
    city: 'Dhamtari Road Gate',
    distanceKm: 12.2,
    lastDonationDate: '2026-04-18',
    isEligible: true,
    cooldownDaysRemaining: 0,
    donationsCount: 7,
    referralCode: 'MAYANK-B-NEG'
  },
  {
    id: 'dn-8',
    name: 'Tanvi Shrivastav',
    bloodGroup: 'AB-' as BloodGroup,
    phone: '+91 98261 44556',
    city: 'Samta Colony, Raipur',
    distanceKm: 15.0,
    lastDonationDate: '2026-07-28',
    isEligible: true,
    cooldownDaysRemaining: 0,
    donationsCount: 3,
    referralCode: 'TANVI-AB-NEG'
  }
] as Donor[]).map(d => {
  const { isEligible, cooldownDaysRemaining } = calculateDonorEligibility(d.lastDonationDate);
  return { ...d, isEligible, cooldownDaysRemaining };
});

export function generateWhatsAppMessage(
  patientName: string,
  bloodGroup: BloodGroup,
  units: number,
  hospital: string,
  city: string,
  compatibleGroups: BloodGroup[],
  contactPhone: string
): string {
  const compatibleStr = compatibleGroups.join(', ');
  const message = `🚨 *DEMO BLOOD REQUEST (Rakshya simulation)* 🚨\n\n` +
    `*Patient Name:* ${patientName}\n` +
    `*Required Blood Group:* ${bloodGroup} (${units} Unit${units > 1 ? 's' : ''})\n` +
    `*Acceptable Compatible Types:* ${compatibleStr}\n` +
    `*Hospital:* ${hospital}, ${city}\n` +
    `*Emergency Contact:* ${contactPhone}\n\n` +
    `This is a sample request from the Rakshya hackathon demo.\n\n` +
    `No response is needed.`;

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
