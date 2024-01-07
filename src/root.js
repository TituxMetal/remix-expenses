import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from '@remix-run/react'

import tailwind from './tailwind.css'

export const links = () => [{ rel: 'stylesheet', href: tailwind }]

export const meta = () => ({
  charset: 'utf-8',
  title: 'Remix Expenses App',
  viewport: 'width=device-width,initial-scale=1'
})

const Document = ({ children, title }) => (
  <html lang='en' className='h-full'>
    <head>
      <title>{title}</title>
      <Meta />
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
      <Scripts />
      {process.env.NODE_ENV !== 'production' && <LiveReload />}
    </body>
  </html>
)

const App = () => (
  <Document>
    <Outlet />
  </Document>
)

const Error = ({ children, title }) => (
  <div className='flex h-full w-full flex-1 flex-col items-center justify-center bg-zinc-800 p-4'>
    <h2 className='w-full pb-4 text-center text-5xl text-red-400'>{title}</h2>
    {children}
  </div>
)

export const CatchBoundary = () => {
  const caughtResponse = useCatch()

  return (
    <Document title={caughtResponse.statusText}>
      <Error title={caughtResponse.statusText}>
        <p className='pb-6 text-2xl text-red-200'>
          {caughtResponse.data?.message || 'Something went wrong. Please try again later.'}
        </p>
        <p className='cursor-pointer rounded-lg bg-green-700 py-2 px-4 text-xl font-bold text-zinc-50'>
          <Link to='/'>Back to safety</Link>
        </p>
      </Error>
    </Document>
  )
}

export const ErrorBoundary = ({ error }) => (
  <Document title='An error occured'>
    <Error title='An error occured'>
      <p className='pb-6 text-2xl text-red-200'>
        {error.message || 'Something went wrong. Please try again later.'}
      </p>
      <p className='cursor-pointer rounded-lg bg-green-700 py-2 px-4 text-xl font-bold text-zinc-50'>
        <Link to='/'>Back to safety</Link>
      </p>
    </Error>
  </Document>
)

export default App
