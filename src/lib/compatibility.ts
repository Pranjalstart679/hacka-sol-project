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

  const lastDate = Date.parse(lastDonationDateStr + 'T00:00:00Z');
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const cooldownDays = 90;
  if (!Number.isFinite(lastDate) || new Date(lastDate).toISOString().slice(0, 10) !== lastDonationDateStr) {
    return { isEligible: false, cooldownDaysRemaining: cooldownDays };
  }

  const elapsedDays = (today - lastDate) / 86_400_000;
  const cooldownDaysRemaining = Math.max(0, cooldownDays - elapsedDays);
  return { isEligible: cooldownDaysRemaining === 0, cooldownDaysRemaining };
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
