import { EssayPage, essayMetadata } from '@/components/EssayPage';

export const generateMetadata = () => essayMetadata('revelation');

export default function Page() {
  return <EssayPage slug="revelation" />;
}
