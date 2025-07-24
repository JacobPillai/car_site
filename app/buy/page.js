import { Suspense } from 'react';
import BuyPageClient from './BuyPageClient';

export default function BuyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuyPageClient />
    </Suspense>
  );
} 