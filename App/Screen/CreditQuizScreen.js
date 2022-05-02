import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Modal,
  Animated,
} from 'react-native';
import {Card, Button} from 'react-native-paper';

const QuizScreen = props => {
  const allQuestion = [
    {
      question: 'What is the Capital of India',
      option: ['Delhi', 'Mumbai', 'Chennai', 'Kolkata'],
      answer: 'Delhi',
    },
    {
      question: 'What is the full form of EMI?',
      option: [
        'Equal Monthy Installment',
        'Equated Monthly Installment',
        'Equal Monthy Income',
        'Equated Monthy Incentive',
      ],
      answer: 'Equated Monthly Installment',
    },
    {
      question: 'What is the maximum loan duration for the Personal Loan?',
      option: ['1-5 years', '2-4 years', '1-8 years', '1-10 years'],
      answer: '1-5 years',
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctOptionSelected, setCorrectOptionSelectd] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [backVisible, setBackVisible] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const validateAnswer = selectedOptions => {
    let current_option = allQuestion[currentQuestionIndex]['answer'];
    setCorrectOptionSelectd(selectedOptions);
    setCorrectOption(current_option);
    setIsOptionDisabled(true);
    if (selectedOptions === current_option) {
      setScore(score + 1);
    }

    setShowNextButton(true);
  };
  // Handle Next
  const handleNext = () => {
    if (currentQuestionIndex === allQuestion.length - 1) {
      setShowScore(true);

      setShowNextButton(false);
      setBackVisible(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCorrectOptionSelectd(null);
      setCorrectOption(null);
      setIsOptionDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  // Restart
  const reStartQuiz = () => {
    setShowScore(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectOptionSelectd(null);
    setCorrectOption(null);
    setIsOptionDisabled(false);
    setShowNextButton(false);
    setBackVisible(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  //Render Question
  const renderQuestion = () => {
    return (
      <View>
        <View>
          <Text style={{alignSelf: 'center', fontSize: 22, color: 'green'}}>
            Question-
            {currentQuestionIndex + 1}
          </Text>
        </View>
        <Text style={styles.quesV}>
          {allQuestion[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };

  //  Render Option
  const renderOptions = () => {
    return (
      <View>
        <View
          style={{
            backgroundColor: '#e6e6fa',
            margin: 5,
            borderRadius: 15,
            padding: 8,
          }}>
          <View style={{marginBottom: 20}}>
            <View style={{marginTop: 30}}>
              {allQuestion[currentQuestionIndex]?.option.map(
                (options, index) => {
                  return (
                    <Button
                      onPress={() => validateAnswer(options)}
                      disabled={isOptionDisabled}
                      key={options}
                      style={[
                        options === correctOption
                          ? {
                              backgroundColor: 'green',
                              borderRadius: 10,
                              marginTop: 10,
                            }
                          : options === correctOptionSelected
                          ? {
                              backgroundColor: 'red',
                              borderRadius: 10,
                              marginTop: 10,
                            }
                          : {
                              borderRadius: 10,
                              marginTop: 10,
                            },
                      ]}
                      mode="contained">
                      <Text
                        style={[
                          options === correctOption
                            ? {
                                color: 'white',
                              }
                            : options === correctOptionSelected
                            ? {
                                color: 'white',
                              }
                            : null,
                        ]}>
                        {options}
                      </Text>
                    </Button>
                  );
                },
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Render Next Button
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <Button
          style={{
            borderRadius: 10,
            width: '80%',
            alignSelf: 'center',
            marginTop: '20%',
          }}
          onPress={handleNext}
          mode="contained">
          Next
        </Button>
      );
    } else {
      return null;
    }
  };

  //Prograg bar
  const [progress] = useState(new Animated.Value(0));

  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestion.length],
    outputRange: ['0%', '100%'],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 20,
          borderRadius: 20,
        }}>
        <Animated.View
          style={[
            {
              height: 10,
              borderRadius: 10,
              backgroundColor: '#3498DB',
            },
            {
              width: progressAnim,
            },
          ]}></Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.header}>Quiz </Text>
      <ScrollView>
        <View style={{margin: 10}}>
          {renderProgressBar()}
          <Card style={styles.cardView}>
            <Card.Content
              style={[
                backVisible
                  ? {
                      opacity: 0.09,
                    }
                  : null,
              ]}>
              {renderQuestion()}

              <View>{renderOptions()}</View>
            </Card.Content>
          </Card>

          {renderNextButton()}
          <View>
            <Modal animationType="fades" transparent={true} visible={showScore}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#F4F6F6',
                    width: '80%',
                    borderRadius: 20,
                    padding: 10,
                    alignItems: 'center',
                    elevation: 30,
                    height: '35%',
                  }}>
                  <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                    Your Score
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginVertical: 15,
                    }}>
                    <Text style={{fontSize: 40}}>{score}</Text>
                    <Text style={{fontSize: 30}}> /{allQuestion.length}</Text>
                  </View>
                  {/* Retry */}
                  <View style={{flexDirection: 'row', marginTop: 25}}>
                    <Button
                      onPress={reStartQuiz}
                      mode="contained"
                      style={{
                        borderRadius: 10,
                        width: '50%',
                        alignSelf: 'flex-start',
                      }}>
                      <Text>Retry</Text>
                    </Button>

                    <Button
                      onPress={() => props.navigation.navigate('Account')}
                      mode="contained"
                      style={{
                        borderRadius: 10,
                        marginLeft: 10,
                      }}>
                      <Text>My Account</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    alignContent: 'center',
    alignSelf: 'center',
    flex: 3,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  quesV: {
    fontSize: 20,
    alignSelf: 'center',
  },
  cardView: {
    padding: 1,
    borderRadius: 25,
    elevation: 6,
    marginTop: 50,
  },
});
export default QuizScreen;
