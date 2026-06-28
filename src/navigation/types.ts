
import { NavigatorScreenParams } from '@react-navigation/native';

export type AppStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  EditUser: {
    user: {
      id: string;
      fullName: string;
      email: string;
      mobile: string;
      password: string;
      profileImage: string;
      createdAt: string;
    };
  };
};

export type TabParamList = {
  Users: undefined;
  // add your other tabs here
};
