import { useAudioPlayer } from "expo-audio";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

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

export default function AlphabetScreen() {
  // create a player for each sound
  const playerLetterA = useAudioPlayer(letterA);
  const playerLetterB = useAudioPlayer(letterB);
  const playerLetterC = useAudioPlayer(letterC);
  const playerLetterD = useAudioPlayer(letterD);
  const playerLetterE = useAudioPlayer(letterE);
  const playerLetterF = useAudioPlayer(letterF);
  const playerLetterG = useAudioPlayer(letterG);
  const playerLetterH = useAudioPlayer(letterH);
  const playerLetterI = useAudioPlayer(letterI);
  const playerLetterJ = useAudioPlayer(letterJ);
  const playerLetterK = useAudioPlayer(letterK);
  const playerLetterL = useAudioPlayer(letterL);
  const playerLetterM = useAudioPlayer(letterM);
  const playerLetterN = useAudioPlayer(letterN);
  const playerLetterO = useAudioPlayer(letterO);
  const playerLetterP = useAudioPlayer(letterP);
  const playerLetterQ = useAudioPlayer(letterQ);
  const playerLetterR = useAudioPlayer(letterR);
  const playerLetterS = useAudioPlayer(letterS);
  const playerLetterT = useAudioPlayer(letterT);
  const playerLetterU = useAudioPlayer(letterU);
  const playerLetterV = useAudioPlayer(letterV);
  const playerLetterW = useAudioPlayer(letterW);
  const playerLetterX = useAudioPlayer(letterX);
  const playerLetterY = useAudioPlayer(letterY);
  const playerLetterZ = useAudioPlayer(letterZ);

  const alphabet = [
    { letter: "A", phonetic: "a", audio: playerLetterA },
    { letter: "B", phonetic: "bé", audio: playerLetterB },
    { letter: "C", phonetic: "cé", audio: playerLetterC },
    { letter: "D", phonetic: "dé", audio: playerLetterD },
    { letter: "E", phonetic: "eu", audio: playerLetterE },
    { letter: "F", phonetic: "effe", audio: playerLetterF },
    { letter: "G", phonetic: "gé", audio: playerLetterG },
    { letter: "H", phonetic: "ache", audio: playerLetterH },
    { letter: "I", phonetic: "i", audio: playerLetterI },
    { letter: "J", phonetic: "ji", audio: playerLetterJ },
    { letter: "K", phonetic: "ka", audio: playerLetterK },
    { letter: "L", phonetic: "elle", audio: playerLetterL },
    { letter: "M", phonetic: "emme", audio: playerLetterM },
    { letter: "N", phonetic: "enne", audio: playerLetterN },
    { letter: "O", phonetic: "o", audio: playerLetterO },
    { letter: "P", phonetic: "pé", audio: playerLetterP },
    { letter: "Q", phonetic: "ku", audio: playerLetterQ },
    { letter: "R", phonetic: "erre", audio: playerLetterR },
    { letter: "S", phonetic: "esse", audio: playerLetterS },
    { letter: "T", phonetic: "té", audio: playerLetterT },
    { letter: "U", phonetic: "u", audio: playerLetterU },
    { letter: "V", phonetic: "vé", audio: playerLetterV },
    { letter: "W", phonetic: "double vé", audio: playerLetterW },
    { letter: "X", phonetic: "iks", audio: playerLetterX },
    { letter: "Y", phonetic: "i grec", audio: playerLetterY },
    { letter: "Z", phonetic: "zède", audio: playerLetterZ },
  ];

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center mb-4 text-blue-600">
        Alphabet en Français
      </Text>
      <FlatList
        data={alphabet}
        keyExtractor={(item) => item.letter}
        numColumns={2}
        columnWrapperClassName="justify-between"
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-1 bg-gray-100 rounded-2xl m-1 p-4 items-center"
            onPress={() => {
              item.audio?.seekTo(0);
              item.audio?.play();
            }}
          >
            <Text className="text-3xl font-bold text-gray-800">
              {item.letter}
            </Text>
            <Text className="text-lg text-gray-600">{item.phonetic}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
