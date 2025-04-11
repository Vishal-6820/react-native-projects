import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from './src/components/Checkbox'; // Assuming your Checkbox component is in './Checkbox.js'

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async newTasks => {
    try {
      const jsonValue = JSON.stringify(newTasks);
      await AsyncStorage.setItem('tasks', jsonValue);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: task,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTask('');
      saveTasks(updatedTasks);
    }
  };

  const toggleComplete = id => {
    const updatedTasks = tasks.map(item =>
      item.id === id ? {...item, completed: !item.completed} : item,
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = id => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedTasks = tasks.filter(item => item.id !== id);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.taskItem}>
      <Checkbox
        value={item.completed}
        onValueChange={() => toggleComplete(item.id)}
      />
      <Text style={[styles.taskTitle, item.completed && styles.completedTask]}>
        {item.title}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}>
        <Text>Delete</Text>
        {/* <Ionicons name="trash-outline" size={24} color="red" /> */}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Manager</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task"
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.taskList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 15,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    marginLeft: 15,
  },
});

// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function App() {
//   const [task, setTask] = useState('');
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   const loadTasks = async () => {
//     try {
//       const storedTasks = await AsyncStorage.getItem('tasks');
//       if (storedTasks !== null) {
//         setTasks(JSON.parse(storedTasks));
//       }
//     } catch (error) {
//       console.error('Error loading tasks:', error);
//     }
//   };

//   const saveTasks = async newTasks => {
//     try {
//       const jsonValue = JSON.stringify(newTasks);
//       await AsyncStorage.setItem('tasks', jsonValue);
//     } catch (error) {
//       console.error('Error saving tasks:', error);
//     }
//   };

//   const handleAddTask = () => {
//     if (task.trim()) {
//       const newTask = {
//         id: Date.now().toString(),
//         title: task,
//         completed: false,
//       };
//       const updatedTasks = [...tasks, newTask];
//       setTasks(updatedTasks);
//       setTask('');
//       saveTasks(updatedTasks);
//     }
//   };

//   const toggleComplete = id => {
//     const updatedTasks = tasks.map(item =>
//       item.id === id ? {...item, completed: !item.completed} : item,
//     );
//     setTasks(updatedTasks);
//     saveTasks(updatedTasks);
//   };

//   const deleteTask = id => {
//     Alert.alert(
//       'Delete Task',
//       'Are you sure you want to delete this task?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => {
//             const updatedTasks = tasks.filter(item => item.id !== id);
//             setTasks(updatedTasks);
//             saveTasks(updatedTasks);
//           },
//         },
//       ],
//       {cancelable: false},
//     );
//   };

//   const renderItem = ({item}) => (
//     <View style={styles.taskItem}>
//       <TouchableOpacity
//         style={styles.checkbox}
//         onPress={() => toggleComplete(item.id)}>
//         <Text>{item.completed ? 'Complete' : 'In-progress'}</Text>
//         {/* <Ionicons
//           name={item.completed ? 'checkbox-sharp' : 'checkbox-outline'}
//           size={24}
//           color={item.completed ? 'green' : 'gray'}
//         /> */}
//       </TouchableOpacity>
//       <Text style={[styles.taskTitle, item.completed && styles.completedTask]}>
//         {item.title}
//       </Text>
//       <TouchableOpacity
//         style={styles.deleteButton}
//         onPress={() => deleteTask(item.id)}>
//         <Text>Delete</Text>
//         {/* <Ionicons name="trash-outline" size={24} color="red" /> */}
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Task Manager</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Add new task"
//           value={task}
//           onChangeText={text => setTask(text)}
//         />
//         <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
//           <Text style={styles.addButtonText}>Add</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={tasks}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         style={styles.taskList}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f4f4f4',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginRight: 10,
//     backgroundColor: 'white',
//   },
//   addButton: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   taskList: {
//     flex: 1,
//   },
//   taskItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     backgroundColor: 'white',
//     borderRadius: 5,
//     marginBottom: 8,
//   },
//   checkbox: {
//     marginRight: 15,
//   },
//   taskTitle: {
//     flex: 1,
//     fontSize: 16,
//   },
//   completedTask: {
//     textDecorationLine: 'line-through',
//     color: 'gray',
//   },
//   deleteButton: {
//     marginLeft: 15,
//   },
// });
