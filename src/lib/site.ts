export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  image: string;
  brief: string;
  description: string;
  credits: { label: string; value: string }[];
};

export const site = {
  name: 'Léo Parpeix',
  role: 'Art director & interactive designer',
  email: 'hello@leoparpeix.com',
  location: 'Nice, France',
  coordinates: '43.7102° N / 7.2620° E',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/leo_parpeix' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/leoparpeix' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@leoparpeix' },
  ],
  nav: [
    { label: 'Work', href: '#work', index: '01' },
    { label: 'About', href: '#about', index: '02' },
    { label: 'Playground', href: '#playground', index: '03' },
    { label: 'Contact', href: '#contact', index: '04' },
  ],
  services: [
    'Art direction',
    'Interactive design',
    'WebGL / 3D',
    'Motion systems',
    'Creative development',
  ],
  stats: [
    { value: '10+', label: 'Years directing' },
    { value: '48', label: 'Worlds shipped' },
    { value: '14', label: 'Awards & mentions' },
  ],
};

export const projects: Project[] = [
  {
    slug: 'neon-noir',
    index: '01',
    title: 'Neon Noir',
    category: 'Interactive world',
    year: '2026',
    client: 'Maison Solaire',
    role: 'Art direction, WebGL, Sound',
    image: '/media/project-3.webp',
    brief: 'A liquid-chrome title sequence you can steer with your hands.',
    description:
      'An explorable brand world built from ribbons of chrome and refracted neon. The whole scene runs on a single WebGL canvas, reacting to cursor velocity, scroll and the microphone. Launch night held 22,000 sessions without a single dropped frame on mobile.',
    credits: [
      { label: 'Client', value: 'Maison Solaire' },
      { label: 'Role', value: 'Art direction, WebGL, Sound' },
      { label: 'Recognition', value: 'Awwwards SOTD nominee' },
    ],
  },
  {
    slug: 'palm-grand',
    index: '02',
    title: 'Palm Grand',
    category: 'Fashion campaign',
    year: '2025',
    client: 'Palm Grand Atelier',
    role: 'Concept, Photography direction, Site',
    image: '/media/project-2.webp',
    brief: 'A resort-wear drop that behaves like a late-night drive.',
    description:
      'Campaign and digital flagship for a resort-wear house, shot on a penthouse balcony above the bay. Editorial layouts dissolve into full-bleed film stills as you scroll, with a product layer that never breaks the mood.',
    credits: [
      { label: 'Client', value: 'Palm Grand Atelier' },
      { label: 'Role', value: 'Concept, Photography direction, Site' },
      { label: 'Recognition', value: 'Awwwards Honourable Mention' },
    ],
  },
  {
    slug: 'solstice',
    index: '03',
    title: 'Solstice',
    category: 'Live visuals',
    year: '2025',
    client: 'Sunset Arena',
    role: 'Stage design, Real-time visuals',
    image: '/media/project-6.webp',
    brief: 'A 40-metre sphere of light for one very long night.',
    description:
      'Stage identity and real-time visual system for a festival closing set. Every beam, veil and particle is driven by the audio bus, so the room breathes with the set instead of replaying a loop.',
    credits: [
      { label: 'Client', value: 'Sunset Arena' },
      { label: 'Role', value: 'Stage design, Real-time visuals' },
      { label: 'Recognition', value: 'FWA of the day' },
    ],
  },
  {
    slug: 'casa-marea',
    index: '04',
    title: 'Casa Marea',
    category: 'Hospitality identity',
    year: '2025',
    client: 'Casa Marea',
    role: 'Identity, Art direction, Booking flow',
    image: '/media/project-4.webp',
    brief: 'Old-world hospitality, lit like a film still.',
    description:
      'A full identity refresh for a cliffside hotel: custom wordmark, photography, and a booking experience quiet enough to let the place do the talking. Direct bookings rose 38% in the first season.',
    credits: [
      { label: 'Client', value: 'Casa Marea' },
      { label: 'Role', value: 'Identity, Art direction, Booking flow' },
      { label: 'Recognition', value: 'Type Directors Club merit' },
    ],
  },
  {
    slug: 'eclat',
    index: '05',
    title: 'Éclat',
    category: 'Fragrance launch',
    year: '2024',
    client: 'Éclat Parfums',
    role: 'Launch concept, Design, 3D',
    image: '/media/project-5.webp',
    brief: 'The bottle as a building, the scent as weather.',
    description:
      'A launch site that treats a fragrance like architecture. Real-time glass, caustics and drifting silk respond to scroll, while a scent-mapping tool translates the notes into light temperatures.',
    credits: [
      { label: 'Client', value: 'Éclat Parfums' },
      { label: 'Role', value: 'Launch concept, Design, 3D' },
      { label: 'Recognition', value: 'CSS Design Awards UI winner' },
    ],
  },
  {
    slug: 'golden-hour',
    index: '06',
    title: 'Golden Hour',
    category: 'Editorial platform',
    year: '2024',
    client: 'Golden Hour Journal',
    role: 'Design system, Front-end',
    image: '/media/project-1.webp',
    brief: 'A magazine that only goes live after six in the evening.',
    description:
      'Editorial platform for a journal about creative life after work. The interface shifts its palette with the local sunset, and long reads open into full-screen picture essays with almost no chrome.',
    credits: [
      { label: 'Client', value: 'Golden Hour Journal' },
      { label: 'Role', value: 'Design system, Front-end' },
      { label: 'Recognition', value: 'Awwwards SOTM nominee' },
    ],
  },
];

export const tickerItems = [
  'Art direction',
  'Interactive design',
  'WebGL & 3D',
  'Motion systems',
  'Brand worlds',
  'Sound design',
];
