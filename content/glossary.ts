/**
 * The single source of truth for every term definition on the site.
 * Term tooltips read from here and the /glossary page renders the same array.
 * Never write a definition inline in a page or an MDX file.
 *
 * Definitions are written for a reader with no background in social theory.
 * "attribution" names the thinker the term belongs to, where it belongs to one.
 */

export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  attribution?: string;
}

export const glossary: GlossaryTerm[] = [
  {
    slug: 'disorienting-dilemma',
    term: 'Disorienting dilemma',
    definition:
      'An experience that does not fit the way you already make sense of things, so it cannot be filed away and forces you to rebuild the frame instead. The starting point of any real change of mind.',
    attribution: 'Mezirow',
  },
  {
    slug: 'assumptive-world',
    term: 'Assumptive world',
    definition:
      'The background beliefs you run on without ever stating them: that the world is roughly benevolent, that it makes sense, that you are worth something. What breaks in a shock is usually this, not a fact.',
    attribution: 'Parkes, Janoff-Bulman',
  },
  {
    slug: 'subject-object-shift',
    term: 'Subject-object shift',
    definition:
      'Moving from being inside something and unable to see it, to being able to hold it at arm\u2019s length and look at it. You stop being your assumptions and start having them.',
    attribution: 'Kegan',
  },
  {
    slug: 'enlightened-false-consciousness',
    term: 'Enlightened false consciousness',
    definition:
      'Knowing exactly how the thing works and carrying on anyway. Not ignorance, and not hypocrisy either, because nothing is being hidden. Criticism absorbed until it costs nothing.',
    attribution: 'Sloterdijk',
  },
  {
    slug: 'unknown-knowns',
    term: 'Unknown knowns',
    definition:
      'The things you do not know that you know. Beliefs you act on every day and have never once looked at directly. Usually the real target of any attempt to see clearly.',
    attribution: 'Zizek',
  },
  {
    slug: 'personalized-power',
    term: 'Personalized power',
    definition:
      'Wanting influence for its own sake, treated as something won at someone else\u2019s expense. Associated with acting on impulse and with decisions that damage the group.',
    attribution: 'McClelland',
  },
  {
    slug: 'socialized-power',
    term: 'Socialized power',
    definition:
      'Wanting influence in order to get something done for a group. Distinguished from the personal kind not by how much drive there is but by how much restraint sits on top of it.',
    attribution: 'McClelland',
  },
  {
    slug: 'activity-inhibition',
    term: 'Activity inhibition',
    definition:
      'A steady disposition to restrain your own impulses. In McClelland\u2019s research it is the variable that decides whether a strong drive for influence turns useful or destructive.',
    attribution: 'McClelland',
  },
  {
    slug: 'procedural-justice',
    term: 'Procedural justice',
    definition:
      'Fairness of the process rather than of the outcome. People comply with authority far more reliably when they judge the procedure fair than when they fear the punishment.',
    attribution: 'Tyler',
  },
  {
    slug: 'social-interest',
    term: 'Social interest',
    definition:
      'Adler\u2019s name for the sense of being one among others, with something to contribute. He treated it as the mark of health and as the alternative to seeking superiority over people.',
    attribution: 'Adler',
  },
  {
    slug: 'striving-for-superiority',
    term: 'Striving for superiority',
    definition:
      'The drive to rise above others, which Adler read as compensation for felt inferiority rather than as strength. He contrasted it with striving toward completion, which is aimed at a task instead of a person.',
    attribution: 'Adler',
  },
  {
    slug: 'fear-of-freedom',
    term: 'Fear of freedom',
    definition:
      'The pull back toward being told what to do, because freedom brings isolation and the weight of choosing. Fromm argued people flee it into conformity, submission or destructiveness.',
    attribution: 'Fromm, Freire',
  },
  {
    slug: 'moral-licensing',
    term: 'Moral licensing',
    definition:
      'Having established that you are one of the good ones, you do less afterwards rather than more. Understanding a problem can settle the account in your own mind.',
    attribution: 'Monin and Miller',
  },
  {
    slug: 'psychic-numbing',
    term: 'Psychic numbing',
    definition:
      'Feeling less as the numbers get bigger. Response does not scale with the size of a harm, it fades, and the fading starts as early as the second victim.',
    attribution: 'Slovic',
  },
  {
    slug: 'illusion-of-explanatory-depth',
    term: 'Illusion of explanatory depth',
    definition:
      'Believing you understand how something works until you are asked to explain it step by step, at which point the confidence collapses. Recognition of an idea feels like knowledge of it.',
    attribution: 'Rozenblit and Keil',
  },
  {
    slug: 'self-efficacy',
    term: 'Self-efficacy',
    definition:
      'Your belief that you can actually do the thing. Built mainly by doing difficult things and succeeding, which means it is trained rather than given.',
    attribution: 'Bandura',
  },
  {
    slug: 'habitus',
    term: 'Habitus',
    definition:
      'The dispositions you absorb growing up, including accent, taste, bearing and how at ease you are with authority. It feels like personality. It is inherited social position.',
    attribution: 'Bourdieu',
  },
  {
    slug: 'cultural-capital',
    term: 'Cultural capital',
    definition:
      'Advantages that are not money: the right vocabulary, familiarity with valued culture, comfort in institutions. It converts into opportunity the way money converts into goods.',
    attribution: 'Bourdieu',
  },
  {
    slug: 'symbolic-violence',
    term: 'Symbolic violence',
    definition:
      'Domination that works through meaning rather than force, and that the dominated accept as legitimate. It succeeds only because it is not seen as violence.',
    attribution: 'Bourdieu',
  },
  {
    slug: 'misrecognition',
    term: 'Misrecognition',
    definition:
      'Accepting that the standard which ranks you low is a fair standard. The student who says "I am just not academic" has done it.',
    attribution: 'Bourdieu',
  },
  {
    slug: 'cultural-arbitrary',
    term: 'Cultural arbitrary',
    definition:
      'The specific culture of the dominant class, taught in schools as though it were culture itself rather than one culture among several.',
    attribution: 'Bourdieu',
  },
  {
    slug: 'hegemony',
    term: 'Hegemony',
    definition:
      'Rule by consent rather than by force, where one group’s interests have been accepted by everyone else as plain common sense.',
    attribution: 'Gramsci',
  },
  {
    slug: 'common-sense',
    term: 'Common sense',
    definition:
      'The unexamined inherited worldview most people carry: fragments of religion, folklore and ruling-class ideas absorbed without checking. Hegemony travels through it.',
    attribution: 'Gramsci',
  },
  {
    slug: 'civil-society',
    term: 'Civil society',
    definition:
      'Schools, churches, press, publishers, unions and cultural life: everything outside the government that shapes what people take for granted. Where consent is manufactured.',
    attribution: 'Gramsci',
  },
  {
    slug: 'organic-intellectual',
    term: 'Organic intellectual',
    definition:
      'Someone who articulates and organizes the worldview of their own class or group, as opposed to a professor who imagines they stand above all of them.',
    attribution: 'Gramsci',
  },
  {
    slug: 'war-of-position',
    term: 'War of position',
    definition:
      'The long struggle for cultural ground inside schools, media and publishing, as opposed to a frontal seizure of the state. You win the culture before you win the state.',
    attribution: 'Gramsci',
  },
  {
    slug: 'organic-crisis',
    term: 'Organic crisis',
    definition:
      'The moment consent breaks down and force has to come out into the open. The old is dying, the new cannot be born, and morbid symptoms appear.',
    attribution: 'Gramsci',
  },
  {
    slug: 'political-formula',
    term: 'Political formula',
    definition:
      'The story a ruling group tells to explain why it should rule: divine right, the will of the people, expertise. Believed sincerely rather than cynically.',
    attribution: 'Mosca',
  },
  {
    slug: 'iron-law-of-oligarchy',
    term: 'Iron law of oligarchy',
    definition:
      'Organizing at all produces a permanent leadership layer whose interests drift away from the members. Derived from the most internally democratic party of its day.',
    attribution: 'Michels',
  },
  {
    slug: 'state-of-exception',
    term: 'State of exception',
    definition:
      'Emergency suspension of normal law, declared by the authority that also decides an emergency exists.',
    attribution: 'Schmitt',
  },
  {
    slug: 'decisionism',
    term: 'Decisionism',
    definition:
      'The claim that legal order rests at bottom on a decision by a concrete authority, not on a rule. Rules only work inside a situation somebody first made orderly.',
    attribution: 'Schmitt',
  },
  {
    slug: 'friend-enemy-distinction',
    term: 'Friend and enemy distinction',
    definition:
      'Schmitt’s definition of politics: any genuinely political relation comes down to the possibility of sorting people into friends and enemies.',
    attribution: 'Schmitt',
  },
  {
    slug: 'political-theology',
    term: 'Political theology',
    definition:
      'The argument that modern ideas about the state are religious ideas in secular dress. The sovereign suspending law is the political version of a miracle.',
    attribution: 'Schmitt',
  },
  {
    slug: 'disciplinary-power',
    term: 'Disciplinary power',
    definition:
      'Continuous low-level shaping of bodies and conduct through timetables, ranked rows, inspection and correction. It works on everyone, all the time, and barely looks like power.',
    attribution: 'Foucault',
  },
  {
    slug: 'docile-bodies',
    term: 'Docile bodies',
    definition: 'People made productive and politically harmless at the same time.',
    attribution: 'Foucault',
  },
  {
    slug: 'norm',
    term: 'Norm',
    definition:
      'A standard of normality an institution produces itself, then corrects people against. Discipline does not punish illegality, it corrects deviation.',
    attribution: 'Foucault',
  },
  {
    slug: 'power-knowledge',
    term: 'Power/knowledge',
    definition:
      'Producing knowledge about something is at the same time producing power over it. The prison generates criminology, and criminology underwrites the prison.',
    attribution: 'Foucault',
  },
  {
    slug: 'biopolitics',
    term: 'Biopolitics',
    definition:
      'Government aimed at populations as biological life: birth rates, mortality, health, hygiene. The old sovereign right was to take life. This one is to make live and let die.',
    attribution: 'Foucault',
  },
  {
    slug: 'governmentality',
    term: 'Governmentality',
    definition:
      'Governing by shaping the choices of free people instead of forcing them. You are not compelled, you are configured to want what keeps the system running.',
    attribution: 'Foucault',
  },
  {
    slug: 'panopticon',
    term: 'Panopticon',
    definition:
      'A prison design where you can always be watched and can never check whether you are being watched now, so you behave as if you are. The uncertainty does the work.',
    attribution: 'Bentham, via Foucault',
  },
  {
    slug: 'necropolitics',
    term: 'Necropolitics',
    definition:
      'Biopolitics seen from the colony, where the power in question is the power to expose people to death rather than to manage their health.',
    attribution: 'Mbembe',
  },
  {
    slug: 'modulation',
    term: 'Modulation',
    definition:
      'Control by continuous adjustment rather than by enclosure: rolling assessment, perpetual training, no graduation and no discharge.',
    attribution: 'Deleuze',
  },
  {
    slug: 'dividual',
    term: 'Dividual',
    definition:
      'A person split into data attributes and scored in pieces, rather than dealt with as a whole individual.',
    attribution: 'Deleuze',
  },
  {
    slug: 'total-institution',
    term: 'Total institution',
    definition:
      'An organization that strips a self on admission and rebuilds it to its own specification: asylums, prisons, barracks, some schools.',
    attribution: 'Goffman',
  },
  {
    slug: 'radical-monopoly',
    term: 'Radical monopoly',
    definition:
      'One way of meeting a need crowding out every other way until the alternatives become invisible or impossible. Not one brand beating another, but one mode abolishing the rest.',
    attribution: 'Illich',
  },
  {
    slug: 'counterproductivity',
    term: 'Counterproductivity',
    definition:
      'An institution past a certain size producing the opposite of what it promises: schools that teach helplessness, transport that consumes the time it saves.',
    attribution: 'Illich',
  },
  {
    slug: 'iatrogenesis',
    term: 'Iatrogenesis',
    definition:
      'Harm caused by medicine itself, from drug effects and hospital infection up to a culture that has forgotten how to be ill without management.',
    attribution: 'Illich',
  },
  {
    slug: 'convivial-tool',
    term: 'Convivial tool',
    definition:
      'A tool anyone can pick up for their own purposes, which makes them more capable rather than more dependent. The bicycle, the library, hand tools.',
    attribution: 'Illich',
  },
  {
    slug: 'hidden-curriculum',
    term: 'Hidden curriculum',
    definition:
      'What school teaches through its form rather than its syllabus: wait your turn, be evaluated, accept unequal authority.',
    attribution: 'Jackson',
  },
  {
    slug: 'bare-life',
    term: 'Bare life',
    definition:
      'A human reduced to biological existence alone, with no political standing, exposed to a power that can dispose of them without it counting as a crime.',
    attribution: 'Agamben',
  },
  {
    slug: 'homo-sacer',
    term: 'Homo sacer',
    definition:
      'A figure from archaic Roman law who may be killed but not sacrificed. Outside both human and divine law, and included in the order precisely by being cast out of it.',
    attribution: 'Agamben',
  },
  {
    slug: 'force-of-law',
    term: 'Force-of-law without law',
    definition:
      'Binding legal force detached from any actual statute: the power to decide over a life, wearing the form of law and none of its substance.',
    attribution: 'Agamben',
  },
  {
    slug: 'legibility',
    term: 'Legibility',
    definition:
      'Simplifying a messy reality so a state can count, map and tax it: surveys, permanent surnames, standard weights, grid cities. Reality then gets reshaped to match the map.',
    attribution: 'Scott',
  },
  {
    slug: 'metis',
    term: 'Mētis',
    definition:
      'Practical local knowledge that cannot be written down as a procedure. The thing legibility destroys.',
    attribution: 'Scott',
  },
  {
    slug: 'hidden-transcript',
    term: 'Hidden transcript',
    definition:
      'What subordinates actually say and do out of sight of power, as opposed to the public performance of deference.',
    attribution: 'Scott',
  },
  {
    slug: 'infrastructural-power',
    term: 'Infrastructural power',
    definition:
      'A state’s capacity to actually reach into society and carry a decision through. Modern states have unprecedented amounts of it.',
    attribution: 'Mann',
  },
  {
    slug: 'despotic-power',
    term: 'Despotic power',
    definition:
      'What elites can do without negotiating with anyone. Modern states have less of this than people assume, and it is not the main danger.',
    attribution: 'Mann',
  },
  {
    slug: 'administrative-research',
    term: 'Administrative research',
    definition:
      'Research done for an institution to improve how it operates. Lazarsfeld named it, in English, while running exactly that kind of bureau.',
    attribution: 'Lazarsfeld',
  },
  {
    slug: 'critical-research',
    term: 'Critical research',
    definition:
      'Research asking what an institution is for and whom it serves. The kind Lazarsfeld could not fund, because it produced nothing countable.',
    attribution: 'Lazarsfeld',
  },
  {
    slug: 'megamachine',
    term: 'Megamachine',
    definition:
      'A machine made of human parts organized by authority. The first one built the pyramids, and it had no metal in it.',
    attribution: 'Mumford',
  },
  {
    slug: 'monopoly-of-knowledge',
    term: 'Monopoly of knowledge',
    definition:
      'The control that forms around whoever masters the dominant medium of an age, and that a new medium breaks.',
    attribution: 'Innis',
  },
  {
    slug: 'post-totalitarianism',
    term: 'Post-totalitarianism',
    definition:
      'A system that no longer needs anyone to believe it, because ritual compliance is enough to keep it running.',
    attribution: 'Havel',
  },
  {
    slug: 'living-within-a-lie',
    term: 'Living within a lie',
    definition:
      'Performing an assent you do not hold, which pressures the next person to perform it too. Everyone is victim and enforcer at once.',
    attribution: 'Havel',
  },
  {
    slug: 'ketman',
    term: 'Ketman',
    definition:
      'Professing the required doctrine while keeping a private reservation. The self-division eventually consumes the self it was meant to protect.',
    attribution: 'Miłosz',
  },
  {
    slug: 'loading-the-language',
    term: 'Loading the language',
    definition:
      'Thought-terminating clichés that end an argument instead of answering it. The most useful item on Lifton’s list for reading media.',
    attribution: 'Lifton',
  },
  {
    slug: 'goodharts-law',
    term: "Goodhart’s Law",
    definition:
      'When a measure becomes a target, it stops being a good measure. The operational core of what goes wrong with metrics everywhere.',
  },
  {
    slug: 'achievement-society',
    term: 'Achievement society',
    definition:
      'A society where the subject exploits itself voluntarily and experiences the exploitation as freedom.',
    attribution: 'Han',
  },
  {
    slug: 'manufacture-of-consent',
    term: 'Manufacture of consent',
    definition:
      'Lippmann’s phrase for managing public opinion as a permanent professional job. He meant it approvingly.',
    attribution: 'Lippmann',
  },
  {
    slug: 'propaganda-model',
    term: 'Propaganda model',
    definition:
      'Five filters that shape what gets published without anyone giving an order: ownership, advertising, official sources, organized complaint, and an external enemy.',
    attribution: 'Herman and Chomsky',
  },
  {
    slug: 'correspondence-principle',
    term: 'Correspondence principle',
    definition:
      'School reproduces the workforce through its structure rather than its lessons: hierarchy, alienated work for external reward, competition.',
    attribution: 'Bowles and Gintis',
  },
  {
    slug: 'culture-industry',
    term: 'Culture industry',
    definition:
      'Mass culture as standardized industrial production that pacifies rather than liberates, and offers pseudo-individuality in place of the real thing.',
    attribution: 'Adorno and Horkheimer',
  },
  {
    slug: 'system-justification',
    term: 'System justification',
    definition:
      'The documented tendency to defend and rationalize the existing order, sometimes more strongly the worse your position in it.',
    attribution: 'Jost',
  },
];

export const glossaryBySlug = new Map(glossary.map((term) => [term.slug, term]));
