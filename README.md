# 안재권 | 로봇 SW 포트폴리오

항해사 출신 로봇 SW 개발자 안재권의 포트폴리오 웹사이트입니다.
프로젝트에서 맡은 구현 범위, 문제 해결 과정, 관제 화면과 시연 자료를 정리했습니다.

[웹 포트폴리오](https://woozoo-studio.github.io/) · [인쇄·PDF 미리보기](https://woozoo-studio.github.io/print.html) · [GitHub 프로필](https://github.com/woozoo-studio)

## 프로젝트

| 프로젝트 | 직접 맡은 구현 |
| --- | --- |
| [다중 로봇 물류 자동화](https://woozoo-studio.github.io/#project-featured) | FMS용 경로 그래프와 관제 위치 토픽 구현 · Nav2·EKF 조정 중 |
| [모바일 회수 로봇](https://woozoo-studio.github.io/#project-embedded) | Flutter 제어 앱, Bluetooth 명령 전달, STM32 서보 제어와 내부 Flash 티칭 저장 |
| [비전 기반 순찰 로봇](https://woozoo-studio.github.io/#project-vision) | STM32 모터·IMU 연동과 PID 직진 보정 · YOLO Pose 데이터 준비·학습·추론 최적화 참여 |
| [PLC 기반 MPS 자동화](https://woozoo-studio.github.io/#project-plc) | 가공·배출·적재 시퀀스 및 비상정지·복귀 동작 |

대표 프로젝트는 진행 중입니다. 구현 완료 항목과 조정 중인 항목을 구분해 표시합니다.
프로젝트별 코드와 시연 자료는 웹 포트폴리오에서 연결됩니다.

## 웹·인쇄 구성

- 소개와 지원 분야, 학력·주요 경력
- 기술과 구현 경험
- 대표 프로젝트와 이전 프로젝트
- 문제 해결 사례
- 주요 이력, 자격·어학

인쇄판은 웹의 내용을 읽어 A4 형식으로 구성합니다. 저장소 링크에는 QR 코드를 함께 표시합니다.

## 로컬 실행

별도 패키지 설치 없이 Python 3로 실행할 수 있습니다.

```bash
python3 preview.py
```

- 웹: <http://127.0.0.1:4174/>
- 인쇄: <http://127.0.0.1:4174/print.html>

## 주요 파일

| 파일 | 용도 |
| --- | --- |
| `index.html` | 포트폴리오 내용과 웹 화면 |
| `style.css`, `themes.css`, `web-refinement.css` | 화면 스타일과 반응형 레이아웃 |
| `app.js` | 내비게이션 활성 표시와 화면 동작 |
| `print.html`, `print.css`, `print.js` | 인쇄 미리보기와 PDF 저장 |
| `assets/` | 이미지, 시연 영상, 기관 로고, QR 코드 |
| `preview.py` | 로컬 미리보기 서버 |

백업(`backup/`), 문구 검토 기록(`_workspace/`), 생성 PDF(`output/`)는 Git 관리 대상에서 제외합니다.

## 연락처

[woozoo.dev@gmail.com](mailto:woozoo.dev@gmail.com)

© 2026 안재권. 직접 제작한 콘텐츠의 무단 전재·재배포를 금합니다. 기관 로고와 팀 프로젝트 자료의 권리는 해당 권리자에게 있습니다.
