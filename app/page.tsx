import Link from 'next/link';
import { roster } from '@/content/roster';
import { works } from '@/content/works';

const CONVERGENCE = [
  {
    slug: 'bourdieu',
    name: 'Bourdieu',
    institution: 'School',
    mask: 'Neutral meritocracy',
    actual: 'Inherited class advantage laundered into certified merit',
  },
  {
    slug: 'gramsci',
    name: 'Gramsci',
    institution: 'Culture, media, church, unions',
    mask: 'Common sense',
    actual: "One class's particular interest presented as everyone's interest",
  },
  {
    slug: 'schmitt',
    name: 'Schmitt',
    institution: 'Legal order',
    mask: 'Impartial rule of law',
    actual: 'A decision by a concrete authority sitting underneath all of it',
  },
  {
    slug: 'foucault',
    name: 'Foucault',
    institution: 'School, clinic, prison, workplace',
    mask: 'Humane progress, expertise',
    actual: 'A technology producing docile bodies, norms, and a self that polices itself',
  },
  {
    slug: 'illich',
    name: 'Illich',
    institution: 'School, medicine, transport, professions',
    mask: 'Care and service',
    actual: 'Manufactured dependence, and institutions producing the opposite of their promise',
  },
  {
    slug: 'agamben',
    name: 'Agamben',
    institution: 'Security state',
    mask: 'Temporary emergency',
    actual: 'The exception made permanent, politics administering biological life',
  },
];

const PATHS = [
  {
    href: '/thinkers',
    label: 'Six thinkers',
    body: 'The arguments, each laid out as a mechanism you can trace step by step, with the strongest objections attached.',
  },
  {
    href: '/figures',
    label: `${roster.length} figures`,
    body: 'Everyone the research names, with a line each and a link to where they are dealt with. Twenty have entries of their own.',
  },
  {
    href: '/domains',
    label: 'Five domains',
    body: 'Education, media, law, psychology and bureaucracy. Where the mechanisms run, and which claims survive checking.',
  },
  {
    href: '/milieus',
    label: 'Twelve milieus',
    body: 'Who paid for the thinking. Organized by institution rather than person, with the funder on the page before the argument.',
  },
];

export default function HomePage() {
  return (
    <main className="wide-tables mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="measure">
        <p className="label text-accent">The through-line</p>
        <h1 className="mt-4 text-h1 leading-[1.08] tracking-tight">
          Power is most effective where it is least visible as power
        </h1>
        <p className="mt-6 text-lede leading-snug">
          In 1959 the sociologist C. Wright Mills drew a line between a personal trouble and a
          public issue. One person out of work in a city of a hundred thousand has a trouble,
          and you look at the person. Fifteen million out of work is a public issue, and no
          amount of looking at any one of them will explain it. This site applies that move to
          control.
        </p>
      </div>

      <div className="prose mt-8">
        <p>
          Domination that has to be enforced by visible force is weak, expensive and unstable.
          Domination that has been converted into common sense, merit, normality, law, care or
          personal identity is cheap, stable and self-repairing, because the people subject to
          it carry it out themselves and experience it as freedom, fairness, or simply reality.
        </p>
        <p>
          Six thinkers reached that conclusion separately, in different countries and different
          decades, from political positions that were openly hostile to each other. Three came
          from the left. One, <Link href="/thinkers/schmitt">Carl Schmitt</Link>, joined the
          Nazi party in 1933 and became the regime's leading legal apologist. The others refuse
          the axis entirely. They converge anyway, and that is the strongest reason to treat
          the finding as structural rather than partisan.
        </p>
      </div>

      <div className="table-scroll mt-10">
        <table>
          <thead>
            <tr>
              <th scope="col">Thinker</th>
              <th scope="col">Institution examined</th>
              <th scope="col">The mask it wears</th>
              <th scope="col">What is actually happening</th>
            </tr>
          </thead>
          <tbody>
            {CONVERGENCE.map((row) => (
              <tr key={row.slug}>
                <th scope="row" className="pr-6 whitespace-nowrap">
                  <Link
                    href={`/thinkers/${row.slug}`}
                    className="font-display text-body font-normal tracking-normal text-ink normal-case underline decoration-accent decoration-[1.5px] underline-offset-[3px] hover:text-accent"
                  >
                    {row.name}
                  </Link>
                </th>
                <td>{row.institution}</td>
                <td className="text-muted italic">{row.mask}</td>
                <td>{row.actual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {PATHS.map((path) => (
          <Link key={path.href} href={path.href} className="group bg-paper p-5 hover:bg-raised">
            <span className="font-display text-h2 leading-snug group-hover:text-accent">
              {path.label}
            </span>
            <span className="mt-2 block text-small leading-normal text-muted">{path.body}</span>
          </Link>
        ))}
      </nav>

      <p className="label mt-4">
        {roster.length} people, {works.length} works, 6 thinkers, 5 domains, 12 milieus
      </p>

      <div className="prose mt-14">
        <h2>Two more things to read first</h2>
        <p>
          <Link href="/east-west">East and West</Link> compares two regimes that pursued
          control by opposite means at the same time, and reaches an uncomfortable conclusion:
          a system that must lie to you openly is easier to see through than one that never has
          to lie at all.
        </p>
        <p>
          <Link href="/method">How this site is written</Link> sets out the two ways this
          material goes wrong, the four questions put to every source, and the rules that
          follow from them. Read it if you want to know why a Nazi jurist and an Italian
          communist appear on the same site, and why the contested sources are marked as
          contested.
        </p>
        <p>
          If you would rather see the whole reading surface at once, the{' '}
          <Link href="/works">works index</Link> lists every book, essay and film the research
          names, with the eight that are marked contested or discredited kept in place rather
          than quietly dropped.
        </p>
      </div>
    </main>
  );
}
