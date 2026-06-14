export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
};

export const POSTS: Post[] = [
  {
    slug: "marketing-without-strategy-is-noise",
    title: "Marketing Without Strategy Is Noise",
    excerpt: "Why tactics fail without a growth system behind them — and how to fix it.",
    category: "Strategy",
    date: "2026-05-28",
    readTime: "6 min",
    content: [
      "Most businesses don't have a marketing problem. They have a systems problem. Campaigns launch, budgets are spent, and yet revenue stays unpredictable.",
      "Strategy is the difference between activity and outcomes. Before a single ad runs, you need clarity on positioning, the ideal customer, and the conversion path.",
      "At Sibiso, we build the system first: attract, convert, retain. Tactics then plug into a machine that compounds — instead of noise that fades.",
    ],
  },
  {
    slug: "visibility-means-nothing-without-conversion",
    title: "Visibility Means Nothing Without Conversion",
    excerpt: "Traffic is vanity. Conversion is revenue. Here's how to bridge the gap.",
    category: "Conversion",
    date: "2026-05-14",
    readTime: "5 min",
    content: [
      "Reach feels good. Impressions look impressive on a report. But none of it matters if visitors don't convert into customers.",
      "Conversion is engineered, not hoped for. It starts with message-market fit and ends with friction-free journeys.",
      "We obsess over the path from attention to action — because that's where revenue actually lives.",
    ],
  },
  {
    slug: "growth-happens-when-systems-outperform-effort",
    title: "Growth Happens When Systems Outperform Effort",
    excerpt: "Scalable growth comes from systems, not heroics. Build the engine.",
    category: "Growth",
    date: "2026-04-30",
    readTime: "7 min",
    content: [
      "Effort doesn't scale. Systems do. The businesses that grow predictably have replaced hustle with infrastructure.",
      "Automation, data and clear processes turn one good month into a repeatable engine.",
      "That's the shift we drive for every partner: from effort-dependent to system-driven growth.",
    ],
  },
];

export type Episode = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  duration: string;
  date: string;
  transcript: string[];
};

export const EPISODES: Episode[] = [
  {
    slug: "the-economics-of-attention",
    title: "The Economics of Attention",
    summary: "How modern brands earn attention through value — and convert it into revenue.",
    topic: "Marketing",
    duration: "32:14",
    date: "2026-06-01",
    transcript: [
      "Attention is the scarcest resource in business today. In this episode we unpack how value-led marketing earns it.",
      "We discuss positioning, content strategy and the psychology behind trust before transactions.",
    ],
  },
  {
    slug: "designing-brands-that-convert",
    title: "Designing Brands That Convert",
    summary: "The intersection of design, PR and conversion in building memorable brands.",
    topic: "Design",
    duration: "28:47",
    date: "2026-05-18",
    transcript: [
      "Great design isn't decoration — it's a conversion tool. We explore how brand systems drive measurable results.",
      "From identity to user journey, every decision should serve growth.",
    ],
  },
  {
    slug: "building-predictable-revenue",
    title: "Building Predictable Revenue",
    summary: "A practical look at the systems that turn marketing into a reliable revenue engine.",
    topic: "Business",
    duration: "41:09",
    date: "2026-05-02",
    transcript: [
      "Predictable revenue is engineered. We break down funnels, automation and the data that powers them.",
      "Learn how to move from feast-and-famine to a steady growth engine.",
    ],
  },
];
