import amaraPhoto from '@/assets/amara.jpg'
import ariaPhoto from '@/assets/aria.jpg'
import hanaPhoto from '@/assets/hana.jpg'
import helgaPhoto from '@/assets/helga.jpg'
import kwamePhoto from '@/assets/kwame.jpg'
import matteoPhoto from '@/assets/matteo.jpg'
// Dr. Noor Farouk is not part of the 5 named team members, but was
// invented to cover the "Women's Health" specialty. A real (AI-generated)
// portrait was supplied on 2026-08-13, replacing the earlier generic
// placeholder.
import noorPhoto from '@/assets/noor.jpg'
// Dr. Sofia Ramirez (Nutrition) and Dr. Amara Bello (Dermatology, skin-of-
// color specialist) requested 2026-08-14 to fill the two specialty filter
// chips ("Nutrition", "Dermatology") that previously had no matching
// doctor. AI-generated portraits (Gamma), saved 2026-08-14.
import sofiaPhoto from '@/assets/sofia.jpg'

/**
 * Shared doctor roster — img, name, filter key, and profile slug stay
 * fixed across languages; specialty label, availability, experience, bio,
 * education, languages spoken, conditions treated, and reviews are
 * localized via t.pages.doctors.doctors, matched by array index (same
 * pattern used throughout this file's callers).
 *
 * 2026-08-14: extracted from routes/doctors.tsx into its own module so it
 * can be shared with the new routes/doctors.$doctorId.tsx profile route
 * without duplicating (and risking drift on) the roster.
 */
export interface DoctorMeta {
  slug: string
  img: string
  name: string
  specialtyKey: string
}

export const DOCTORS: DoctorMeta[] = [
  { slug: 'hana-sato', img: hanaPhoto, name: 'Dr. Hana Sato', specialtyKey: 'Neurology' },
  { slug: 'matteo-dubois', img: matteoPhoto, name: 'Dr. Matteo Dubois', specialtyKey: 'Therapy' },
  { slug: 'aria-vance', img: ariaPhoto, name: 'Dr. Aria Vance', specialtyKey: 'Cardiology' },
  { slug: 'kwame-mbeki', img: kwamePhoto, name: 'Dr. Kwame Mbeki', specialtyKey: 'Pediatrics' },
  { slug: 'helga-brooks', img: helgaPhoto, name: 'Dr. Helga Brooks', specialtyKey: 'General Practice' },
  { slug: 'noor-farouk', img: noorPhoto, name: 'Dr. Noor Farouk', specialtyKey: "Women's Health" },
  { slug: 'sofia-ramirez', img: sofiaPhoto, name: 'Dr. Sofia Ramirez', specialtyKey: 'Nutrition' },
  { slug: 'amara-bello', img: amaraPhoto, name: 'Dr. Amara Bello', specialtyKey: 'Dermatology' },
]
