import type { Dictionary } from './en'

/**
 * French dictionary — default locale for the site. Same shape as
 * en.ts (enforced by the Dictionary type), including translations of
 * the originally "protected" hero/team/benefits copy, per the user's
 * explicit request (2026-08-13).
 */
export const fr: Dictionary = {
  meta: {
    title: 'Pelmatech — Votre compagnon de santé personnel',
    description:
      "Pelmatech est un compagnon de santé numérique personnel qui vous aide à comprendre, organiser, suivre et améliorer votre santé, tout en gardant accès à des professionnels de confiance.",
  },

  common: {
    tryForFree: 'Essayer gratuitement',
    scheduleDemo: 'Planifier une démo',
    getStarted: 'Commencer',
    bookAppointment: 'Prendre rendez-vous',
    bookAppointmentAction: 'Prendre rendez-vous',
    findDoctor: 'Trouver un médecin',
    howTelehealthWorks: 'Comment fonctionne la télésanté',
    buildHealthPlan: 'Créer mon plan de santé',
    exploreFitness: 'Explorer le fitness',
    addMedication: 'Ajouter un médicament',
    sendMessage: 'Envoyer le message',
    signIn: 'Se connecter',
    forgotPassword: 'Mot de passe oublié',
    createAccount: 'Créer un compte',
    back: 'Retour',
    continueLabel: 'Continuer',
    done: 'Terminé',
    backToTop: 'Retour en haut de page',
    logout: 'Se déconnecter',
  },

  nav: {
    home: 'Accueil',
    artists: 'Artistes',
    releases: 'Sorties',
    contact: 'Contact',
    menu: 'Menu',
    closeMenu: 'Fermer le menu',
    platform: 'Plateforme',
    doctors: 'Médecins',
    pricing: 'Tarifs',
    about: 'À propos',
    faq: 'FAQ',
    login: 'Connexion',
    tagline: 'Votre compagnon de santé personnel',
  },

  accountMenu: {
    label: 'Compte',
    greeting: 'Bonjour,',
    dashboard: 'Tableau de bord',
    findADoctor: 'Trouver un médecin',
    settings: 'Paramètres',
  },

  hero: {
    titleLine1: 'Votre compagnon',
    titleLine2: 'de santé personnel',
    description:
      "Découvrez votre compagnon de santé en ligne personnel — une plateforme complète qui vous aide à suivre vos objectifs de forme, surveiller votre nutrition et planifier vos entraînements.",
    footerLeft: 'Applications de gestion pour entreprises',
    footerCenterCount: '01 / 04',
    footerCenterNext: 'Suivant',
    footerRight: 'Défiler pour découvrir',
  },

  team: {
    eyebrow1: 'Pelmatech',
    eyebrow2: 'Notre équipe',
    headingLine1: 'Faites connaissance avec l’équipe',
    headingLine2: 'qui fait tourner la machine',
    intro:
      "Sur notre plateforme, notre équipe dévouée travaille sans relâche pour améliorer notre présence en ligne et garantir la meilleure expérience possible à nos utilisateurs.",
    prevAria: 'Membre précédent',
    nextAria: 'Membre suivant',
    members: [
      { role: 'MÉDECIN GÉNÉRALE EN CHEF', name: 'Dr. Helga Brooks' },
      { role: 'PÉDIATRE', name: 'Dr. Kwame Mbeki' },
      { role: 'THÉRAPEUTE', name: 'Dr. Matteo Dubois' },
      { role: 'NEUROLOGUE', name: 'Dr. Hana Sato' },
      { role: 'CARDIOLOGUE', name: 'Dr. Aria Vance' },
    ],
  },

  benefits: {
    headingLine1: 'Découvrez les avantages',
    headingLine2: 'de notre plateforme',
    intro:
      "En choisissant une plateforme en ligne plutôt qu'hors ligne, les artistes peuvent toucher plus facilement un public mondial, se connecter avec des fans partout dans le monde et façonner l'avenir de la musique de manière dynamique.",
    cards: [
      {
        number: '01',
        title: 'Indisponibilité',
        body: "Nous comprenons qu'il peut arriver qu'un médecin ne soit pas disponible pour vous aider.",
      },
      {
        number: '02',
        title: 'Manque d’éthique',
        body: "Quand un médecin manque d'intégrité, il peut prescrire des médicaments à des fins promotionnelles plutôt que pour les besoins réels du patient, avec de graves conséquences sur la santé.",
      },
      {
        number: '03',
        title: "Liste d'attente",
        body: "Les patients peuvent connaître de longues attentes, parfois plusieurs heures, avant d'être pris en charge par le médecin.",
      },
    ],
  },

  featuresSection: {
    eyebrow1: 'Pelmatech',
    eyebrow2: 'Votre santé, connectée',
    headingLine1: 'Tout ce dont votre santé a besoin,',
    headingLine2: 'réuni au même endroit.',
    description:
      "Du suivi quotidien de votre bien-être aux rendez-vous et dossiers de santé, Pelmatech rassemble toutes les pièces de votre parcours de soin.",
    pillars: [
      { number: '01', title: 'Suivi de santé', body: 'Gardez chaque signe vital, habitude et tendance dans une vue claire.' },
      { number: '02', title: 'Rendez-vous', body: 'Réservez, replanifiez et rejoignez vos consultations sans aller-retours.' },
      { number: '03', title: 'Nutrition', body: 'Enregistrez vos repas et restez aligné avec vos objectifs personnels.' },
      { number: '04', title: 'Fitness', body: 'Planifiez vos entraînements et suivez votre activité au fil du temps.' },
    ],
  },

  doctorDiscovery: {
    headingLine1: 'Trouvez le bon professionnel',
    headingLine2: 'au bon moment.',
    description:
      "Parcourez les spécialités, vérifiez les disponibilités réelles et réservez avec un professionnel qui correspond à la prise en charge que vous recherchez.",
    specialties: [
      'Médecine générale',
      'Pédiatrie',
      'Cardiologie',
      'Neurologie',
      'Thérapie',
      'Nutrition',
      'Dermatologie',
      'Santé féminine',
    ],
    doctors: [
      { name: 'Dr. Helga Brooks', specialty: 'Médecine générale', availability: 'Prochaine dispo : aujourd’hui', experience: '20 ans' },
      { name: 'Dr. Hana Sato', specialty: 'Neurologue', availability: 'Prochaine dispo : aujourd’hui', experience: '12 ans' },
      { name: 'Dr. Matteo Dubois', specialty: 'Thérapeute', availability: 'Prochaine dispo : demain', experience: '8 ans' },
      { name: 'Dr. Aria Vance', specialty: 'Cardiologue', availability: 'Prochaine dispo : aujourd’hui', experience: '15 ans' },
      { name: 'Dr. Kwame Mbeki', specialty: 'Pédiatre', availability: 'Prochaine dispo : vendredi', experience: '10 ans' },
    ],
  },

  healthTracking: {
    headingLine1: 'Sachez comment vous allez.',
    headingLine2: 'Pas seulement comment vous vous sentez.',
    description:
      'Suivez les signaux de santé qui comptent pour vous et gardez une vision claire de votre progression dans le temps.',
    signals: ['Activité', 'Fréquence cardiaque', 'Sommeil', 'Poids', 'Hydratation', 'Tendances de bien-être'],
    metrics: [
      { value: '8 240', label: "Pas aujourd'hui" },
      { value: '72 bpm', label: 'Fréquence cardiaque au repos' },
      { value: '7h 42', label: 'Sommeil' },
      { value: '2,1 L', label: 'Hydratation' },
    ],
    imageAlt: 'Montre connectée affichant la fréquence cardiaque au repos',
  },

  telehealth: {
    heading: "Des soins, quand vous en avez besoin.",
    description:
      'Connectez-vous à des professionnels de santé qualifiés sans perdre des heures en trajets, salles d’attente ou contraintes de planning.',
    points: [
      'Consultations vidéo sécurisées',
      'Professionnels vérifiés',
      'Horaires flexibles',
      'Messagerie de suivi',
    ],
    imageAlt: 'Consultation vidéo de télémédecine',
  },

  personalPlan: {
    headingLine1: 'Un plan qui évolue',
    headingLine2: 'avec votre vie.',
    description:
      'Pelmatech réunit vos objectifs, vos routines, vos données de santé et l’accompagnement de professionnels dans un plan que vous pouvez vraiment suivre.',
    items: [
      'Objectifs quotidiens',
      'Cibles nutritionnelles',
      'Plan d’activité physique',
      'Calendrier de médication',
      'Rappels de rendez-vous',
      'Bilans de progression',
    ],
  },

  testimonials: {
    headingLine1: 'La santé se vit différemment',
    headingLine2: 'quand on ne la traverse pas seul.',
    prevAria: 'Témoignage précédent',
    nextAria: 'Témoignage suivant',
    // Screen-reader-only counter announced alongside the carousel.
    // {current} / {total} are replaced at render time.
    counterLabel: 'Témoignage {current} sur {total}',
    items: [
      {
        quote:
          "J'ai enfin un seul endroit où comprendre mes rendez-vous, mes habitudes et mes objectifs, sans jongler entre cinq applications différentes.",
        name: 'Sofia, 30 ans',
        meta: 'Utilise Pelmatech pour le suivi de santé et la télésanté',
      },
      {
        quote:
          "Réserver une consultation le jour même était auparavant la partie la plus difficile pour obtenir de l'aide. Maintenant, ça prend deux minutes.",
        name: 'Marcus, 40 ans',
        meta: 'Utilise Pelmatech pour les rendez-vous et les médicaments',
      },
      {
        quote:
          "Mon équipe soignante et mon propre suivi communiquent enfin entre eux. Ça a changé le sérieux avec lequel j'aborde mes bilans.",
        name: 'Elena, 50 ans',
        meta: 'Utilise Pelmatech pour les soins familiaux',
      },
    ],
  },

  security: {
    headingLine1: 'Vos informations de santé',
    headingLine2: 'méritent une protection sérieuse.',
    description: 'Conçu avec des pratiques de confidentialité et de sécurité rigoureuses à chaque niveau de la plateforme.',
    points: [
      'Données chiffrées',
      'Authentification sécurisée',
      'Contrôles de confidentialité',
      'Permissions claires',
      'Communication professionnelle protégée',
    ],
  },

  appPreview: {
    headingLine1: 'Votre compagnon de santé,',
    headingLine2: 'où que vous soyez.',
    highlights: [
      'Tableau de bord quotidien',
      'Notifications de rendez-vous',
      'Rappels de médicaments',
      'Objectifs de santé',
      'Messagerie avec votre médecin',
    ],
    imageAlt: "Consultation de l'application Pelmatech sur téléphone, en déplacement",
  },

  faqHome: {
    headingLine1: 'Vos questions,',
    headingLine2: 'nos réponses claires.',
    description:
      "Pelmatech est conçu pour accompagner la gestion de votre santé au quotidien et faciliter la communication. Cela ne remplace pas les services d'urgence ni un diagnostic médical professionnel.",
    items: [
      {
        question: "Qu'est-ce que Pelmatech ?",
        answer:
          "Pelmatech est un compagnon de santé numérique personnel qui vous aide à comprendre, organiser, suivre et améliorer votre santé, tout en gardant accès à des professionnels de confiance.",
      },
      {
        question: 'Puis-je prendre rendez-vous en ligne ?',
        answer:
          'Oui. Choisissez une spécialité, sélectionnez un professionnel, choisissez un créneau et rejoignez votre rendez-vous directement depuis Pelmatech.',
      },
      {
        question: 'Pelmatech peut-il remplacer mon médecin ?',
        answer:
          "Non. Pelmatech est conçu pour accompagner la gestion de votre santé au quotidien et faciliter la communication. Cela ne remplace pas les services d'urgence ni un diagnostic médical professionnel.",
      },
      {
        question: 'Comment fonctionne le suivi de santé ?',
        answer:
          'Pelmatech rassemble les signaux de santé qui comptent pour vous — activité, fréquence cardiaque, sommeil, poids, hydratation et tendances de bien-être — dans une vue unique et claire.',
      },
      {
        question: 'Puis-je gérer mes médicaments ?',
        answer: 'Oui. Gardez vos médicaments organisés avec des horaires, des rappels, un suivi des renouvellements et un historique clair.',
      },
      {
        question: 'Comment mes informations sont-elles protégées ?',
        answer:
          'Pelmatech est conçu avec des pratiques rigoureuses de confidentialité et de sécurité, incluant le chiffrement des données, une authentification sécurisée et des contrôles de permissions clairs.',
      },
      {
        question: 'Puis-je utiliser Pelmatech pour les membres de ma famille ?',
        answer: 'Oui, les outils de soins familiaux vous permettent d’aider à coordonner la santé des personnes qui dépendent de vous.',
      },
    ],
  },

  finalCta: {
    headingLine1: 'Prenez mieux soin',
    headingLine2: 'de votre santé au quotidien.',
    description: 'Commencez à construire une vision plus claire et plus connectée de votre santé avec Pelmatech.',
  },

  footer: {
    columns: [
      { title: 'Plateforme', links: ['Suivi de santé', 'Rendez-vous', 'Nutrition', 'Fitness', 'Médicaments'] },
      { title: 'Entreprise', links: ['À propos', 'Notre équipe', 'Carrières', 'Contact'] },
      { title: 'Professionnels', links: ['Rejoindre Pelmatech', 'Portail médecin', 'Ressources'] },
      { title: 'Support', links: ["Centre d'aide", 'FAQ', 'Accessibilité'] },
      { title: 'Légal', links: ['Confidentialité', "Conditions d'utilisation", 'Cookies'] },
    ],
    copyright: '© Pelmatech',
    tagline: 'Votre compagnon de santé personnel',
  },

  mobileMenu: {
    brand: 'Pelmatech',
    tagline: 'Votre compagnon de santé personnel',
  },

  pages: {
    platform: {
      heading: ['Votre santé,', 'organisée autour de vous.'],
      description: "Chaque partie de la plateforme Pelmatech, réunie au même endroit — conçue pour fonctionner ensemble plutôt que dans des applications séparées.",
      capabilities: [
        { title: 'Tableau de bord', body: 'Une vue quotidienne unique de votre santé, vos rendez-vous et vos objectifs.' },
        { title: 'Suivi de santé', body: 'Activité, fréquence cardiaque, sommeil, poids, hydratation et tendances.' },
        { title: 'Rendez-vous', body: 'Réservez, replanifiez et rejoignez vos consultations sans aller-retours.' },
        { title: 'Nutrition', body: 'Enregistrement des repas, suivi des macros et objectifs personnels.' },
        { title: 'Fitness', body: 'Planification des entraînements, suivi d’activité et récupération.' },
        { title: 'Médication', body: 'Horaires, rappels, suivi des renouvellements et historique.' },
        { title: 'Dossiers de santé', body: 'Un historique clair et organisé de vos soins dans le temps.' },
        { title: 'Notifications', body: 'Des rappels qui vous gardent sur la bonne voie, sans excès.' },
      ],
    },
    doctors: {
      heading: ['Trouvez le bon professionnel', 'au bon moment.'],
      description: 'Filtrez par spécialité, vérifiez les disponibilités réelles et réservez directement avec un professionnel de confiance.',
      allSpecialty: 'Toutes',
      // Translated specialty filter chip labels. Order matches the stable,
      // untranslated SPECIALTY_KEYS list in routes/doctors.tsx (used
      // internally for filter matching) — do not reorder independently.
      specialties: [
        'Médecine générale',
        'Pédiatrie',
        'Cardiologie',
        'Neurologie',
        'Thérapie',
        'Nutrition',
        'Dermatologie',
        'Santé féminine',
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
          specialty: 'Neurologie',
          availability: 'Prochaine dispo : aujourd’hui',
          experience: '12 ans',
          bio: "Le Dr Sato est spécialisée dans les troubles migraineux, l'épilepsie et les troubles neurologiques du sommeil. Son approche méthodique et fondée sur les preuves garantit que chaque patient reparte avec un plan clair, pas seulement un diagnostic.",
          education: 'Doctorat en médecine, résidence en neurologie — Hôpital universitaire de Tokyo',
          languages: ['Japonais', 'Anglais'],
          conditions: ['Migraines et céphalées chroniques', 'Épilepsie', 'Troubles du sommeil', 'Douleurs et neuropathies'],
          reviews: [
            { quote: "Le Dr Sato a enfin compris ce que des années de médecins n'avaient pas su voir — mes migraines sont enfin sous contrôle.", name: 'Julien P.', meta: 'Patient depuis 2024' },
            { quote: "Calme, méthodique, et elle explique vraiment ce qui se passe dans mon cerveau, en mots simples.", name: 'Mei L.', meta: 'Patiente depuis 2023' },
          ],
        },
        {
          specialty: 'Thérapie',
          availability: 'Prochaine dispo : demain',
          experience: '8 ans',
          bio: "Le Dr Dubois accompagne des adultes confrontés à l'anxiété, au burn-out et aux grandes transitions de vie. Ses séances combinent des techniques cognitivo-comportementales à une approche chaleureuse, sans jugement.",
          education: 'Master en psychologie clinique — Université de Genève',
          languages: ['Français', 'Italien', 'Anglais'],
          conditions: ['Anxiété et stress', 'Récupération après burn-out', 'Thérapie de couple', 'Transitions de vie'],
          reviews: [
            { quote: "J'étais sceptique sur la thérapie en visio — Matteo m'a complètement fait changer d'avis.", name: 'Camille R.', meta: 'Patiente depuis 2024' },
            { quote: "Il me donne des outils que j'utilise vraiment, pas juste quelqu'un pour me défouler.", name: 'Diego M.', meta: 'Patient depuis 2022' },
          ],
        },
        {
          specialty: 'Cardiologie',
          availability: 'Prochaine dispo : aujourd’hui',
          experience: '15 ans',
          bio: "Le Dr Vance traite l'hypertension, les arythmies et le suivi post-événement cardiaque, avec une attention particulière portée à la prévention à long terme plutôt qu'aux solutions ponctuelles. Ses patients la décrivent comme directe, rassurante et facile à joindre entre les rendez-vous.",
          education: 'Doctorat en médecine, fellowship en cardiologie — Johns Hopkins Hospital',
          languages: ['Anglais', 'Espagnol'],
          conditions: ['Hypertension', 'Arythmie', 'Suivi post-événement cardiaque', 'Gestion du cholestérol'],
          reviews: [
            { quote: "Après la crise cardiaque de mon père, le Dr Vance a géré sa convalescence comme si c'était sa propre famille.", name: 'Ines T.', meta: 'Aidante familiale' },
            { quote: "Elle a détecté un rythme irrégulier que mon ancien cardiologue avait manqué pendant deux ans.", name: 'Thomas B.', meta: 'Patient depuis 2021' },
          ],
        },
        {
          specialty: 'Pédiatrie',
          availability: 'Prochaine dispo : vendredi',
          experience: '10 ans',
          bio: "Le Dr Mbeki suit les enfants de la naissance à l'adolescence, des visites de routine aux questions plus complexes de croissance et de développement. Les parents soulignent régulièrement sa patience avec les enfants anxieux.",
          education: 'Doctorat en médecine, pédiatrie — Université du Cap',
          languages: ['Anglais', 'Zoulou', 'Français'],
          conditions: ['Visites de routine', 'Vaccinations', 'Croissance et développement', 'Maladies infantiles courantes'],
          reviews: [
            { quote: 'Ma fille attend maintenant ses visites de contrôle avec impatience — tout est dit.', name: 'Léa F.', meta: 'Parent' },
            { quote: 'Patient, minutieux, et il ne nous presse jamais vers la sortie.', name: 'Karim S.', meta: 'Parent' },
          ],
        },
        {
          specialty: 'Médecine générale',
          availability: 'Prochaine dispo : aujourd’hui',
          experience: '20 ans',
          bio: "Le Dr Brooks est la médecin en chef de Pelmatech et souvent le premier point de contact des patients — elle coordonne tout, des bilans annuels aux orientations vers des spécialistes. Vingt ans de pratique se ressentent dans la rapidité avec laquelle elle cerne un problème.",
          education: 'Doctorat en médecine — Charité – Universitätsmedizin Berlin',
          languages: ['Allemand', 'Anglais', 'Français'],
          conditions: ['Bilans annuels', 'Gestion des maladies chroniques', 'Soins préventifs', 'Coordination des orientations spécialisées'],
          reviews: [
            { quote: "C'est la médecin qui se souvient de tout votre historique, pas seulement de la plainte du jour.", name: 'Noah G.', meta: 'Patient depuis 2020' },
            { quote: "Le Dr Brooks a coordonné trois spécialistes pour moi sans que j'aie à courir après une seule orientation.", name: 'Priya K.', meta: 'Patiente depuis 2022' },
          ],
        },
        {
          specialty: 'Santé féminine',
          availability: 'Prochaine dispo : lundi',
          experience: '9 ans',
          bio: "Le Dr Farouk se concentre sur la santé reproductive à chaque étape de la vie, du suivi prénatal à la gestion de la ménopause. Elle est reconnue pour prendre le temps de répondre à des questions que d'autres consultations expédient.",
          education: 'Doctorat en médecine, obstétrique et gynécologie — Université américaine de Beyrouth',
          languages: ['Arabe', 'Anglais', 'Français'],
          conditions: ['Santé reproductive', 'Suivi prénatal', 'Gestion de la ménopause', 'Conseil en contraception'],
          reviews: [
            { quote: "La première médecin qui ne m'a pas fait sentir pressée avec mes questions sur mon propre corps.", name: 'Amina Z.', meta: 'Patiente depuis 2023' },
            { quote: "Elle m'a accompagnée tout au long de ma grossesse avec tellement de patience.", name: 'Chloé D.', meta: 'Patiente depuis 2024' },
          ],
        },
        {
          specialty: 'Nutrition',
          availability: 'Prochaine dispo : mercredi',
          experience: '9 ans',
          bio: "Le Dr Ramirez construit des plans alimentaires pratiques et durables pour la gestion du poids, le diabète et la performance sportive — pas des plans génériques copiés d'un patient à l'autre.",
          education: 'Master en nutrition clinique — Universidad Autónoma de Madrid',
          languages: ['Espagnol', 'Anglais', 'Portugais'],
          conditions: ['Gestion du poids', 'Alimentation adaptée au diabète', 'Nutrition sportive', 'Intolérances alimentaires'],
          reviews: [
            { quote: "La première nutritionniste qui m'a donné un plan qui a survécu au contact avec ma vraie vie.", name: 'Marco V.', meta: 'Patient depuis 2024' },
            { quote: "J'ai perdu 12 kg sans jamais avoir l'impression d'être au régime.", name: 'Hannah W.', meta: 'Patiente depuis 2023' },
          ],
        },
        {
          specialty: 'Dermatologie',
          availability: 'Prochaine dispo : jeudi',
          experience: '14 ans',
          bio: "Le Dr Bello est spécialisée dans la dermatologie des peaux noires et métissées, de l'acné et l'hyperpigmentation aux troubles du cuir chevelu et des cheveux — un domaine encore trop peu couvert dans la plupart des cabinets.",
          education: 'Doctorat en médecine, résidence en dermatologie — Howard University Hospital',
          languages: ['Anglais', 'Yoruba', 'Français'],
          conditions: ['Acné et hyperpigmentation', 'Eczéma', 'Dermatologie des peaux noires', 'Troubles du cuir chevelu et des cheveux'],
          reviews: [
            { quote: "La première dermatologue qui a vraiment compris ma peau au lieu de deviner.", name: 'Fatou N.', meta: 'Patiente depuis 2022' },
            { quote: "Elle a réglé une hyperpigmentation que trois autres médecins n'avaient pas réussi à traiter.", name: 'Robert A.', meta: 'Patient depuis 2024' },
          ],
        },
      ],
    },
    // Static (non-per-doctor) labels for the /doctors/$doctorId profile
    // page, added 2026-08-14 alongside the per-doctor bio/education/
    // languages/conditions/reviews fields above.
    doctorProfile: {
      backToDoctors: 'Tous les médecins',
      bioHeading: 'À propos',
      educationHeading: 'Formation',
      languagesHeading: 'Langues parlées',
      conditionsHeading: 'Pathologies traitées',
      reviewsHeading: 'Avis patients',
      notFoundHeading: 'Médecin introuvable',
      notFoundBody: "Nous n'avons pas trouvé de fiche pour ce médecin.",
      notFoundCta: 'Voir tous les médecins',
    },
    pricing: {
      heading: ['Des formules adaptées', 'à la façon dont vous voulez être accompagné.'],
      description: 'Les tarifs sont en cours de finalisation — contactez-nous et notre équipe vous aidera à trouver la formule adaptée.',
      plans: [
        {
          name: 'Gratuit',
          price: 'Bientôt disponible',
          description: "Démarrez avec l'essentiel du suivi de santé au quotidien.",
          features: ['Suivi de santé de base', 'Prise de rendez-vous', "FAQ et centre d'aide"],
        },
        {
          name: 'Personnel',
          price: 'Nous contacter pour le tarif',
          description: 'La plateforme complète pour une personne, télésanté et plans inclus.',
          features: ['Tout ce qui est inclus dans Gratuit', 'Consultations en télésanté', 'Plan de santé personnel', 'Gestion des médicaments'],
        },
        {
          name: 'Famille',
          price: 'Nous contacter pour le tarif',
          description: 'Coordonnez la santé de toutes les personnes qui dépendent de vous.',
          features: ['Tout ce qui est inclus dans Personnel', 'Outils de soins familiaux', 'Calendrier de rendez-vous partagé', 'Support prioritaire'],
        },
      ],
    },
    about: {
      heading: ['Un compagnon de santé personnel,', 'construit sur la confiance.'],
      sections: [
        {
          title: 'Pourquoi Pelmatech existe',
          body: "La santé est souvent fragmentée entre applications, salles d'attente et paperasse. Pelmatech réunit les éléments de la gestion de santé au quotidien dans un espace connecté et humain.",
        },
        {
          title: 'Notre approche',
          body: "Nous associons un suivi de santé clair et honnête à un accès réel à des professionnels de confiance — jamais l'un sans l'autre.",
        },
        {
          title: 'Technologie et soin',
          body: 'Chaque fonctionnalité est conçue pour soutenir une vraie relation avec votre santé et votre équipe soignante, jamais pour la remplacer.',
        },
        {
          title: 'Nos valeurs',
          body: 'Le calme plutôt que le chaos, la clarté plutôt que le jargon, et une confiance gagnée par un design cohérent et soigné.',
        },
      ],
    },
    contact: {
      heading: 'Parlons-en.',
      description:
        'Questions sur Pelmatech, partenariats, ou envie de nous rejoindre en tant que professionnel — envoyez-nous un message et notre équipe reviendra vers vous.',
      fields: { name: 'Nom', email: 'Email', phone: 'Téléphone', reason: 'Motif du contact', message: 'Message' },
    },
    faq: {
      heading: ['Vos questions,', 'nos réponses claires.'],
      description:
        "Pelmatech est conçu pour accompagner la gestion de votre santé au quotidien et faciliter la communication. Cela ne remplace pas les services d'urgence ni un diagnostic médical professionnel.",
      categories: [
        {
          name: 'Compte',
          items: [
            { q: 'Comment créer un compte Pelmatech ?', a: "Sélectionnez Créer un compte depuis la page de connexion et suivez les quelques étapes : informations de base, objectifs de santé et préférences." },
            { q: 'Puis-je utiliser Pelmatech pour les membres de ma famille ?', a: 'Oui, les outils de soins familiaux vous permettent d’aider à coordonner la santé des personnes qui dépendent de vous.' },
          ],
        },
        {
          name: 'Rendez-vous',
          items: [
            { q: 'Puis-je prendre rendez-vous en ligne ?', a: 'Oui. Choisissez une spécialité, sélectionnez un professionnel, choisissez un créneau et rejoignez votre rendez-vous directement depuis Pelmatech.' },
            { q: 'Puis-je reprogrammer ou annuler ?', a: 'Oui, depuis la page Rendez-vous, vous pouvez gérer vos visites à venir, passées et annulées.' },
          ],
        },
        {
          name: 'Suivi de santé',
          items: [
            { q: 'Comment fonctionne le suivi de santé ?', a: "Pelmatech rassemble les signaux de santé qui comptent pour vous — activité, fréquence cardiaque, sommeil, poids, hydratation et tendances de bien-être — dans une vue unique et claire." },
          ],
        },
        {
          name: 'Médecins',
          items: [
            { q: 'Pelmatech peut-il remplacer mon médecin ?', a: "Non. Pelmatech est conçu pour accompagner la gestion de votre santé au quotidien et faciliter la communication. Cela ne remplace pas les services d'urgence ni un diagnostic médical professionnel." },
          ],
        },
        {
          name: 'Confidentialité',
          items: [
            { q: 'Comment mes informations sont-elles protégées ?', a: 'Pelmatech est conçu avec des pratiques rigoureuses de confidentialité et de sécurité, incluant le chiffrement des données, une authentification sécurisée et des contrôles de permissions clairs.' },
          ],
        },
        {
          name: 'Facturation',
          items: [
            { q: 'Combien coûte Pelmatech ?', a: 'Les tarifs sont en cours de finalisation. Consultez la page Tarifs ou contactez-nous pour les informations actuelles sur les formules.' },
          ],
        },
      ],
    },
    login: {
      heading: 'Content de vous revoir',
      fields: { email: 'Email', password: 'Mot de passe' },
      errorFallback: "Une erreur est survenue. Merci de réessayer.",
      cta: 'Se connecter',
      loading: 'Connexion en cours…',
    },
    signup: {
      steps: ['Type de compte', 'Informations personnelles', 'Cabinet Planora', 'Mot de passe'],
      roleHeading: 'Comment allez-vous utiliser Pelmatech ?',
      roles: {
        patient: { label: 'Je suis patient(e)', body: 'Prenez de vrais rendez-vous, et bientôt gérez vos dossiers médicaux en toute sécurité.' },
        doctor: { label: 'Je suis médecin', body: 'Obtenez un dashboard professionnel et recevez de vrais rendez-vous de patients.' },
      },
      fields: {
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Email',
        phone: 'Téléphone (facultatif)',
        password: 'Créer un mot de passe',
        specialtyKey: 'Spécialité',
        planoraBookingSlug: 'Lien de réservation Planora (facultatif)',
        planoraBookingSlugHelp: 'Le lien public de la page de réservation Planora de votre cabinet (ex. "dr-dubois"). Vous pourrez le configurer plus tard depuis votre dashboard si vous ne l’avez pas encore.',
      },
      submit: 'Créer mon compte',
      loading: 'Création du compte…',
      errorFallback: "Une erreur est survenue. Merci de réessayer.",
      confirmEmailHeading: 'Vérifiez votre boîte mail',
      confirmEmailBody: 'Nous avons envoyé un lien de confirmation à votre adresse email. Cliquez dessus pour activer votre compte, puis connectez-vous.',
      goToLogin: 'Aller à la connexion',
    },
    // 2026-08-27 : carte connexion/inscription partagée (AuthCard.tsx) —
    // les deux onglets glissent dans le même panneau au lieu de naviguer
    // vers deux pages séparées, donc les textes des deux vues vivent ici.
    authCard: {
      signInTab: 'Connexion',
      signUpTab: 'Inscription',
      welcomeHeading: 'Content de vous revoir.',
      welcomeBody: 'Entrez vos identifiants pour accéder à votre espace.',
      joinHeading: 'Créez votre compte.',
      joinBody: 'Rejoignez Pelmatech en quelques étapes.',
      newHereText: 'Nouveau ici ?',
      newHereCta: 'Créer un compte',
      alreadyHaveAccountText: 'Vous avez déjà un compte ?',
      alreadyHaveAccountCta: 'Se connecter',
    },
    dashboard: {
      greetingHello: 'Bonjour',
      greeting: ['Bonjour, Alex.', 'Voici votre santé aujourd’hui.'],
      metrics: [
        { value: '86', label: 'Score du jour' },
        { value: '6 420', label: 'Activité (pas)' },
        { value: '7h 10', label: 'Sommeil' },
        { value: '1,6 L', label: 'Hydratation' },
      ],
      upcomingAppointments: 'Rendez-vous à venir',
      medicationReminders: 'Rappels de médicaments',
      nutritionGoal: 'Objectif nutritionnel',
      nutritionGoalValue: '1 840 / 2 100 kcal',
      todaysWorkout: 'Entraînement du jour',
      todaysWorkoutValue: '30 min — Mobilité',
      sampleAppointment: { doctor: 'Dr. Hana Sato', specialty: 'Neurologue', date: '15 août', time: '10h30', consultationType: 'Vidéo', status: 'À venir' },
      sampleMedications: [
        { name: 'Vitamine D — 1 comprimé', time: '08:00' },
        { name: 'Atorvastatine — 20mg', time: '21:00' },
      ],
    },
    appointments: {
      heading: ['Prenez rendez-vous', 'sans les allers-retours.'],
      steps: [
        { number: '01', label: 'Choisir une spécialité' },
        { number: '02', label: 'Sélectionner un professionnel' },
        { number: '03', label: 'Choisir un créneau' },
        { number: '04', label: 'Rejoindre votre rendez-vous' },
      ],
      tabs: { upcoming: 'À venir', past: 'Passés', cancelled: 'Annulés' },
      // 2026-08-20: replaced the static demo `items` array with real data
      // from listMyAppointmentsAction — statusLabels map the raw DB status
      // ('pending'/'confirmed'/'cancelled') to display text.
      statusLabels: { pending: 'En attente', confirmed: 'Confirmé', cancelled: 'Annulé' },
      noAppointments: 'Aucun rendez-vous dans cette catégorie.',
      loadError: 'Impossible de charger vos rendez-vous. Merci de réessayer.',
      cancelCta: 'Annuler',
      cancelling: 'Annulation…',
      cancelError: "Impossible d'annuler ce rendez-vous. Merci de réessayer.",
      bookNewCta: 'Prendre rendez-vous',
    },
    findADoctor: {
      heading: ['Trouvez un médecin', 'disponible pour réserver.'],
      description: 'Ces médecins ont configuré leur cabinet Planora et acceptent de vraies réservations directement depuis Pelmatech.',
      empty: "Aucun médecin n'est disponible à la réservation pour le moment. Revenez bientôt.",
      loadError: 'Impossible de charger la liste des médecins. Merci de réessayer.',
      bookCta: 'Réserver',
    },
    book: {
      back: 'Retour',
      notFoundHeading: 'Médecin introuvable',
      notFoundBody: "Nous n'avons pas trouvé de fiche pour ce médecin.",
      notConfiguredHeading: 'Réservation indisponible',
      notConfiguredBody: "Ce médecin n'a pas encore configuré ses disponibilités de réservation.",
      unreachableHeading: 'Réservation temporairement indisponible',
      unreachableBody: 'Impossible de charger les disponibilités pour le moment. Merci de réessayer plus tard.',
      serviceHeading: 'Choisissez une prestation',
      dateHeading: 'Choisissez un créneau',
      noSlots: 'Aucun créneau disponible pour le moment.',
      noteLabel: 'Note pour le médecin (facultatif)',
      notePlaceholder: 'Précisez le motif de la consultation…',
      confirmCta: 'Confirmer le rendez-vous',
      booking: 'Réservation en cours…',
      bookingErrorFallback: 'Impossible de réserver ce créneau. Merci de réessayer.',
      successHeading: 'Rendez-vous réservé',
      successConfirmedBody: 'Votre rendez-vous est confirmé.',
      successPendingBody: 'Votre demande de rendez-vous a été envoyée et est en attente de confirmation par le cabinet.',
      successVerificationBody: 'Vérifiez votre boîte mail : un lien de confirmation vous a été envoyé pour finaliser ce rendez-vous.',
      backToAppointments: 'Voir mes rendez-vous',
    },
    // 2026-08-26 : page d'atterrissage du lien de confirmation envoyé par
    // Planora, désormais hébergée sur Pelmatech (voir
    // appointments_.confirm.$token.tsx) pour que confirmer un rendez-vous
    // ne fasse jamais sortir le patient vers le site de Planora.
    confirmAppointment: {
      confirmedHeading: 'Rendez-vous confirmé',
      confirmedBody: 'Votre rendez-vous est confirmé.',
      pendingHeading: 'Confirmation reçue',
      pendingBody: 'Merci — le cabinet doit encore valider ce rendez-vous, vous serez recontacté(e).',
      conflictHeading: 'Créneau devenu indisponible',
      conflictBody: 'Ce créneau a été pris entre-temps. Merci de réserver à nouveau.',
      invalidHeading: 'Lien de confirmation invalide',
      invalidBody: 'Ce lien est invalide ou a déjà été utilisé.',
      errorHeading: 'Échec de la confirmation',
      errorBody: 'Une erreur est survenue lors de la confirmation. Merci de réessayer.',
      backToAppointments: 'Voir mes rendez-vous',
    },
    // 2026-08-26 : fenêtre de détail d'un rendez-vous au clic, partagée par
    // le dashboard patient, la liste des rendez-vous patient, et le
    // dashboard médecin — permet à chaque côté de consulter les détails
    // de l'autre et, si besoin, de reprogrammer (médecin avec un
    // empêchement, ou patient qui ne peut plus venir).
    appointmentDetail: {
      title: 'Détails du rendez-vous',
      close: 'Fermer',
      loadError: 'Impossible de charger ce rendez-vous. Merci de réessayer.',
      doctorLabel: 'Médecin',
      patientLabel: 'Patient',
      serviceLabel: 'Prestation',
      dateLabel: 'Date',
      timeLabel: 'Heure',
      statusLabel: 'Statut',
      phoneLabel: 'Téléphone',
      phoneUnavailable: 'Non communiqué',
      rescheduleCta: 'Reprogrammer',
      rescheduleHeading: 'Choisir un nouveau créneau',
      rescheduleCancel: 'Annuler',
      rescheduleConfirm: 'Confirmer le nouveau créneau',
      rescheduling: 'Reprogrammation…',
      rescheduleSuccess: 'Rendez-vous déplacé au nouveau créneau.',
      rescheduleErrorFallback: 'Impossible de reprogrammer ce rendez-vous. Merci de réessayer.',
      rescheduleNoSlots: 'Aucun autre créneau disponible pour le moment.',
      rescheduleUnavailable: 'Ce rendez-vous ne peut pas être reprogrammé.',
    },
    health: {
      heading: 'Sachez comment vous allez.',
      description: 'Une vision claire de vos tendances de bien-être dans le temps — toujours basée sur les tokens de couleur, jamais sur la couleur comme seul signal.',
      metrics: [
        { value: '72 bpm', label: 'Fréquence cardiaque' },
        { value: '68 kg', label: 'Poids' },
        { value: '7h 42', label: 'Sommeil' },
        { value: '8 240', label: 'Activité (pas)' },
        { value: '2,1 L', label: 'Hydratation' },
        { value: '118 / 76', label: 'Tension artérielle' },
      ],
    },
    nutrition: {
      heading: ['La nutrition,', 'sans se compliquer la vie.'],
      description:
        "Comprenez ce que vous mangez, adoptez de meilleures habitudes et gardez votre nutrition alignée avec vos objectifs. Aucune allégation médicale — juste des informations plus claires.",
      features: ['Suivi des repas', 'Suivi des macronutriments', "Suivi de l'hydratation", 'Objectifs personnels', 'Analyses alimentaires', 'Accompagnement nutritionnel professionnel'],
      targets: [
        { value: '1 840 / 2 100', label: 'Calories (kcal)' },
        { value: '92 / 120 g', label: 'Protéines' },
        { value: '210 / 260 g', label: 'Glucides' },
        { value: '58 / 70 g', label: 'Lipides' },
        { value: '1,6 / 2,5 L', label: 'Eau' },
        { value: '3 enregistrés', label: "Repas aujourd'hui" },
      ],
      imageAlt: 'Suivi nutritionnel Pelmatech',
    },
    fitness: {
      heading: ['Une activité physique adaptée', 'à la vie que vous menez vraiment.'],
      description: 'Planifiez vos entraînements, suivez votre activité et adaptez vos routines selon votre santé et votre emploi du temps.',
      features: ['Planification des entraînements', "Suivi de l'activité", 'Historique de progression', 'Objectifs personnels', 'Rappels de récupération'],
      metrics: [
        { value: '4 / 5', label: "Jours d'activité par semaine" },
        { value: '3 prévus', label: 'Entraînements' },
        { value: '+12 %', label: 'Progression (30j)' },
        { value: '2 jours', label: 'Rappel de récupération' },
      ],
      imageAlt: 'Suivi de fitness Pelmatech',
    },
    medications: {
      heading: ['Une chose de moins', 'à oublier.'],
      description: 'Gardez vos médicaments organisés avec des horaires, des rappels, un suivi des renouvellements et un historique clair.',
      nextDoseLabel: 'Prochaine prise',
      items: [
        { name: 'Vitamine D', dosage: '1 comprimé', schedule: 'Quotidien', nextDose: '08:00', refill: '18 restants', prescriber: 'Dr. Helga Brooks' },
        { name: 'Atorvastatine', dosage: '20mg', schedule: 'Quotidien', nextDose: '21:00', refill: '6 restants · à renouveler bientôt', prescriber: 'Dr. Aria Vance' },
        { name: 'Sertraline', dosage: '50mg', schedule: 'Quotidien', nextDose: '08:00', refill: '24 restants', prescriber: 'Dr. Matteo Dubois' },
      ],
    },
    settings: {
      heading: 'Paramètres',
      // 2026-08-27: lien de retour vers le dashboard de l'utilisateur
      // (médecin ou patient) — Paramètres n'a sinon aucun moyen d'en sortir.
      backToDashboard: 'Retour au dashboard',
      // 2026-08-14 audit fix: ces lignes avaient l'air pleinement
      // interactives (survol + chevron) mais n'avaient aucun handler, y
      // compris « Supprimer le compte » — ce badge rend l'état de démo
      // honnête au lieu de ne rien faire silencieusement au clic.
      comingSoon: 'Bientôt disponible',
      save: 'Enregistrer',
      saved: 'Enregistré',
      saveError: "Impossible d'enregistrer. Merci de réessayer.",
      fields: { firstName: 'Prénom', lastName: 'Nom', phone: 'Téléphone' },
      // 2026-08-20: nouvelle section "Informations médicales & assurance"
      // — patients uniquement. Reste sur patient_profiles, déjà en RLS
      // "owner-only" depuis la Phase 1, donc jamais visible par un médecin
      // ou un autre patient.
      medicalSectionTitle: 'Informations médicales & assurance',
      medicalSectionBody: 'Ces informations restent privées et visibles uniquement par vous.',
      medicalFields: {
        dateOfBirth: 'Date de naissance',
        socialSecurityNumber: 'Numéro de sécurité sociale',
        vitalCardNumber: 'Numéro de carte Vitale',
        insuranceProvider: 'Mutuelle',
        insuranceMemberNumber: "Numéro d'adhérent mutuelle",
      },
      sections: [
        { title: 'Profil', body: 'Nom, photo et informations personnelles.' },
        { title: 'Notifications', body: 'Rappels de rendez-vous, de médicaments et d’objectifs.' },
        { title: 'Confidentialité', body: 'Contrôlez ce qui est partagé, et avec qui.' },
        { title: 'Appareils connectés', body: 'Gérez vos objets connectés et applications liées.' },
        { title: 'Sécurité', body: 'Mot de passe, authentification à deux facteurs, sessions.' },
        { title: 'Supprimer le compte', body: 'Supprimez définitivement votre compte Pelmatech.' },
      ],
    },
    careers: {
      heading: 'Carrières chez Pelmatech',
      description:
        "Nous construisons une façon plus calme et plus connectée de gérer sa santé au quotidien. Si cette mission vous parle, nous serions ravis de vous entendre.",
      body: "Aucun poste n'est listé ici pour le moment. Passez par la page Contact et dites-nous comment vous aimeriez contribuer — nous lisons chaque message.",
    },
    healthRecords: {
      heading: 'Tous vos dossiers de santé, au même endroit.',
      description:
        'Stockez et organisez vos documents médicaux, résultats d’analyses et comptes-rendus de consultation pour les retrouver facilement.',
      body: 'L’envoi de documents et le partage sécurisé avec votre équipe soignante sont encore en développement. En attendant, votre historique de soins reste visible dans le Suivi de santé, les Rendez-vous et les Médicaments.',
    },
    notifications: {
      heading: 'Des rappels qui vous gardent sur la bonne voie.',
      description: 'Rappels de rendez-vous, horaires de médicaments et points santé réguliers — sans le bruit superflu.',
      body: 'Les préférences de notifications ne sont pas encore configurables dans cette démo. Les rappels visibles ailleurs dans l’application (comme les horaires de médicaments) donnent un aperçu de ce à quoi cela ressemblera une fois en ligne.',
    },
    join: {
      heading: 'Rejoignez Pelmatech en tant que professionnel',
      description:
        "Apportez votre pratique à une plateforme construite autour de soins calmes, clairs et connectés — et touchez des patients qui recherchent exactement cela.",
      body: "L'intégration des professionnels de santé est en cours de finalisation. Contactez-nous et notre équipe vous accompagnera dans les prochaines étapes.",
      cta: 'Nous contacter',
    },
    doctorPortal: {
      heading: 'Portail médecin',
      description: 'Gérez vos rendez-vous, les messages de vos patients et vos disponibilités au même endroit.',
      body: 'Le portail médecin fait partie des formules Personnel et Famille. Connectez-vous pour y accéder, ou contactez-nous si vous avez besoin d’un compte.',
      cta: 'Se connecter',
    },
    doctorDashboard: {
      greeting: 'Bienvenue, Dr.',
      planoraSectionHeading: 'Lien de cabinet Planora',
      planoraSectionBody: 'Les rendez-vous sont gérés via la page de réservation Planora de votre cabinet. Configurez votre lien de réservation une fois pour que les patients puissent réserver de vrais créneaux avec vous depuis Pelmatech.',
      planoraSlugMissing: 'Aucun lien de réservation Planora configuré pour le moment.',
      planoraSlugLabel: 'Lien de réservation',
      upcomingAppointmentsHeading: 'Rendez-vous à venir',
      noAppointments: 'Aucun rendez-vous pour le moment.',
      accountHeading: 'Compte',
      shell: {
        navOverview: 'Vue d’ensemble',
        navAppointments: 'Rendez-vous',
        navPatients: 'Patients',
        navMessages: 'Messages',
        navSettings: 'Paramètres',
        roleLabel: 'Médecin',
        searchPlaceholder: 'Rechercher un patient…',
        overviewSubtitle: 'Votre compte, votre lien de réservation et vos rendez-vous à venir, en un coup d’œil.',
        appointmentsTitle: 'Rendez-vous',
        appointmentsSubtitle: 'Suivez les rendez-vous de vos patients pour la journée et gérez les annulations.',
        patientsTitle: 'Patients',
        patientsSubtitle: 'Toutes les personnes que vous avez suivies via Pelmatech.',
        patientsCountLabel: '{count} rendez-vous',
        noPatients: 'Aucun patient pour le moment.',
        messagesTitle: 'Messages',
        messagesSubtitle: 'Messagerie directe avec vos patients.',
        messagesComingSoon: 'La messagerie n’est pas encore disponible — elle arrive bientôt sur Pelmatech.',
        confirmedLabel: 'Confirmés',
        cancelledLabel: 'Annulés',
        pendingLabel: 'En attente',
        typeAll: 'Tous',
        typeInPerson: 'Cabinet',
        typeVideo: 'Téléconsultation',
        noAppointmentsDay: 'Aucun rendez-vous prévu ce jour-là.',
        prevMonthLabel: 'Mois précédent',
        nextMonthLabel: 'Mois suivant',
      },
    },
    resources: {
      heading: 'Ressources',
      description: 'Des guides et informations pour tirer le meilleur parti de Pelmatech.',
      categories: ['Bien démarrer', 'Guides de suivi de santé', 'Conseils télésanté', 'Pour les professionnels'],
    },
    help: {
      heading: "Centre d'aide",
      description: 'Cherchez une réponse dans la FAQ, ou contactez-nous directement et nous vous aiderons personnellement.',
      faqCta: 'Voir la FAQ',
      contactCta: 'Contacter le support',
    },
    accessibility: {
      heading: 'Accessibilité',
      body: "Pelmatech est conçu avec une structure sémantique, une navigation au clavier, des états de focus visibles et des libellés accessibles partout sur la plateforme. Nous ne communiquons jamais un état de santé par la couleur seule. Si vous rencontrez un obstacle d'accessibilité, quel qu'il soit, dites-le-nous — nous voulons le corriger.",
    },
    privacy: {
      heading: 'Politique de confidentialité',
      body: "Cette page est un espace réservé. La politique de confidentialité complète de Pelmatech est en cours de finalisation par notre équipe juridique et sera publiée ici avant le lancement.",
    },
    terms: {
      heading: "Conditions d'utilisation",
      body: "Cette page est un espace réservé. Les conditions d'utilisation complètes de Pelmatech sont en cours de finalisation par notre équipe juridique et seront publiées ici avant le lancement.",
    },
    cookies: {
      heading: 'Politique de cookies',
      body: "Cette page est un espace réservé. La politique de cookies complète de Pelmatech est en cours de finalisation par notre équipe juridique et sera publiée ici avant le lancement.",
    },
  },
}
