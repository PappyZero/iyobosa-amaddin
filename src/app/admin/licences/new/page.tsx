'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabase-client";
import LicenceForm from '@/components/admin/licence-form';

export default function NewLicencePage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        router.replace("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  return <LicenceForm />;
}
