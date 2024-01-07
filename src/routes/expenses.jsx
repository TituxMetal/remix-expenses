import { Link, Outlet } from '@remix-run/react'

const ExpensesLayout = () => (
  <section className='flex min-w-full flex-col items-center justify-center bg-zinc-800 text-zinc-100'>
    <nav className='flex h-12 items-center justify-center'>
      <ul className='flex flex-row gap-2 text-xl font-bold text-sky-300'>
        <li>
          <Link to='update'>Update</Link>
        </li>
        <li>
          <Link to='add'>Add</Link>
        </li>
        <li>
          <Link to='analitics'>Analitics</Link>
        </li>
        <li>
          <Link to='raw'>Raw</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </section>
)

export default ExpensesLayout
