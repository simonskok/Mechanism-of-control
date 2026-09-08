import { EssayPage, essayMetadata } from '@/components/EssayPage';

export const generateMetadata = () => essayMetadata('provenance');

export default function Page() {
  return <EssayPage slug="provenance" />;
}
