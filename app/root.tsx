import { cssBundleHref } from '@remix-run/css-bundle'
import { type LinksFunction, type MetaFunction } from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError
} from '@remix-run/react'

import tailwindStylesheetLink from '~/styles/tailwind.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStylesheetLink },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [])
]

export const meta: MetaFunction = () => {
  return [
    { name: 'charset', content: 'utf-8' },
    { title: 'Remix Expenses App' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1' }
  ]
}

const Document = ({
  children,
  title = 'Remix Expense App'
}: {
  children: React.ReactNode
  title?: string
}) => (
  <html lang='en' className='h-full'>
    <head>
      <Meta />
      <title>{title}</title>
      <Links />
    </head>
    <body className='flex h-full min-h-screen w-full flex-col bg-violet-600'>
      <nav className='flex h-12 items-center justify-center'>
        <ul className='flex flex-row gap-2 text-xl font-bold text-sky-300'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/pricing'>Pricing</Link>
          </li>
          <li>
            <Link to='/expenses'>Expenses</Link>
          </li>
          <li>
            <Link to='/auth'>Auth</Link>
          </li>
        </ul>
      </nav>
      <main className='container m-auto flex flex-1 text-zinc-50'>{children}</main>
      <footer className='flex items-center justify-center p-4'>
        <p className='text-xl font-bold text-sky-300'>
          © {new Date().getFullYear()} Remix Expenses
        </p>
      </footer>
      <ScrollRestoration />
      <LiveReload />
      <Scripts />
    </body>
  </html>
)

const App = () => (
  <Document>
    <Outlet />
  </Document>
)

const Error = ({
  children,
  title = 'App Error'
}: {
  children: React.ReactNode
  title?: string
}) => (
  <div className='flex h-full w-full flex-1 flex-col items-center justify-center bg-zinc-800 p-4'>
    <h2 className='w-full pb-4 text-center text-5xl text-red-400'>{title}</h2>
    {children}
    <p className='cursor-pointer rounded-lg bg-green-700 px-4 py-2 text-xl font-bold text-zinc-50'>
      <Link to='/'>Back to safety</Link>
    </p>
  </div>
)

export const ErrorBoundary = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={error.statusText}>
        <Error title={`${error.status} ${error.statusText}`}>
          <p className='pb-6 text-2xl text-red-200'>
            Something went wrong. Please try again later.
          </p>
        </Error>
      </Document>
    )
  }

  const errorMessage = (error as Error)?.message ?? 'Unknown error'

  return (
    <Document title='Uh-oh!'>
      <Error title='Uh-oh!'>
        <pre className='pb-6 text-2xl text-red-200'>{errorMessage}</pre>
      </Error>
    </Document>
  )
}

export default App
