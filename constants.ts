
import { Language, LocalizationTable, Scene } from './types';

export const TRANSLATIONS: LocalizationTable = {
  DISCLAIMER_TEXT: {
    KO: "해당 게임은 단편의 짧은 게임이기에 세이브를 지원하지 않습니다. 게임 플레이 시, 창을 닫으면 처음부터 시작해야합니다. 또한 이 작품에서 등장한 모든 이름, 인물, 사건들은 허구입니다. 실존하는 인물, 장소, 건물, 제품과는 일절 관련이 없습니다.",
    EN: "This game is a short story and does not support saving. Closing the window will reset progress. All names, characters, and events are fictional and not related to any real persons or places.",
    JP: "このゲームは短編のためセーブ機能はありません。ブラウザを閉じると最初からになります。また、本作に登場する名前、人物、事件はすべてフィクションです。",
    CN_S: "本游戏为短篇故事，不支持存档。关闭窗口将重置进度。所有名称、人物和事件均为虚构。",
    CN_T: "本遊戲為短篇故事，不支援存檔。關閉窗口將重置進度。所有名稱、人物和事件均為虛構。",
    ES: "Este juego es una historia corta y no admite guardado. Cerrar la ventana reiniciará el progreso. Todos los nombres son ficticios."
  },
  START_GAME: {
    KO: "게임 시작", EN: "START GAME", JP: "ゲーム開始", CN_S: "开始游戏", CN_T: "開始遊戲", ES: "INICIAR"
  },
  OPTIONS: {
    KO: "옵션", EN: "OPTIONS", JP: "オプション", CN_S: "选项", CN_T: "選項", ES: "OPCIONES"
  },
  SCORE: {
    KO: "스코어", EN: "SCORE", JP: "スコア", CN_S: "得分", CN_T: "得分", ES: "PUNTUACIÓN"
  },
  CREDITS: {
    KO: "제작진", EN: "CREDITS", JP: "クレジット", CN_S: "制作人员", CN_T: "製作人員", ES: "CRÉDITOS"
  },
  EXIT: {
    KO: "종료", EN: "EXIT", JP: "終了", CN_S: "退出", CN_T: "退出", ES: "SALIR"
  },
  EXIT_POPUP: {
    KO: "현재 창을 닫고 게임을 종료하시겠습니까?", EN: "Do you want to close the game?", JP: "ゲームを終了しますか？", CN_S: "确定要退出游戏吗？", CN_T: "確定要退出遊戲嗎？", ES: "¿Quieres cerrar el juego?"
  },
  YES: { KO: "예", EN: "YES", JP: "はい", CN_S: "是", CN_T: "是", ES: "SÍ" },
  NO: { KO: "아니오", EN: "NO", JP: "いいえ", CN_S: "否", CN_T: "否", ES: "NO" }
};

export const SCENARIO: Scene[] = [
  {
    id: "START",
    background: "https://picsum.photos/id/101/1920/1080",
    character: "https://picsum.photos/id/64/400/600",
    name: "탐정 L",
    dialogue: "대괴도 AAA가 남긴 유산이라... 루마니아의 고성 어딘가에 숨겨져 있다는 소문이 사실일까?",
    nextId: "S2"
  },
  {
    id: "S2",
    background: "https://picsum.photos/id/101/1920/1080",
    character: "https://picsum.photos/id/64/400/600",
    name: "탐정 L",
    dialogue: "첫 번째 단서는 이곳, 브란 성의 입구에 새겨진 문구에 있어.",
    nextId: "QUIZ1"
  },
  {
    id: "QUIZ1",
    background: "https://picsum.photos/id/101/1920/1080",
    dialogue: "성문의 문양을 보니... 아, 무언가 입력해야 할 것 같아. AAA의 진정한 이름은 무엇인가?",
    quiz: {
      question: "대괴도 AAA의 정체 (힌트: 아르센...)",
      answer: "루팡",
      successId: "SUCCESS1",
      failureId: "FAIL1"
    }
  },
  {
    id: "SUCCESS1",
    background: "https://picsum.photos/id/101/1920/1080",
    name: "탐정 L",
    dialogue: "맞아, 루팡이었지! 성문이 열리고 있어. 이제 안으로 들어가보자.",
    nextId: "END_PROTOTYPE"
  },
  {
    id: "FAIL1",
    background: "https://picsum.photos/id/101/1920/1080",
    name: "탐정 L",
    dialogue: "음... 그건 아닌 것 같아. 다시 한번 신중하게 생각해보자.",
    nextId: "QUIZ1"
  },
  {
    id: "END_PROTOTYPE",
    background: "https://picsum.photos/id/101/1920/1080",
    dialogue: "프로토타입은 여기까지입니다. AAA의 유산은 과연 무엇일까요? 본편에서 확인하세요!",
    nextId: "MENU"
  }
];
