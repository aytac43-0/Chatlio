import { useRouter } from 'next/navigation';

export default function ContactDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <h1 className="text-2xl font-bold">Contact</h1>
      <p className="text-gray-600">Details for contact <strong>{id}</strong></p>
    </div>
  );
}
