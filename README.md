# Wordle Solver

This project is a React application designed to assist users in solving the popular word game, Wordle. The application uses an external API to fetch word guesses and provides an interactive interface for users to input clues and receive feedback on their guesses.

## Features

- Interactive input fields for entering Wordle clues.
- Automated word suggestion based on user input.
- Feedback on guesses using color-coded clues (green, yellow, grey).
- Displays a modal with a congratulatory message when the correct word is guessed.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/wordle-solver.git
    ```

2. Navigate to the project directory:

    ```bash
    cd wordle-solver
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the development server:

    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Deployment

The application is deployed and can be accessed at:

[Wordle Solver Application](https://master--wordle-app-0-myapp.netlify.app/)

## Components

### GuessInputs

`GuessInputs` is a component that provides input fields for the user to enter clues for the Wordle guess. It accepts several props and uses state hooks to manage input values and styles.

#### Props

- `currentGuess`: The current word guess.
- `indexNum`: The index number of the input set.
- `lives`: The number of lives remaining.
- `setError`: Function to set the error message.
- `setCurrentGuess`: Function to set the current guess.
- `setLoading`: Function to set the loading state.
- `setSuccess`: Function to set the success state.
- `setLives`: Function to set the lives count.

#### Functions

- `handleClueChange`: Handles changes in the clue input fields.
- `compareGuess`: Compares the user's clue with the current guess and updates styles accordingly.
- `handleSubmit`: Submits the current guess to the API and processes the response.
- `handleKeyUp`: Handles keyboard navigation between input fields.
- `handleCloseModal`: Closes the success modal and triggers a new guess submission if the guess was correct.

### WordleSolver

`WordleSolver` is the main component of the application. It manages the state of the application and renders the `GuessInputs` components.

#### State

- `currentGuess`: The current word guess.
- `loading`: The loading state.
- `error`: The error message.
- `success`: The success state.
- `lives`: The number of lives remaining.

#### Functions

- `fetchInitialGuess`: Fetches the initial guess from the API.
- `handleSubmitBtn`: Handles the form submission and triggers the guess comparison in `GuessInputs`.

## API Integration

The application integrates with an external API to fetch word guesses. The API functions are imported from the `../api/api` module.

- `fetchWordleResult`: Fetches the next word guess based on the user's clues.

## Styles

The application uses basic CSS for styling. The styles are imported from the `../index.css` file.

## Key Design Choices and Implementation

### Design Choices

1. **Component-Based Architecture**: The application is designed using React's component-based architecture. This allows for better separation of concerns and reusability of components. The primary components are `GuessInputs` and `WordleSolver`, each handling specific parts of the application's functionality.

2. **State Management**: State is managed using React's `useState` and `useEffect` hooks. This approach allows for easy tracking of the application's state and reactivity to user inputs and API responses.

3. **User Interaction and Feedback**: The `GuessInputs` component provides an intuitive interface for users to enter their clues. Color-coded feedback (green, yellow, grey) is used to indicate the accuracy of each clue, enhancing the user experience.

4. **API Integration**: The application fetches word guesses from an external API. This integration is crucial for providing real-time word suggestions based on user input. Error handling is implemented to manage failed API requests and inform the user accordingly.

5. **Modular CSS**: Basic styling is applied using CSS, keeping the design simple and clean. The styles are modular and scoped to individual components, preventing global style conflicts.

### Implementation Notes

1. **Forward Refs**: The `GuessInputs` component uses `forwardRef` and `useImperativeHandle` to expose certain functions to the parent component (`WordleSolver`). This allows the parent to trigger functions like `compareGuess` and `handleSubmit` within the child component.

2. **Keyboard Navigation**: The `handleKeyUp` function in `GuessInputs` manages keyboard navigation, allowing users to move between input fields using the Enter and Backspace keys. This enhances the usability of the input fields.

3. **Conditional Rendering**: Conditional rendering is used extensively to manage different states of the application (loading, error, success). This ensures that users are provided with appropriate feedback at each stage of the interaction.

4. **Modals for Success Feedback**: A modal is displayed when the correct word is guessed, providing a clear and engaging success message to the user.
---

This README file provides a comprehensive overview of the Wordle Solver application, including installation instructions, component descriptions, design choices, and implementation details. If you have any questions or need further assistance, please feel free to reach out.
