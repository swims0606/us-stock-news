# US Stock News

미국 주식 뉴스 모니터링 웹 애플리케이션입니다.

## 📝 프로젝트 소개
이 프로젝트는 미국 주식 시장의 주요 뉴스를 실시간으로 모니터링하고 표시하는 웹 애플리케이션입니다. 사용자 친화적인 인터페이스를 통해 주요 주식 관련 뉴스를 쉽게 확인할 수 있습니다.

## ✨ 주요 기능
- 실시간 주식 뉴스 업데이트
- 뉴스 필터링 기능
  - 키워드 기반 검색
  - 카테고리별 필터링
  - 날짜별 정렬
- 반응형 웹 디자인
  - 모바일/태블릿/데스크톱 지원
  - 다크 모드 지원
- 북마크 기능
- 뉴스 공유 기능

## 🛠 기술 스택
- **Frontend**
  - HTML5
  - CSS3 (반응형 디자인)
  - JavaScript (ES6+)
- **라이브러리**
  - Font Awesome (아이콘)
  - Google Fonts

## 📁 프로젝트 구조
```
us-stock-news/
├── index.html          # 메인 HTML 파일
├── css/               
│   └── style.css      # 스타일시트
├── js/
│   └── app.js         # 메인 JavaScript 파일
└── README.md
```

## 🚀 설치 및 실행 방법
1. 저장소를 클론합니다:
```bash
git clone https://github.com/swims0606/us-stock-news.git
```

2. 프로젝트 폴더로 이동합니다:
```bash
cd us-stock-news
```

3. 로컬 서버 실행 (다음 중 하나 선택):
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server
```

4. 웹 브라우저에서 다음 주소로 접속합니다:
- Python 서버: `http://localhost:8000`
- Node.js 서버: `http://localhost:8080`

## 💡 사용 방법
1. 메인 페이지에서 최신 주식 뉴스를 확인할 수 있습니다.
2. 검색창을 통해 특정 키워드나 회사명으로 뉴스를 검색할 수 있습니다.
3. 필터 옵션을 사용하여 원하는 카테고리의 뉴스만 볼 수 있습니다.
4. 북마크 버튼을 클릭하여 관심 있는 뉴스를 저장할 수 있습니다.
5. 공유 버튼을 통해 뉴스를 다른 사람과 공유할 수 있습니다.

## 🤝 기여하기
프로젝트 개선에 기여하고 싶으시다면:
1. 이 저장소를 Fork 합니다.
2. 새로운 Branch를 생성합니다: `git checkout -b feature/기능이름`
3. 변경사항을 커밋합니다: `git commit -m '새로운 기능 추가'`
4. Fork한 저장소에 Push 합니다: `git push origin feature/기능이름`
5. Pull Request를 생성합니다.

## 📝 라이선스
이 프로젝트는 MIT 라이선스 하에 배포됩니다.
