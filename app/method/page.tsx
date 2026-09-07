import { EssayPage, essayMetadata } from '@/components/EssayPage';

export const generateMetadata = () => essayMetadata('method');

export default function Page() {
  return <EssayPage slug="method" />;
}
