export interface TypingResource {
  id: string;
  title: string;
  url: string;
  provider: string;
  badge: string;
  category: 'beginner' | 'speed' | 'curriculum' | 'game';
  targetLevel: string;
  shortDesc: string;
  features: string[];
  recommendedFor: string;
  isPopular?: boolean;
}

export const TYPING_RESOURCES: TypingResource[] = [
  {
    id: 'typingclub',
    title: 'TypingClub (EdClub)',
    url: 'https://www.typingclub.com/sportal/program-3.game',
    provider: 'EdClub',
    badge: 'Best for Beginners',
    category: 'beginner',
    targetLevel: 'ECD & Primary (Nursery–Grade 5)',
    shortDesc: 'The gold standard in touch-typing education. Features 100+ interactive lessons, visual hand-position guides, and audio-guided drills completely free without requiring an account or login.',
    features: [
      '100% Free & No Login Needed',
      'Color-coded on-screen finger guides',
      'Interactive voice feedback & sound effects',
      'Step-by-step home row muscle memory'
    ],
    recommendedFor: 'Building foundational touch typing and correct finger placement for younger students.',
    isPopular: true
  },
  {
    id: 'monkeytype',
    title: 'Monkeytype Speed & Accuracy',
    url: 'https://monkeytype.com',
    provider: 'Monkeytype',
    badge: 'Clean & Ultra Fast',
    category: 'speed',
    targetLevel: 'Primary & Secondary (Grades 3–10)',
    shortDesc: 'A minimalist, ad-free typing test and practice environment. Choose from 15s to 60s timed tests, quote mode, punctuation drills, and custom English word lists with immediate WPM (Words Per Minute) tracking.',
    features: [
      'Zero Login / Instant Practice',
      'Live WPM, Accuracy & Consistency metrics',
      'Punctuation, numbers & quote modes',
      'Distraction-free, responsive interface'
    ],
    recommendedFor: 'Daily speed benchmarks, accuracy refinement, and secondary student vocabulary practice.',
    isPopular: true
  },
  {
    id: 'keybr',
    title: 'Keybr Adaptive Touch Typing',
    url: 'https://www.keybr.com',
    provider: 'Keybr Tutor',
    badge: 'Smart Finger Training',
    category: 'beginner',
    targetLevel: 'Grades 3–10 & Beginners',
    shortDesc: 'Uses an intelligent algorithm to analyze your keystrokes, detect letter hesitations, and dynamically generate phonetic drills to strengthen weaker fingers.',
    features: [
      'No registration or signup required',
      'Targeted letter frequency generator',
      'Real-time typing accuracy heatmaps',
      'Reinforces blind touch typing'
    ],
    recommendedFor: 'Mastering smooth keyboard flow and fixing error-prone letter combinations.'
  },
  {
    id: 'typingdotcom',
    title: 'Typing.com Student Lessons',
    url: 'https://www.typing.com/student/lessons',
    provider: 'Typing.com',
    badge: 'Structured Curriculum',
    category: 'curriculum',
    targetLevel: 'Grades 1–10 (Beginner to Advanced)',
    shortDesc: 'Structured keyboarding curriculum organized into Beginner, Intermediate, and Advanced tracks. Accessible immediately as a guest without creating an account.',
    features: [
      'Instant guest access without credentials',
      'Covers home row, numbers, and symbols',
      '1-minute, 3-minute, and 5-minute timed tests',
      'Practical paragraph typing exercises'
    ],
    recommendedFor: 'Structured progression from basic keys to full academic essay typing.'
  },
  {
    id: 'nitrotype',
    title: 'Nitro Type Car Racing Game',
    url: 'https://www.nitrotype.com/race',
    provider: 'Nitro Type / Teaching.com',
    badge: 'Gamified Practice',
    category: 'game',
    targetLevel: 'All Ages & Fun Challenges',
    shortDesc: 'Exciting real-time multiplayer car racing where typing speed and accuracy accelerate your race car! Click "Race as Guest" to play instantly without logging in.',
    features: [
      'Play as Guest with 1-click (No login)',
      'High-energy competitive race tracks',
      'Great for motivation & typing stamina',
      'Real-time accuracy rewards'
    ],
    recommendedFor: 'Fun warm-ups, weekend challenges, and student typing engagement.',
    isPopular: true
  },
  {
    id: 'tenfastfingers',
    title: '10FastFingers 1-Minute Test',
    url: 'https://10fastfingers.com/typing-test/english',
    provider: '10FastFingers',
    badge: 'Quick Speed Test',
    category: 'speed',
    targetLevel: 'Grades 3–10 & Faculty',
    shortDesc: 'The classic 60-second typing test using the top 200 most common English words. Delivers instant WPM and keystroke precision calculations.',
    features: [
      'Instant 60-second speed benchmark',
      'Top 200 and Top 1000 English word lists',
      'No registration or profile setup',
      'Instant net WPM calculation'
    ],
    recommendedFor: 'Quick daily typing speed evaluations and personal goal tracking.'
  }
];

export const TYPING_POSTURE_TIPS = [
  {
    title: 'Home Row Foundation',
    desc: 'Rest your left fingers on A-S-D-F and right fingers on J-K-L-;. Feel the tactile bumps on F and J.'
  },
  {
    title: 'Ergonomic Sitting Posture',
    desc: 'Sit with a straight back, feet flat on the floor, and elbows bent at a 90-degree angle level with the keyboard.'
  },
  {
    title: 'Eyes on the Screen',
    desc: 'Avoid looking down at the keyboard. Trust your fingers and muscle memory to find each key.'
  },
  {
    title: 'Accuracy Precedes Speed',
    desc: 'Focus on 98%+ accuracy first. Typing speed (WPM) naturally increases as precision becomes second nature.'
  }
];
