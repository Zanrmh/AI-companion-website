import { SubscriptionButton } from '@/components/subscription-button';
import { checkSubscription } from '@/lib/subscription';

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="h-full p-4 space-y-2">
      <h3 className=" font-bold text-5xl mb-4">Cài đặt</h3>
      <div className="text-muted-foreground text-md">
        {isPro ? 'Bạn đang sử dụng gói Pro' : 'Bạn đang sử dụng gói miễn phí'}
      </div>
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default SettingsPage;
