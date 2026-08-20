import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import * as React from 'react'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'
import { fr } from '../i18n/fr'
import { LanguageProvider } from '../i18n/LanguageContext'
import { ScrollToTopButton } from '../components/ScrollToTopButton'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

/**
 * RESPONSIVE ZOOM — ABSOLUTELY CRITICAL (protected system, do not replace)
 * Reference width: 1728px.
 * Below 1728px: zoom = viewportWidth / 1728. At/above 1728px: zoom = 1.
 * Inlined below so it runs before first paint (avoids a flash of
 * un-zoomed layout) and is repeated via useEffect in RootComponent for
 * client-side lifecycle / SPA navigations.
 */
const ZOOM_SCRIPT = `(function(){
  function u(){
    var w = document.documentElement.clientWidth;
    var z = w < 1728 ? w / 1728 : 1;
    document.documentElement.style.zoom = String(z);
  }
  u();
  window.addEventListener('resize', u);
})();`

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        // French is the default locale, so the SSR/no-JS meta title and
        // description match it. LanguageProvider updates document.title
        // client-side once hydrated if the visitor's stored preference is
        // English — head() runs outside React render and has no access to
        // hooks, so it can't be locale-aware itself.
        title: fr.meta.title,
      },
      {
        name: 'description',
        content: fr.meta.description,
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@400;500;600&display=swap',
      },
    ],
  }),
  component: RootComponent,
  shellComponent: RootDocument,
})

function RootComponent() {
  // Repeats the responsive zoom system on the client so it stays correct
  // across hydration and SPA route changes. Cleans up its resize listener
  // on unmount.
  React.useEffect(() => {
    function update() {
      const w = document.documentElement.clientWidth
      const z = w < 1728 ? w / 1728 : 1
      document.documentElement.style.zoom = String(z)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <>
      <Outlet />
      {/* 2026-08-14: site owner request — floating "back to top" button,
          mounted once here so it appears on every route rather than being
          re-added per page. */}
      <ScrollToTopButton />
    </>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the zoom script below intentionally sets
    // document.documentElement.style.zoom before React hydrates, which is
    // an expected mismatch on the <html> element (same pattern used by
    // dark-mode/theme scripts). Only suppresses warnings for this node.
    // lang="fr": matches the default locale exactly so there's nothing to
    // reconcile at hydration time; LanguageProvider updates this attribute
    // client-side (inside a useEffect, after hydration) if the visitor's
    // stored preference is English. suppressHydrationWarning stays here
    // for the pre-existing zoom-script mismatch on this same element.
    <html lang="fr" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: ZOOM_SCRIPT }} />
      </head>
      <body className="bg-background text-foreground">
        <LanguageProvider>{children}</LanguageProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
