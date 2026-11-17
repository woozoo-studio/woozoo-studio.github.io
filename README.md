# 안재권 · 로봇 SW 개발자

ROS2 기반 AMR 자율주행과 관제 연동, STM32 기반 로봇 제어를 개발했습니다.
실제 로봇의 동작을 확인하며 주행·통신·인식을 연결하는 소프트웨어를 구현해왔습니다.

![C/C++](https://img.shields.io/badge/C%2FC%2B%2B-1C2D40?style=flat-square) ![Python](https://img.shields.io/badge/Python-1C2D40?style=flat-square) ![ROS2](https://img.shields.io/badge/ROS2-1C2D40?style=flat-square) ![STM32](https://img.shields.io/badge/STM32-1C2D40?style=flat-square)

[포트폴리오](https://woozoo-studio.github.io/) · [PDF 보기·저장](https://woozoo-studio.github.io/print.html) · [이메일](mailto:woozoo.dev@gmail.com)

## 프로젝트

### AI 융합 다중 로봇 물류

여러 AMR과 로봇팔을 연동해 주문·피킹·이송·패킹 공정을 수행하는 물류 자동화 시스템입니다.

- **자율주행:** Nav2 주행·위치추정 설정 조정, 정차 위치 반복 측정과 분석 도구 구현
- **교통조정:** PBS의 우선순위 개념을 참고한 KEV 기반 교통조정 로직 구현, 실기체에서 대기·우선 통과 확인
- **관제 연동:** TF 기반 위치 토픽 발행, Zenoh 브리지·FMS 연동과 MQTT 도킹 접촉 상태 수신 처리

[AMR 코드](https://github.com/E1I6-Logistics/Logistics_AMR) · [교통조정 코드](https://github.com/E1I6-Logistics/Logistics_AI/tree/mapf) · [시연 영상](https://youtu.be/zMlgDwmd75g)

### 앱 제어 이동형 로봇팔

Flutter 앱으로 4륜 이동체와 5자유도 로봇팔을 조작하고, 동작을 티칭·저장·재생하는 시스템입니다.

- **앱·통신:** Flutter 제어 앱과 주행·로봇팔·티칭 명령을 전달하는 16바이트 Bluetooth 패킷 설계
- **로봇 제어:** PCA9685 기반 6채널 서보 제어와 IMU Yaw 기반 PID 방향 보정
- **데이터 저장:** 내부 Flash에 티칭 시퀀스·설정값을 저장하고 전원 재시작 후 복원

[코드](https://github.com/sditr0414/mobile-retrieval-robot) · [시연 영상](https://youtu.be/isyhQvfVqWs)

### 비전 AI 트래킹 로봇

Raspberry Pi에서 YOLO Pose로 자세를 분석하고, 위험 행동·낙상 의심 상황의 대상을 추적하는 온디바이스 AI 순찰 로봇입니다.

- **주행 제어:** STM32 모터·IMU 연동, 전진·후진에 따른 PID 보정 방향 분리
- **학습 데이터:** 인체 Pose와 화재·무기 검출 데이터를 공통 학습 라벨 형식으로 통합
- **모델 학습·양자화:** YOLO Pose 모델 학습·추론과 INT8 양자화

[코드](https://github.com/Ugie01/Tracking_Patrol_Robot) · [시연 영상](https://youtu.be/0Xhue5Aivyg)

### PLC 기반 MPS 공정 제어

유도형 근접센서로 금속·비금속을 구분하고, 재료 투입부터 창고 적재·배출까지 제어하는 자동화 시스템입니다.

- **공정 제어:** 재료 투입·가공·분류·적재·배출 시퀀스 구현
- **안전 제어:** 비상정지·인터록·자가유지 로직 구현
- **HMI:** 공정 조작·적재 현황·작업 수량 화면 작화 및 PLC 연동

[프로젝트 보기](https://woozoo-studio.github.io/#project-plc)

## 기술 스택

**프로그래밍 언어**

![C](https://img.shields.io/badge/C-365D77?style=flat-square) ![C++](https://img.shields.io/badge/C%2B%2B-365D77?style=flat-square) ![Python](https://img.shields.io/badge/Python-365D77?style=flat-square)

**로봇 SW·자율주행**

![ROS2](https://img.shields.io/badge/ROS2-1C2D40?style=flat-square) ![Nav2](https://img.shields.io/badge/Nav2-1C2D40?style=flat-square) ![TF](https://img.shields.io/badge/TF-1C2D40?style=flat-square) ![EKF](https://img.shields.io/badge/EKF-1C2D40?style=flat-square) ![Gazebo](https://img.shields.io/badge/Gazebo-1C2D40?style=flat-square) ![Isaac Sim](https://img.shields.io/badge/Isaac%20Sim-1C2D40?style=flat-square)

**임베디드·로봇 제어**

![STM32](https://img.shields.io/badge/STM32-365D77?style=flat-square) ![ESP32](https://img.shields.io/badge/ESP32-365D77?style=flat-square) ![Raspberry Pi](https://img.shields.io/badge/Raspberry%20Pi-365D77?style=flat-square) ![HAL](https://img.shields.io/badge/HAL-365D77?style=flat-square)

**비전 AI**

![YOLO](https://img.shields.io/badge/YOLO-7D4450?style=flat-square) ![OpenCV](https://img.shields.io/badge/OpenCV-7D4450?style=flat-square) ![Quantization](https://img.shields.io/badge/Quantization-7D4450?style=flat-square)

**PLC·자동화 제어**

![PLC](https://img.shields.io/badge/PLC-365D77?style=flat-square) ![HMI](https://img.shields.io/badge/HMI-365D77?style=flat-square) ![GX Works2](https://img.shields.io/badge/GX%20Works2-365D77?style=flat-square)

**버전 관리·협업 도구**

![Git](https://img.shields.io/badge/Git-64748B?style=flat-square) ![GitHub](https://img.shields.io/badge/GitHub-64748B?style=flat-square) ![Jira](https://img.shields.io/badge/Jira-64748B?style=flat-square) ![Confluence](https://img.shields.io/badge/Confluence-64748B?style=flat-square)
