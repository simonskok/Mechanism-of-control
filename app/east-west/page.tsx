import { EssayPage, essayMetadata } from '@/components/EssayPage';

export const generateMetadata = () => essayMetadata('east-west');

export default function Page() {
  return <EssayPage slug="east-west" />;
}
