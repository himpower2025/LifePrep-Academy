export interface TypingResource {
  id: string;
  title: string;
  url: string;
  badge: string;
  targetLevel: string;
  shortDesc: string;
  isPopular?: boolean;
}

export const TYPING_RESOURCES: TypingResource[] = [
  {
    id: 'typingclub',
    title: 'TypingClub',
    url: 'https://www.typingclub.com/sportal/program-3.game',
    badge: 'Best for Beginners',
    targetLevel: 'Nursery – Grade 5',
    shortDesc: 'Interactive lessons with color-coded finger placement guides.',
    isPopular: true
  },
  {
    id: 'monkeytype',
    title: 'Monkeytype',
    url: 'https://monkeytype.com',
    badge: 'Speed Test',
    targetLevel: 'Grades 3 – 10',
    shortDesc: 'Clean, fast speed tests with instant Words-Per-Minute (WPM) scores.',
    isPopular: true
  },
  {
    id: 'nitrotype',
    title: 'Nitro Type',
    url: 'https://www.nitrotype.com/race',
    badge: 'Typing Game',
    targetLevel: 'All Grades',
    shortDesc: 'Fun car racing game where typing speed and accuracy drive your car.',
    isPopular: true
  },
  {
    id: 'keybr',
    title: 'Keybr',
    url: 'https://www.keybr.com',
    badge: 'Adaptive Practice',
    targetLevel: 'Grades 3 – 10',
    shortDesc: 'Smart touch-typing trainer that automatically fixes weak keys.'
  },
  {
    id: 'typingdotcom',
    title: 'Typing.com',
    url: 'https://www.typing.com/student/lessons',
    badge: 'Full Lessons',
    targetLevel: 'Grades 1 – 10',
    shortDesc: 'Comprehensive lessons from home row basics to full paragraphs.'
  },
  {
    id: 'tenfastfingers',
    title: '10FastFingers',
    url: 'https://10fastfingers.com/typing-test/english',
    badge: '60s Speed Test',
    targetLevel: 'Grades 3 – 10',
    shortDesc: 'Quick 1-minute benchmark using the top 200 common English words.'
  }
];

export const TYPING_QUICK_TIPS = [
  'Rest fingers on Home Row (ASDF - JKL;)',
  'Keep your eyes on screen, not keys',
  'Prioritize 98%+ accuracy over speed'
];

