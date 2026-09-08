import { EssayPage, essayMetadata } from '@/components/EssayPage';

export const generateMetadata = () => essayMetadata('counter-tradition');

export default function Page() {
  return <EssayPage slug="counter-tradition" />;
}
