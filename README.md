# 🔊 TTS 스피커 테스트

OpenAI TTS API를 이용한 단순 스피커 출력 테스트.  
텍스트 입력 → 버튼 클릭 → 브라우저 스피커에서 음성 출력.

## 실행 방법

```bash
# 1. 설치
npm install

# 2. OpenAI 키 설정
export OPENAI_API_KEY=sk-...

# 3. 서버 실행
npm start

# 4. 브라우저에서 접속
open http://localhost:3100
```

## 동작 방식

```
브라우저 → POST /tts → Node.js 서버 → OpenAI TTS API → MP3 → 브라우저 스피커
```

- `server.js`: Express 서버, `/tts` 엔드포인트 (OpenAI API 키 보호)
- `public/index.html`: 단일 HTML 페이지 (CSS, JS 포함)
- 디버그 로그: HTTP 상태, 파일 크기, 재생 이벤트 실시간 표시
