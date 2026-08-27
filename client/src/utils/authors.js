import { getFallbackAvatar } from './formatters';

export const studioAuthors = {
  'elena': {
    name: 'Elena Vance',
    role: 'Design Director & Co-Founder',
    bio: 'Elena is a co-founder and design director at Atelier Studio. She writes about typography, spatial systems, and untangling complex product workflows.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  },
  'julian': {
    name: 'Julian Thorne',
    role: 'Lead Creative Technologist',
    bio: 'Julian leads frontend architecture and creative code at the studio. He explores CSS subgrid, fluid typography, canvas shaders, and fast web rendering.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'
  },
  'marcus': {
    name: 'Marcus Lindqvist',
    role: 'Senior Product Strategist',
    bio: 'Marcus leads product strategy and client retrospectives. He specializes in fintech systems, workflow simplification, and navigating legacy technical constraints.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80'
  },
  'aria': {
    name: 'Aria Chen',
    role: 'Head of Design Research',
    bio: 'Aria runs observational field research and accessibility studies. She advocates for high-contrast systems, situational usability, and calm computing.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
  },
  'kasper': {
    name: 'Kasper Holm',
    role: 'Principal Systems Designer',
    bio: 'Kasper builds scalable design tokens and component architectures across web, iOS, and Figma. He believes the best system is the one teams actually use.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80'
  }
};

// Friendly reminder: We look up author info by username first, then topic/category, and fallback to Elena
export function getPostAuthor(post) {
  if (!post) return studioAuthors['elena'];

  if (post.author && typeof post.author === 'object' && post.author.username) {
    const uname = post.author.username.toLowerCase();
    if (studioAuthors[uname]) return studioAuthors[uname];
    
    return {
      name: post.author.username,
      role: 'Studio Contributor',
      bio: `${post.author.username} is a contributor to Atelier Journal writing on modern design and digital craft.`,
      avatar: getFallbackAvatar(post.author.username)
    };
  }

  const category = (post.category || '').toLowerCase();
  const slug = (post.slug || '').toLowerCase();

  if (category.includes('research') || slug.includes('research') || slug.includes('accessibility')) {
    return studioAuthors['aria'];
  }
  if (category.includes('case') || slug.includes('wealth') || slug.includes('banking') || slug.includes('nordic')) {
    return studioAuthors['marcus'];
  }
  if (category.includes('tutorial') || slug.includes('css') || slug.includes('prototyping') || slug.includes('subgrid')) {
    return studioAuthors['julian'];
  }
  if (category.includes('notes') || slug.includes('tokens') || slug.includes('workflow') || slug.includes('systems')) {
    return studioAuthors['kasper'];
  }

  return studioAuthors['elena'];
}
