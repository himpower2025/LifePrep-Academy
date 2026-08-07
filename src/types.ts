export type AcademicStage = 'pre-primary' | 'primary' | 'secondary';

export interface AcademicDivision {
  id: AcademicStage;
  title: string;
  grades: string;
  ageRange: string;
  tagline: string;
  description: string;
  keyHighlights: string[];
  curriculumOverview: string;
  color: string;
  iconName: string;
  image: string;
}

export type NewsCategory = 'All' | 'Academics' | 'Campus Life' | 'Sports & Arts' | 'Admissions' | 'Community';

export interface NewsArticle {
  id: string;
  title: string;
  category: NewsCategory;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  featured?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  month: string;
  day: string;
  time: string;
  location: string;
  category: string;
  description: string;
}

export interface CampusFacility {
  id: string;
  name: string;
  category: 'Academics' | 'STEM' | 'Athletics' | 'Arts' | 'Outdoors' | 'Technology';
  shortDesc: string;
  fullDesc: string;
  features: string[];
  image: string;
}

export interface EducationalPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  country: string;
  avatar: string;
}

export interface SearchResult {
  id: string;
  title: string;
  category: string;
  description: string;
  sectionId: string;
}

export interface UniversityDestination {
  name: string;
  location: string;
  badgeText: string;
}

export interface AdmissionsFormData {
  studentFirstName: string;
  studentLastName: string;
  dateOfBirth: string;
  applyingGrade: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  nationality: string;
  currentSchool: string;
  startSemester: string;
  message: string;
}

export interface TourBookingData {
  parentName: string;
  email: string;
  phone: string;
  tourType: 'In-Person' | 'Virtual 360';
  preferredDate: string;
  preferredTimeSlot: string;
  gradeOfInterest: string;
  numberOfVisitors: number;
  specialRequests: string;
}
