const questionsCount = 20;
const testQuestions = [
    'On a scale of 1 to 5, how would you rate your overall mental well-being and happiness, with 1 being the highest and 5 being the lowest?',
    'How often do you experience feelings of joy and contentment in your daily life (1 = very often, 5 = very rarely)?',
    'To what extent do you feel in control of your emotions and thoughts (1 = very in control, 5 = very out of control)?',
    'How well do you sleep at night? (1 = very well, 5 = very poorly)',
    'On a scale of 1 to 5, how would you rate your self-esteem and self-confidence, with 1 being the highest and 5 being the lowest?',
    'How often do you experience symptoms of anxiety (1 = very rarely, 5 = very often)?',
    'How would you rate your ability to manage stress and cope with life\'s challenges (1 = very effective, 5 = very ineffective)?',
    'On a scale of 1 to 5, how well can you focus and concentrate on tasks, with 1 being the highest and 5 being the lowest?',
    'How often do you feel socially connected and supported by others (1 = very often, 5 = very rarely)?',
    'On a scale of 1 to 5, how satisfied are you with your relationships, with 1 being the highest and 5 being the lowest?',
    'To what extent do you experience feelings of sadness or depression (1 = very rarely, 5 = very often)?',
    'How often do you experience feelings of anger or irritability (1 = very rarely, 5 = very often)?',
    'On a scale of 1 to 5, how well do you engage in self-care and prioritize your well-being, with 1 being the highest and 5 being the lowest?',
    'How often do you engage in self-destructive behaviors or engage in risky activities (1 = very rarely, 5 = very often)?',
    'On a scale of 1 to 5, how well do you communicate your emotions and feelings to others, with 1 being the highest and 5 being the lowest?',
    'How often do you experience physical symptoms related to stress (e.g., headaches, stomachaches) (1 = very rarely, 5 = very often)?',
    'On a scale of 1 to 5, how well do you manage your daily responsibilities and obligations, with 1 being the highest and 5 being the lowest?',
    'How often do you experience intrusive thoughts or obsessions (1 = very rarely, 5 = very often)?',
    'To what extent do you have a strong support system in place for emotional or mental health issues (1 = very strong, 5 = very weak)?',
    'How open are you to seeking professional help or counseling for your mental health concerns (1 = very open, 5 = very closed)?'];

function generateQuestionCard(questionNumber) {
    const questionForm = document.querySelector('form');

    const questionCard = document.createElement('div');
    questionCard.classList.add('question-card');

    const questionNumbers = document.createElement('div');
    questionNumbers.classList = `question-numbers`;

    const questionChoices = document.createElement('div');
    questionChoices.classList = `question-choices`;

    const choiceText = document.createElement('p');
    choiceText.textContent = `Question #${questionNumber + 1}: ${testQuestions[questionNumber]}`;

    questionCard.appendChild(choiceText);

    for (let i = 1; i <= 5; i++) {
        const choiceNum = document.createElement('p');
        choiceNum.textContent = i;

        questionNumbers.appendChild(choiceNum);
    }

    questionCard.appendChild(questionNumbers);

    for (let i = 1; i <= 5; i++) {
        const choiceNum = document.createElement('p');
        choiceNum.textContent = i;

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.checked = false;
        radioButton.name = `question-${questionNumber}-choice`;
        radioButton.id = `question-${questionNumber}-choice-${i}`;
        radioButton.value = i;

        if (radioButton.value == 1) {
            radioButton.checked = true;
        }

        questionChoices.appendChild(radioButton);
    }

    questionCard.appendChild(questionChoices);
    questionForm.appendChild(questionCard);
}

// Generating 20 questions
for (let i = 0; i < testQuestions.length; i++) {
    // TODO: create custom questions for each card, each question must be related to mental health
    generateQuestionCard(i);
}

// Adding Submit button
// <input type="button" value="Submit" id="submit-button">
const submitButton = document.createElement('input');
submitButton.type = 'button';
submitButton.value = 'Submit';
submitButton.id = 'submit-button';
const questionForm = document.querySelector('form');
questionForm.appendChild(submitButton);

