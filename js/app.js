// Main application logic

class StockNewsApp {
    constructor() {
        this.newsListElement = document.getElementById('newsList');
        this.symbolFilter = document.getElementById('symbolFilter');
        this.refreshButton = document.getElementById('refreshButton');
        this.currentTimeElement = document.getElementById('current-time');
        
        this.initializeApp();
    }

    // 앱 초기화
    initializeApp() {
        // 이벤트 리스너 설정
        this.refreshButton.addEventListener('click', () => this.loadNews());
        this.symbolFilter.addEventListener('change', () => this.loadNews());
        
        // 시간 표시 업데이트 시작
        this.startTimeUpdate();
        
        // 초기 뉴스 로드
        this.loadNews();
    }

    // 현재 시간 표시 업데이트
    startTimeUpdate() {
        const updateTime = () => {
            const now = new Date();
            // 한국 시간 표시
            const korTime = now.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
            // 미국 PST 시간 표시
            const pstTime = now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
            this.currentTimeElement.innerHTML = `
                한국: ${korTime}<br>
                PST: ${pstTime}
            `;
        };
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    // RSS 피드 URL 생성
    getNewsUrl(symbol) {
        const baseUrl = 'https://api.allorigins.win/raw?url=';
        if (symbol === 'all') {
            // MarketWatch의 최신 주식 뉴스 RSS 피드 사용
            return baseUrl + encodeURIComponent('http://feeds.marketwatch.com/marketwatch/topstories/');
        }
        return baseUrl + encodeURIComponent(`https://finance.yahoo.com/rss/headline?s=${symbol}`);
    }

    // HTML 태그 제거
    stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    // 텍스트 요약 (첫 100자 + ...)
    summarizeText(text, maxLength = 100) {
        text = this.stripHtml(text);
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    // 뉴스 로드
    async loadNews() {
        try {
            this.newsListElement.innerHTML = '<div class="text-center">뉴스를 불러오는 중...</div>';
            
            const symbol = this.symbolFilter.value;
            const response = await fetch(this.getNewsUrl(symbol));
            
            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }
            
            const xmlText = await response.text();
            
            // XML 파싱
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            // RSS 피드 형식에 따라 item 또는 entry 태그 사용
            const items = xmlDoc.getElementsByTagName('item').length > 0 
                ? xmlDoc.getElementsByTagName('item')
                : xmlDoc.getElementsByTagName('entry');
            
            let newsHTML = '';
            for (let i = 0; i < items.length; i++) {
                const title = items[i].getElementsByTagName('title')[0].textContent;
                const link = items[i].getElementsByTagName('link')[0].textContent;
                const pubDate = new Date(items[i].getElementsByTagName('pubDate')?.[0]?.textContent || 
                                      items[i].getElementsByTagName('published')?.[0]?.textContent || 
                                      new Date().toISOString());
                const description = items[i].getElementsByTagName('description')?.[0]?.textContent || 
                                  items[i].getElementsByTagName('summary')?.[0]?.textContent || 
                                  items[i].getElementsByTagName('content')?.[0]?.textContent || '';
                
                // 뉴스 아이템 HTML 생성
                newsHTML += `
                    <a href="${link}" target="_blank" class="list-group-item list-group-item-action py-3">
                        <div class="d-flex w-100 justify-content-between mb-1">
                            <h6 class="mb-0">${this.summarizeText(title, 80)}</h6>
                            <small class="text-muted ms-2">${pubDate.toLocaleString('ko-KR', {
                                month: 'numeric',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</small>
                        </div>
                        <small class="text-muted d-block">${this.summarizeText(description)}</small>
                    </a>
                `;
            }
            
            if (newsHTML === '') {
                this.newsListElement.innerHTML = '<div class="text-center">뉴스가 없습니다.</div>';
            } else {
                this.newsListElement.innerHTML = newsHTML;
            }
        } catch (error) {
            console.error('Error loading news:', error);
            this.newsListElement.innerHTML = '<div class="text-center text-danger">뉴스를 불러오는데 실패했습니다.<br>잠시 후 다시 시도해주세요.</div>';
        }
    }
}

// 앱 인스턴스 생성
document.addEventListener('DOMContentLoaded', () => {
    new StockNewsApp();
}); 