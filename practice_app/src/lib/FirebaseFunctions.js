import { db } from '../../firebase'; // Assuming this is your Firebase configuration file

const getMessages = async (userId) => {
  try {
    const userRef = db.ref(`users/${userId}`);
    const snapshot = await userRef.once('value');

    if (snapshot.exists() && snapshot.child('messages').exists()) {
      return snapshot.child('messages').val();
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export { getMessages };