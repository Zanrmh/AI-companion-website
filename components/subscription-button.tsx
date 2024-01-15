'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export const SubscriptionButton = ({ isPro = false }: { isPro: boolean }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        description: 'Một vài lỗi đã xảy ra.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant={isPro ? 'default' : 'premium'}
      disabled={loading}
      onClick={onClick}
    >
      {isPro ? 'Đã mua' : 'Nâng cấp'}
      {!isPro && <Sparkles className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
