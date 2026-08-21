/**
 * Canonical English dictionary. This also preserves the original
 * "protected copy" (hero/team/benefits) byte-for-byte as the EN
 * translation — nothing was lost when the site became multilingual,
 * per the user's explicit decision (2026-08-13) to translate every
 * string, protected copy included, with French as the default locale.
 */
export const en = {
  meta: {
    title: 'Pelmatech — Your Personal Health Companion',
    description:
      'Pelmatech is a digital personal health companion that helps you understand, organize, monitor, and improve your health while keeping access to trusted professionals.',
  },

  common: {
    tryForFree: 'Try for Free',
    scheduleDemo: 'Schedule Demo',
    getStarted: 'Get Started',
    bookAppointment: 'Book Appointment',
    bookAppointmentAction: 'Book appointment',
    findDoctor: 'Find a Doctor',
    howTelehealthWorks: 'How Telehealth Works',
    buildHealthPlan: 'Build My Health Plan',
    exploreFitness: 'Explore Fitness',
    addMedication: 'Add Medication',
    sendMessage: 'Send Message',
    signIn: 'Sign In',
    forgotPassword: 'Forgot Password',
    createAccount: 'Create Account',
    back: 'Back',
    continueLabel: 'Continue',
    done: 'Done',
    backToTop: 'Back to top',
    logout: 'Log out',
  },

  nav: {
    home: 'Home',
    artists: 'Artists',
    releases: 'Releases',
    contact: 'Contact',
    menu: 'Menu',
    closeMenu: 'Close menu',
    platform: 'Platform',
    doctors: 'Doctors',
    pricing: 'Pricing',
    about: 'About',
    faq: 'FAQ',
    login: 'Login',
    tagline: 'Your Personal Health Companion',
  },

  accountMenu: {
    label: 'Account',
    greeting: 'Hi,',
    dashboard: 'Dashboard',
    findADoctor: 'Find a doctor',
    settings: 'Settings',
  },

  hero: {
    titleLine1: 'Your Personal',
    titleLine2: 'Health Companion',
    description:
      'Meet your personal online health companion — a comprehensive platform offering tools for tracking your fitness goals, monitoring your nutrition, and scheduling your workouts.',
    footerLeft: 'Enterprise Management Applications',
    footerCenterCount: '01 / 04',
    footerCenterNext: 'Next',
    footerRight: 'Scroll to Explore',
  },

  team: {
    eyebrow1: 'Pelmatech',
    eyebrow2: 'Our Team',
    headingLine1: 'Get to Know the People',
    headingLine2: 'that Get It All Done',
    intro:
      'On our platform, our devoted team works ceaselessly to enhance our online presence and ensure the best possible customer experience.',
    prevAria: 'Previous team member',
    nextAria: 'Next team member',
    members: [
      { role: 'SURGEON GENERAL', name: 'Dr. Helga Brooks' },
      { role: 'PEDIATRICIAN', name: 'Dr. Kwame Mbeki' },
      { role: 'THERAPIST', name: 'Dr. Matteo Dubois' },
      { role: 'NEUROLOGIST', name: 'Dr. Hana Sato' },
      { role: 'CARDIOLOGIST', name: 'Dr. Aria Vance' },
    ],
  },

  benefits: {
    headingLine1: 'Explore the Benefits of',
    headingLine2: 'Our Platform',
    intro:
      'By choosing an online platform over an offline one, artists can reach a global audience more easily, connect with fans worldwide, and shape the future of music in a dynamic way.',
    cards: [
      {
        number: '01',
        title: 'Unavailable',
        body: 'We understand that there may be times when a doctor is not available to assist you.',
      },
      {
        number: '02',
        title: 'Unethical',
        body: "When a doctor lacks integrity, they may prescribe medications for promotional purposes instead of the patient's actual needs, leading to serious consequences for health.",
      },
      {
        number: '03',
        title: 'Waitlist',
        body: 'Patients may experience long waiting times, sometimes for hours, before receiving assistance from the doctor.',
      },
    ],
  },

  featuresSection: {
    eyebrow1: 'Pelmatech',
    eyebrow2: 'Your Health, Connected',
    headingLine1: 'Everything your health needs,',
    headingLine2: 'in one connected place.',
    description:
      'From daily wellness tracking to appointments and health records, Pelmatech helps bring the pieces of your care together.',
    pillars: [
      { number: '01', title: 'Health Tracking', body: 'Keep every vital sign, habit, and trend in one clear picture.' },
      { number: '02', title: 'Appointments', body: 'Book, reschedule, and join visits without the back-and-forth.' },
      { number: '03', title: 'Nutrition', body: 'Log meals and stay aligned with your personal targets.' },
      { number: '04', title: 'Fitness', body: 'Plan workouts and track activity as your routine evolves.' },
    ],
  },

  doctorDiscovery: {
    headingLine1: 'Find the right professional',
    headingLine2: 'for the right moment.',
    description:
      'Browse specialties, check real availability, and book with a professional who matches how you want to be cared for.',
    specialties: [
      'General Practice',
      'Pediatrics',
      'Cardiology',
      'Neurology',
      'Therapy',
      'Nutrition',
      'Dermatology',
      "Women's Health",
    ],
    doctors: [
      { name: 'Dr. Helga Brooks', specialty: 'General Practice', availability: 'Next available: Today', experience: '20 yrs' },
      { name: 'Dr. Hana Sato', specialty: 'Neurologist', availability: 'Next available: Today', experience: '12 yrs' },
      { name: 'Dr. Matteo Dubois', specialty: 'Therapist', availability: 'Next available: Tomorrow', experience: '8 yrs' },
      { name: 'Dr. Aria Vance', specialty: 'Cardiologist', availability: 'Next available: Today', experience: '15 yrs' },
      { name: 'Dr. Kwame Mbeki', specialty: 'Pediatrician', availability: 'Next available: Fri', experience: '10 yrs' },
    ],
  },

  healthTracking: {
    headingLine1: "Know how you're doing.",
    headingLine2: "Not just how you're feeling.",
    description:
      'Track the health signals that matter to you and keep a clear picture of your progress over time.',
    signals: ['Activity', 'Heart rate', 'Sleep', 'Weight', 'Hydration', 'Wellness trends'],
    metrics: [
      { value: '8,240', label: 'Steps today' },
      { value: '72 bpm', label: 'Resting heart rate' },
      { value: '7h 42m', label: 'Sleep' },
      { value: '2.1 L', label: 'Hydration' },
    ],
    imageAlt: 'Smartwatch displaying resting heart rate',
  },

  telehealth: {
    heading: 'Care, when you need it.',
    description:
      'Connect with qualified health professionals without losing hours to travel, waiting rooms, or scheduling friction.',
    points: ['Secure video appointments', 'Verified professionals', 'Flexible scheduling', 'Follow-up messaging'],
    imageAlt: 'Telehealth video consultation',
  },

  personalPlan: {
    headingLine1: 'A plan that changes',
    headingLine2: 'when your life does.',
    description:
      'Pelmatech brings your goals, routines, health data, and professional guidance into a plan you can actually follow.',
    items: ['Daily goals', 'Nutrition targets', 'Movement plan', 'Medication schedule', 'Appointment reminders', 'Progress reviews'],
  },

  testimonials: {
    headingLine1: 'Health feels different',
    headingLine2: "when you're not doing it alone.",
    prevAria: 'Previous testimonial',
    nextAria: 'Next testimonial',
    // Screen-reader-only counter announced alongside the carousel.
    // {current} / {total} are replaced at render time.
    counterLabel: 'Testimonial {current} of {total}',
    items: [
      {
        quote:
          "I finally have one place where I can understand my appointments, habits, and goals without jumping between five different apps.",
        name: 'Sofia, 30s',
        meta: 'Using Pelmatech for health tracking & telehealth',
      },
      {
        quote:
          'Booking a same-day consultation used to be the hardest part of getting help. Now it takes two minutes.',
        name: 'Marcus, 40s',
        meta: 'Uses Pelmatech for appointments & medications',
      },
      {
        quote:
          "My care team and my own tracking finally talk to each other. It changed how seriously I take my check-ins.",
        name: 'Elena, 50s',
        meta: 'Uses Pelmatech for family care',
      },
    ],
  },

  security: {
    headingLine1: 'Your health information',
    headingLine2: 'deserves serious protection.',
    description: 'Designed with strong privacy and security practices at every layer of the platform.',
    points: [
      'Encrypted data',
      'Secure authentication',
      'Privacy controls',
      'Clear permissions',
      'Protected professional communication',
    ],
  },

  appPreview: {
    headingLine1: 'Your health companion,',
    headingLine2: 'wherever you are.',
    highlights: ['Daily dashboard', 'Appointment notifications', 'Medication reminders', 'Health goals', 'Doctor messaging'],
    imageAlt: 'Checking the Pelmatech app on a phone while out and about',
  },

  faqHome: {
    headingLine1: 'Questions,',
    headingLine2: 'answered clearly.',
    description:
      'Pelmatech is designed to support everyday health management and communication. It does not replace emergency services or professional medical diagnosis.',
    items: [
      {
        question: 'What is Pelmatech?',
        answer:
          'Pelmatech is a digital personal health companion that helps you understand, organize, monitor, and improve your health while keeping access to trusted professionals.',
      },
      {
        question: 'Can I book appointments online?',
        answer:
          'Yes. You can choose a specialty, select a professional, pick a time, and join your appointment directly through Pelmatech.',
      },
      {
        question: 'Can Pelmatech replace my doctor?',
        answer:
          'No. Pelmatech is designed to support everyday health management and communication. It does not replace emergency services or professional medical diagnosis.',
      },
      {
        question: 'How does health tracking work?',
        answer:
          'Pelmatech brings together the health signals that matter to you — activity, heart rate, sleep, weight, hydration, and wellness trends — into one clear view.',
      },
      {
        question: 'Can I manage medications?',
        answer: 'Yes. Keep medications organized with schedules, reminders, refill awareness, and a clear history.',
      },
      {
        question: 'How is my information protected?',
        answer:
          'Pelmatech is designed with strong privacy and security practices, including encrypted data, secure authentication, and clear permission controls.',
      },
      {
        question: 'Can I use Pelmatech for family members?',
        answer: 'Yes, family care tools let you help coordinate health management for the people who depend on you.',
      },
    ],
  },

  finalCta: {
    headingLine1: 'Take better care',
    headingLine2: 'of your everyday health.',
    description: 'Start building a clearer, more connected view of your health with Pelmatech.',
  },

  footer: {
    columns: [
      { title: 'Platform', links: ['Health Tracking', 'Appointments', 'Nutrition', 'Fitness', 'Medications'] },
      { title: 'Company', links: ['About', 'Our Team', 'Careers', 'Contact'] },
      { title: 'Professionals', links: ['Join Pelmatech', 'Doctor Portal', 'Resources'] },
      { title: 'Support', links: ['Help Center', 'FAQ', 'Accessibility'] },
      { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
    ],
    copyright: '© Pelmatech',
    tagline: 'Your Personal Health Companion',
  },

  mobileMenu: {
    brand: 'Pelmatech',
    tagline: 'Your Personal Health Companion',
  },

  pages: {
    platform: {
      heading: ['Your health,', 'organized around you.'],
      description: 'Every part of the Pelmatech platform, in one place — designed to work together instead of living in separate apps.',
      capabilities: [
        { title: 'Dashboard', body: 'A single daily view of your health, appointments, and goals.' },
        { title: 'Health Tracking', body: 'Activity, heart rate, sleep, weight, hydration, and trends.' },
        { title: 'Appointments', body: 'Book, reschedule, and join visits without the back-and-forth.' },
        { title: 'Nutrition', body: 'Meal logging, macro tracking, and personal targets.' },
        { title: 'Fitness', body: 'Workout scheduling, activity tracking, and recovery.' },
        { title: 'Medication', body: 'Schedules, reminders, refill awareness, and history.' },
        { title: 'Health Records', body: 'A clear, organized record of your care over time.' },
        { title: 'Notifications', body: 'Reminders that keep you on track without the noise.' },
      ],
    },
    doctors: {
      heading: ['Find the right professional', 'for the right moment.'],
      description: 'Filter by specialty, check real availability, and book directly with a professional you trust.',
      allSpecialty: 'All',
      // Translated specialty filter chip labels. Order matches the stable,
      // untranslated SPECIALTY_KEYS list in routes/doctors.tsx (used
      // internally for filter matching) — do not reorder independently.
      specialties: [
        'General Practice',
        'Pediatrics',
        'Cardiology',
        'Neurology',
        'Therapy',
        'Nutrition',
        'Dermatology',
        "Women's Health",
      ],
      // Translated per-doctor specialty/availability/experience text.
      // Order matches the DOCTORS array in data/doctors.ts (name, photo,
      // and profile slug stay in code; only display text is localized
      // here). 2026-08-14: extended with bio/education/languages/
      // conditions/reviews for the new /doctors/$doctorId profile pages —
      // specialty/availability/experience are unchanged and still power
      // the /doctors listing.
      doctors: [
        {
          specialty: 'Neurology',
          availability: 'Next available: Today',
          experience: '12 yrs',
          bio: 'Dr. Sato specializes in headache disorders, epilepsy, and sleep-related neurological conditions. She takes a methodical, evidence-based approach and makes sure every patient leaves with a clear plan, not just a diagnosis.',
          education: 'MD, Neurology Residency — University of Tokyo Hospital',
          languages: ['Japanese', 'English'],
          conditions: ['Migraines & chronic headaches', 'Epilepsy', 'Sleep disorders', 'Nerve pain & neuropathy'],
          reviews: [
            { quote: "Dr. Sato finally figured out what years of doctors couldn't — my migraines are under control for the first time.", name: 'Julien P.', meta: 'Patient since 2024' },
            { quote: "Calm, thorough, and she actually explains what's happening in my brain in plain language.", name: 'Mei L.', meta: 'Patient since 2023' },
          ],
        },
        {
          specialty: 'Therapy',
          availability: 'Next available: Tomorrow',
          experience: '8 yrs',
          bio: 'Dr. Dubois works with adults navigating anxiety, burnout, and major life transitions. His sessions blend cognitive-behavioral techniques with a genuinely warm, no-judgment approach.',
          education: 'MSc Clinical Psychology — Université de Genève',
          languages: ['French', 'Italian', 'English'],
          conditions: ['Anxiety & stress', 'Burnout recovery', 'Relationship counseling', 'Life transitions'],
          reviews: [
            { quote: 'I was skeptical about therapy over video calls — Matteo changed my mind completely.', name: 'Camille R.', meta: 'Patient since 2024' },
            { quote: 'He gives me tools I actually use, not just someone to vent to.', name: 'Diego M.', meta: 'Patient since 2022' },
          ],
        },
        {
          specialty: 'Cardiology',
          availability: 'Next available: Today',
          experience: '15 yrs',
          bio: 'Dr. Vance treats hypertension, arrhythmia, and post-cardiac-event recovery, with a focus on long-term prevention over one-off fixes. Patients describe her as direct, reassuring, and easy to reach between visits.',
          education: 'MD, Cardiology Fellowship — Johns Hopkins Hospital',
          languages: ['English', 'Spanish'],
          conditions: ['Hypertension', 'Arrhythmia', 'Post-cardiac event follow-up', 'Cholesterol management'],
          reviews: [
            { quote: "After my father's heart attack, Dr. Vance managed his recovery like it was her own family.", name: 'Ines T.', meta: 'Family caregiver' },
            { quote: 'She caught an irregular rhythm my previous cardiologist missed for two years.', name: 'Thomas B.', meta: 'Patient since 2021' },
          ],
        },
        {
          specialty: 'Pediatrics',
          availability: 'Next available: Fri',
          experience: '10 yrs',
          bio: 'Dr. Mbeki cares for children from infancy through adolescence, from routine checkups to more complex growth and development concerns. Parents consistently note how patient he is with anxious kids.',
          education: 'MD, Pediatrics — University of Cape Town',
          languages: ['English', 'Zulu', 'French'],
          conditions: ['Well-child visits', 'Vaccinations', 'Growth & development', 'Common childhood illnesses'],
          reviews: [
            { quote: 'My daughter actually looks forward to her check-ups now — that says everything.', name: 'Léa F.', meta: 'Parent' },
            { quote: 'Patient, thorough, and never rushes us out the door.', name: 'Karim S.', meta: 'Parent' },
          ],
        },
        {
          specialty: 'General Practice',
          availability: 'Next available: Today',
          experience: '20 yrs',
          bio: "Dr. Brooks is Pelmatech's chief physician and often patients' first point of contact — coordinating everything from annual checkups to referrals across specialists. Two decades of practice show in how quickly she gets to the root of a concern.",
          education: 'MD — Charité – Universitätsmedizin Berlin',
          languages: ['German', 'English', 'French'],
          conditions: ['Annual checkups', 'Chronic disease management', 'Preventive care', 'Specialist referral coordination'],
          reviews: [
            { quote: "She's the doctor who remembers your whole history, not just today's complaint.", name: 'Noah G.', meta: 'Patient since 2020' },
            { quote: 'Dr. Brooks coordinated three specialists for me without me having to chase a single referral.', name: 'Priya K.', meta: 'Patient since 2022' },
          ],
        },
        {
          specialty: "Women's Health",
          availability: 'Next available: Mon',
          experience: '9 yrs',
          bio: "Dr. Farouk focuses on reproductive health at every life stage, from prenatal care to menopause management. She's known for taking the time to answer questions other visits rush past.",
          education: 'MD, Obstetrics & Gynecology — American University of Beirut',
          languages: ['Arabic', 'English', 'French'],
          conditions: ['Reproductive health', 'Prenatal care', 'Menopause management', 'Contraception counseling'],
          reviews: [
            { quote: "First doctor who didn't make me feel rushed through questions about my own body.", name: 'Amina Z.', meta: 'Patient since 2023' },
            { quote: 'She walked me through my entire pregnancy with so much patience.', name: 'Chloé D.', meta: 'Patient since 2024' },
          ],
        },
        {
          specialty: 'Nutrition',
          availability: 'Next available: Wed',
          experience: '9 yrs',
          bio: 'Dr. Ramirez builds practical, sustainable eating plans for weight management, diabetes, and sports performance — not generic meal plans copy-pasted between patients.',
          education: 'MSc Clinical Nutrition — Universidad Autónoma de Madrid',
          languages: ['Spanish', 'English', 'Portuguese'],
          conditions: ['Weight management', 'Diabetes-friendly meal planning', 'Sports nutrition', 'Food intolerances'],
          reviews: [
            { quote: 'First nutritionist who gave me a plan that survived contact with my actual life.', name: 'Marco V.', meta: 'Patient since 2024' },
            { quote: 'Lost 12kg without ever feeling like I was on a diet.', name: 'Hannah W.', meta: 'Patient since 2023' },
          ],
        },
        {
          specialty: 'Dermatology',
          availability: 'Next available: Thu',
          experience: '14 yrs',
          bio: 'Dr. Bello specializes in skin-of-color dermatology, from acne and hyperpigmentation to scalp and hair disorders — a focus still underserved in most clinics.',
          education: 'MD, Dermatology Residency — Howard University Hospital',
          languages: ['English', 'Yoruba', 'French'],
          conditions: ['Acne & hyperpigmentation', 'Eczema', 'Skin-of-color dermatology', 'Scalp & hair disorders'],
          reviews: [
            { quote: 'The first dermatologist who actually understood my skin instead of guessing.', name: 'Fatou N.', meta: 'Patient since 2022' },
            { quote: "Cleared up hyperpigmentation three other doctors couldn't.", name: 'Robert A.', meta: 'Patient since 2024' },
          ],
        },
      ],
    },
    // Static (non-per-doctor) labels for the /doctors/$doctorId profile
    // page, added 2026-08-14 alongside the per-doctor bio/education/
    // languages/conditions/reviews fields above.
    doctorProfile: {
      backToDoctors: 'All doctors',
      bioHeading: 'About',
      educationHeading: 'Education',
      languagesHeading: 'Languages spoken',
      conditionsHeading: 'Conditions treated',
      reviewsHeading: 'Patient reviews',
      notFoundHeading: 'Doctor not found',
      notFoundBody: "We couldn't find a profile for this doctor.",
      notFoundCta: 'Browse all doctors',
    },
    pricing: {
      heading: ['Plans for however', 'you want to be cared for.'],
      description: 'Pricing details are being finalized — reach out and our team will help you find the right plan.',
      plans: [
        {
          name: 'Free',
          price: 'Coming Soon',
          description: 'Get started with the essentials of everyday health tracking.',
          features: ['Basic health tracking', 'Appointment booking', 'FAQ & help center'],
        },
        {
          name: 'Personal',
          price: 'Contact for pricing',
          description: 'The full platform for one person, including telehealth and plans.',
          features: ['Everything in Free', 'Telehealth consultations', 'Personal health plan', 'Medication management'],
        },
        {
          name: 'Family',
          price: 'Contact for pricing',
          description: 'Coordinate health management for everyone who depends on you.',
          features: ['Everything in Personal', 'Family care tools', 'Shared appointment calendar', 'Priority support'],
        },
      ],
    },
    about: {
      heading: ['A personal health companion,', 'built around trust.'],
      sections: [
        {
          title: 'Why Pelmatech exists',
          body: 'Healthcare is often fragmented across apps, waiting rooms, and paperwork. Pelmatech brings the pieces of everyday health management into one connected, human place.',
        },
        {
          title: 'Our approach',
          body: 'We pair clear, honest health tracking with real access to trusted professionals — never one without the other.',
        },
        {
          title: 'Technology and care',
          body: 'Every feature is built to support a real relationship with your health and your care team, not to replace it.',
        },
        {
          title: 'Our values',
          body: 'Calm over chaos, clarity over jargon, and trust earned through consistent, careful design.',
        },
      ],
    },
    contact: {
      heading: "Let's talk.",
      description:
        'Questions about Pelmatech, partnerships, or joining as a professional — send us a message and our team will follow up.',
      fields: { name: 'Name', email: 'Email', phone: 'Phone', reason: 'Reason for contact', message: 'Message' },
    },
    faq: {
      heading: ['Questions,', 'answered clearly.'],
      description:
        'Pelmatech is designed to support everyday health management and communication. It does not replace emergency services or professional medical diagnosis.',
      categories: [
        {
          name: 'Account',
          items: [
            { q: 'How do I create a Pelmatech account?', a: 'Select Create Account from the login page and follow the short setup flow — basic details, health goals, and preferences.' },
            { q: 'Can I use Pelmatech for family members?', a: 'Yes, family care tools let you help coordinate health management for the people who depend on you.' },
          ],
        },
        {
          name: 'Appointments',
          items: [
            { q: 'Can I book appointments online?', a: 'Yes. Choose a specialty, select a professional, pick a time, and join your appointment directly through Pelmatech.' },
            { q: 'Can I reschedule or cancel?', a: 'Yes, from the Appointments page you can manage upcoming, past, and cancelled visits.' },
          ],
        },
        {
          name: 'Health Tracking',
          items: [
            { q: 'How does health tracking work?', a: "Pelmatech brings together the health signals that matter to you — activity, heart rate, sleep, weight, hydration, and wellness trends — into one clear view." },
          ],
        },
        {
          name: 'Doctors',
          items: [
            { q: 'Can Pelmatech replace my doctor?', a: 'No. Pelmatech is designed to support everyday health management and communication. It does not replace emergency services or professional medical diagnosis.' },
          ],
        },
        {
          name: 'Privacy',
          items: [
            { q: 'How is my information protected?', a: 'Pelmatech is designed with strong privacy and security practices, including encrypted data, secure authentication, and clear permission controls.' },
          ],
        },
        {
          name: 'Billing',
          items: [
            { q: 'What does Pelmatech cost?', a: 'Pricing details are being finalized. Visit the Pricing page or contact us for current plan information.' },
          ],
        },
      ],
    },
    login: {
      heading: 'Welcome back',
      fields: { email: 'Email', password: 'Password' },
      errorFallback: 'Something went wrong. Please try again.',
      cta: 'Log in',
      loading: 'Logging in…',
    },
    signup: {
      steps: ['Account type', 'Personal details', 'Planora practice', 'Password'],
      roleHeading: 'How will you use Pelmatech?',
      roles: {
        patient: { label: 'I am a patient', body: 'Book real appointments, and soon manage your medical records securely.' },
        doctor: { label: 'I am a doctor', body: 'Get a professional dashboard and receive real appointments from patients.' },
      },
      fields: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        phone: 'Phone (optional)',
        password: 'Create password',
        specialtyKey: 'Specialty',
        planoraBookingSlug: 'Planora booking link (optional)',
        planoraBookingSlugHelp: "The public link to your practice's Planora booking page (e.g. \"dr-dubois\"). You can set this up later from your dashboard if you don't have it yet.",
      },
      submit: 'Create account',
      loading: 'Creating your account…',
      errorFallback: 'Something went wrong. Please try again.',
      confirmEmailHeading: 'Check your inbox',
      confirmEmailBody: "We've sent a confirmation link to your email address. Click it to activate your account, then log in.",
      goToLogin: 'Go to login',
    },
    // 2026-08-27: shared sign in / sign up card (AuthCard.tsx) — the two
    // tabs slide between the same panel instead of navigating to separate
    // pages, so copy for both views lives in one place.
    authCard: {
      signInTab: 'Sign in',
      signUpTab: 'Sign up',
      welcomeHeading: 'Welcome back.',
      welcomeBody: 'Enter your details to access your dashboard.',
      joinHeading: 'Create your account.',
      joinBody: 'Join Pelmatech in just a few steps.',
      newHereText: 'New here?',
      newHereCta: 'Create an account',
      alreadyHaveAccountText: 'Already have an account?',
      alreadyHaveAccountCta: 'Sign in',
    },
    dashboard: {
      greetingHello: 'Good morning',
      greeting: ['Good morning, Alex.', "Here's your health today."],
      metrics: [
        { value: '86', label: 'Daily score' },
        { value: '6,420', label: 'Activity (steps)' },
        { value: '7h 10m', label: 'Sleep' },
        { value: '1.6 L', label: 'Hydration' },
      ],
      upcomingAppointments: 'Upcoming appointments',
      medicationReminders: 'Medication reminders',
      nutritionGoal: 'Nutrition goal',
      nutritionGoalValue: '1,840 / 2,100 kcal',
      todaysWorkout: "Today's workout",
      todaysWorkoutValue: '30 min — Mobility',
      sampleAppointment: { doctor: 'Dr. Hana Sato', specialty: 'Neurologist', date: 'Aug 15', time: '10:30 AM', consultationType: 'Video', status: 'Upcoming' },
      sampleMedications: [
        { name: 'Vitamin D — 1 tablet', time: '08:00' },
        { name: 'Atorvastatin — 20mg', time: '21:00' },
      ],
    },
    appointments: {
      heading: ['Book care without', 'the back-and-forth.'],
      steps: [
        { number: '01', label: 'Choose a specialty' },
        { number: '02', label: 'Select a professional' },
        { number: '03', label: 'Pick a time' },
        { number: '04', label: 'Join your appointment' },
      ],
      tabs: { upcoming: 'Upcoming', past: 'Past', cancelled: 'Cancelled' },
      // 2026-08-20: replaced the static demo `items` array with real data
      // from listMyAppointmentsAction — statusLabels map the raw DB status
      // ('pending'/'confirmed'/'cancelled') to display text.
      statusLabels: { pending: 'Pending', confirmed: 'Confirmed', cancelled: 'Cancelled' },
      noAppointments: 'No appointments in this category.',
      loadError: 'Could not load your appointments. Please try again.',
      cancelCta: 'Cancel',
      cancelling: 'Cancelling…',
      cancelError: 'Could not cancel this appointment. Please try again.',
      bookNewCta: 'Book appointment',
    },
    findADoctor: {
      heading: ['Find a doctor', 'available to book.'],
      description: "These doctors have set up their Planora practice and accept real bookings directly through Pelmatech.",
      empty: 'No doctors are available to book right now. Check back soon.',
      loadError: 'Could not load the doctor list. Please try again.',
      bookCta: 'Book',
    },
    book: {
      back: 'Back',
      notFoundHeading: 'Doctor not found',
      notFoundBody: "We couldn't find a profile for this doctor.",
      notConfiguredHeading: 'Booking unavailable',
      notConfiguredBody: "This doctor hasn't set up their booking availability yet.",
      unreachableHeading: 'Booking temporarily unavailable',
      unreachableBody: 'Could not load availability right now. Please try again later.',
      serviceHeading: 'Choose a service',
      dateHeading: 'Pick a time',
      noSlots: 'No slots available right now.',
      noteLabel: 'Note for the doctor (optional)',
      notePlaceholder: 'Add details about the reason for your visit…',
      confirmCta: 'Confirm appointment',
      booking: 'Booking…',
      bookingErrorFallback: 'Could not book this slot. Please try again.',
      successHeading: 'Appointment booked',
      successConfirmedBody: 'Your appointment is confirmed.',
      successPendingBody: "Your appointment request has been sent and is awaiting confirmation from the practice.",
      successVerificationBody: 'Check your inbox — a confirmation link was sent to finalize this appointment.',
      backToAppointments: 'View my appointments',
    },
    // 2026-08-26: landing page for Planora's booking-confirmation email
    // link, now hosted on Pelmatech (see appointments_.confirm.$token.tsx)
    // so confirming a booking never sends the patient off to Planora's
    // own site.
    confirmAppointment: {
      confirmedHeading: 'Appointment confirmed',
      confirmedBody: 'Your appointment is confirmed.',
      pendingHeading: 'Confirmation received',
      pendingBody: 'Thanks — the practice still needs to validate this appointment, you will be contacted.',
      conflictHeading: 'Slot no longer available',
      conflictBody: 'This slot was taken in the meantime. Please book again.',
      invalidHeading: 'Invalid confirmation link',
      invalidBody: 'This link is invalid or has already been used.',
      errorHeading: 'Confirmation failed',
      errorBody: 'Something went wrong confirming this appointment. Please try again.',
      backToAppointments: 'View my appointments',
    },
    // 2026-08-26: click-to-expand appointment detail modal, shared by the
    // patient dashboard, the patient appointments list, and the doctor
    // dashboard — lets either side see the other's details and, if
    // needed, reschedule (e.g. a doctor with a conflict, or a patient who
    // can't make it).
    appointmentDetail: {
      title: 'Appointment details',
      close: 'Close',
      loadError: 'Could not load this appointment. Please try again.',
      doctorLabel: 'Doctor',
      patientLabel: 'Patient',
      serviceLabel: 'Service',
      dateLabel: 'Date',
      timeLabel: 'Time',
      statusLabel: 'Status',
      phoneLabel: 'Phone',
      phoneUnavailable: 'Not shared',
      rescheduleCta: 'Reschedule',
      rescheduleHeading: 'Pick a new time',
      rescheduleCancel: 'Cancel',
      rescheduleConfirm: 'Confirm new time',
      rescheduling: 'Rescheduling…',
      rescheduleSuccess: 'Appointment moved to the new time.',
      rescheduleErrorFallback: 'Could not reschedule this appointment. Please try again.',
      rescheduleNoSlots: 'No other slots available right now.',
      rescheduleUnavailable: "This appointment can't be rescheduled.",
    },
    health: {
      heading: "Know how you're doing.",
      description: "A clear picture of your wellness trends over time — token-driven, never color-coded as your only signal.",
      metrics: [
        { value: '72 bpm', label: 'Heart rate' },
        { value: '68 kg', label: 'Weight' },
        { value: '7h 42m', label: 'Sleep' },
        { value: '8,240', label: 'Activity (steps)' },
        { value: '2.1 L', label: 'Hydration' },
        { value: '118 / 76', label: 'Blood pressure' },
      ],
    },
    nutrition: {
      heading: ['Nutrition without', 'the guesswork.'],
      description:
        'Understand what you eat, build better habits, and keep your nutrition aligned with your goals. No medical diet claims — just clearer information.',
      features: ['Meal logging', 'Macro tracking', 'Water intake', 'Personal targets', 'Food insights', 'Professional nutrition support'],
      targets: [
        { value: '1,840 / 2,100', label: 'Calories (kcal)' },
        { value: '92 / 120 g', label: 'Protein' },
        { value: '210 / 260 g', label: 'Carbohydrates' },
        { value: '58 / 70 g', label: 'Fat' },
        { value: '1.6 / 2.5 L', label: 'Water' },
        { value: '3 logged', label: 'Meals today' },
      ],
      imageAlt: 'Pelmatech nutrition tracking',
    },
    fitness: {
      heading: ['Movement that fits', 'the life you actually live.'],
      description: 'Plan workouts, track activity, and adapt routines as your health and schedule change.',
      features: ['Workout scheduling', 'Activity tracking', 'Progress history', 'Personal fitness goals', 'Recovery reminders'],
      metrics: [
        { value: '4 / 5', label: 'Weekly activity days' },
        { value: '3 planned', label: 'Workouts' },
        { value: '+12%', label: 'Progress (30d)' },
        { value: '2 days', label: 'Recovery reminder' },
      ],
      imageAlt: 'Pelmatech fitness tracking',
    },
    medications: {
      heading: ['One less thing', 'to forget.'],
      description: 'Keep medications organized with schedules, reminders, refill awareness, and a clear history.',
      nextDoseLabel: 'Next dose',
      items: [
        { name: 'Vitamin D', dosage: '1 tablet', schedule: 'Daily', nextDose: '08:00', refill: '18 left', prescriber: 'Dr. Helga Brooks' },
        { name: 'Atorvastatin', dosage: '20mg', schedule: 'Daily', nextDose: '21:00', refill: '6 left · refill soon', prescriber: 'Dr. Aria Vance' },
        { name: 'Sertraline', dosage: '50mg', schedule: 'Daily', nextDose: '08:00', refill: '24 left', prescriber: 'Dr. Matteo Dubois' },
      ],
    },
    settings: {
      heading: 'Settings',
      // 2026-08-14 audit fix: these rows previously looked fully
      // interactive (hover + chevron) but had no handler at all, including
      // "Delete account" — this label makes the demo state honest instead
      // of silently doing nothing on click.
      comingSoon: 'Coming soon',
      save: 'Save',
      saved: 'Saved',
      saveError: 'Could not save. Please try again.',
      fields: { firstName: 'First name', lastName: 'Last name', phone: 'Phone' },
      // 2026-08-20: new "Medical & insurance information" section —
      // patients only. Lives on patient_profiles, already owner-only RLS
      // since Phase 1, so it's never visible to a doctor or another
      // patient.
      medicalSectionTitle: 'Medical & insurance information',
      medicalSectionBody: 'This information stays private and visible only to you.',
      medicalFields: {
        dateOfBirth: 'Date of birth',
        socialSecurityNumber: 'Social security number',
        vitalCardNumber: 'Carte Vitale number',
        insuranceProvider: 'Insurance provider (mutuelle)',
        insuranceMemberNumber: 'Insurance member number',
      },
      sections: [
        { title: 'Profile', body: 'Name, photo, and personal details.' },
        { title: 'Notifications', body: 'Appointment, medication, and goal reminders.' },
        { title: 'Privacy', body: 'Control what is shared and with whom.' },
        { title: 'Connected devices', body: 'Manage wearables and linked apps.' },
        { title: 'Security', body: 'Password, two-factor authentication, sessions.' },
        { title: 'Delete account', body: 'Permanently remove your Pelmatech account.' },
      ],
    },
    careers: {
      heading: 'Careers at Pelmatech',
      description:
        "We're building a calmer, more connected way to manage everyday health. If that mission speaks to you, we'd love to hear from you.",
      body: "We don't have open roles listed here yet. Reach out through the Contact page and tell us how you'd like to help — we review every message.",
    },
    // 2026-08-14: added so the "Health Records" and "Notifications" cards
    // in the Platform Overview grid (FeaturesSection homepage pillars only
    // list 4; this route's 8-capability grid on /platform includes these
    // two) have somewhere real to link to instead of sitting unclickable —
    // same simple heading/description/body pattern as careers/join/etc.
    healthRecords: {
      heading: 'All your health records, in one place.',
      description:
        'Store and organize medical documents, test results, and visit summaries so they’re easy to find when you need them.',
      body: 'Document upload and secure sharing with your care team are still in development. In the meantime, your care history stays visible across Health Tracking, Appointments, and Medications.',
    },
    notifications: {
      heading: 'Reminders that keep you on track.',
      description: 'Appointment reminders, medication schedules, and health check-ins — without the noise.',
      body: 'Notification preferences aren’t configurable in this demo yet. The reminders you see elsewhere in the app (like medication schedules) show what this will look like once it’s live.',
    },
    join: {
      heading: 'Join Pelmatech as a professional',
      description:
        'Bring your practice to a platform built around calm, clear, connected care — and reach patients who are looking for exactly that.',
      body: 'Onboarding for healthcare professionals is being finalized. Contact us and our team will walk you through next steps.',
      cta: 'Contact Us',
    },
    doctorPortal: {
      heading: 'Doctor Portal',
      description: 'Manage your appointments, patient messages, and availability in one place.',
      body: 'The Doctor Portal is part of the Personal and Family plans. Sign in to access it, or contact us if you need an account.',
      cta: 'Sign In',
    },
    doctorDashboard: {
      greeting: 'Welcome, Dr.',
      planoraSectionHeading: 'Planora practice link',
      planoraSectionBody: "Appointments are managed through your practice's Planora booking page. Set your booking slug once so patients can book real slots with you from Pelmatech.",
      planoraSlugMissing: 'No Planora booking link configured yet.',
      planoraSlugLabel: 'Booking slug',
      upcomingAppointmentsHeading: 'Upcoming appointments',
      noAppointments: 'No appointments yet.',
      accountHeading: 'Account',
    },
    resources: {
      heading: 'Resources',
      description: 'Guides and information to help you get the most out of Pelmatech.',
      categories: ['Getting started', 'Health tracking guides', 'Telehealth tips', 'For professionals'],
    },
    help: {
      heading: 'Help Center',
      description: "Look for an answer in the FAQ, or reach out directly and we'll help you personally.",
      faqCta: 'Visit FAQ',
      contactCta: 'Contact Support',
    },
    accessibility: {
      heading: 'Accessibility',
      body: 'Pelmatech is built with semantic structure, keyboard navigation, visible focus states, and accessible labels throughout. We do not communicate health status by color alone. If you run into an accessibility barrier anywhere on the platform, please tell us — we want to fix it.',
    },
    privacy: {
      heading: 'Privacy Policy',
      body: "This page is a placeholder. Pelmatech's full privacy policy is being finalized by our legal team and will be published here before launch.",
    },
    terms: {
      heading: 'Terms of Service',
      body: "This page is a placeholder. Pelmatech's full terms of service are being finalized by our legal team and will be published here before launch.",
    },
    cookies: {
      heading: 'Cookie Policy',
      body: "This page is a placeholder. Pelmatech's full cookie policy is being finalized by our legal team and will be published here before launch.",
    },
  },
} as const

/**
 * `as const` above gives `en` precise literal types (great for catching
 * typos/shape drift in this file), but a naive `type Dictionary = typeof en`
 * would force every OTHER locale to reproduce the exact English string
 * literals, which is obviously wrong for a translation file. DeepWiden
 * walks the inferred type and widens every string/number/boolean literal
 * back to its base primitive (and readonly tuples to mutable arrays)
 * while preserving the exact nested object/array shape — so `fr.ts` is
 * still type-checked for having every key with the right kind of value,
 * just not the same literal value.
 */
type DeepWiden<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepWiden<U>>
        : T extends object
          ? { [K in keyof T]: DeepWiden<T[K]> }
          : T

export type Dictionary = DeepWiden<typeof en>
