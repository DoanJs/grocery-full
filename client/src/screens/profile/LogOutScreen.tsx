import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';
import { auth, signOut } from '../../../firebase.config';
import {
  BtnShadowLinearComponent,
  Container,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';

const LogOutScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    await signOut(auth);
    await GoogleSignin.signOut();
    await GoogleSignin.revokeAccess()
    setIsLoading(false);
  };
  return (
    <Container bg={colors.background} back title="Log Out">
      <SectionComponent>
        <BtnShadowLinearComponent
          isLoading={isLoading}
          title="Log Out"
          onPress={handleLogout}
        />
      </SectionComponent>
    </Container>
  );
};

export default LogOutScreen;
