import {
  AcademicDivision,
  NewsArticle,
  EventItem,
  CampusFacility,
  EducationalPillar,
  Testimonial,
  SearchResult
} from '../types';

import heroCampusImg from '../assets/images/lpa_hero_campus_1786005368430.jpg';
import studentsLabImg from '../assets/images/lpa_students_lab_1786005380443.jpg';
import outdoorLeadImg from '../assets/images/lpa_outdoor_leadership_1786005391315.jpg';
import headSchoolImg from '../assets/images/lpa_head_school_1786005403147.jpg';

export const SCHOOL_INFO = {
  name: "Life Preparatory Academy",
  shortName: "LifePrep Academy",
  motto: "Preparing Pupils for Life",
  tagline: "Progressive K–10 Education in Lalitpur",
  logoUrl: "/logo.png",
  established: "2022",
  location: "Lalitpur-13, Nepal",
  fullAddress: "Lalitpur-13, Kathmandu Valley, Nepal",
  phone: "+977 1-5185076",
  secondaryPhone: "+977 9876543210",
  email: "lifeprep@gmail.com",
  infoEmail: "lifeprep@gmail.com",
  website: "https://lpa.edu.np",
  workingHours: "Monday – Friday: 8:30 AM – 4:00 PM NST",
  accreditations: [
    "Approved by Nepal Ministry of Education",
    "Registered IEMIS Institution (Code: 2081)",
    "Progressive & Constructivist Education Partner",
    "Secondary Education Examination (SEE) Center"
  ],
  quickStats: [
    { label: "Our Motto", value: "Preparing Pupils for Life", subtext: "Holistic student empowerment" },
    { label: "SEE Board Success", value: "100%", subtext: "Grade 10 academic excellence" },
    { label: "Academic Levels", value: "ECD to Grade 10", subtext: "Nursery, Primary & Secondary" },
    { label: "Student-Teacher Ratio", value: "8:1", subtext: "Personalized mentorship & care" }
  ]
};

export const HEAD_OF_SCHOOL_MESSAGE = {
  name: "Mr. Raju Moktan",
  title: "Founder & Principal",
  degree: "M.Ed. in Educational Leadership & Pedagogy",
  image: headSchoolImg,
  quote: "At LifePrep Academy, education is not about passive listening. It is about empowering every child to become an active problem solver, a critical thinker, and a compassionate citizen prepared for life.",
  message: `Welcome to Life Preparatory Academy (LifePrep Academy) in Lalitpur. Founded in 2022 with a steadfast commitment to progressive education, our mission is captured in our school motto: "Preparing Pupils for Life."

Our educational philosophy is rooted in progressivism and constructivism. We view learning as an active, engaging journey where children experiment, question, and discover. Teachers serve as caring facilitators who guide students through project-based inquiry, story-based pedagogy, skill-based training, and moral character building.

From Early Childhood Development (Nursery, LKG, UKG) through Primary (Grades 1–5) and Secondary Education (Grades 6–10), we cultivate academic rigor, technological literacy, and practical life skills. We warmly invite you to visit our campus in Lalitpur and experience our vibrant learning community.`
};

