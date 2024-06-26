import data from "../../data/questions";
import "./Question.style.css";
import useCountdown from "../../hooks/useCountdown";
import { useResult } from "../../context/ResultContext";
import { useEffect } from "react";

const Question = () => {
  const { counter, setCounter, openOptions, nextQuestion, setNextQuestion } =
    useCountdown();
  const { setResult, setScore } = useResult();

  const handleClick = (e) => {
    const userAnswer = e.target.innerHTML;

    if (userAnswer === data[nextQuestion].answer) {
      setScore((prev) => prev + 1);
      setResult((prev) => [
        ...prev,
        {
          question: data[nextQuestion].question,
          answer: userAnswer,
          status: "true",
        },
      ]);
    } else {
      setResult((prev) => [
        ...prev,
        {
          question: data[nextQuestion].question,
          answer: userAnswer,
          status: "false",
        },
      ]);
    }

    setNextQuestion((prev) => prev + 1);
    setCounter(30);
  };

  useEffect(() => {
    if (counter === 0) {
      setResult((prev) => [
        ...prev,
        { question: data[nextQuestion].question, answer: "Boş" },
      ]);
    }
  }, [counter, nextQuestion, setResult]);

  return (
    <div className="questionContainer">
      <div className="countdown">{counter}</div>
      <div>
        <img src={`../../../pictures/${data[nextQuestion].media}`} alt="" />
      </div>
      <div className="question">{data[nextQuestion].question}</div>
      <div className="optionBtns">
        {openOptions &&
          data[nextQuestion].options.map((option) => (
            <button key={option} onClick={handleClick} className="optionBtn">
              {option}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Question;
