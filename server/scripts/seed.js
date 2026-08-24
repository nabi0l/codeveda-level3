const mongoose = require('mongoose');
require('dotenv').config();
const Post = require('../models/Post');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/design-journal';

const samplePosts = [
  {
    title: "The Case Against Default Minimalism: Rediscovering Soul in Digital Craft",
    slug: "case-against-default-minimalism",
    excerpt: "Why the modern web has become a sea of interchangeable grey cards, and how our studio is bringing tactile warmth, friction, and character back to digital spaces.",
    content: `
# The Case Against Default Minimalism: Rediscovering Soul in Digital Craft

Open twelve browser tabs from any tech company founded in the last five years, and you will notice something unsettling: they all look like they were designed by the exact same algorithm. 

The same 8px border radii. The exact same slate-500 neutral palette. The identical Inter typography set at 16px with 1.5 line height. The friendly, generic pastel badges.

Minimalism was supposed to liberate us from clutter. Instead, it has turned into a corporate safety blanket—a sterile, frictionless aesthetic that confuses cleanliness with absence of personality.

## The Tyranny of the Component Library

When we start a new project at the studio, one of our first rules is to **stay out of Figma component UI kits for the first two weeks**. 

Component libraries are incredible for scale, but they are fatal to creative ideation. When you begin a project by pulling pre-made cards, buttons, and navbars off the shelf, you are adopting everyone else's architectural assumptions before you even understand the unique heartbeat of what you are building.

> "A room where every surface is white plastic and matte glass isn't serene—it's an operating theater. Digital spaces need texture, weight, and human residue."

## Three Experiments in Bringing Warmth Back

Over the past year, our team has been testing small, deliberate rebellions against default flatness:

### 1. Typographic Friction
We stopped using generic geometric sans-serifs for long-form reading. We began pairing sharp, high-contrast display serif typefaces with sturdy, utilitarian mono fonts for metadata. The tension between classical proportion and technical precision gives the interface an editorial voice that demands attention.

### 2. Tactile Lighting and Depth
Flat design stripped interfaces of physical metaphors. But humans evolved in a physical world of shadows, gradients, and light reflection. By introducing subtle, layered ambient glows and border lighting that reacts to cursor proximity, surfaces feel physically present rather than painted onto the glass.

### 3. Deliberate Moments of Asymmetry
Everything in modern software is locked into rigid 12-column symmetry. Breaking that rhythm—letting an image bleed past the container, staggering editorial callouts, or offsetting headlines—creates visual curiosity. It reminds the reader that a human eye made these decisions.

## The Goal Isn't Noise; It's Resonance

We aren't arguing for a return to skeuomorphic stitched leather or chaotic 90s web design. We are arguing for **intentionality over compliance**. 

Software doesn't have to look like a sterile spreadsheet just because it is functional. When an interface has craft, warmth, and point-of-view, users don't just use it—they develop an emotional relationship with it.

Next time you open a blank canvas, ask yourself: *If you removed all the copy and the logo, would anyone know this came from your studio?*
    `,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop",
    category: "UI Design",
    tags: ["studio craft", "editorial ui", "design philosophy", "typography"],
    featured: true
  },
  {
    title: "Why We Threw Out Our 40-Page User Research Report",
    slug: "why-we-threw-out-user-research-report",
    excerpt: "How a binder full of sanitized user personas nearly derailed a client engagement, and what happened when we sat beside real freight operators in their cabs instead.",
    content: `
# Why We Threw Out Our 40-Page User Research Report

Three weeks into our engagement with an international freight routing platform, our team had assembled what felt like an immaculate research artifact: forty slides of affinity diagrams, empathy maps, and four polished user personas named *Efficient Eric* and *Logistics Linda*.

The client loved it. It looked thorough. It looked scientific.

It was also completely useless.

## The Fiction of Sanitized Personas

The problem with conventional user research decks is that they flatten the glorious, chaotic mess of real human behavior into tidy bullet points. They make users seem rational, calm, and focused.

When our design team actually traveled to the Rotterdam terminal to shadow three dispatchers during the 6:00 AM shift change, reality punched our personas right in the face:

- The operators were juggling three cracked monitors while eating cold breakfast.
- They didn't read labels; they navigated by muscle memory and color flashes while on radio calls.
- The sleek, low-contrast grey typography we had proposed was completely unreadable in direct maritime morning glare.
- The 4-step modal wizard we carefully mapped was abandoned instantly because dispatchers needed to compare six shipments side-by-side.

## Guerrilla Research over Formal Presentations

We came back to the studio, archived the 40-page deck into a forgotten Google Drive folder, and instituted a new studio operating principle: **Never design from a second-hand summary.**

Here is what our research workflow looks like today:

1. **Direct Immersion**: Every designer on the project must spend at least 4 hours in the actual physical environment where the tool is used before drafting a single wireframe.
2. **Video Over Vibe**: We don't rely on quotes transcribed onto colorful Post-it notes. We record 30-second video clips of users getting stuck, cursing at confusing menus, or hacking their own workarounds with physical sticky notes on their monitors.
3. **Rough Prototypes Within 48 Hours**: Rather than waiting weeks for a comprehensive research readout, we test crude, clickable HTML prototypes with real users immediately to see where their intuition breaks down.

> "If you want to understand how someone drives a car, don't ask them in a survey. Sit in the passenger seat while they try to parallel park in the rain."

## The Breakthrough

By ditching our textbook research framework and embracing the raw, high-pressure reality of the terminal floor, we redesigned the tool around density, high-contrast status beacons, and keyboard-first shortcuts.

The result? Dispatch errors dropped by 64%, and training time for new hires went from three weeks to four days.

Real human empathy doesn't live in presentation templates. It lives in the messy, uncomfortable details of people doing difficult work.
    `,
    coverImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=800&fit=crop",
    category: "UX Research",
    tags: ["field research", "user testing", "product strategy", "studio lessons"],
    featured: true
  },
  {
    title: "From 14 Clicks to 2: The Messy Truth of Redesigning a Nordic Wealth App",
    slug: "redesigning-nordic-wealth-app",
    excerpt: "A candid retrospective on navigating legacy banking APIs, executive skepticism, and how simplifying portfolio transfers required rewriting the product's entire mental model.",
    content: `
# From 14 Clicks to 2: The Messy Truth of Redesigning a Nordic Wealth App

Case studies in design portfolios always sound like a heroic straight line: *Problem -> Insight -> Magic Figma Prototype -> Client Applauds -> Metric Goes Up 400%*.

The reality is almost always a chaotic negotiation between legacy infrastructure, regulatory compliance, internal politics, and designers fighting for the user's sanity.

Here is the unvarnished story of our studio's six-month overhaul of *Helsinki Wealth Partners's* mobile platform.

## The Baseline Disaster

When we first audited their investment transfer flow, transferring funds between two indexed portfolios took **14 separate screens**, 4 password re-authentications, and a 48-hour pending state with zero status feedback.

Users were terrified. Every month, their customer support team received over 2,200 panicked phone calls asking: *"Did my money vanish into thin air?"*

## Where the Real Battle Happened

Our initial instinct was classic designer arrogance: *"Let's build a one-tap swipe transfer!"*

Then the bank's compliance and database engineering teams stepped in:
- Regulatory guidelines required 3 specific risk disclosures before moving cross-currency funds.
- Their core mainframe batch-processed transactions only at 11:00 PM CET, meaning real-time balance updates were technically impossible with their existing architecture.

Good design isn't about ignoring constraints; it's about making peace with them and designing transparent human bridges across the technical gaps.

## The Three Crucial Decisions

### 1. Transparent Anticipation
Since we couldn't make the bank's mainframe faster, we made the interface honest. Instead of a spinning spinner that left users in suspense, we introduced a visual pipeline that clearly explained: *"Step 1 of 3 complete. Funds reserved. Settlement will occur tonight at 23:00 CET."* Anxiety dropped overnight.

### 2. Progressive Disclosure of Disclosures
Instead of forcing users to scroll through 12 pages of legal fine print in a tiny modal, we distilled key implications into plain-language contextual summaries with expandable details for curious investors.

### 3. Biometric Authorization at the Point of Action
We replaced repetitive password prompts with instant FaceID verification tied directly to the transfer confirmation button.

## The Results

Six months post-launch:
- Flow completion time dropped from 4 minutes 20 seconds down to 35 seconds.
- Customer support ticket volume dropped by 72%.
- App Store customer rating climbed from 2.4 to 4.8 stars.

Design is not just making screens look luxurious; it's dismantling systemic anxiety and giving people confidence in moments that matter.
    `,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    category: "Case Study",
    tags: ["fintech", "case study", "client retrospective", "systems design"],
    featured: false
  },
  {
    title: "The Architect's Guide to Fluid Typography and CSS Subgrid",
    slug: "fluid-typography-css-subgrid-guide",
    excerpt: "How we structure responsive editorial layouts at the studio without messy media query breakpoints or brittle JavaScript resizing hacks.",
    content: `
# The Architect's Guide to Fluid Typography and CSS Subgrid

For years, responsive web typography was a patchwork of arbitrary breakpoints: \`@media (min-width: 768px)\`, \`@media (min-width: 1024px)\`, \`@media (min-width: 1440px)\`.

Your headings would jump jarringly as the browser window crossed an invisible pixel line. Cards in adjacent columns would snap out of alignment because one headline had three words and the other had twelve.

In our studio builds, we threw that approach away. Here is how we build modern, editorial-grade layouts using **Fluid Typography scales** and **CSS Subgrid**.

## 1. Fluid Typography with CSS Clamp

Instead of static step sizes, we calculate our typography on a continuous mathematical curve using CSS \`clamp()\`.

\`\`\`css
:root {
  --fluid-min-width: 375;
  --fluid-max-width: 1440;

  /* Smooth scaling display headline from 36px to 64px */
  --font-display-hero: clamp(
    2.25rem,
    1.4rem + 2.8vw,
    4rem
  );

  /* Body copy scaling from 16px to 19px */
  --font-body: clamp(
    1rem,
    0.95rem + 0.3vw,
    1.1875rem
  );
}
\`\`\`

With this formula, text scales harmoniously on any screen—from an iPhone Mini to an ultra-wide 32-inch studio display—without a single layout shift.

## 2. Solving the Misaligned Card Problem with Subgrid

The classic editorial design problem: you have three cards side by side. Each has a tag, a headline, an excerpt, an author bio, and a footer link. In standard CSS Grid, if one headline wraps to three lines, all the author bios and footer links become misaligned across the row.

With **CSS Subgrid**, child elements can participate directly in the parent's row definition:

\`\`\`css
.magazine-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.magazine-card {
  display: grid;
  grid-row: span 4;
  grid-template-rows: subgrid;
}
\`\`\`

Now, all headlines align across rows, all excerpts align, and all footer action buttons snap to the exact same baseline regardless of text length.

## The Craft is in the Restraint

Modern CSS gives us superpowers that used to require 50KB of brittle layout calculation scripts. When you build with the grain of the browser, your sites load instantly, feel natural on any device, and stand the test of time.
    `,
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&h=800&fit=crop",
    category: "Tutorial",
    tags: ["css", "subgrid", "typography", "frontend craft"],
    featured: false
  },
  {
    title: "Studio Rules: What We’ve Learned After 8 Years of Building Design Systems",
    slug: "studio-rules-eight-years-design-systems",
    excerpt: "Hard-won studio guidelines on preventing token bloat, handling edge cases, and why the best design system is the one your team actually enjoys using.",
    content: `
# Studio Rules: What We’ve Learned After 8 Years of Building Design Systems

Design systems have a nasty habit of turning into bureaucratic monuments. 

We have audited systems with over 1,400 color tokens, 47 button variants, and documentation so labyrinthine that designers would rather redraw buttons by hand than figure out which official component to use.

Here are the six studio rules we enforce whenever we build or refactor a design system for ourselves or our clients.

## Rule 1: Kill 80% of Your Button Variants

You do not need \`ButtonGhostPrimarySmallWithIconHoverSecondary\`. In practice, 95% of all digital interfaces only ever need four button styles:
- **Primary Action** (One per viewport context)
- **Secondary / Neutral** (Surface-level actions)
- **Subtle / Ghost** (Table utilities, dismissals)
- **Destructive** (High-stakes irreversible actions)

Everything else is noise that confuses both the developer and the user.

## Rule 2: Name Tokens for Intent, Not Appearance

Never name a token \`color-blue-500\`. If the brand rebrands to deep emerald next spring, your code will be littered with \`color-blue\` that renders dark green.

Always name by semantic purpose:
- \`color-action-primary\`
- \`color-surface-elevated\`
- \`color-text-subtle\`
- \`color-border-focus\`

## Rule 3: Spacing Scales Should Be T-Shirt Sized and Strict

Numeric spacing scales (\`space-1\`, \`space-2\`, \`space-3\`, \`space-4\`, \`space-5\`) tempt designers to micro-tweak margins by 2px whenever they feel anxious.

We use a strict 7-point scale: \`2xs (4px)\`, \`xs (8px)\`, \`sm (12px)\`, \`md (16px)\`, \`lg (24px)\`, \`xl (32px)\`, \`2xl (48px)\`. If an element doesn't look right, changing 16px to 18px won't fix it; the underlying layout hierarchy is wrong.

## Rule 4: If Developers Hate Using It, It Has Failed

A design system is not art; it is infrastructure. If the React component requires 14 nested props just to change an icon position, developers will bypass it with ad-hoc \`div\` wrappers. 

Build with developers in the room from day one. Simplicity and DX (Developer Experience) beat theoretical perfection every time.
    `,
    coverImage: "https://images.unsplash.com/photo-1581291518655-9523c932deb4?w=1200&h=800&fit=crop",
    category: "Notes",
    tags: ["design systems", "tokens", "studio rules", "best practices"],
    featured: false
  },
  {
    title: "Designing for the Edge: What Real Accessibility Feels Like",
    slug: "designing-for-the-edge-real-accessibility",
    excerpt: "Moving past automated audit scores to understand how situational stress, lighting glare, and motor fatigue impact real people using your software.",
    content: `
# Designing for the Edge: What Real Accessibility Feels Like

Most product teams treat accessibility like an obligation—a compliance checkbox to pass before shipping, verified by running an automated scanner that checks color contrast ratios and missing \`alt\` tags.

Automated scanners are useful, but they only catch about 25% of real-world usability friction. 

True accessibility isn't about appeasing an audit tool; it's about respecting human vulnerability.

## The Reality of Situational Disability

We often imagine our user as an able-bodied person sitting in an ergonomic chair, looking at a 27-inch Retina monitor in a quiet room with perfect lighting.

In reality, your user is frequently:
- Holding a crying baby with one arm while trying to approve a delivery with their thumb.
- Standing on a jostling subway with direct sunlight blinding their phone screen.
- Suffering from a migraine or eye strain after 9 hours of screen time.
- Recovering from a wrist fracture and navigating entirely via keyboard.

When you design for these "edge cases", you aren't just helping people with permanent disabilities—you are making the interface vastly better for everyone.

## Studio Guidelines for Calmer, More Accessible Craft

1. **Generous Touch Targets**: Never make a tap target smaller than 44x44px, even if the icon inside is only 16px. Fingers are imprecise, especially when moving.
2. **Never Rely on Color Alone for Status**: Always pair red/green states with clear icons, distinct shapes, and explicit text labels. Over 8% of men experience color vision deficiency.
3. **Respect System Motion Preferences**: If a user has enabled \`prefers-reduced-motion\`, immediately turn off parallax zooms, swooping page transitions, and floating elements. To someone with vestibular disorders, heavy animation causes physical nausea.
4. **Focus Rings Are Sacred**: Never write \`outline: none\` in your CSS without providing a crisp, high-contrast custom keyboard focus state. Keyboard navigation is a lifeline, not an afterthought.

> "A staircase with an accessible ramp doesn't just help wheelchair users—it helps the traveler with heavy luggage, the parent with a stroller, and the runner with an injured knee. Inclusive design is universal design."
    `,
    coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop",
    category: "UX Research",
    tags: ["accessibility", "inclusive design", "human factors", "studio thoughts"],
    featured: false
  },
  {
    title: "Interactive Prototyping as a Thinking Tool, Not a Pitch Deck",
    slug: "interactive-prototyping-thinking-tool",
    excerpt: "Why static mockups lie to designers, and how building quick tactile prototypes in code helps our studio uncover structural flaws weeks before engineering starts.",
    content: `
# Interactive Prototyping as a Thinking Tool, Not a Pitch Deck

Static Figma frames are seductive. When you arrange beautiful typography, balanced cards, and high-res photography on a 1440px artboard, everything looks effortless and resolved.

Then you test it with real data and interactive physics, and the whole illusion falls apart:
- The dropdown menu stutters when scrolling through 80 items.
- The slide-out drawer feels claustrophobic on mobile viewports.
- The transition between states creates a jarring spatial flash.

Static mockups don't test software; they test graphic design.

## The Studio Rule: Code Prototypes Early

At our studio, whenever an interaction involves gestures, spatial transitions, or heavy data density, we move from Figma into code within 48 hours.

We don't do this to impress clients with flashy presentations. We do it because **interactivity is where design flaws reveal themselves**.

### What Code Prototyping Teaches Us:
- **Perceived Speed vs Real Latency**: A transition that takes 300ms feels snappy on desktop but sluggish and frustrating when tapping through on a phone.
- **Dynamic Content Elasticity**: What happens when a user's name is 34 characters long? What happens when a product title has no image? Code forces you to confront ugly real-world data immediately.
- **Physical Feel**: Does the swipe gesture have momentum and natural deceleration? Does the bottom sheet snap cleanly into place? You cannot feel momentum on a static canvas.

## Keep Prototypes Disposable

The biggest trap in prototyping is falling in love with your prototype code. A prototype is a tool to answer a specific design question: *"Does this gesture feel intuitive?"* or *"Can a user find this action in under 3 seconds?"*

Once the question is answered, don't be afraid to throw the prototype away. The insight is what matters.
    `,
    coverImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=800&fit=crop",
    category: "Tutorial",
    tags: ["prototyping", "framer", "interaction design", "studio craft"],
    featured: false
  },
  {
    title: "The Subtle Art of Perceptual Color in Dark Mode Interfaces",
    slug: "subtle-art-perceptual-color-dark-mode",
    excerpt: "Why mathematical color math breaks down on dark screens, and how we tune saturation, surface elevation, and contrast for nocturnal reading.",
    content: `
# The Subtle Art of Perceptual Color in Dark Mode Interfaces

Creating a great dark mode is not as simple as flipping your white background to \`#000000\` and setting your text to \`#FFFFFF\`.

In fact, pure black backgrounds with pure white text create extreme contrast vibration that causes severe eye fatigue and halo effects for readers with astigmatism.

Here is how our studio approaches dark interface palettes for our editorial and client projects.

## 1. Never Use Pure Pitch Black (#000000) for Surfaces

In the physical world, darkness is rarely absolute; it is a deep atmospheric charcoal tinted with the ambient light of the environment.

We construct our dark mode base from deep, tinted slates:
- **Base Background**: \`#0b0f17\` (Midnight Slate with a hint of indigo)
- **Card Surface Level 1**: \`#121824\`
- **Card Surface Level 2 (Elevated)**: \`#1a2233\`
- **Hover / Active State**: \`#232e44\`

By layering tinted elevation surfaces, depth is established through tonal luminance rather than heavy drop shadows (which disappear on dark backgrounds).

## 2. Desaturate Your Accent Colors

Vibrant colors that look crisp and playful on a white background—like vivid electric blue (\`#2563eb\`) or radiant coral—become blindingly loud and aggressive on a dark canvas.

When shifting a design system to dark mode, we intentionally reduce the saturation of our primary brand accents by 15% to 20% while slightly raising their lightness. This maintains brand recognition without searing the user's retinas in a dim room.

## 3. Tiered Typography Luminance

Rather than pure white, structure your text in three distinct opacity tiers:
- **Primary Text (Headlines & Body)**: \`rgba(255, 255, 255, 0.92)\` — Crisp and readable without glare.
- **Secondary Text (Metadata & Excerpts)**: \`rgba(255, 255, 255, 0.65)\` — Clear hierarchy.
- **Subtle Details (Borders & Icons)**: \`rgba(255, 255, 255, 0.25)\` — Defines spatial boundaries gently.

A thoughtful dark mode should feel like walking into a dimly lit library: calm, focused, and effortless on the eyes.
    `,
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop",
    category: "UI Design",
    tags: ["color theory", "dark mode", "visual craft", "typography"],
    featured: false
  },
  {
    title: "Micro-Interactions That Respect Human Attention",
    slug: "micro-interactions-respect-human-attention",
    excerpt: "Why gratuitous bouncy animations are exhausting, and how we design quiet, purposeful feedback loops that make software feel solid and dependable.",
    content: `
# Micro-Interactions That Respect Human Attention

There was an era of web design where every button had to explode with confetti, every card had to bounce like gelatin, and every modal had to perform a 3D backflip before opening.

It was fun for about five minutes. Then it became exhausting.

Software is something people use to accomplish meaningful work, connect with friends, or read in peace. The best micro-interactions are not fireworks; they are quiet, reassuring nods that say: *"Got it. Consider it done."*

## The Principles of Quiet Interaction Design

### 1. Speed Is Respect
A micro-interaction should rarely exceed 150ms to 250ms. Any animation longer than 300ms creates a subconscious feeling of lag. The user's brain processes intent at the speed of thought; your software shouldn't make them wait for a decorative celebration.

### 2. Natural Physics over Bouncy Easing
Avoid cartoonish bounce easings in professional tools. Use cubic beziers that mimic physical inertia with quick acceleration and smooth deceleration (\`cubic-bezier(0.16, 1, 0.3, 1)\`). It makes the UI feel like a precisely machined piece of physical hardware.

### 3. Immediate State Feedback
When a user clicks 'Save' or 'Submit', never leave them wondering if the click registered. Provide instant visual acknowledgment:
- Subtle scale press state on mousedown (0.98 scale)
- Clear, inline status change (from 'Save' to a quiet checkmark)
- Graceful error recovery if the network stutters

## The Golden Test

When reviewing micro-interactions at our studio review table, we ask one question:

> "If a user performs this action 200 times a day, will this animation bring them quiet clarity, or will it drive them slowly insane?"

Design with empathy for repetition. Respect the user's focus.
    `,
    coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=800&fit=crop",
    category: "UI Design",
    tags: ["micro-interactions", "animation", "product polish", "studio standards"],
    featured: false
  },
  {
    title: "The Anatomy of a Clean Studio Workflow",
    slug: "anatomy-clean-studio-workflow",
    excerpt: "From daily asynchronous check-ins to Friday design critiques, a look into how our four-person studio stays focused, ships fast, and avoids meeting burnout.",
    content: `
# The Anatomy of a Clean Studio Workflow

We run a boutique design studio with four practitioners across two time zones. We don't have project managers, product owners, or scrum masters.

Yet over the past three years, we have delivered complex brand architectures, design systems, and web apps for dozens of international clients without missing a single milestone or working weekends.

Here is the operational rhythm that makes our studio tick.

## 1. No Morning Meetings, Ever

Mornings are sacred for deep, uninterrupted creative focus. Writing, system architecture, and spatial exploration require sustained cognitive immersion.

We maintain a strict studio rule: **No internal or client meetings before 1:00 PM.** 

If an issue arises in the morning, team members drop a short 60-second video or async message in our studio channel.

## 2. The Friday Studio Critique

Every Friday at 3:00 PM, the entire team gathers for 90 minutes. There are no client slide decks or formal presentations.

Each designer shares one piece of messy, unresolved work they wrestled with during the week. The goal isn't praise; it's collaborative dissection:
- *"Where is this layout fighting the content?"*
- *"Is this typography hierarchy too polite?"*
- *"How could we simplify this flow down to one clear action?"*

## 3. Direct Access Between Clients and Makers

In traditional agencies, communication flows through account managers and coordinators. Important design nuance gets lost in translation like a game of telephone.

At our studio, clients communicate directly with the designer and engineer building their product. When feedback is direct, decisions happen in minutes instead of weeks.

Craft isn't just about what you design—it's about the peaceful, disciplined environment you build to create it.
    `,
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop",
    category: "Notes",
    tags: ["studio culture", "workflow", "productivity", "creative practice"],
    featured: false
  }
];

async function seedDatabase() {
  try {
    // Friendly reminder: Populates the journal with humanized studio dispatches & case studies
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    await Post.deleteMany({});
    console.log('✓ Cleared existing posts');

    const posts = await Post.insertMany(samplePosts);
    console.log(`✓ Successfully seeded ${posts.length} studio posts`);

    console.log('\nStudio posts by category:');
    const categories = await Post.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    categories.forEach(cat => {
      console.log(`  - ${cat._id}: ${cat.count} posts`);
    });

    const featuredCount = await Post.countDocuments({ featured: true });
    console.log(`\nFeatured posts: ${featuredCount}`);

    console.log('\n✓ Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
