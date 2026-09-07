import { EssayPage, essayMetadata } from '@/components/EssayPage';

export const generateMetadata = () => essayMetadata('open-questions');

export default function Page() {
  return <EssayPage slug="open-questions" />;
}
