# PLAY.JSON Functional Definition & Examples (v0.8.1)

이 문서는 `PLAY.JSON`에서 사용되는 모든 이벤트 타입(`type`)과 파라미터(`Value01`~`Value05`)의 기능을 정의합니다.

## 1. Functional Definition Table

| Type | 설명 | Value01 | Value02 | Value03 | Value04 | Value05 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **bgcolor** | 배경색 변경 | 색상 코드 (예: `#000000`) | 전환 시간 (초) | - | - | - |
| **onbgimage** | 배경 이미지 출력 | 이미지 경로 | 효과 (`fadein`, `blind`) | 전환 시간 (초) | 레이어 번호 (기본 `1`) | - |
| **offbgimage** | 배경 이미지 제거 | 레이어 번호 | - | 전환 시간 (초) | - | - |
| **oncharacter** | 캐릭터 출력 | 캐릭터 ID (예: `jung`) | 표정/상태 (예: `normal`) | 위치 (`center`, `left`, `right`, `50%`) | 효과 (`fadein`) | 전환 시간 (초) |
| **offcharacter** | 캐릭터 제거 | 캐릭터 ID | - | - | - | 전환 시간 (초) |
| **speak** | 대사 출력 | 캐릭터 ID | 표시 이름 (번역 키) | 대사 내용 (번역 키) | 보이스 파일 경로 | 이름 색상 (옵션) |
| **anieffect** | 애니메이션 효과 | 대상 ID (`all` 또는 캐릭터 ID) | 효과 이름 (`shake` 등) | 지속 시간 (초) | - | - |
| **move** | 캐릭터 이동 | 캐릭터 ID | 이동 목표 위치 (`center`, `left`, `right`) | 이동 시간 (초) | - | - |
| **gifeffect** | GIF 효과 출력 | 캐릭터 ID (대상) | GIF 이미지 경로 | 너비 (px/%) | 높이 (px/%) | 지속 시간 (초) |
| **oncolor** | 화면 오버레이 (색상) | 색상 코드 | 페이드 시간 (초) | 투명도 (`0.5` or `50%`) | - | - |
| **offcolor** | 화면 오버레이 제거 | - | - | - | - | - |
| **onimage** | 화면 오버레이 (이미지) | 이미지 경로 | 크기 (`W,H` 예: `100,100`) - 옵션 | - | - | - |
| **offimage** | 화면 오버레이 제거 | - | - | - | - | - |
| **choice** | 선택지 출력 | 선택지 1 텍스트 | 이동할 Index 1 | 선택지 2 텍스트 (옵션) | 이동할 Index 2 | 스탯 변경 (배열) |
| **quiz01** | 주관식 퀴즈 | 질문 텍스트 | 정답 리스트 (문자열/배열) | 힌트 1 | 힌트 2 | 힌트 3 |
| **title** | 타이틀 출력 (일시적) | 폰트 패밀리 (옵션) | 폰트 크기 (기본 `48`) | 텍스트 색상 | 타이틀 텍스트 | - |
| **ontitle** | 타이틀 출력 (유지) | 폰트 패밀리 (옵션) | 폰트 크기 | 텍스트 색상 | 타이틀 텍스트 | - |
| **offtitle** | 타이틀 제거 | - | - | - | - | - |
| **onbgm** | 배경음 재생 | 오디오 파일 경로 | 루프 여부 (`loop`) | 시작 지연 (초) | - | - |
| **offbgm** | 배경음 정지 | 오디오 타입 (`bgm`) | - | - | - | - |
| **jump** | 특정 인덱스로 이동 | 이동할 Index | - | - | - | - |
| **Wait** | 대기 | 대기 시간 (초) | - | - | - | - |
| **next** | 다음 챕터/이벤트 연결 | 다음 JSON 파일 경로 (미구현 가능성 있음) | - | - | - | - |
| **end** | 챕터/게임 종료 | - | - | - | - | - |

---

## 2. Examples per Type

### 1. 배경 및 연출 (Background & Effects)

**bgcolor** (배경색 변경)
```json
{
    "Index": 100,
    "type": "bgcolor",
    "Value01": "#000000",
    "Value02": 2.0
}
```

