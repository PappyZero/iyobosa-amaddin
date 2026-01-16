'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabase-client";
import AwardForm from '@/components/admin/award-form';

export default function NewAwardPage() {
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

  return <AwardForm />;
}
