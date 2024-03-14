import Link from 'next/link';

interface LinkItem {
  label: string;
  link: string;
}


const TopMenu = () => {
  const links: LinkItem[] = [
    { label: 'Report', link: '/' },
    { label: 'Survivor', link: '/survivor' },
    { label: 'Inventory', link: '/inventory' },
  ];

  return (
    <nav>
      <ul className="flex justify-center">
        {links.map((linkItem, index) => (
          <li key={index} className="mx-5">
            <Link href={linkItem.link} className="text-gray-100 hover:text-gray-400">
              {linkItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopMenu;
