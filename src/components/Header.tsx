import Link from 'next/link';
import React from 'react';
import { clientMenu } from './ui-data';
import { HeaderContainer, LI, UL } from './ui/Ui';

const Header = () => {
  return (
    <HeaderContainer>
      <UL>
        {Object.keys(clientMenu).map(i => (
          <LI key={i}>
            <Link href={clientMenu[i].href} as={clientMenu[i].as}>
              <a>{clientMenu[i].name}</a>
            </Link>
          </LI>
        ))}
      </UL>
    </HeaderContainer>
  );
};

export default Header;
