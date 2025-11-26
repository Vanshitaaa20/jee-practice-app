export interface Question {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const mockQuestions: Question[] = [
  {
    id: 1,
    subject: "Physics",
    question: "A body of mass 2 kg is moving with a velocity of 10 m/s. What is its kinetic energy?",
    options: [
      "50 J",
      "100 J",
      "200 J",
      "20 J"
    ],
    correctAnswer: 1,
    explanation: "KE = ½mv² = ½ × 2 × 10² = 100 J"
  },
  {
    id: 2,
    subject: "Chemistry",
    question: "What is the molecular formula of benzene?",
    options: [
      "C₆H₁₂",
      "C₆H₆",
      "C₅H₆",
      "C₇H₈"
    ],
    correctAnswer: 1,
    explanation: "Benzene has 6 carbon atoms and 6 hydrogen atoms: C₆H₆"
  },
  {
    id: 3,
    subject: "Mathematics",
    question: "What is the derivative of sin(x)?",
    options: [
      "-cos(x)",
      "cos(x)",
      "tan(x)",
      "-sin(x)"
    ],
    correctAnswer: 1,
    explanation: "The derivative of sin(x) with respect to x is cos(x)"
  },
  {
    id: 4,
    subject: "Physics",
    question: "The SI unit of electric charge is:",
    options: [
      "Ampere",
      "Volt",
      "Coulomb",
      "Ohm"
    ],
    correctAnswer: 2,
    explanation: "The SI unit of electric charge is Coulomb (C)"
  },
  {
    id: 5,
    subject: "Chemistry",
    question: "Which of the following is a noble gas?",
    options: [
      "Nitrogen",
      "Oxygen",
      "Argon",
      "Hydrogen"
    ],
    correctAnswer: 2,
    explanation: "Argon (Ar) is a noble gas in Group 18 of the periodic table"
  },
  {
    id: 6,
    subject: "Mathematics",
    question: "What is the value of log₁₀(100)?",
    options: [
      "1",
      "2",
      "10",
      "100"
    ],
    correctAnswer: 1,
    explanation: "log₁₀(100) = log₁₀(10²) = 2"
  }
];