import { SparklesIcon, UserGroupIcon, AcademicCapIcon, GlobeAltIcon, StarIcon } from '@heroicons/react/24/solid';

/**
 * Array of card data for the advanced selectors demo
 * Each card contains an icon, title, and description of its CSS selector features
 */
const cards = [
  {
    icon: <SparklesIcon className="w-8 h-8" />,
    title: 'Inspiration',
    desc: 'Card with hover and focus effects. Uses hover: and focus:.'
  },
  {
    icon: <UserGroupIcon className="w-8 h-8" />,
    title: 'Team',
    desc: 'Even card: even: changes background. Also has hover effect.'
  },
  {
    icon: <AcademicCapIcon className="w-8 h-8" />,
    title: 'Learning',
    desc: 'Odd card: odd: different background. first: highlights the first one.'
  },
  {
    icon: <GlobeAltIcon className="w-8 h-8" />,
    title: 'World',
    desc: 'last: highlights the last card. You can add any effects.'
  },
  {
    icon: <StarIcon className="w-8 h-8" />,
    title: 'Success',
    desc: 'not-*: card is inactive if not hovered or focused.'
  },
];

/**
 * AdvancedSelectorsSection component that demonstrates various CSS selector features
 * Includes interactive cards with hover effects and flip animations
 */
export default function AdvancedSelectorsSection() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Advanced CSS Selectors Demo (custom CSS)</h2>
      {/* Grid container for cards with perspective effect */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 advanced-cards-perspective">
        {/* Map through cards array to create interactive cards */}
        {cards.map((card, i) => (
          <li
            key={i}
            tabIndex={0}
            className="advanced-card advanced-card-flip"
          >
            {/* Card inner container for flip effect */}
            <div className="advanced-card-inner">
              {/* Front side of the card */}
              <div className="advanced-card-front">
                <span className="mb-2 block">{card.icon}</span>
                <span className="font-bold text-lg block mb-1">{card.title}</span>
                <span className="text-gray-500 dark:text-gray-300 text-sm block">{card.desc}</span>
                <span className="absolute right-4 top-4 text-xs text-gray-400 select-none">{i + 1}</span>
              </div>
              {/* Back side of the card */}
              <div className="advanced-card-back">
                <span className="font-bold text-lg block mb-2">Back Side</span>
                <span className="text-gray-500 dark:text-gray-300 text-sm block">Additional information, link or action can be placed here.</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
} 