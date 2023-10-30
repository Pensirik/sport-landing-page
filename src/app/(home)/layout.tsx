import Layout from '@/components/app/Layout';

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout>
      {children}
    </Layout>
  );
}
