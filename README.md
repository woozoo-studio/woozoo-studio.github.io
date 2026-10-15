# 안재권 · 로봇 SW 개발자

**바다에서는 선박의 항로를, 지금은 로봇의 경로를 다룹니다.**

ROS2 기반 AMR 주행·관제 연동과 STM32 제어, 모바일 앱, 비전 모델을 다뤄왔습니다.
로봇의 주행과 제어를 시스템에 연결하는 개발을 지향합니다.

**관심 분야** · Robot Software / System Integration / AMR 자율주행

[![Portfolio](https://img.shields.io/badge/Portfolio-프로젝트_보기-1C2D40?style=for-the-badge)](https://woozoo-studio.github.io/) [![Print](https://img.shields.io/badge/Print-PDF_저장-7D4450?style=for-the-badge)](https://woozoo-studio.github.io/print.html) [![Email](https://img.shields.io/badge/Email-문의하기-365D77?style=for-the-badge)](mailto:woozoo.dev@gmail.com)

## 기술 역량과 개발 경험

| 분야 | 주요 기술 | 개발 경험 |
| --- | --- | --- |
| **로봇 소프트웨어** | ROS2 · Nav2 · Gazebo · TF · EKF | 노드·토픽·TF를 활용한 로봇·관제 연동, 주행·위치추정 설정 조정과 실기체 시험 |
| **임베디드·통합 제어** | STM32 · C/C++ · HAL · Flutter | 모터·센서·서보 제어와 앱 연동, Bluetooth 통신과 Flash 데이터 저장 |
| **비전 모델·엣지 추론** | Python · YOLO Pose · Raspberry Pi · FP16 · INT8 | 학습 라벨 형식 통합, Pose 모델 학습·추론, 모델 변환·양자화 |
| **산업 자동화** | PLC · HMI · GX Works2 | 공정 순서·비상정지·복귀 로직 구현, HMI 공정 조작·상태 표시 |

**협업 도구** · Git / GitHub / Jira / Confluence

## 진행 중인 프로젝트

### AI 융합 다중 로봇 물류

**2026.09–진행 중 · 팀 7명**

주문에 따라 여러 대의 AMR이 물품을 이송하고, OMX 로봇팔이 적재·하역하는 물류 자동화 시스템입니다.
FMS의 주문·배차·경로 관제와 로봇의 이동·작업을 연결합니다.

#### 1차 · AMR 주행·관제 연동

- **Route Graph 제작** — 그리드 이송 경로의 이동 지점과 연결 관계를 노드·엣지로 구성해 FMS 팀에 전달했습니다.
- **관제용 위치 토픽 발행** — TF의 `map → base_footprint` 변환으로 map 기준의 로봇 위치를 구하고, FMS 관제용 토픽으로 발행했습니다.
- **정차 위치 측정·분석 도구 제작** — 위치·방향을 반복 측정해 평균·표준편차를 계산하고, CSV 저장과 RViz 시각화를 구현했습니다.

현재는 주행 성능 개선을 위한 **Nav2 튜닝**과 위치추정 안정화를 위한 **EKF 설정 조정**을 진행하고 있습니다.

#### 2차 · AI 기반 MAPF 구현·비교 검토

의사결정 모델 **Kev-0.8B 적용을 준비 중**입니다.
다중 로봇 경로 계획(MAPF)을 구현하고, 기존 MAPF 방식과 같은 조건에서 비교해 물류 시스템에 대체·적용할 수 있는지 검토할 계획입니다.

[AMR 저장소](https://github.com/E1I6-Logistics/Logistics_AMR) · [시스템 구성과 담당 업무](https://woozoo-studio.github.io/#project-featured)

## 이전 프로젝트

### 앱 제어 이동형 로봇팔

**RC카 주행부터 로봇팔 티칭까지, 하나로 연결한 모바일 앱 기반 제어 시스템.**

Flutter 제어 앱, Bluetooth 통신 패킷, STM32 서보 제어와 PID 직진 보정을 구현했습니다.
티칭 데이터는 펌웨어와 분리한 내부 Flash에 저장하며, **12개 시퀀스 · 시퀀스당 최대 30 Waypoint**를 지원합니다.

[저장소](https://github.com/sditr0414/mobile-retrieval-robot) · [시연 영상](https://woozoo-studio.github.io/#project-embedded-demo)

### 비전 AI 트래킹 로봇

**STM32 제어와 Raspberry Pi 비전 AI를 연결해 주행과 인식을 함께 구현한 로봇.**

STM32 HAL 기반 모터·IMU 연동과 PID 직진 보정을 담당했습니다.
이후 인체 Pose와 화재·무기 검출 라벨을 11포인트 학습 형식으로 통합하고, YOLO Pose 학습·추론 및 FP16 변환·INT8 양자화에 참여했습니다.

[저장소](https://github.com/Ugie01/Tracking_Patrol_Robot) · [시연 영상](https://www.youtube.com/watch?v=0Xhue5Aivyg)

### PLC 기반 MPS 자동화

**가공·배출·적재 공정과 비상정지·복귀 시퀀스를 구현한 자동화 프로젝트.**

GX Works2로 공정 순서와 비상정지·복귀 로직을 구성하고, HMI로 공정을 조작하고 상태를 확인하도록 구현했습니다.

[공정 소개·시연 영상](https://woozoo-studio.github.io/#project-plc)
