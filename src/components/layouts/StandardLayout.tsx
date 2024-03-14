import React, { ReactNode } from 'react';
import TopMenu from './templates/TopMenu';
import Header from './templates/Header';

interface StandardLayoutProps {
  children: ReactNode;
}

const StandardLayout: React.FC<StandardLayoutProps> = ({ children }) => {
  return (
    <div className="">
      <header>
        <Header>
          <TopMenu />
        </Header>
      </header>
      <main className="container mx-auto py-8 px-4">
        {children}
      </main>
      <footer className="py-4">
        {/* Footer content goes here */}
      </footer>
    </div>
  );
};

export default StandardLayout;
