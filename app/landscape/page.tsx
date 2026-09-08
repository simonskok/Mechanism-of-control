import { EssayPage, essayMetadata } from '@/components/EssayPage';

export const generateMetadata = () => essayMetadata('landscape');

export default function Page() {
  return <EssayPage slug="landscape" />;
}
