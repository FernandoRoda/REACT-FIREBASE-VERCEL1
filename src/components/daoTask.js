import firebase from './firebaseConfig';

const TaskAPI = {
  // Criar uma nova tarefa
  createTask: async (taskData, userId) => {
    try {
      const newTaskRef = firebase.database().ref(`tasks/${userId}`).push();
      await newTaskRef.set(taskData);
      return newTaskRef.key; // Retorna o ID da nova tarefa
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  },

  // Ler todas as tarefas
  readTasks: async (userId) => {
    try {
      const snapshot = await firebase.database().ref(`tasks/${userId}`).once('value');
      const tasks = [];
      snapshot.forEach((childSnapshot) => {
        const task = {
          id: childSnapshot.key,
          ...childSnapshot.val()
        };
        tasks.push(task);
      });
      return tasks;
    } catch (error) {
      console.error('Erro ao ler tarefas:', error);
      throw error;
    }
  },

  // Atualizar uma tarefa existente
  updateTask: async (taskId, updates, userId) => {
    try {
      await firebase.database().ref(`tasks/${userId}/${taskId}`).update(updates);
      console.log('Tarefa atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  },

  // Excluir uma tarefa
  deleteTask: async (taskId,userId) => {
    try {
      await firebase.database().ref(`tasks/${userId}/${taskId}`).remove();
      console.log('Tarefa excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      throw error;
    }
  }
};

export default TaskAPI;
