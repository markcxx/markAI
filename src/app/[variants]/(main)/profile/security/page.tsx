import { notFound } from 'next/navigation';

import { enableClerk } from '@/const/auth';
import { isDesktop } from '@/const/version';
import { metadataModule } from '@/server/metadata';
import { translation } from '@/server/translation';
import { DynamicLayoutProps } from '@/types/next';
import { RouteVariants } from '@/utils/server/routeVariants';

import ClerkProfile from '../features/ClerkProfile';

export const generateMetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props);
  const { t } = await translation('auth', locale);
  return metadataModule.generate({
    description: t('header.desc'),
    title: t('tab.security'),
    url: '/profile/security',
  });
};

const Page = async (props: DynamicLayoutProps) => {
  if (!enableClerk || isDesktop) return notFound();
  const mobile = await RouteVariants.getIsMobile(props);

  return <ClerkProfile mobile={mobile} />;
};

export default Page;
