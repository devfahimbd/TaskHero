/**
 * Home Screen
 * ===========
 * Main screen that displays the user's tasks organized into
 * Pending and Completed sections. Includes real-time updates
 * from Firestore, swipe-to-delete, and a FAB for adding tasks.
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Services & Context
import { useAuth } from '../context/AuthContext';
import {
  subscribeToTasks,
  deleteTask,
  toggleTaskCompletion,
} from '../services/taskService';

// Components
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';
import FloatingActionButton from '../components/FloatingActionButton';
import LoadingSpinner from '../components/LoadingSpinner';

// Theme & Constants
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from '../utils/theme';
import { SCREENS, TASK_MESSAGES, EMPTY_STATE } from '../utils/constants';

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'completed'

  // Separate tasks into pending and completed
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  /**
   * Subscribe to real-time task updates from Firestore
   */
  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToTasks(user.uid, (fetchedTasks) => {
      setTasks(fetchedTasks);
      setLoading(false);
      setRefreshing(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user]);

  /**
   * Handle pull-to-refresh
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Since we use real-time listeners, this is mainly visual
    // The listener will set refreshing to false
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  /**
   * Handle delete task with confirmation alert
   */
  const handleDeleteTask = (task) => {
    Alert.alert(
      'Delete Task',
      TASK_MESSAGES.DELETE_CONFIRM_SUBTITLE,
      [
        { text: TASK_MESSAGES.CANCEL, style: 'cancel' },
        {
          text: TASK_MESSAGES.DELETE,
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTask(user.uid, task.id);
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  /**
   * Handle toggling task completion status
   */
  const handleToggleComplete = async (task) => {
    try {
      await toggleTaskCompletion(user.uid, task.id, !task.completed);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  /**
   * Handle edit task navigation
   */
  const handleEditTask = (task) => {
    navigation.navigate(SCREENS.EDIT_TASK, { task });
  };

  /**
   * Handle logout with confirmation
   */
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            Alert.alert('Error', 'Failed to log out.');
          }
        },
      },
    ]);
  };

  /**
   * Render a single task item
   */
  const renderTaskItem = ({ item }) => (
    <TaskItem
      task={item}
      onToggleComplete={() => handleToggleComplete(item)}
      onEdit={() => handleEditTask(item)}
      onDelete={() => handleDeleteTask(item)}
    />
  );

  /**
   * Render the task list header with section titles
   */
  const ListHeader = () => {
    if (activeTab === 'pending' || activeTab === 'completed') return null;

    return null; // We'll handle section headers in the tab-based approach
  };

  /**
   * Get the currently displayed tasks based on the active tab
   */
  const getDisplayedTasks = () => {
    switch (activeTab) {
      case 'pending':
        return pendingTasks;
      case 'completed':
        return completedTasks;
      default:
        return tasks;
    }
  };

  /**
   * Get empty state component based on active tab
   */
  const getEmptyState = () => {
    const displayedTasks = getDisplayedTasks();

    if (activeTab === 'pending' && displayedTasks.length === 0) {
      return (
        <EmptyState
          title={EMPTY_STATE.NO_PENDING_TITLE}
          subtitle={EMPTY_STATE.NO_PENDING_SUBTITLE}
          icon="trophy-outline"
        />
      );
    }

    if (activeTab === 'completed' && displayedTasks.length === 0) {
      return (
        <EmptyState
          title={EMPTY_STATE.NO_COMPLETED_TITLE}
          subtitle={EMPTY_STATE.NO_COMPLETED_SUBTITLE}
          icon="hourglass-outline"
        />
      );
    }

    if (tasks.length === 0) {
      return (
        <EmptyState
          title={EMPTY_STATE.NO_TASKS_TITLE}
          subtitle={EMPTY_STATE.NO_TASKS_SUBTITLE}
          icon="clipboard-outline"
        />
      );
    }

    return null;
  };

  // Show loading spinner on initial load
  if (loading) {
    return <LoadingSpinner message="Loading your tasks..." />;
  }

  const displayedTasks = getDisplayedTasks();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>
            {getGreetingMessage()}
          </Text>
          <Text style={styles.userName}>
            {user?.email?.split('@')[0] || 'Hero'}
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'all' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('all')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'all' && styles.activeTabText,
            ]}
          >
            All ({tasks.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'pending' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('pending')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'pending' && styles.activeTabText,
            ]}
          >
            Pending ({pendingTasks.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'completed' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('completed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText,
            ]}
          >
            Done ({completedTasks.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      {displayedTasks.length > 0 ? (
        <FlatList
          data={displayedTasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.taskList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
            />
          }
        />
      ) : (
        getEmptyState()
      )}

      {/* Floating Action Button */}
      <FloatingActionButton
        onPress={() => navigation.navigate(SCREENS.ADD_TASK)}
      />
    </SafeAreaView>
  );
};

/**
 * Get a time-based greeting message
 */
const getGreetingMessage = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.base,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  userName: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    textTransform: 'capitalize',
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.base,
    gap: SPACING.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.base,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  taskList: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: 100, // Space for FAB
  },
});

export default HomeScreen;