export const ACADEMIC_DIVISIONS: AcademicDivision[] = [
  {
    id: 'pre-primary',
    title: 'Early Childhood Development (ECD)',
    grades: 'Nursery, LKG & UKG',
    ageRange: 'Ages 3 – 5',
    tagline: 'Joyful Discovery, Play-Based Inquiry & Story Pedagogy',
    description: 'Our Early Childhood Development program nurtures curiosity, emotional security, and foundational communication skills through play-based discovery, story pedagogy, and sensory activities across Nursery, LKG, and UKG.',
    keyHighlights: [
      'Nursery, LKG & UKG Structured Early Curriculum',
      'Storytelling as a Core Teaching Pedagogy',
      'Play-Based & Constructivist Skill Discovery',
      'Phonics, Early Numeracy & Social Skill Circles'
    ],
    curriculumOverview: 'Focuses on child-centered inquiry, early language acquisition, creative arts, physical coordination, and foundational character values.',
    color: 'from-amber-500 to-orange-600',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'primary',
    title: 'Primary Education Division',
    grades: 'Grades 1 to 5',
    ageRange: 'Ages 6 – 10',
    tagline: 'Active Science Experiments, Skill-Based Learning & Values',
    description: 'Primary School blends core literacy and mathematics with active science experimentation, project-based tasks, and value-based learning to nurture confident, independent thinkers.',
    keyHighlights: [
      'Grades 1 to 5 Comprehensive Core Curriculum',
      'Experiment & Project-Based Science Discovery',
      'Integrated ICT, Basic Coding & Creative Arts',
      'Value Education, Physical Wellness & Co-Curricular Clubs'
    ],
    curriculumOverview: 'Emphasizes conceptual understanding, mathematical reasoning, collaborative projects, digital literacy, and ethical responsibility.',
    color: 'from-emerald-500 to-teal-700',
    iconName: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'secondary',
    title: 'Secondary Education Division',
    grades: 'Grades 6 to 10',
    ageRange: 'Ages 11 – 15',
    tagline: 'Analytical Inquiry, STEM & SEE Board Examination Excellence',
    description: 'Covering Grades 6 through 10, Secondary Education combines advanced academic inquiry, practical laboratory research, technical and life skills, and comprehensive preparation for the Grade 10 Secondary Education Examination (SEE).',
    keyHighlights: [
      'Grades 6 to 10 Comprehensive Secondary Curriculum',
      'Inquiry-Based STEM, Science Labs & ICT',
      'Technical, Vocational & Practical Life Skills',
      'Grade 10 SEE Examination Prep & Higher Pathway Mentorship'
    ],
    curriculumOverview: 'Focuses on analytical reasoning, digital competence, research projects, leadership ethics, and SEE board examination readiness.',
    color: 'from-blue-600 to-indigo-700',
    iconName: 'Compass',
    image: outdoorLeadImg
  }
];

export const EDUCATIONAL_PILLARS: EducationalPillar[] = [
  {
    id: 'progressive-constructivism',
    title: 'Progressive & Constructivist Learning',
    subtitle: 'Educating the Whole Child',
    description: 'Rooted in progressivism, we view students as active problem-solvers and thinkers. Teachers act as facilitators, guiding student inquiry and connecting classroom lessons to real-life experiences.',
    icon: 'BookOpen',
    highlights: ['Student-Centered Exploration', 'Constructivist Framework', 'Teachers as Facilitators']
  },
  {
    id: 'skill-life-training',
    title: 'Technical, Vocational & Life Skills',
    subtitle: 'Practical Mastery for Modern Life',
    description: 'Beyond traditional textbooks, our curriculum integrates practical life skills, STEM education, technical literacy, and hands-on vocational modules that prepare students for real-world application.',
    icon: 'Cpu',
    highlights: ['Hands-On STEM & Science Labs', 'Practical Life Skill Modules', 'Digital & ICT Competence']
  },
  {
    id: 'story-value-pedagogy',
    title: 'Story-Based & Value Education',
    subtitle: 'Cultivating Ethics & Character',
    description: 'We use narrative storytelling as a primary pedagogical tool alongside value-based learning to instill empathy, integrity, respect, and emotional resilience in every student.',
    icon: 'HeartHandshake',
    highlights: ['Storytelling Teaching Pedagogy', 'Daily Value Assemblies', 'Social-Emotional Well-Being']
  },
  {
    id: 'community-outdoor',
    title: 'Community Connection & Experiential Learning',
    subtitle: 'Rooted in Lalitpur & Environmental Awareness',
    description: 'We foster strong partnerships with parents and the local community in Lalitpur, combining classroom learning with outdoor environmental fieldwork and social responsibility.',
    icon: 'Mountain',
    highlights: ['Parent-School Partnership', 'Environmental Fieldwork', 'Community Action Projects']
  }
];

