'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabase-client";
import { getLicenceById } from '@/lib/licences';
import LicenceForm from '@/components/admin/licence-form';

export default function EditLicencePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [licence, setLicence] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const resolvedParams = use(params);

  useEffect(() => {
    const checkAuthAndLoadLicence = async () => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        router.replace("/admin/login");
        return;
      }

      const licenceData = await getLicenceById(resolvedParams.id);
      if (licenceData) {
        setLicence(licenceData);
      } else {
        router.push('/admin/licences');
      }
      setLoading(false);
    };

    checkAuthAndLoadLicence();
  }, [resolvedParams.id, router]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p>Loading licence...</p>
        </div>
      </div>
    );
  }

  if (!licence) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p>Licence not found</p>
        </div>
      </div>
    );
  }

  return <LicenceForm licence={licence} />;
}
