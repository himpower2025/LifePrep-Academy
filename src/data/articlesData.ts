import { EducatorArticle, ArticleDivision } from '../types';

export const INITIAL_ARTICLES: EducatorArticle[] = [
  {
    id: 'art-1',
    title: 'Constructivism in Modern Education: Moving Beyond Passive Rote Learning',
    authorName: 'Mr. Raju Moktan',
    authorRole: 'Founder & Principal',
    authorAvatar: '/principal.png',
    division: 'general',
    date: 'August 8, 2026',
    readTime: '5 min read',
    summary: 'An exploration of how constructivist pedagogy transforms the classroom from passive listening into an active laboratory of problem solving and character development.',
    content: `At Life Preparatory Academy, education is not about memorizing textbook answers for a single exam; it is about building the mental tools to navigate life. Constructivist learning theory asserts that knowledge is actively constructed by the learner through experience, questioning, and reflection.

In traditional classrooms, the teacher stands at the front, delivering lectures while students quietly absorb facts. In a constructivist environment, the teacher acts as a facilitator and co-explorer. We ask open-ended questions: "Why do you think the bridge collapsed during your model test?" or "How might we reduce water runoff on our campus hill?"

When students construct their own understanding through trial, error, and collaboration, the learning becomes permanent. They do not merely remember science—they think like scientists. They do not merely learn ethics—they practice empathetic citizenship.

As we look toward the future of education in Lalitpur and across Nepal, our goal remains steadfast: empowering every student to become a confident, critical, and compassionate lifelong learner.`,
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    tags: ['Pedagogy', 'Constructivism', 'Active Learning', 'Educational Leadership'],
    featured: true,
    createdAt: new Date('2026-08-08').toISOString()
  },
  {
    id: 'art-2',
    title: 'Nurturing Curiosity: Play-Based Inquiry in Early Childhood Development',
    authorName: 'Ms. Saraswati Sharma',
    authorRole: 'Lead Early Childhood Educator (ECD)',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    division: 'pre-primary',
    date: 'August 5, 2026',
    readTime: '4 min read',
    summary: 'How sensory play, story circles, and guided exploration build critical neural connections, language fluency, and emotional resilience in Nursery to UKG children.',
    content: `Early Childhood Development (Nursery, LKG, UKG) is often called the foundation of all learning, but it is much more than preparation for primary school—it is a magical window of neurodevelopmental growth.

At LifePrep Academy, our ECD curriculum revolves around structured play and sensory inquiry. When a four-year-old builds a tower with wooden blocks, they are not just playing; they are testing physics, spatial awareness, motor control, and balance. When they negotiate turns in the sandbox, they learn impulse control and conflict resolution.

Key components of our ECD approach include:
1. Storytelling & Phonics Immersion: Developing phonemic awareness and a genuine love for reading through interactive storybooks and dramatic play.
2. Tactile Math Explorations: Counting real pinecones, sorting colorful pebbles, and measuring water volume rather than filling out repetitive worksheets.
3. Emotional Regulation Corners: Teaching young children to identify their emotions ("I feel frustrated because my tower fell") and practice calming breathing techniques.

Parents often ask how they can support play-based learning at home. The answer is simple: read together daily, encourage open-ended questions, and allow children the freedom to get their hands dirty while exploring nature.`,
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    tags: ['ECD', 'Play-Based Learning', 'Child Psychology', 'Early Literacy'],
    featured: false,
    createdAt: new Date('2026-08-05').toISOString()
  },
  {
    id: 'art-3',
    title: 'STEM in Primary Years: Integrating Hands-On Projects into Daily Math & Science',
    authorName: 'Mr. Bikash Shrestha',
    authorRole: 'Primary STEM & Robotics Coordinator',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    division: 'primary',
    date: 'August 2, 2026',
    readTime: '6 min read',
    summary: 'Bridging abstract mathematical concepts with tangible engineering challenges for Grades 1 through 5 through outdoor measurements, solar circuits, and coding.',
    content: `For many children worldwide, mathematics and science are perceived as intimidating subjects filled with abstract formulas. In the Primary Division (Grades 1–5) at LifePrep Academy, we flip this narrative by connecting STEM directly to hands-on creation.

In Grade 3 geometry, students do not just draw triangles on paper. They step out onto our Lalitpur campus green space with measuring tapes to calculate perimeter, construct wooden seed frames for our school eco-garden, and analyze structural stability.

In Grade 5 science, students study renewable energy by building simple solar-powered water pumps and wind indicators. They write down predictions, record data in lab logs, and present their findings during our annual STEM Expo.

By weaving technology and design thinking into daily lessons, primary students build intrinsic confidence. They realize that math is a language for solving real problems, not just a set of test questions.`,
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    tags: ['Primary Education', 'STEM', 'Project-Based', 'Robotics', 'Mathematics'],
    featured: false,
    createdAt: new Date('2026-08-02').toISOString()
  },
  {
    id: 'art-4',
    title: 'Developing Critical Thinkers and Problem Solvers for the SEE and Beyond',
    authorName: 'Dr. Anish Gurung',
    authorRole: 'Head of Secondary Science & Academic Rigor',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    division: 'secondary',
    date: 'July 28, 2026',
    readTime: '7 min read',
    summary: 'Preparing Grade 6 to 10 students for national SEE excellence while cultivating independent research skills, environmental ethics, and global digital literacy.',
    content: `The Secondary Division (Grades 6–10) marks a pivotal transformation in a young learner's life. As students prepare for the Secondary Education Examination (SEE), academic rigor becomes paramount. However, academic excellence and deep conceptual understanding must go hand in hand.

At LifePrep Academy, our SEE prep strategy balances thorough exam familiarity with critical scientific inquiry. In our computer lab and STEM hub, secondary students write Python code, conduct chemistry titrations, and debate environmental policy in social studies.

We emphasize four core pillars in secondary education:
1. Analytical Essay Writing & Rhetoric: Expressing nuanced viewpoints clearly in both English and Nepali.
2. Scientific Method & Field Work: Conducting real ecological testing in the Kathmandu Valley watershed.
3. Digital Ethics & AI Literacy: Understanding how to leverage modern artificial intelligence as a learning assistant while preserving intellectual integrity.
4. Peer Mentorship & Service Leadership: Secondary students mentor younger primary peers in math clubs and community hygiene drives.

Our graduates leave LifePrep Academy not only with high SEE distinction, but with the moral clarity and practical capabilities needed to excel in top A-Level, +2, or international diploma programs.`,
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Secondary Education', 'SEE Preparation', 'Scientific Inquiry', 'Future Readiness'],
    featured: false,
    createdAt: new Date('2026-07-28').toISOString()
  }
];

const ARTICLES_KEY = 'lpa_school_articles_v1';

export function getStoredArticles(): EducatorArticle[] {
  try {
    const raw = localStorage.getItem(ARTICLES_KEY);
    if (!raw) {
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(INITIAL_ARTICLES));
      return INITIAL_ARTICLES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load articles from storage:', e);
    return INITIAL_ARTICLES;
  }
}

export function saveStoredArticles(articles: EducatorArticle[]) {
  try {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
    window.dispatchEvent(new Event('articles_updated'));
  } catch (e) {
    console.error('Failed to save articles to storage:', e);
  }
}
