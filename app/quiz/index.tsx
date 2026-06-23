import { useAudioPlayer } from "expo-audio";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";

// import all mp3s
const letterA = require("../../assets/sounds/a.mp3");
const letterB = require("../../assets/sounds/b.mp3");
const letterC = require("../../assets/sounds/c.mp3");
const letterD = require("../../assets/sounds/d.mp3");
const letterE = require("../../assets/sounds/e.mp3");
const letterF = require("../../assets/sounds/f.mp3");
const letterG = require("../../assets/sounds/g.mp3");
const letterH = require("../../assets/sounds/h.mp3");
const letterI = require("../../assets/sounds/i.mp3");
const letterJ = require("../../assets/sounds/j.mp3");
const letterK = require("../../assets/sounds/k.mp3");
const letterL = require("../../assets/sounds/l.mp3");
const letterM = require("../../assets/sounds/m.mp3");
const letterN = require("../../assets/sounds/n.mp3");
const letterO = require("../../assets/sounds/o.mp3");
const letterP = require("../../assets/sounds/p.mp3");
const letterQ = require("../../assets/sounds/q.mp3");
const letterR = require("../../assets/sounds/r.mp3");
const letterS = require("../../assets/sounds/s.mp3");
const letterT = require("../../assets/sounds/t.mp3");
const letterU = require("../../assets/sounds/u.mp3");
const letterV = require("../../assets/sounds/v.mp3");
const letterW = require("../../assets/sounds/w.mp3");
const letterX = require("../../assets/sounds/x.mp3");
const letterY = require("../../assets/sounds/y.mp3");
const letterZ = require("../../assets/sounds/z.mp3");

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const QUESTIONS_PER_ROUND = 10;
const OPTIONS_PER_QUESTION = 4;
const ADVANCE_DELAY_MS = 1100;

type Question = {
  answer: string;
  options: string[];
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRound(): Question[] {
  // pick QUESTIONS_PER_ROUND distinct target letters
  const targets = shuffle(LETTERS).slice(0, QUESTIONS_PER_ROUND);
  return targets.map((answer) => {
    const distractors = shuffle(LETTERS.filter((l) => l !== answer)).slice(
      0,
      OPTIONS_PER_QUESTION - 1,
    );
    return { answer, options: shuffle([answer, ...distractors]) };
  });
}

export default function QuizScreen() {
  // one player per letter, mirroring the alphabet screen
  const players: Record<string, ReturnType<typeof useAudioPlayer>> = {
    A: useAudioPlayer(letterA),
    B: useAudioPlayer(letterB),
    C: useAudioPlayer(letterC),
    D: useAudioPlayer(letterD),
    E: useAudioPlayer(letterE),
    F: useAudioPlayer(letterF),
    G: useAudioPlayer(letterG),
    H: useAudioPlayer(letterH),
    I: useAudioPlayer(letterI),
    J: useAudioPlayer(letterJ),
    K: useAudioPlayer(letterK),
    L: useAudioPlayer(letterL),
    M: useAudioPlayer(letterM),
    N: useAudioPlayer(letterN),
    O: useAudioPlayer(letterO),
    P: useAudioPlayer(letterP),
    Q: useAudioPlayer(letterQ),
    R: useAudioPlayer(letterR),
    S: useAudioPlayer(letterS),
    T: useAudioPlayer(letterT),
    U: useAudioPlayer(letterU),
    V: useAudioPlayer(letterV),
    W: useAudioPlayer(letterW),
    X: useAudioPlayer(letterX),
    Y: useAudioPlayer(letterY),
    Z: useAudioPlayer(letterZ),
  };

  const [questions, setQuestions] = useState<Question[]>(buildRound);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const question = questions[current];

  function playLetter(letter: string) {
    const player = players[letter];
    player?.seekTo(0);
    player?.play();
  }

  // auto-play the target sound on each new question
  useEffect(() => {
    if (!finished && question) {
      playLetter(question.answer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, finished]);

  // clear pending timer on unmount
  useEffect(() => () => clearTimer(), []);

  function clearTimer() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }

  function handleSelect(option: string) {
    if (selected) return; // already answered
    setSelected(option);

    const correct = option === question.answer;
    if (correct) {
      setScore((s) => s + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    timer.current = setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, ADVANCE_DELAY_MS);
  }

  function restart() {
    clearTimer();
    setQuestions(buildRound());
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <View className="flex-1 bg-white p-6 justify-center items-center">
        <Text className="text-2xl text-gray-500 mb-2">Terminé !</Text>
        <Text className="text-6xl font-bold text-blue-600 mb-8">
          {score}/{questions.length}
        </Text>
        <Pressable
          onPress={restart}
          className="bg-blue-600 px-10 py-5 rounded-3xl shadow-md mb-4"
        >
          <Text className="text-white text-xl font-semibold text-center">
            Rejouer
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.back()}
          className="px-10 py-4 rounded-3xl"
        >
          <Text className="text-blue-600 text-lg font-semibold text-center">
            Retour à l&apos;accueil
          </Text>
        </Pressable>
      </View>
    );
  }

  function optionClasses(option: string): string {
    const base = "rounded-2xl m-1 p-6 items-center flex-1";
    if (!selected) return `${base} bg-gray-100`;
    if (option === question.answer) return `${base} bg-green-200`;
    if (option === selected) return `${base} bg-red-200`;
    return `${base} bg-gray-100 opacity-50`;
  }

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-center text-gray-400 mb-2">
        Question {current + 1} / {questions.length}
      </Text>
      <Text className="text-center text-gray-400 mb-8">Score : {score}</Text>

      <View className="flex-1 justify-center items-center">
        <Text className="text-xl text-gray-600 mb-6 text-center">
          Quelle lettre entends-tu ?
        </Text>
        <Pressable
          onPress={() => playLetter(question.answer)}
          className="bg-blue-100 px-10 py-5 rounded-3xl shadow-md"
        >
          <Text className="text-blue-700 text-xl font-semibold text-center">
            🔊 Réécouter
          </Text>
        </Pressable>
      </View>

      <View className="mb-6">
        <View className="flex-row">
          {question.options.slice(0, 2).map((option) => (
            <Pressable
              key={option}
              disabled={!!selected}
              onPress={() => handleSelect(option)}
              className={optionClasses(option)}
            >
              <Text className="text-4xl font-bold text-gray-800">{option}</Text>
            </Pressable>
          ))}
        </View>
        <View className="flex-row">
          {question.options.slice(2, 4).map((option) => (
            <Pressable
              key={option}
              disabled={!!selected}
              onPress={() => handleSelect(option)}
              className={optionClasses(option)}
            >
              <Text className="text-4xl font-bold text-gray-800">{option}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
