import { BloodBank, Donor, BloodGroup } from '../types';
import { calculateDonorEligibility } from './compatibility';

export const INITIAL_BLOOD_BANKS: BloodBank[] = [
  {
    id: 'bb-1',
    name: 'AIIMS Raipur Regional Blood Transfusion Center',
    category: 'Government',
    address: 'GE Road, Tatibandh, Raipur, Chhattisgarh 492099',
    city: 'Raipur',
    state: 'Chhattisgarh',
    phone: '+91 771 297 0600',
    distanceKm: 6.2,
    latitude: 21.2570,
    longitude: 81.5790,
    is24x7: true,
    lastUpdated: '12 mins ago',
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
    id: 'bb-2',
    name: 'Dr. B.R. Ambedkar Memorial Hospital (Mekahara) Blood Bank',
    category: 'Government',
    address: 'Jail Road, Medical College Campus, Raipur, Chhattisgarh 492001',
    city: 'Raipur',
    state: 'Chhattisgarh',
    phone: '+91 771 289 0123',
    distanceKm: 14.8,
    latitude: 21.2440,
    longitude: 81.6420,
    is24x7: true,
    lastUpdated: '34 mins ago',
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
    id: 'bb-3',
    name: 'Indian Red Cross Society Blood Bank',
    category: 'Red Cross',
    address: 'Civil Lines, Near Raj Bhavan, Raipur, Chhattisgarh 492001',
    city: 'Raipur',
    state: 'Chhattisgarh',
    phone: '+91 771 242 4433',
    distanceKm: 16.5,
    latitude: 21.2380,
    longitude: 81.6500,
    is24x7: true,
    lastUpdated: '1 hour ago',
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
    id: 'bb-4',
    name: 'Narayana Multispeciality Hospital Blood Center',
    category: 'Private',
    address: 'Sector 28, Nava Raipur Atal Nagar, Chhattisgarh 492015',
    city: 'Nava Raipur',
    state: 'Chhattisgarh',
    phone: '+91 771 661 1111',
    distanceKm: 4.1,
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
    id: 'bb-5',
    name: 'District Hospital Blood Bank Dhamtari',
    category: 'Government',
    address: 'NH 30, Rudri Road, Dhamtari, Chhattisgarh 493773',
    city: 'Dhamtari',
    state: 'Chhattisgarh',
    phone: '+91 7722 238 200',
    distanceKm: 68.0,
    latitude: 20.7070,
    longitude: 81.5490,
    is24x7: false,
    lastUpdated: '3 hours ago',
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
    id: 'bb-6',
    name: 'Bastar Regional Blood Storage Center',
    category: 'Government',
    address: 'Dharampura, Jagdalpur, Chhattisgarh 494001',
    city: 'Jagdalpur',
    state: 'Chhattisgarh',
    phone: '+91 7782 222 344',
    distanceKm: 285.0, // Highlighting the >100km remote district challenge!
    latitude: 19.0740,
    longitude: 82.0080,
    is24x7: false,
    lastUpdated: '5 hours ago',
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
  }
];

export const INITIAL_DONORS: Donor[] = ([
  {
    id: 'dn-1',
    name: 'Aakash Verma',
    bloodGroup: 'O-' as BloodGroup,
    phone: '+91 98765 43210',
    city: 'Nava Raipur',
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
    city: 'Raipur',
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
    city: 'Nava Raipur',
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
    city: 'Raipur',
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
    city: 'Atal Nagar',
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
    city: 'Raipur',
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
    city: 'Dhamtari Gate',
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
    city: 'Civil Lines, Raipur',
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

/**
 * Creates an emergency WhatsApp deep-link message
 */
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
  const message = `🚨 *URGENT BLOOD REQUEST (via RakhtKhoj)* 🚨\n\n` +
    `*Patient Name:* ${patientName}\n` +
    `*Required Blood Group:* ${bloodGroup} (${units} Unit${units > 1 ? 's' : ''})\n` +
    `*Acceptable Compatible Types:* ${compatibleStr}\n` +
    `*Hospital:* ${hospital}, ${city}\n` +
    `*Emergency Contact:* ${contactPhone}\n\n` +
    `If you or anyone you know is in ${city} and eligible to donate, please respond immediately or contact ${contactPhone}.\n\n` +
    `Verified via RakhtKhoj Emergency Network.`;

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
