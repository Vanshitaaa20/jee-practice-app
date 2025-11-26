'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { mockQuestions } from '../../lib/questions';

export default function DashboardPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    setShowResults(prev => ({ ...prev, [questionId]: true }));
  };

  const resetQuestion = (questionId: number) => {
    setSelectedAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
    setShowResults(prev => {
      const newResults = { ...prev };
      delete newResults[questionId];
      return newResults;
    });
  };

  const totalQuestions = mockQuestions.length;
  const answeredQuestions = Object.keys(selectedAnswers).length;
  const correctAnswers = Object.entries(selectedAnswers).filter(
    ([id, answer]) => mockQuestions.find(q => q.id === Number(id))?.correctAnswer === answer
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">JEE Mastery</span>
            </div>
            <Link
              href="/"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">{totalQuestions}</div>
              <div className="text-indigo-200 text-sm">Total Questions</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{answeredQuestions}</div>
              <div className="text-indigo-200 text-sm">Attempted</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{correctAnswers}</div>
              <div className="text-indigo-200 text-sm">Correct</div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Practice Questions</h2>
        
        <div className="space-y-6">
          {mockQuestions.map((question) => {
            const userAnswer = selectedAnswers[question.id];
            const showResult = showResults[question.id];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div key={question.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                {/* Question Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full">
                    {question.subject}
                  </span>
                  {showResult && (
                    <button
                      onClick={() => resetQuestion(question.id)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Question Text */}
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Q{question.id}. {question.question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    const isSelected = userAnswer === index;
                    const isCorrectOption = index === question.correctAnswer;
                    
                    let optionClass = "w-full text-left p-4 rounded-lg border-2 transition-all ";
                    
                    if (!showResult) {
                      optionClass += "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50";
                    } else if (isSelected && isCorrect) {
                      optionClass += "border-green-500 bg-green-50";
                    } else if (isSelected && !isCorrect) {
                      optionClass += "border-red-500 bg-red-50";
                    } else if (isCorrectOption) {
                      optionClass += "border-green-500 bg-green-50";
                    } else {
                      optionClass += "border-gray-200 bg-gray-50";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => !showResult && handleAnswerSelect(question.id, index)}
                        disabled={showResult}
                        className={optionClass}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{option}</span>
                          {showResult && isSelected && (
                            isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )
                          )}
                          {showResult && !isSelected && isCorrectOption && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Result and Explanation */}
                {showResult && (
                  <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center mb-2">
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <span className="font-semibold text-green-900">Correct!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-600 mr-2" />
                          <span className="font-semibold text-red-900">Incorrect</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Explanation:</strong> {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}