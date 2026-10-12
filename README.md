# 안재권 · 로봇 SW 개발자

**바다에서는 선박의 항로를, 지금은 로봇의 경로를 다룹니다.**

ROS2 AMR의 경로·관제 연동을 구현하고 Nav2 주행과 EKF 위치추정을 조정하고 있습니다.
로봇 소프트웨어, 자율주행, 시스템 통합 분야를 지향합니다.

[![Portfolio](https://img.shields.io/badge/Portfolio-프로젝트_보기-2457E6?style=for-the-badge)](https://woozoo-studio.github.io/) [![PDF](https://img.shields.io/badge/PDF-인쇄_미리보기-7D4450?style=for-the-badge)](https://woozoo-studio.github.io/print.html) [![Email](https://img.shields.io/badge/Email-문의하기-0B8B80?style=for-the-badge)](mailto:woozoo.dev@gmail.com)

## 기술과 구현 경험

**자율주행·위치추정**

![ROS2](https://img.shields.io/badge/ROS2-2457E6?style=flat-square) ![Nav2](https://img.shields.io/badge/Nav2-2457E6?style=flat-square) ![Gazebo](https://img.shields.io/badge/Gazebo-2457E6?style=flat-square) ![EKF](https://img.shields.io/badge/EKF-2457E6?style=flat-square)

**임베디드·로봇 제어**

![STM32](https://img.shields.io/badge/STM32-0B8B80?style=flat-square) ![C](https://img.shields.io/badge/C-0B8B80?style=flat-square) ![C++](https://img.shields.io/badge/C%2B%2B-0B8B80?style=flat-square) ![HAL](https://img.shields.io/badge/HAL-0B8B80?style=flat-square) ![Flutter](https://img.shields.io/badge/Flutter-0B8B80?style=flat-square) ![Bluetooth](https://img.shields.io/badge/Bluetooth-0B8B80?style=flat-square)

**비전·자동화**

![Python](https://img.shields.io/badge/Python-7654A3?style=flat-square) ![YOLO Pose](https://img.shields.io/badge/YOLO_Pose-7654A3?style=flat-square) ![PLC](https://img.shields.io/badge/PLC-7654A3?style=flat-square)

**협업**

![Git](https://img.shields.io/badge/Git-D87532?style=flat-square) ![GitHub](https://img.shields.io/badge/GitHub-D87532?style=flat-square) ![Jira](https://img.shields.io/badge/Jira-D87532?style=flat-square) ![Confluence](https://img.shields.io/badge/Confluence-D87532?style=flat-square)

## 대표 프로젝트

### 다중 로봇 물류 자동화 · AMR 소프트웨어

**진행 중 · 팀 7명**

FMS가 배차·관제하고, AMR이 물품을 이송하며, OMX 로봇팔이 적재·하역하는 시스템입니다. 저는 AMR 소프트웨어를 맡았습니다.

- **구현 완료:** FMS용 노드·엣지 경로 그래프 작성·전달
- **구현 완료:** TF의 `map → base_footprint` 위치를 관제용 토픽으로 발행하는 ROS2 노드 작성·FMS 연동
- **조정 중:** 실기체 Nav2 주행 파라미터 및 EKF 위치추정 설정

[AMR 저장소](https://github.com/E1I6-Logistics/Logistics_AMR) · [시스템 구성과 담당 내용](https://woozoo-studio.github.io/#project-featured)

## 이전 프로젝트

### 모바일 회수 로봇

Flutter 제어 앱과 Bluetooth 명령 전달, STM32 서보 제어를 구현했습니다.
티칭 데이터는 펌웨어와 분리한 내부 Flash 영역에 저장하며, 12개 시퀀스와 시퀀스당 최대 30 Waypoint를 다룹니다.

[저장소](https://github.com/sditr0414/mobile-retrieval-robot) · [구현 내용](https://woozoo-studio.github.io/#project-embedded)

### 비전 기반 순찰 로봇

STM32 모터·IMU 연동과 PID 직진 보정을 담당했습니다.
이후 YOLO Pose 데이터 준비·학습과 FP16·INT8 추론 최적화에 참여했습니다.

[저장소](https://github.com/Ugie01/Tracking_Patrol_Robot) · [구현 내용](https://woozoo-studio.github.io/#project-vision)

### PLC 기반 MPS 자동화

가공·배출·적재 공정 시퀀스와 비상정지·복귀 동작을 구현했습니다.

[시연 자료](https://woozoo-studio.github.io/#project-plc)

## 주요 이력

- **AI융합 로봇SW 개발자 과정** · 대한상공회의소 서울기술교육센터 · 2026.04–2026.11 · 수강 중
- **에이치라인해운 · 2등 항해사** · 2021.06–2024.02
- **한국해양대학교 · 해상보험전공** · 2021.01 졸업 · 학점 4.08 / 4.5

프로젝트의 구현 범위와 문제 해결 과정은 [웹 포트폴리오](https://woozoo-studio.github.io/)에서 자세히 볼 수 있습니다.

## 포트폴리오 저장소 안내

이 저장소는 웹 포트폴리오와 A4 인쇄 미리보기의 소스입니다.
인쇄판은 웹의 내용을 읽어 구성하며, 저장소 링크에는 QR 코드를 함께 표시합니다.

### 로컬 실행

별도 패키지 설치 없이 Python 3로 실행할 수 있습니다.

```bash
python3 preview.py
```

- 웹: <http://127.0.0.1:4174/>
- 인쇄: <http://127.0.0.1:4174/print.html>

### 주요 파일

| 파일 | 용도 |
| --- | --- |
| `index.html` | 포트폴리오 내용과 웹 화면 |
| `style.css`, `themes.css`, `web-refinement.css` | 화면 스타일과 반응형 레이아웃 |
| `app.js` | 내비게이션 활성 표시와 화면 동작 |
| `print.html`, `print.css`, `print.js` | 인쇄 미리보기와 PDF 저장 |
| `assets/` | 이미지, 시연 영상, 기관 로고, QR 코드 |
| `preview.py` | 로컬 미리보기 서버 |

백업(`backup/`), 문구 검토 기록(`_workspace/`), 생성 PDF(`output/`)는 Git 관리 대상에서 제외합니다.

© 2026 안재권. 직접 제작한 콘텐츠의 무단 전재·재배포를 금합니다. 기관 로고와 팀 프로젝트 자료의 권리는 해당 권리자에게 있습니다.
