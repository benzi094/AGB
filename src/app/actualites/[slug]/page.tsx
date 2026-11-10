import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import VideoPlayer from "@/components/VideoPlayer";
import { Breadcrumb, NewsBadge, NewsDate, newsHref, projectHref } from "@/components/news/NewsParts";
import { NEWS, getNewsPost, newsBadge, type NewsPost } from "@/data/news";
import { PROJECTS } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return NEWS.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getNewsPost((await params).slug);
  if (!post) return {};
  const url = newsHref(post);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} | African Global Business`,
      description: post.excerpt,
      url,
      siteName: "African Global Business",
      locale: "fr_FR",
      type: "article",
      images: [{ url: post.cover.src, alt: post.cover.alt }],
      ...(post.video ? { videos: [{ url: post.video.src, type: "video/mp4" }] } : {}),
    },
  };
}

function AsideCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[6px] border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 font-oswald text-sm font-bold uppercase tracking-wider text-secondary">{title}</h2>
      {children}
    </div>
  );
}

function Thumb({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative block h-14 w-20 shrink-0 overflow-hidden rounded-[4px] bg-slate-900">
      <Image src={src} alt={alt} fill sizes="80px" className="object-cover" />
    </span>
  );
}

function PostMedia({ post }: { post: NewsPost }) {
  if (post.video) {
    return <VideoPlayer video={post.video} title={post.title} sizes="(min-width: 1024px) 860px, 100vw" priority />;
  }
  return (
    <div className="relative aspect-video overflow-hidden rounded-[6px] bg-slate-900">
      <Image
        src={post.cover.src}
        alt={post.cover.alt}
        fill
        priority
        sizes="(min-width: 1024px) 860px, 100vw"
        className="object-cover"
      />
    </div>
  );
}

const linkTitle =
  "block font-oswald text-sm font-bold uppercase leading-snug tracking-wide text-secondary transition-colors group-hover:text-primary";

export default async function NewsPostPage({ params }: PageProps) {
  const post = getNewsPost((await params).slug);
  if (!post) notFound();

  const project = post.projectSlug ? PROJECTS.find((p) => p.slug === post.projectSlug) : undefined;
  const others = NEWS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <section className="bg-dark-section pt-28 pb-4 border-b-4 border-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb
              items={[{ label: "Accueil", href: "/" }, { label: "Actualités", href: "/actualites" }, { label: post.title }]}
            />
          </div>
        </section>

        <article className="bg-bg-light py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header>
              <h1 className="text-3xl md:text-4xl font-black font-oswald text-secondary uppercase leading-tight">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <NewsBadge post={post} />
                <NewsDate date={post.date} />
              </div>
            </header>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="min-w-0">
                <PostMedia post={post} />
                <div className="mt-6 max-w-3xl space-y-4 font-inter text-[15px] sm:text-base leading-relaxed text-slate-600">
                  {post.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <Link
                  href="/actualites"
                  className="group mt-8 inline-flex items-center font-oswald text-xs font-bold uppercase tracking-widest text-secondary transition-colors hover:text-primary"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                  Toutes les actualités
                </Link>
              </div>

              <aside className="space-y-6" aria-label="Pour aller plus loin">
                {project && (
                  <AsideCard title="Projet associé">
                    <Link href={projectHref(project.slug)} className="group flex items-center gap-4">
                      <Thumb src={project.cover.src} alt={project.cover.alt} />
                      <span className="min-w-0">
                        <span className={linkTitle}>{project.title}</span>
                        <span className="mt-1 inline-flex items-center font-inter text-xs font-semibold text-primary">
                          Voir la réalisation
                          <ArrowRight
                            className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </Link>
                  </AsideCard>
                )}

                {others.length > 0 && (
                  <AsideCard title="Autres actualités">
                    <ul className="space-y-4">
                      {others.map((other) => (
                        <li key={other.slug}>
                          <Link href={newsHref(other)} className="group flex items-center gap-4">
                            <Thumb src={other.cover.src} alt={other.cover.alt} />
                            <span className="min-w-0">
                              <span className={linkTitle}>{other.title}</span>
                              <span className="mt-1 block font-inter text-xs text-slate-500">{newsBadge(other)}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AsideCard>
                )}
              </aside>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
