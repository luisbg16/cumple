// Pega aquí el código completo que te di en el chat
import React, { useState } from "react";
import "./Cumple.css";

const slides = [
  {
    type: "text",
    badge: "Cargando recuerdos...",
    title: "Entrando al archivo secreto 🌻",
    subtitle: "Procesando fotos tuyas, momentos bonitos y una cantidad irresponsable de ternura.",
  },
  {
    type: "photo",
    image: "/s1.jpg",
    caption: "Empezamos fuerte…",
    small: "Claramente esta selección fue hecha con mucho cariño y cero filtros periodísticos.",
  },
  {
    type: "photo",
    image: "/s2.jpg",
    caption: "No encontré fotos normales tuyas 👍",
    small: "Así que me vi obligado a usar puro material comprometedor y ligeramente adorable.",
  },
  {
    type: "text",
    badge: "Pausa dramática",
    title: "Pero fuera de broma...",
    subtitle: "Entre chiste y chiste, sí quería hacerte algo bonito de verdad.",
  },
  {
    type: "photo",
    image: "/s3.jpeg",
    caption: "Esta me gusta mucho 💛",
    small: "Porque te ves linda, tranquila y con esa vibra que alegra todo sin esfuerzo.",
  },
  {
    type: "final",
    badge: "Fin del recorrido",
    title: "Feliz cumpleaños 🌻",
    subtitle:
      "Gracias por ser tú. Por tu forma de reírte, por tu esencia, y hasta por ese toque tuyo medio insoportable que igual cae bien. 💛",
  },
];

const questions = [
  {
    q: "¿Cómo se llama mi perro? 🐶",
    image: "/q1.jpeg",
    options: ["Azul", "Blu", "Blu demon", "Nunca me cayó bien"],
    correct: 1,
    hint: "Pista: lo has escuchado mil veces",
  },
  {
    q: "¿Dónde fue nuestra primera salida? 🍔",
    image: "/q2.jpeg",
    options: ["Nunca salimos", "No saldría con usted ni loca", "Un lugar que quedaba por el Chilo que ya no está", "Perdí la memoria"],
    correct: 2,
    hint: "Pista: hubo algo chistoso ese día",
  },
  {
    q: "¿Cuál es nuestro primer recuerdo juntos? 👀",
    image: "/q3.jpeg",
    options: ["El bullying que me hacía usted a mí", "El buen gusto musical que tenía usted", "Lo bien que la traté en nuestra cita", "Todas"],
    correct: 2,
    hint: "Pista: si lo sabes, lo sabes",
  },
  {
    q: "¿Quién hacía más bullying? 😌",
    image: "/q4.jpeg",
    options: ["Gissela", "Marina", "Gissela Marina", "Marina Castillo"],
    correct: 0,
    hint: "Pista: aquí ya ganaste",
  },
];

function Cumple() {
  const [started, setStarted] = useState(false);
  const [passedQuiz, setPassedQuiz] = useState(false);
  const [questionStep, setQuestionStep] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);

  const currentQuestion = questions[questionStep];
  const currentSlide = slides[slideIndex];

  const handleAnswer = (index) => {
    if (index === currentQuestion.correct) {
      setFeedback("Correcto 😌");
      setTimeout(() => {
        setFeedback("");
        if (questionStep < questions.length - 1) {
          setQuestionStep(questionStep + 1);
        } else {
          setPassedQuiz(true);
        }
      }, 700);
    } else {
      setFeedback("Mmm… intenta otra vez 👀");
      setTimeout(() => setFeedback(""), 900);
    }
  };

  const nextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  return (
    <div className="page">
      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>
      <div className="bg-circle bg-circle-3"></div>

      {!started ? (
        <div className="card center-card">
          <div className="flower">🌻</div>
          <p className="eyebrow">Sorpresa de cumple</p>
          <h1>No toques esto 😶</h1>
          <p className="subtitle">Para entrar… tienes que demostrar que sí mereces ver esto 😌</p>
          <button className="main-btn" onClick={() => setStarted(true)}>
            Intentar desbloquear
          </button>
        </div>
      ) : !passedQuiz ? (
        <div className="card">
          <p className="pill">Desbloquear sorpresa</p>

          <div className="question-image-wrap">
            <img src={currentQuestion.image} alt="momento" className="question-image" />
          </div>

          <h2>{currentQuestion.q}</h2>
          <p className="hint">{currentQuestion.hint}</p>

          <div className="answers">
            {currentQuestion.options.map((option, index) => (
              <button key={index} className="answer-btn" onClick={() => handleAnswer(index)}>
                {option}
              </button>
            ))}
          </div>

          {feedback && <p className="feedback">{feedback}</p>}
        </div>
      ) : (
        <div className="viewer" onClick={currentSlide.type !== "final" ? nextSlide : undefined}>
          {currentSlide.type === "photo" ? (
            <div className="photo-card">
              <img src={currentSlide.image} alt={currentSlide.caption} className="photo" />
              <div className="photo-text">
                <h2>{currentSlide.caption}</h2>
                <p>{currentSlide.small}</p>
              </div>
            </div>
          ) : currentSlide.type === "final" ? (
            <div className="card">
              <p className="pill">{currentSlide.badge}</p>
              <div className="heart">💛</div>
              <h2>{currentSlide.title}</h2>
              <p className="subtitle">{currentSlide.subtitle}</p>

              <div className="final-actions">
                <button className="secondary-btn" onClick={prevSlide}>
                  Volver
                </button>
                <button className="main-btn" onClick={() => setSlideIndex(0)}>
                  Ver de nuevo
                </button>
              </div>
            </div>
          ) : (
            <div className="card">
              <p className="pill">{currentSlide.badge}</p>
              <h2>{currentSlide.title}</h2>
              <p className="subtitle">{currentSlide.subtitle}</p>
              <p className="tap-text">Toca la pantalla para seguir ✨</p>
            </div>
          )}

          {slideIndex > 0 && currentSlide.type !== "final" && (
            <button
              className="back-floating"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
            >
              Volver un poquito
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Cumple;