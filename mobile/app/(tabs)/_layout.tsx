import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={26} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
        },
        headerStyle: {
          backgroundColor: theme.card,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <TabBarIcon name="grid-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="batches"
        options={{
          title: 'Bandes',
          tabBarIcon: ({ color }) => <TabBarIcon name="layers-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="buildings"
        options={{
          title: 'Bâtiments',
          tabBarIcon: ({ color }) => <TabBarIcon name="business-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: 'Santé',
          tabBarIcon: ({ color }) => <TabBarIcon name="medical-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="sales"
        options={{
          title: 'Ventes',
          tabBarIcon: ({ color }) => <TabBarIcon name="cart-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="suppliers"
        options={{
          title: 'Fournisseurs',
          tabBarIcon: ({ color }) => <TabBarIcon name="cube-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
