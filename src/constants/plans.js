const PLAN_FEATURES = [
  {
    name: 'All Video Exercises & Workouts',
    description:
      'Over 150+ exercise videos are ready to use on the Effective Platform.',
  },
  {
    name: 'All Game Brain Videos',
    description:
      'Gamebrains are player analysis videos prepared by our Premier League coaches designed to improve game intelligence. Brand new videos added very week.',
  },
  {
    name: 'Drag-&-Drop Training Planner',
    description:
      'Easily create your professional training schedule and view it across any of your devices in real-time',
  },
  {
    name: 'Track & Earn XP Points',
    description:
      'See how your placed in comparison to players from over 45 countries in the Effective community.',
  },
  {
    name: 'Personal Accountability Coach',
    description:
      'Get your own online personal trainer coach that will hold you accountable for your developer plan.',
  },
  {
    name: '1-on-1 Coaching',
    description:
      'Get the coaches personal phone number and ask questions, post photos, match/traning videos and get feedback anytime, anywhere.',
  },
];

const PLANS = [
  {
    key: 1,
    id: 'basic-quarterly',
    identifier: 'com.traineffective.ios.basicquarterly',
    name: 'Basic Quarterly',
    price: 42,
    period: '3 months',
    yearly: false,
    currencyCode: 'USD',
    currencySymbol: '$',
    features: PLAN_FEATURES.slice(0, 1),
    notAvailableFeatures: PLAN_FEATURES.slice(1, 6),
  },
  {
    key: 2,
    id: 'basic-yearly',
    identifier: 'com.traineffective.ios.basicyearly',
    name: 'Basic Yearly',
    price: 118,
    period: 'Year',
    yearly: true,
    currencyCode: 'USD',
    currencySymbol: '$',
    features: PLAN_FEATURES.slice(0, 1),
    notAvailableFeatures: PLAN_FEATURES.slice(1, 6),
  },
  {
    key: 3,
    id: 'pro-quarterly',
    identifier: 'com.traineffective.ios.proquarterly',
    name: 'Pro Quarterly',
    price: 72,
    period: '3 months',
    yearly: false,
    popular: true,
    currencyCode: 'USD',
    currencySymbol: '$',
    features: PLAN_FEATURES.slice(0, 4),
    notAvailableFeatures: PLAN_FEATURES.slice(4, 6),
  },
  {
    key: 4,
    id: 'pro-yearly',
    identifier: 'com.traineffective.ios.proyearly',
    name: 'Pro Yearly',
    price: 192,
    period: 'Year',
    yearly: true,
    popular: true,
    currencyCode: 'USD',
    currencySymbol: '$',
    features: PLAN_FEATURES.slice(0, 4),
    notAvailableFeatures: PLAN_FEATURES.slice(4, 6),
  },
  {
    key: 5,
    id: 'elite-quarterly',
    identifier: 'com.traineffective.ios.elitequarterly',
    name: 'Elite Quarterly',
    price: 144,
    period: '3 months',
    yearly: false,
    currencyCode: 'USD',
    currencySymbol: '$',
    features: PLAN_FEATURES,
    notAvailableFeatures: [],
  },
  {
    key: 6,
    id: 'elite-yearly',
    identifier: 'com.traineffective.ios.eliteyearly',
    name: 'Elite Yearly',
    price: 398,
    period: 'Year',
    yearly: true,
    currencyCode: 'USD',
    currencySymbol: '$',
    features: PLAN_FEATURES,
    notAvailableFeatures: [],
  },
];

export {PLAN_FEATURES, PLANS};
