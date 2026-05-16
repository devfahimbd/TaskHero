/**
 * Task Service
 * ============
 * Handles all Firestore operations for tasks:
 * - Add new task
 * - Fetch user's tasks (real-time)
 * - Update task (edit details or toggle completion)
 * - Delete task
 * - Schedule notification for task
 */

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { scheduleTaskNotification, cancelTaskNotification } from './notificationService';

const TASKS_COLLECTION = 'tasks';

/**
 * Create a reference to the tasks subcollection for a given user
 * @param {string} userId - The authenticated user's UID
 * @returns {CollectionReference} Firestore collection reference
 */
const getTasksCollection = (userId) => {
  return collection(db, 'users', userId, TASKS_COLLECTION);
};

/**
 * Add a new task to Firestore and schedule its notification
 * @param {string} userId - The authenticated user's UID
 * @param {Object} taskData - Task data { title, description, datetime }
 * @returns {string} The newly created task's document ID
 */
export const addTask = async (userId, taskData) => {
  try {
    const { title, description, datetime } = taskData;

    // Create the document with all required fields
    const docRef = await addDoc(getTasksCollection(userId), {
      title: title.trim(),
      description: description ? description.trim() : '',
      datetime: datetime ? Timestamp.fromDate(new Date(datetime)) : null,
      completed: false,
      createdAt: Timestamp.now(),
    });

    // Schedule local notification for the task
    if (datetime) {
      await scheduleTaskNotification(docRef.id, title, new Date(datetime));
    }

    return docRef.id;
  } catch (error) {
    throw new Error('Failed to add task. Please try again.');
  }
};

/**
 * Subscribe to real-time task updates for a user
 * Uses Firestore onSnapshot for live data sync
 * @param {string} userId - The authenticated user's UID
 * @param {Function} callback - Called with array of task objects
 * @returns {Function} Unsubscribe function
 */
export const subscribeToTasks = (userId, callback) => {
  // Query: user's tasks ordered by creation date (newest first)
  const q = query(
    getTasksCollection(userId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp back to JS Date
        datetime: doc.data().datetime?.toDate() || null,
        createdAt: doc.data().createdAt?.toDate() || null,
      }));
      callback(tasks);
    },
    (error) => {
      console.error('Firestore subscription error:', error);
    }
  );
};

/**
 * Update an existing task's details
 * @param {string} userId - The authenticated user's UID
 * @param {string} taskId - The task document ID
 * @param {Object} updatedData - Fields to update
 */
export const updateTask = async (userId, taskId, updatedData) => {
  try {
    const taskRef = doc(db, 'users', userId, TASKS_COLLECTION, taskId);

    const updatePayload = {};

    // Only include fields that are being updated
    if (updatedData.title !== undefined) {
      updatePayload.title = updatedData.title.trim();
    }
    if (updatedData.description !== undefined) {
      updatePayload.description = updatedData.description ? updatedData.description.trim() : '';
    }
    if (updatedData.datetime !== undefined) {
      updatePayload.datetime = updatedData.datetime
        ? Timestamp.fromDate(new Date(updatedData.datetime))
        : null;
    }
    if (updatedData.completed !== undefined) {
      updatePayload.completed = updatedData.completed;
    }

    await updateDoc(taskRef, updatePayload);

    // Reschedule notification if datetime changed
    if (updatedData.datetime !== undefined) {
      // Cancel old notification
      await cancelTaskNotification(taskId);

      // Schedule new one if datetime is set
      if (updatedData.datetime) {
        const taskTitle = updatedData.title || 'Task Reminder';
        await scheduleTaskNotification(taskId, taskTitle, new Date(updatedData.datetime));
      }
    }
  } catch (error) {
    throw new Error('Failed to update task. Please try again.');
  }
};

/**
 * Toggle a task's completion status
 * @param {string} userId - The authenticated user's UID
 * @param {string} taskId - The task document ID
 * @param {boolean} completed - The new completion status
 */
export const toggleTaskCompletion = async (userId, taskId, completed) => {
  try {
    const taskRef = doc(db, 'users', userId, TASKS_COLLECTION, taskId);

    await updateDoc(taskRef, { completed });

    // Cancel notification if task is marked as completed
    if (completed) {
      await cancelTaskNotification(taskId);
    }
  } catch (error) {
    throw new Error('Failed to update task status. Please try again.');
  }
};

/**
 * Delete a task from Firestore and cancel its notification
 * @param {string} userId - The authenticated user's UID
 * @param {string} taskId - The task document ID
 */
export const deleteTask = async (userId, taskId) => {
  try {
    const taskRef = doc(db, 'users', userId, TASKS_COLLECTION, taskId);

    // Cancel scheduled notification first
    await cancelTaskNotification(taskId);

    // Then delete the document
    await deleteDoc(taskRef);
  } catch (error) {
    throw new Error('Failed to delete task. Please try again.');
  }
};

// minor update at 2026-05-16 18:06:54 - iteration 1

// minor update at 2026-05-16 18:11:11 - iteration 40

// minor update at 2026-05-16 18:11:23 - iteration 42
