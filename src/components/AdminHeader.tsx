import Link from 'next/link';
import React from 'react';
import { adminMenu } from './ui-data';
import { HeaderContainer, LI, UL } from './ui/Ui';

const AdminHeader = () => {
  return (
    <HeaderContainer>
      <UL>
        {Object.keys(adminMenu).map(i => (
          <LI key={i}>
            <Link href={adminMenu[i].href} as={adminMenu[i].as}>
              <a>{adminMenu[i].name}</a>
            </Link>
          </LI>
        ))}
      </UL>
    </HeaderContainer>
  );
};

export default AdminHeader;
