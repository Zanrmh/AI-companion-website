// import { SubscriptionButton } from '@/components/subscription-button';
// import { checkSubscription } from '@/lib/subscription';

const SettingsPage = async () => {
  // const isPro = await checkSubscription();

  return (
    <div className="h-full p-4 space-y-2">
      <h1 className=" font-bold text-5xl">Settings</h1>
      <div className="text-muted-foreground text-sm">
        Đang trong quá trình hoàn thiện.
      </div>
      {/* <div className="text-muted-foreground text-sm">
        {isPro
          ? 'You are currently on a Pro plan.'
          : 'You are currently on a free plan.'}
      </div>
      <SubscriptionButton isPro={isPro} /> */}
    </div>
  );
};

export default SettingsPage;
