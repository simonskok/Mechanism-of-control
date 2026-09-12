import { EssayPage, essayMetadata } from '@/components/EssayPage';

export const generateMetadata = () => essayMetadata('what-control-reveals');

export default function Page() {
  return <EssayPage slug="what-control-reveals" />;
}
