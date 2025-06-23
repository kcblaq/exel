

import Image from 'next/image';
import Link from 'next/link';
import { ButtonExel } from './ButtonExel';

const Nav = () => {
  return (
    <nav className=" p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <ul className='flex gap-8 items-center'>
          <li className="list-none mr-4">
            <Link href="/" className="hover:text-gray-400">
              <Image
                src="/exportedlogo.png"
                alt="Exel Consultancy Logo"
                width={154}
                height={88}
                className="h-10 w-auto"
              />
            </Link>
          </li>
          <li className="list-none">
            <Link href="/" className=" hover:text-primary transform transition-transform duration-100 hover:scale-115">
              Services
            </Link>
          </li>
          <li className="list-none transform transition-transform duration-100 hover:scale-115">
            <Link href="/" className=" hover:text-primary">
              About Us
            </Link>
          </li>
          <li className="list-none transform transition-transform duration-100 hover:scale-115">
            <Link href="/" className=" hover:text-primary">
              Blog
            </Link>
          </li>
          <li className="list-none transition-transform duration-100 hover:scale-115">
            <Link href="/" className=" hover:text-primary">
              FAQ
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link
              href="/about"
              className="inline-block transition-transform duration-100 hover:text-primary hover:scale-115"
            >
              About Us
            </Link>
          </li>

          <li>
            <Link href="/" className=" hover:text-gray-400">
              <ButtonExel
                text="Log in"
                variant={"outline"}
              />
            </Link>
          </li>
          <li>
            <Link href="/" className=" hover:text-gray-400">
              <ButtonExel
                text="Get a Free Consultation "
                variant={"default"}
              />
            </Link>

          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;