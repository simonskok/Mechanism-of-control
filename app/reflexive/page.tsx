import { EssayPage, essayMetadata } from '@/components/EssayPage';

export const generateMetadata = () => essayMetadata('reflexive');

export default function Page() {
  return <EssayPage slug="reflexive" />;
}
