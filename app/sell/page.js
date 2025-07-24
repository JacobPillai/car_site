"use client";

import { Suspense } from 'react';
import SellPageClient from './SellPageClient';

export default function SellPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SellPageClient />
    </Suspense>
  );
} 