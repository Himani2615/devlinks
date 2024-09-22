"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className=" p-4">
      <ul className="flex space-x-4 text-blue-900 justify-between mx-5">
        <li>
          <Link href="/">
          <div className={`p-2 rounded ${pathname === '/' ? 'bg-gray-100' : 'text-black'}`}>
          devlinks
            </div>
          </Link>
        </li>
        <li>
          <Link href="/profile">
          <div className={`p-2 rounded ${pathname === '/profile' ? 'bg-gray-100' : 'text-black'}`}>
          Profile
            </div>
          </Link>
        </li>
        <li>
          <Link href="/editor">
          <div className={`p-2 rounded ${pathname === '/editor' ? 'bg-gray-100' : 'text-black'}`}>
              Editor
            </div>
          </Link>
        </li>
        <li>
          <Link href="/preview">
          <div className={`p-2 rounded ${pathname === '/preview' ? 'bg-gray-100' : 'text-black'}`}>
             Preview
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
