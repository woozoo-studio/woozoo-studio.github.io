# 안재권 · 로봇 SW 개발자

**바다에서는 선박의 항로를, 지금은 로봇의 경로를 다룹니다.**

ROS2 기반 AMR 자율주행과 다중 로봇 교통조정, STM32 제어와 모바일 앱 연동을 경험했습니다.
실제 하드웨어의 동작을 확인하고, 인식·제어·관제를 연결하는 로봇 SW 개발을 지향합니다.

**관심 분야** · 로봇 SW / AMR 자율주행 / 시스템 통합

[![Portfolio](https://img.shields.io/badge/Portfolio-프로젝트_보기-1C2D40?style=for-the-badge)](https://woozoo-studio.github.io/) [![Print](https://img.shields.io/badge/Print-PDF_저장-7D4450?style=for-the-badge)](https://woozoo-studio.github.io/print.html) [![Email](https://img.shields.io/badge/Email-문의하기-365D77?style=for-the-badge)](mailto:woozoo.dev@gmail.com)

## 기술역량

| 분야 | 사용 기술 |
| --- | --- |
| **프로그래밍 언어** | C · C++ · Python |
| **로봇 SW·자율주행** | ROS2 · Nav2 · TF · EKF · Gazebo · Isaac Sim |
| **임베디드·로봇 제어** | STM32 · ESP32 · Raspberry Pi · HAL |
| **비전 AI** | YOLO · OpenCV · Quantization |
| **PLC·자동화 제어** | PLC · HMI · GX Works2 |
| **버전 관리·협업 도구** | Git · GitHub · Jira · Confluence |

## 대표 프로젝트

### AI 융합 다중 로봇 물류

**2026.10.03 — 11.05 · Logiflow · 팀 7명**

여러 대의 AMR과 로봇팔을 연동해 주문·피킹·이송·패킹 공정을 수행하는 물류 자동화 시스템입니다.
AMR 주행·위치추정 검증, KEV-MAPF 교통조정 로직과 FMS 연동을 담당했습니다.

#### AMR 자율주행·검증

- Nav2 기반 주행 기능 구현과 TF·EKF·Behavior Tree 설정 조정
- FMS 경로 관리를 위한 Route Graph 구성
- 정차 위치·방향 반복 측정, 평균·표준편차 계산과 CSV 저장·RViz 표시 도구 구현
- TF의 `map → base_footprint`에서 위치·방향을 읽어 `PoseStamped` 형식의 `logitle_pose` 발행
- Zenoh 브리지 전달 토픽과 FMS 구독 설정을 맞춰 관제 지도에 로봇 위치 연동

#### 다중 로봇 교통조정·시스템 통합

- PBS의 우선순위 개념을 참고한 KEV-MAPF 응용 로직 구현
- KEV의 통과 우선순위·양보·우회 판단을 경로·점유 검사와 연결
- 마주 오는 로봇 중 한 대가 대기하고 다른 한 대가 먼저 통과하는 동작을 실기체에서 확인
- 개별 기능 코드 통합과 FMS 주행·상태 연동
- ESP32에 연결된 리미트 스위치의 MQTT 접촉 메시지를 수신하도록 `mqtt_manager.py`의 구독·JSON 처리 코드 작성
- 도킹 Action 결과와 접촉 신호를 확인해 스테이션별 도킹 완료 상태 반영

**프로젝트 경진대회 대상 · 2026.11.05 수상**<br>
대한상공회의소 서울기술교육센터 · Logiflow 팀

[AMR 저장소](https://github.com/E1I6-Logistics/Logistics_AMR) · [KEV-MAPF 코드](https://github.com/E1I6-Logistics/Logistics_AI/tree/mapf) · [시연 영상](https://youtu.be/zMlgDwmd75g)

## 프로젝트

### 앱 제어 이동형 로봇팔

**2026.07.31 — 08.07 · 팀 5명 · 부팀장**

4륜 이동 플랫폼에 5자유도 로봇팔을 탑재하고, Flutter 앱에서 주행·관절 조작·티칭을 통합 제어하는 모바일 매니퓰레이터입니다.

- Flutter 제어 앱과 모드별 16바이트 Bluetooth 명령 패킷 설계·구현
- PCA9685 기반 6채널 서보 제어와 IMU Yaw 기반 PID 방향 보정
- 프로그램 영역과 분리한 내부 Flash Sector 7에 티칭 시퀀스·설정값 저장 및 복원
- 12개 시퀀스 · 시퀀스당 최대 30 Waypoint 지원

[저장소](https://github.com/sditr0414/mobile-retrieval-robot) · [로봇팔 제어 시연](https://youtu.be/isyhQvfVqWs)

### 비전 AI 트래킹 로봇

**2026.04.29 — 05.07 · 팀 4명**

Raspberry Pi에서 YOLO Pose로 자세를 분석하고, 위험 행동·낙상 의심 상황의 대상을 추적하는 온디바이스 AI 순찰 로봇입니다.

- STM32 HAL 기반 모터·IMU 연동과 PID 방향 제어
- 전진·후진에 따른 좌우 PWM 보정 부호 분리
- 11포인트 인체 Pose와 화재·무기 검출 데이터의 학습 라벨 형식 통합
- YOLO Pose 모델 학습·추론 및 모델 양자화

[저장소](https://github.com/Ugie01/Tracking_Patrol_Robot) · [시연 영상](https://youtu.be/0Xhue5Aivyg)

### PLC 기반 MPS 공정 제어

**2026.05.31 — 06.05 · 팀 2명**

유도형 근접센서로 금속·비금속을 구분해 창고에 적재 및 배출하는 PLC 자동화 시스템입니다.

- 재료 투입·가공·분류·적재·배출 시퀀스 구현
- 비상정지·인터록·자가유지 로직 구현
- 공정 조작·적재 현황·작업 수량을 표시하는 HMI 작화 및 PLC 연동

[공정 소개·시연 영상](https://woozoo-studio.github.io/#project-plc)

## 주요 이력

- **대한상공회의소 서울기술교육센터** · AI융합 로봇SW 개발자 과정 수료 · 2026.04 — 2026.11
- **에이치라인해운** · 2등항해사 · 2021.06 — 2024.02