export const CAMPUS_FACILITIES: CampusFacility[] = [
  {
    id: 'stem-lab',
    name: 'STEM & Science Innovation Lab',
    category: 'STEM',
    shortDesc: 'Modern science apparatus, robotics kits, and digital tools for hands-on learning.',
    fullDesc: 'Equipped with scientific testing apparatus, microcontrollers, and digital sensors to support project-based physics, chemistry, biology, and technology experiments.',
    features: ['Practical Science Experiment Workstations', 'Robotics & Microcontroller Kits', 'Digital Sensors & Testing Gear'],
    image: studentsLabImg
  },
  {
    id: 'ict-suite',
    name: 'ICT & Digital Learning Hub',
    category: 'Technology',
    shortDesc: 'High-speed computer station supporting digital literacy and online school integration.',
    fullDesc: 'Features modern computer terminals, high-speed internet connectivity, and educational software supporting computer science, research projects, and hybrid learning modules.',
    features: ['High-Speed Computer Station', 'Coding & Computer Science Tools', 'Online School Integration Suite'],
    image: heroCampusImg
  },
  {
    id: 'library-commons',
    name: 'Library & Story Resource Commons',
    category: 'Academics',
    shortDesc: 'A rich collection of children’s literature, research texts, and comfortable reading nooks.',
    fullDesc: 'Designed to champion our story-based pedagogy, offering curated bilingual literature, reference materials, and quiet reflection spaces for students.',
    features: ['Curated English & Nepali Storybooks', 'Academic Research & Reference Section', 'Quiet Individual Study Nooks'],
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'arts-multipurpose',
    name: 'Creative Arts & Multipurpose Hall',
    category: 'Arts',
    shortDesc: 'Spacious arena for music, drama, fine arts, and school assemblies.',
    fullDesc: 'A versatile venue hosting creative art exhibitions, musical performances, drama productions, community events, and daily school assemblies.',
    features: ['Stage & Performance Lighting', 'Acoustic Musical Instruments', 'Art Exhibition Gallery'],
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sports-field',
    name: 'Sports & Playground Complex',
    category: 'Athletics',
    shortDesc: 'Outdoor play area for football, basketball, volleyball, and physical fitness.',
    fullDesc: 'Promotes health, teamwork, and athletic endurance through structured physical education, sports clubs, and outdoor recreational games.',
    features: ['Multi-Purpose Sports Court', 'Safe Playground Equipment', 'Physical Fitness & Athletics Gear'],
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80'
  }
];

