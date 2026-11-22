import { BloodGroup } from '../types';

/**
 * Red Blood Cell (RBC) Compatibility Matrix
 * Key: Recipient Blood Group
 * Value: Array of Donor Blood Groups that can safely donate to the recipient
 */
export const COMPATIBILITY_RULES: Record<BloodGroup, BloodGroup[]> = {
  'O-': ['O-'],
  'O+': ['O+', 'O-'],
  'A-': ['A-', 'O-'],
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'AB-': ['AB-', 'A-', 'B-', 'O-'],
  'AB+': ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-']
};

/**
 * Returns all donor blood types compatible with a patient's blood type.
 */
export function getCompatibleDonorGroups(recipient: BloodGroup): BloodGroup[] {
  return COMPATIBILITY_RULES[recipient] || [recipient];
}

/**
 * Returns all recipient blood types a given donor can donate to.
 */
export function getWhoCanReceiveFrom(donor: BloodGroup): BloodGroup[] {
  const recipients: BloodGroup[] = [];
  (Object.keys(COMPATIBILITY_RULES) as BloodGroup[]).forEach((recipient) => {
    if (COMPATIBILITY_RULES[recipient].includes(donor)) {
      recipients.push(recipient);
    }
  });
  return recipients;
}

/**
 * 90-day cooldown calculation for blood donation rules (ICMR / NBTC standard).
 */
export function calculateDonorEligibility(lastDonationDateStr: string): {
  isEligible: boolean;
  cooldownDaysRemaining: number;
} {
  if (!lastDonationDateStr) {
    return { isEligible: true, cooldownDaysRemaining: 0 };
  }

  const lastDate = new Date(lastDonationDateStr);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const MIN_COOLDOWN_DAYS = 90;

  if (diffDays >= MIN_COOLDOWN_DAYS) {
    return { isEligible: true, cooldownDaysRemaining: 0 };
  } else {
    return { isEligible: false, cooldownDaysRemaining: MIN_COOLDOWN_DAYS - diffDays };
  }
}

/**
 * Real Haversine Great-Circle Distance Calculation between two GPS coordinates (in km).
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}
