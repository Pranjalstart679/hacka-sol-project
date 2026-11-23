import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { calculateDonorEligibility } from '../lib/compatibility';
import type { BloodGroup, Donor } from '../types';

interface DonorRegistrationProps {
  donors: Donor[];
  onDonorRegistered: (donor: Donor) => void;
  onGoToRewards: () => void;
}

const bloodGroups: BloodGroup[] = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
const fieldStyle = 'mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-base focus:border-red-700 focus:outline-red-700';
const choiceStyle = 'block cursor-pointer rounded-lg border border-neutral-300 px-2 py-3 text-center peer-checked:border-red-700 peer-checked:bg-red-50 peer-checked:font-bold peer-checked:text-red-800 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2';

function indianMobile(input: string) {
  const compact = input.replace(/[\s()-]/g, '');
  const match = /^(?:\+91|91|0)?(\d{10})$/.exec(compact);
  return match ? '+91' + match[1] : '';
}

export function DonorRegistration({ donors, onDonorRegistered, onGoToRewards }: DonorRegistrationProps) {
  const [history, setHistory] = useState('');
  const [lastDonation, setLastDonation] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [registered, setRegistered] = useState<Donor | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const now = new Date();
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
  const donationDate = history === 'previous' ? lastDonation : '';
  const eligibility = calculateDonorEligibility(donationDate);
  const showAvailability = history === 'first' || (donationDate !== '' && donationDate <= today);

  useEffect(() => {
    heading.current?.focus();
  }, [registered]);

  function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const phone = indianMobile(String(fields.get('phone')));
    const duplicate = phone && donors.some(donor => indianMobile(donor.phone) === phone);
    if (!phone || duplicate) {
      setPhoneError(duplicate
        ? 'This number already belongs to a donor in this session.'
        : 'Enter a 10-digit Indian number. You can include +91, spaces or hyphens.');
      form.querySelector<HTMLInputElement>('[name="phone"]')?.focus();
      return;
    }

    const name = String(fields.get('name')).trim();
    const bloodGroup = bloodGroups.find(group => group === fields.get('bloodGroup'));
    if (!bloodGroup) return;

    const donor: Donor = {
      id: 'dn-' + (crypto.randomUUID?.() ?? Date.now().toString()),
      name,
      bloodGroup,
      phone,
      city: String(fields.get('city')).trim(),
      distanceKm: 3.2, // Illustrative distance used in the session's demo matches.
      lastDonationDate: donationDate,
      ...eligibility,
      donationsCount: history === 'previous' ? 1 : 0,
      referralCode: name.toUpperCase().replace(/\s+/g, '') + '-' + bloodGroup.replace('+', 'POS').replace('-', 'NEG'),
    };
    onDonorRegistered(donor);
    setRegistered(donor);
  }

  function startAnother() {
    setHistory('');
    setLastDonation('');
    setPhoneError('');
    setRegistered(null);
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <header className="border-b border-neutral-200 px-5 py-6 sm:px-9 sm:py-8">
          {registered && <CheckCircle2 aria-hidden className="mb-3 h-7 w-7 text-emerald-700" />}
          <h1 ref={heading} tabIndex={-1} className="font-display text-4xl font-bold tracking-tight focus:outline-none">
            {registered ? 'Donor profile added' : 'Register a donor'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            {registered ? 'This profile stays in the demo roster until you refresh the page.'
              : 'Use fictional details to try donor matching. This demo keeps the profile in your browser until you refresh.'}
          </p>
        </header>

        {registered ? (
          <div className="space-y-6 p-5 sm:p-9">
            <div className="flex items-center gap-4">
              <span className="rounded-xl bg-red-50 px-4 py-3 font-display text-3xl font-bold text-red-800">{registered.bloodGroup}</span>
              <div className="min-w-0 break-words">
                <h2 className="font-display text-2xl font-bold">{registered.name}</h2>
                <p className="text-sm text-neutral-600">{registered.city}</p>
              </div>
            </div>
            <dl className="space-y-3 rounded-xl bg-neutral-50 p-4 text-sm">
              <div><dt className="text-neutral-600">Demo matching status</dt><dd className="font-semibold">{registered.isEligible ? 'Available for matching requests' : 'On cooldown · ' + registered.cooldownDaysRemaining + ' days remaining'}</dd></div>
              <div><dt className="text-neutral-600">Contact number</dt><dd>{registered.phone}</dd></div>
              <div><dt className="text-neutral-600">Referral code</dt><dd className="break-all font-mono">{registered.referralCode}</dd></div>
            </dl>
            <div className="flex flex-wrap gap-3">
              <button onClick={startAnother} className="rounded-lg bg-neutral-900 px-4 py-3 text-sm font-semibold text-white">Register another donor</button>
              <button onClick={onGoToRewards} className="rounded-lg border border-neutral-300 px-4 py-3 text-sm font-semibold">View milestones</button>
            </div>
          </div>
        ) : (
          <form onSubmit={register} autoComplete="off" className="space-y-6 p-5 text-sm sm:p-9">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="font-medium">Donor name
                <input name="name" required pattern={'.*\\S.*'} title="Enter a name." maxLength={100} className={fieldStyle} placeholder="e.g. Asha Sharma" />
              </label>
              <label className="font-medium">City or area
                <input name="city" required pattern={'.*\\S.*'} title="Enter a city or area." maxLength={100} className={fieldStyle} placeholder="e.g. Nava Raipur" />
              </label>
            </div>
            <div>
              <label htmlFor="donor-phone" className="font-medium">Indian mobile number</label>
              <input id="donor-phone" name="phone" type="tel" required maxLength={25} placeholder="+91 98765 43210"
                aria-invalid={Boolean(phoneError)} aria-describedby={phoneError ? 'phone-error' : undefined}
                onChange={() => setPhoneError('')} className={fieldStyle} />
              {phoneError && <p id="phone-error" role="alert" className="mt-1.5 text-sm text-red-700">{phoneError}</p>}
            </div>
            <fieldset>
              <legend className="mb-2 font-medium">Blood group</legend>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                {bloodGroups.map(group => (
                  <label key={group}>
                    <input type="radio" className="peer sr-only" name="bloodGroup" value={group} required />
                    <span className={choiceStyle}>{group}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="border-t border-neutral-200 pt-4">
              <legend className="pr-2 font-medium">Has this donor given whole blood before?</legend>
              <div className="grid grid-cols-2 gap-2">
                {[['first', 'First-time donor'], ['previous', 'Donated before']].map(([value, label]) => (
                  <label key={value}>
                    <input type="radio" name="history" value={value} checked={history === value}
                      onChange={() => setHistory(value)} required className="peer sr-only" />
                    <span className={choiceStyle}>{label}</span>
                  </label>
                ))}
              </div>
              {history === 'previous' && (
                <label className="mt-4 block font-medium">Last whole blood donation
                  <input type="date" required max={today} value={lastDonation} onChange={e => setLastDonation(e.target.value)} className={fieldStyle} />
                </label>
              )}
              <p aria-live="polite" className="mt-2 text-sm text-neutral-600">
                {showAvailability ? (eligibility.isEligible ? 'Available for matching in this demo.'
                  : 'You can register now. The demo cooldown has ' + eligibility.cooldownDaysRemaining + ' days remaining.')
                  : 'The demo uses a 90-day interval between donations.'}
              </p>
            </fieldset>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800">
              Add demo donor <ArrowRight aria-hidden className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