export const LATEST_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'LifePrep Academy Celebrates Academic Honors & 100% SEE Board Success',
    category: 'Academics',
    date: 'August 1, 2026',
    readTime: '3 min read',
    featured: true,
    excerpt: 'Grade 10 graduating cohort achieves outstanding results in the Secondary Education Examination (SEE), earning distinctions across core subjects.',
    content: 'Life Preparatory Academy is proud to announce exceptional performance by our Grade 10 students in the Secondary Education Examination (SEE). Through project-based learning and dedicated teacher mentorship, 100% of candidates passed with distinction.',
    image: studentsLabImg
  },
  {
    id: 'news-2',
    title: 'Students Demonstrate Practical Skill Projects at Annual Science & STEM Expo',
    category: 'Campus Life',
    date: 'July 20, 2026',
    readTime: '4 min read',
    excerpt: 'Primary and Secondary students present working models, waste-recycling systems, and robotics prototypes to parents and community guests.',
    content: 'Embodying our constructivist learning model, LPA students presented over 40 hands-on science experiments and practical life-skill solutions at our Lalitpur campus.',
    image: heroCampusImg
  },
  {
    id: 'news-3',
    title: 'Admissions Open for Academic Session 2026–2027: ECD to Grade 10',
    category: 'Admissions',
    date: 'July 10, 2026',
    readTime: '2 min read',
    excerpt: 'Applications are now open for Early Childhood Development (Nursery, LKG, UKG) through Grade 10. Visit our campus in Lalitpur.',
    content: 'We invite prospective families to tour our campus, observe active classrooms, meet Principal Raju Moktan, and learn about our progressive curriculum.',
    image: outdoorLeadImg
  },
  {
    id: 'news-4',
    title: 'Parent Partnership Workshop Emphasizes Story-Based Pedagogy & Well-Being',
    category: 'Community',
    date: 'June 25, 2026',
    readTime: '3 min read',
    excerpt: 'Parents gather at LPA for an interactive workshop on supporting emotional resilience and story-based learning at home.',
    content: 'At LifePrep Academy, education is a shared journey. Our recent workshop provided parents with strategies for reinforcing value-based learning and reading habits at home.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80'
  }
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'LPA Campus Open House & School Tour',
    date: 'Aug 18, 2026',
    month: 'AUG',
    day: '18',
    time: '9:30 AM – 1:00 PM',
    location: 'LPA Campus, Lalitpur-13',
    category: 'Admissions',
    description: 'Tour our classrooms, observe story-based learning in action, and meet Founder Principal Raju Moktan.'
  },
  {
    id: 'evt-2',
    title: 'Annual STEM, Science & Vocational Skill Fair',
    date: 'Sep 05, 2026',
    month: 'SEP',
    day: '05',
    time: '10:00 AM – 3:00 PM',
    location: 'LPA Multipurpose Hall & STEM Lab',
    category: 'Academics',
    description: 'Student project displays featuring practical science experiments, digital projects, art galleries, and live demonstrations.'
  },
  {
    id: 'evt-3',
    title: 'Storytelling & Value Education Festival',
    date: 'Sep 22, 2026',
    month: 'SEP',
    day: '22',
    time: '11:00 AM – 3:30 PM',
    location: 'Campus Courtyard & Library',
    category: 'Community',
    description: 'A celebration of narrative learning, traditional Nepalese stories, drama, and student character awards.'
  },
  {
    id: 'evt-4',
    title: 'Grade 10 SEE Board Examination Guidance Seminar',
    date: 'Oct 12, 2026',
    month: 'OCT',
    day: '12',
    time: '9:00 AM – 12:30 PM',
    location: 'Secondary Academic Block',
    category: 'Academics',
    description: 'Special mentorship session for Grade 10 students and parents on exam strategies, study plans, and 10+2 pathway choices.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: "LifePrep Academy has transformed the way my children approach learning. Rather than memorizing text, they ask questions, build projects, and express themselves with confidence.",
    author: "Sita & Ramesh Adhikari",
    role: "Parents of Nursery & Grade 4 Students",
    country: "Lalitpur, Nepal",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 'test-2',
    quote: "Studying at LPA gave me both strong SEE board exam preparation and real life skills. Our teachers were true mentors who encouraged us to think critically every single day.",
    author: "Prashant Shrestha",
    role: "LPA Grade 10 Graduate",
    country: "Lalitpur, Nepal",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 'test-3',
    quote: "The emphasis on story-based pedagogy and value education creates a warm, respectful environment. My daughter loves going to school every morning.",
    author: "Dr. Anjali Gurung",
    role: "Parent of Grade 7 Student",
    country: "Kathmandu Valley, Nepal",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  }
];

export const UNIVERSITY_DESTINATIONS = [];

export const SEARCH_INDEX: SearchResult[] = [
  { id: 's1', title: 'Admissions Requirements & Application Process', category: 'Admissions', description: 'Step-by-step guide to applying to Life Preparatory Academy Lalitpur.', sectionId: 'admissions' },
  { id: 's2', title: 'Admissions Inquiry & Campus Visits', category: 'Admissions', description: 'Information on admissions process, school visits, and campus tours.', sectionId: 'admissions' },
  { id: 's3', title: 'Academic Pathways & Grade 10 SEE Excellence', category: 'Academics', description: 'Nursery to Grade 10 curriculum and SEE board examination preparation.', sectionId: 'academics' },
  { id: 's4', title: 'STEM & Science Experimentation Lab', category: 'Facilities', description: 'Practical science apparatus, robotics kits, and digital workstations.', sectionId: 'facilities' },
  { id: 's5', title: 'Progressive Pedagogy & Value Education', category: 'Pillars', description: 'Constructivism, story-based pedagogy, and skill-based training.', sectionId: 'pillars' },
  { id: 's6', title: 'Principal Welcome & Educational Vision', category: 'About Us', description: 'Message from Founder Principal Raju Moktan on LPA values.', sectionId: 'about' },
  { id: 's7', title: 'Campus Open House & Tour Scheduling', category: 'Events', description: 'Book a guided tour of our Lalitpur campus.', sectionId: 'events' },
  { id: 's8', title: 'Extracurricular Clubs & Sports Programs', category: 'Campus Life', description: 'After-school clubs, arts, athletics, and community service.', sectionId: 'facilities' }
];
