import { EssayPage, essayMetadata } from '@/components/EssayPage';

export const generateMetadata = () => essayMetadata('tools');

export default function Page() {
  return <EssayPage slug="tools" />;
}
