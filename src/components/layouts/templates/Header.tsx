import { ReactNode } from 'react';
import Image from 'next/image';

interface HeaderProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-purple-800 text-white">
      <div className="flex items-center">
        <h1 className="text-xl font-bold mr-4">
          Survival Nexus
        </h1>
      </div>
      <div className="flex-grow">{children}</div>
      <div>
        <Image src="/avatar.jpg" alt="Avatar" width={40} height={40} className="rounded-full" />
      </div>
    </header>
  );
};

export default Header;