// Adding functions to our button
const submitFormButton = document.querySelector('#submit-button').addEventListener('click', evaluateForm);

function evaluateForm() {
    let totalScore = 0;
    let healthStatus = '';
    let statusPhotoURL = '';
    let healthStatusMessage = '';

    const statusLevels = ['Optimal Mental Health', 'Mild Mental Health Concerns', 'Moderate Mental Health Challenges', 'Severe Mental Health Disorders', 'Mental Health Crisis'];
    const statusMessages = ['A state of psychological well-being characterized by emotional balance, resilience, and the ability to cope with life\'s challenges effectively.',
        'Minor and manageable emotional or psychological issues that may cause occasional distress but do not significantly impair daily functioning.',
        'Intermediate-level psychological difficulties that may impact daily life, requiring some level of intervention or support for effective management.',
        'Serious and often chronic mental health conditions that substantially disrupt a person\'s thoughts, emotions, and behaviors, typically necessitating comprehensive treatment and professional care.',
        'A critical and acute state of emotional or psychological distress that may pose an immediate risk to a person\'s well - being, often requiring urgent intervention and support.'];

    for (let i = 0; i < testQuestions.length; i++) {
        totalScore += getQuestionAnswer(i);
    }


    if (totalScore <= questionsCount) {
        healthStatus = statusLevels[0];
        statusPhotoURL = 'status-photos/levelOne.png';
        healthStatusMessage = statusMessages[0];
    } else if (totalScore > 20 && totalScore <= 40) {
        healthStatus = statusLevels[1];
        statusPhotoURL = 'status-photos/levelTwo.png';
        healthStatusMessage = statusMessages[1];
    } else if (totalScore > 40 && totalScore <= 60) {
        healthStatus = statusLevels[2];
        statusPhotoURL = 'status-photos/levelThree.png';
        healthStatusMessage = statusMessages[2];
    } else if (totalScore > 60 && totalScore <= 80) {
        healthStatus = statusLevels[3];
        statusPhotoURL = 'status-photos/levelFour.png';
        healthStatusMessage = statusMessages[3];
    } else if (totalScore > 80) {
        healthStatus = statusLevels[4];
        statusPhotoURL = 'status-photos/levelFive.png';
        healthStatusMessage = statusMessages[4];
    }

    // Clearing the form before adding results
    const questions = document.querySelector('form');
    questions.innerHTML = '';

    // Adding a container that will tell us our mental health status
    const resultsSection = document.createElement('div');
    resultsSection.className = 'results-section';

    const resultContainer = document.createElement('div');
    resultContainer.className = 'container';

    const score = document.createElement('p');
    score.classList.add('score');
    score.innerText = `${healthStatus}`;

    resultContainer.appendChild(score);

    resultsSection.appendChild(resultContainer);

    // Adding a photo that represents our current health status
    const statusPhoto = document.createElement('img');
    statusPhoto.src = statusPhotoURL;
    statusPhoto.className = 'status-photo';

    resultContainer.appendChild(statusPhoto);

    questions.appendChild(resultsSection);

    // Adding resources container
    const resourcesSection = document.createElement('div');
    resourcesSection.className = 'resources-section';

    const resourcesContainer = document.createElement('div');
    resourcesContainer.className = 'container';

    const resoucesTitle = document.createElement('p');
    resourcesContainer.textContent = `${healthStatusMessage}`;
    resourcesContainer.appendChild(resoucesTitle);

    resourcesSection.appendChild(resourcesContainer);

    questions.appendChild(resourcesSection);
}

function getQuestionAnswer(questionNumber) {
    let qAnswer = [];
    for (let i = 1; i <= 5; i++) {
        qAnswer.push(document.querySelector(`#question-${questionNumber}-choice-${i}`))
    }
    qAnswer = qAnswer.filter((eachChoice) => { return eachChoice.checked === true });
    return Number(qAnswer[0].value);
}