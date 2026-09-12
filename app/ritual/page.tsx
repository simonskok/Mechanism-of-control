import { EssayPage, essayMetadata } from '@/components/EssayPage';

export const generateMetadata = () => essayMetadata('ritual');

export default function Page() {
  return <EssayPage slug="ritual" />;
}
