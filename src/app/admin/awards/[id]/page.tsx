'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabase-client";
import { getAwardById } from '@/lib/awards';
import AwardForm from '@/components/admin/award-form';

export default function EditAwardPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [award, setAward] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const resolvedParams = use(params);

  useEffect(() => {
    const checkAuthAndLoadAward = async () => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        router.replace("/admin/login");
        return;
      }

      const awardData = await getAwardById(resolvedParams.id);
      if (awardData) {
        setAward(awardData);
      } else {
        router.push('/admin/awards');
      }
      setLoading(false);
    };

    checkAuthAndLoadAward();
  }, [resolvedParams.id, router]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p>Loading award...</p>
        </div>
      </div>
    );
  }

  if (!award) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p>Award not found</p>
        </div>
      </div>
    );
  }

  return <AwardForm award={award} />;
}
