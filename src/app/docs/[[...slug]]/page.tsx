import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
// Import explicit order matching sidebar
import { docsOrderedSlugs } from '@/lib/docsOrder';
// Import docs meta as secondary fallback
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - JSON import for simple config
import docsMeta from '@/../content/docs/meta.json';
import Link from 'next/link';
import IntegrationsPage from '@/components/docs/IntegrationsPage';

type DocsMeta = { pages?: string[] };

function getOrderedSlugsFromMeta(): string[] {
  const meta = (docsMeta as unknown as DocsMeta) || {};
  const raw = Array.isArray(meta.pages) ? meta.pages : [];
  return raw.filter((p) => typeof p === 'string' && !p.startsWith('---') && !p.startsWith('...'));
}

function resolveOrderSlugs(): string[] {
  // 1) Use explicit list if available and slugs exist
  const explicit = docsOrderedSlugs.filter((s) => source.getPage(s ? [s] : undefined));
  if (explicit.length) return explicit;
  // 2) Fallback to meta.json order
  const meta = getOrderedSlugsFromMeta().filter((s) => source.getPage([s]));
  if (meta.length) return meta;
  return [];
}

function getBreadcrumb(slug: string): { label: string; href: string }[] {
  // Map slugs to their parent folder label in the sidebar
  const bugHunters = new Set([
    'arsenal', 'reconnaissance', 'methodology', 'extensions', 'writeups', 'youtube-channels'
  ]);
  const basics = new Set([
    'cyber-security-types', 'common-job-roles', 'get-started-with-infosec', 'best-bug-bounty-platform', 'best-infosec-writeups-website', 'hacking-books', 'cli-commands', 'learn-wsl'
  ]);
  const hackers = new Set(['twitter', 'medium', 'youtube', 'discord', 'security-gitbooks']);

  let trail: { label: string; href: string }[];

  if (slug === '' || slug === 'index') {
    trail = [
      { label: 'Getting Started', href: '/docs' },
      { label: 'Introduction', href: '/docs' },
    ];
  } else if (bugHunters.has(slug)) {
    trail = [
      { label: "Bug Hunter's Toolkit", href: '/docs/arsenal' },
      { label: slugToTitle(slug), href: `/docs/${slug}` },
    ];
  } else if (basics.has(slug)) {
    trail = [
      { label: 'Learn the Basics', href: '/docs/cyber-security-types' },
      { label: slugToTitle(slug), href: `/docs/${slug}` },
    ];
  } else if (hackers.has(slug)) {
    trail = [
      { label: 'Hackers to Follow', href: '/docs/twitter' },
      { label: slugToTitle(slug), href: `/docs/${slug}` },
    ];
  } else {
    trail = [{ label: slugToTitle(slug || 'docs'), href: `/docs/${slug}` }];
  }

  return [{ label: 'Docs', href: '/docs' }, ...trail];
}

function slugToTitle(slug: string): string {
  const map: Record<string, string> = {
    'index': 'Introduction',
    'arsenal': 'Arsenal',
    'reconnaissance': 'Reconnaissance',
    'methodology': 'Methodology',
    'extensions': 'Extensions',
    'writeups': 'Writeups',
    'youtube-channels': 'YouTube Channels',
    'cyber-security-types': 'Cyber Security Types',
    'common-job-roles': 'Common Job Roles',
    'get-started-with-infosec': 'Get Started with Infosec',
    'best-bug-bounty-platform': 'Best Bug Bounty Platform',
    'best-infosec-writeups-website': 'Best Infosec Writeups Website',
    'hacking-books': 'Hacking Books',
    'cli-commands': 'CLI Commands',
    'learn-wsl': 'Learn WSL',
    'twitter': 'Twitter',
    'medium': 'Medium',
    'youtube': 'YouTube',
    'discord': 'Discord',
    'security-gitbooks': 'Security GitBooks',
  };
  return map[slug] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

export default async function Page(props: { params: Promise<{ slug?: string[] }>; }) {
  const params = await props.params;
  
  // If slug is empty/undefined, show integrations page
  if (!params.slug || params.slug.length === 0) {
    return <IntegrationsPage />;
  }
  
  // Handle getting-started/index route
  // Fumadocs maps index.mdx files to just the folder name, not folder/index
  // So getting-started/index.mdx maps to ['getting-started'], not ['getting-started', 'index']
  let slugToUse = params.slug;
  if (params.slug.length === 2 && params.slug[0] === 'getting-started' && params.slug[1] === 'index') {
    slugToUse = ['getting-started'];
  }
  
  const page = source.getPage(slugToUse);
  if (!page) notFound();

  const MDX = page.data.body;

  // Use original slug for URL/key, but slugToUse for page lookup
  const currentKey = (slugToUse ?? []).join('/');

  let orderedSlugs = resolveOrderSlugs();
  if (orderedSlugs.length === 0 || !orderedSlugs.includes(currentKey)) {
    const allParams = await source.generateParams();
    orderedSlugs = allParams.map((p) => (p.slug ?? []).join('/'));
  }

  const crumbSlug = currentKey === '' ? 'index' : currentKey;
  const breadcrumbs = getBreadcrumb(crumbSlug);

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      {/* Breadcrumbs */}
      <nav className="mb-3 text-sm text-muted-foreground flex items-center gap-1">
        {breadcrumbs.map((c, i) => (
          <span key={`${c.href}-${i}`} className="inline-flex  my-3 ml-1 font-medium text-md items-center gap-1">
            <Link className="hover:text-primary no-underline" href={c.href}>{c.label}</Link>
            {i < breadcrumbs.length - 1 && <span className="px-1 text-muted-foreground">/</span>}
          </span>
        ))}
      </nav>

      <h1 className="text-3xl font-bold mb-4">{page.data.title}</h1>
      {page.data.description && (
        <p className="text-lg text-muted-foreground mb-8">{page.data.description}</p>
      )}
      <div id="docs-content-root" className="prose prose-gray dark:prose-invert max-w-none">
        <MDX components={getMDXComponents()} />
      </div>


    </div>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }>; }) {
  const params = await props.params;
  
  // If slug is empty, return metadata for integrations page
  if (!params.slug || params.slug.length === 0) {
    return { 
      title: 'index', 
      description: 'Connect seamlessly with popular platforms and services to enhance your workflow.' 
    };
  }
  
  // Handle getting-started/index route - map to getting-started
  let slugToUse = params.slug;
  if (params.slug.length === 2 && params.slug[0] === 'getting-started' && params.slug[1] === 'index') {
    slugToUse = ['getting-started'];
  }
  
  const page = source.getPage(slugToUse);
  if (!page) notFound();

  return { title: page.data.title, description: page.data.description };
}