**onbgimage** (배경 이미지 페이드인)
```json
{
    "Index": 110,
    "type": "onbgimage",
    "Value01": "assets/images/bg/bg_room.jpg",
    "Value02": "fadein",
    "Value03": 2.0,
    "Value04": 1
}
```

**offbgimage** (배경 이미지 제거)
```json
{
    "Index": 120,
    "type": "offbgimage",
    "Value01": 1,
    "Value03": 1.5
}
```

**oncolor** (붉은색 점멸 효과 등)
```json
{
    "Index": 170,
    "type": "oncolor",
    "Value01": "#FF0000",
    "Value02": 0.2,
    "Value03": "30%"
}
```

**offcolor** (오버레이 색상 제거)
```json
{
    "Index": 180,
    "type": "offcolor"
}
```

### 2. 캐릭터 (Character)

**oncharacter** (캐릭터 등장)
```json
{
    "Index": 130,
    "type": "oncharacter",
    "Value01": "jung",
    "Value02": "normal",
    "Value03": "center",
    "Value04": "fadein",
    "Value05": 1.0
}
```

**move** (캐릭터 이동)
```json
{
    "Index": 135,
    "type": "move",
    "Value01": "jung",
    "Value02": "left",
    "Value03": 1.0
}
```

**anieffect** (캐릭터 흔들림 효과)
```json
{
    "Index": 160,
    "type": "anieffect",
    "Value01": "jung",
    "Value02": "shake",
    "Value03": 0.5
}
```

**offcharacter** (캐릭터 퇴장)
```json
{
    "Index": 190,
    "type": "offcharacter",
    "Value01": "jung",
    "Value05": 0.5
}
```

### 3. 대화 및 텍스트 (Dialogue & Text)

**speak** (대사 출력)
```json
{
    "Index": 140,
    "type": "speak",
    "Value01": "jung",
    "Value02": "정성훈",
    "Value03": "이것은 예제 대사입니다./n줄바꿈도 가능합니다.",
    "Value04": "assets/audio/voice/voice_01.mp3"
}
```

**title** (중간 타이틀 출력 후 자동 사라짐)
```json
{
    "Index": 1000,
    "type": "title",
    "Value01": "Cinzel",
    "Value02": 60,
    "Value03": "#FFFFFF",
    "Value04": "제 1장: 시작"
}
```

### 4. 사운드 (Sound)

**onbgm** (배경음 재생)
```json
{
    "Index": 120,
    "type": "onbgm",
    "Value01": "assets/audio/bgm/main_theme.mp3",
    "Value02": "loop",
    "Value03": 0
}
```

**offbgm** (배경음 정지)
```json
{
    "Index": 125,
    "type": "offbgm",
    "Value01": "bgm"
}
```

### 5. 인터랙션 및 흐름 제어 (Interaction & Flow)

**choice** (선택지)
```json
{
    "Index": 190,
    "type": "choice",
    "Value01": "선택지 1 (Index 1000 이동)",
    "Value02": 1000,
    "Value03": "선택지 2 (Index 2000 이동)",
    "Value04": 2000
}
```

**quiz01** (주관식 퀴즈)
```json
{
    "Index": 1020,
    "type": "quiz01",
    "Value01": "질문 내용입니다.",
    "Value02": ["정답1", "Answer1"],
    "Value03": "첫 번째 힌트",
    "Value04": "두 번째 힌트"
}
```

**jump** (강제 이동)
```json
{
    "Index": 3000,
    "type": "jump",
    "Value01": 100
}
```

**Wait** (대기)
```json
{
    "Index": 3010,
    "type": "Wait",
    "Value01": 2.5
}
```

**end** (종료)
```json
{
    "Index": 9999,
    "type": "end"
}
```

### 6. 기타 오버레이 및 효과

**onimage** (이미지 오버레이)
```json
{
    "Index": 500,
    "type": "onimage",
    "Value01": "assets/images/items/key.png",
    "Value02": "200,200"
}
```

**gifeffect** (GIF 효과)
```json
{
    "Index": 510,
    "type": "gifeffect",
    "Value01": "jung",
    "Value02": "assets/effect/sparkle.gif",
    "Value03": "100px",
    "Value05": 2.0
}
```
