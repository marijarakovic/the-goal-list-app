import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  Text,
  Alert
} from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
    setIsAddMode(false);
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" color="#CB8AFA" onPress={() => setIsAddMode(true)} />
      <Text style={styles.helperText}>(Click on goal to delete it)</Text>
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData =>
          <GoalItem id={itemData.item.id} title={itemData.item.value} onDelete={() => {
            Alert.alert('You are about to delete goal',
              'Are you sure?',
              [{ text: 'Yes', onPress: () => removeGoalHandler(itemData.item.id), style: 'destructive' },
              { text: 'No', style: 'cancel' }])
          }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  helperText: {
    textAlign: "right",
    marginTop: 5,
    fontSize: 12
  }
});
