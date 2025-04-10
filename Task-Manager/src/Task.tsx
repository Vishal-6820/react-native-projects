// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import React, {useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function Task() {
//   const [taskValue, setTaskValue] = useState('');
//   const [task, setTask] = useState<any>([]);
//   const [newTask, setNewTask] = useState('');

//   const saveTasks = async (currentTasks: any) => {
//     try {
//       const jsonValue = JSON.stringify(currentTasks);
//       await AsyncStorage.setItem('tasks', jsonValue);
//     } catch (error) {
//       console.error('error saving task ', error);
//     }
//   };

//   const addTasks = () => {
//     if (newTask.trim()) {
//       const newTaskObject = {
//         id: Date.now(),
//         title: setNewTask,
//         completed: false,
//       };

//       const updatedTask = [...newTask, newTaskObject];
//       setTask(updatedTask);
//       setNewTask('');
//     }
//   };

//   const toggleCompleted = (id: any) => {
//     const updateTasks = task.map(task =>
//       task.id === id ? {...task, completed: !task.completed} : task,
//     );
//     setTask(updateTasks);
//     saveTasks(updateTasks);
//   };

//   const deleteTask = (id: any) => {
//     const updateTasks = task.filter(task => task.id != id);
//     setTask(updateTasks);
//     saveTasks(updateTasks);
//   };

//   const renderItem = ({item}: any) => (
//     <View style={styles.taskItem}>
//       <TouchableOpacity onPress={() => toggleCompleted(item.id)}>
//         <Text style={styles.taskTitle}>{item.title}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => deleteTask(item.id)}
//         style={[styles.btn, {backgroundColor: 'red'}]}>
//         <Text>Delete</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={{flexDirection: 'row'}}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter New Task"
//           value={newTask}
//           onChangeText={text => setTask(text)}
//         />
//         <TouchableOpacity
//           style={[styles.btn, {backgroundColor: 'blue'}]}
//           onPress={addTasks}>
//           <Text>Add Task</Text>
//         </TouchableOpacity>

//         <View>
//           <FlatList
//             data={task}
//             renderItem={renderItem}
//             keyExtractor={item => item.toString()}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'black',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     width: '60%',
//     marginHorizontal: 10,
//   },
//   btn: {
//     flex: 1,
//     paddingHorizontal: 0,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   taskItem: {
//     // flexDirection,
//   },
//   taskTitle: {},
// });
