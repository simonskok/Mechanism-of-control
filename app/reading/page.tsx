import { EssayPage, essayMetadata } from '@/components/EssayPage';

export const generateMetadata = () => essayMetadata('reading');

export default function Page() {
  return <EssayPage slug="reading" />;
}
