'use client';

import type { ReactNode } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import DocsTopbar from '@/components/docs/DocsTopbar';

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideOn = new Set<string>([
    '/docs',
    '/docs/bug-hunting-toolkit',
    '/docs/hackers-to-follow',
    '/docs/learn-the-basics',
    '/docs/getting-started',
  ]);
  const showDocsTopbar = pathname?.startsWith('/docs') && !hideOn.has(pathname);

  return (
    <MotionConfig>
      <>
        {showDocsTopbar ? <DocsTopbar /> : null}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className='min-h-screen w-full flex justify-center bg-background'
        >
          <div className='w-full max-w-5xl px-6 pt-6 pb-16'>
            {children}
          </div>
        </motion.div>
      </>
    </MotionConfig>
  );
}