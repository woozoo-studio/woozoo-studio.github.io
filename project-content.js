/* Shared, evidence-based project copy for the web pages and print edition. */
const portfolioProjects = [
  {
    id: 'logiflow', anchor: 'project-featured', number: '01', title: 'AI 융합 다중 로봇 물류',
    stackedScreens: [
      {src: 'assets/logiflow-system-route-layout.png', caption: '전체 시스템 구성 · 충전·피킹·패킹·재고 보충'},
      {src: 'assets/fms-dashboard-final.png', caption: 'FMS 관제 화면 · 주문 생성·로봇 위치·상태 연동'}
    ],
    subtitle: 'AMR 자율주행부터 교통조정·관제 연동까지',
    meta: '2026.10.03 — 11.05 · Logiflow · 팀 7명',
    award: '2026.11.05 프로젝트 경진대회 대상 · Logiflow 팀',
    awardDetail: '대한상공회의소 서울기술교육센터',
    tags: ['ROS2', 'Nav2', 'C/C++', 'Python', 'KEV', 'MQTT'],
    fields: ['자율주행', '경로 계획', '시스템 통합'],
    image: 'assets/logiflow-system-route-layout.png', imageAlt: '충전·피킹·패킹·재고 보충 스테이션 배치와 대표 이송 경로',
    summary: '여러 대의 AMR과 로봇팔을 연동해 주문·피킹·이송·패킹 공정을 수행하는 물류 자동화 시스템입니다.',
    role: 'AMR 주행·위치추정 검증, KEV-MAPF 교통조정 로직과 FMS 연동을 담당했습니다.',
    contributions: [
      ['AMR 구현·검증', 'Nav2 주행, TF·EKF·Behavior Tree 설정과 정차 위치 반복 측정'],
      ['다중 로봇 교통조정', 'PBS의 우선순위 개념을 참고한 KEV-MAPF 응용 로직 구현'],
      ['주행·관제 연동', '주행 경로·로봇 위치 연동과 MQTT 도킹 접촉 신호 수신·상태 처리']
    ],
    scope: '팀 전체: FMS 주문·배차·관제, AMR 이송, OMX 적재·하역. 본인 담당: AMR 개발과 교통조정·통합. 관제 화면 전체와 OMX 제어는 팀 결과물입니다.',
    proof: '전체 공정 시연 · 대기·우선 통과 실기체 확인 · TF 관제 위치 연동',
    flow: ['FMS 주문·배차', 'AMR 주행·교통조정', 'OMX 적재·하역', '상태·완료 연동'],
    handlingDemos: [
      { title: '적재 시연', src: 'assets/logiflow-loading-demo.mp4', caption: '피킹 스테이션 · 물품 적재' },
      { title: '하역 시연', src: 'assets/logiflow-unloading-demo.mp4', caption: '패킹 스테이션 · 물품 하역' }
    ],
    stationProcess: [
      { number: '1', title: '충전 스테이션', action: '대기·배차', description: '운반 AMR 3대가 대기하고, 주문에 따라 작업을 배정받습니다.', equipment: 'AMR 1–3' },
      { number: '2', title: '피킹 스테이션', action: '적재', description: '로봇팔이 팔레트의 물품을 도착한 운반 AMR에 적재합니다.', equipment: 'OMX 1·2 · 팔레트 P1–P4' },
      { number: '3', title: '패킹 스테이션', action: '하역·인계', description: '운반 AMR이 도킹하면 로봇팔이 물품을 컨베이어로 하역합니다.', equipment: 'OMX 3·4 · 컨베이어 2개' }
    ],
    replenishment: { number: '4', title: '재고 보충', condition: '피킹 팔레트의 재고 부족 시', description: '재고 보충 AMR이 물품을 피킹 스테이션의 팔레트로 운반합니다.', equipment: 'AMR 4 · 팔레트 P1–P4' },
    links: [
      ['AMR 코드', 'https://github.com/E1I6-Logistics/Logistics_AMR'],
      ['KEV-MAPF 코드', 'https://github.com/E1I6-Logistics/Logistics_AI/tree/mapf'],
      ['FMS 코드', 'https://github.com/E1I6-Logistics/Logistics_FMS']
    ],
    demo: { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/zMlgDwmd75g', url: 'https://youtu.be/zMlgDwmd75g', title: 'Logiflow 전체 공정 최종 시연', poster: 'assets/logiflow-system-layout.png', qr: 'assets/qr-amr-scenario.svg' },
    gallery: [
      { src: 'assets/traffic-coordination.gif', alt: '다중 로봇 교통조정 동작', caption: '교통조정 시연 · 마주 오는 로봇의 대기·우선 통과 관찰' },
      { src: 'assets/fms-dashboard-final.png', alt: '지도·주문·로봇 상태를 표시하는 팀 FMS 관제 화면', caption: '팀 FMS 관제 화면 · 본인 기여는 경로·위치·상태 연동' }
    ],
    cases: [
      { id: 'navigation', backgroundLabel: '문제', hidden: true, label: 'Nav2 / 주행 설정', title: '그리드 경로와 벽 근처 주행에 맞춘 설정 검토',
        problem: '직선·직각으로 구성된 그리드 경로에서 실제 주행이 기대와 다르게 나타났고, 벽 근처의 경로에서는 로봇이 버벅이거나 진행하지 못하는 현상이 있었습니다.',
        decision: '전역 경로 생성과 로컬 경로 추종을 구분해 설정을 살폈습니다. 현재 저장소에서는 DWB 대신 RPP 제어기를 사용하며, inflation_radius를 로컬 0.20→0.05m·글로벌 0.10→0.05m로 변경한 기록을 확인할 수 있습니다.',
        result: '환경과 경로에 맞게 제어기·코스트맵 설정을 조정했습니다. 각 변경 뒤 직선·코너 추종과 벽 근처 통과가 얼마나 나아졌는지는 실제 관찰과 비교 자료로 보완합니다.',
        flow: ['그리드 경로', '전역 경로 확인', '로컬 추종·코스트맵', '실기체 동작 확인'],
        request: { id: 'A0', title: '계획 경로와 실제 주행 비교', description: '직선·코너 또는 벽 근처에서 버벅이던 장면과 조정 후 같은 구간을 주행하는 장면. RViz의 Path·코스트맵 화면이 있으면 원인 설명에 함께 사용할 수 있습니다.', format: '같은 구간의 변경 전·후 영상 또는 RViz 화면 2장' }
      },
      { id: 'amr', backgroundLabel: '요구사항', hidden: true, label: 'AMR / 검증', title: '도착 판정과 실제 정차 위치를 함께 확인',
        problem: 'Nav2의 목표 도착 판정만으로 실제 로봇의 정차 위치와 방향을 파악하기 어려워, 반복 측정할 방법이 필요했습니다.',
        decision: '주행 파라미터를 순차적으로 바꾸면서 위치추정·기체·환경 조건도 함께 살폈습니다. TF 위치·방향의 평균과 표준편차를 계산하고 CSV 저장·RViz 표시 도구를 구현했습니다.',
        result: '도착 위치를 반복 기록하고 비교할 수 있는 도구를 마련했습니다. XY Goal Tolerance를 줄이는 것만으로 실제 도착 정확도가 일관되게 높아지지는 않았습니다.',
        request: { id: 'A1', title: '정차 오차 측정 자료', description: '목표점과 실제 정차 위치가 함께 보이는 RViz 화면 또는 현장 사진. 최종 CSV가 있으면 조건별 결과 그래프로 구성할 수 있습니다.', format: '화면 1장 + 측정 조건·횟수 / CSV가 있으면 함께' }
      },
      { id: 'tf', backgroundLabel: '문제', label: 'ROS2 / 관제 연동', title: '관제 화면에서 로봇 위치가 점프하듯 표시되는 문제',
        problem: '실제 로봇은 연속적으로 이동했지만, 관제 화면에서는 위치가 한 지점에서 다음 지점으로 점프하듯 표시됐습니다. 관제용 위치 갱신이 amcl_pose 메시지 수신에 종속되어 있어, 이동 중 위치 변화가 화면에 제때 반영되지 않았습니다.',
        decision: '관제용 위치 발행을 amcl_pose 수신 흐름과 분리했습니다. TF의 map → base_footprint 변환에서 위치·방향을 읽어 PoseStamped 형식의 logitle_pose 토픽으로 발행하는 ROS2 노드를 작성하고, Zenoh 브리지와 FMS의 전달·구독 설정을 맞췄습니다.',
        result: 'AMCL 메시지 수신과 별도로 관제용 위치를 발행하도록 구성했습니다. FMS가 Zenoh 브리지로 중계된 로봇별 /{robot_id}/logitle_pose를 구독해 지도 위치를 갱신하도록 연동했습니다.',
        flow: ['TF 위치·방향 조회', 'logitle_pose 발행', 'Zenoh 브리지 중계', 'FMS 구독·지도 표시']
      },
      { id: 'traffic', backgroundLabel: '요구사항', label: 'KEV-MAPF / 경로 계획', title: '모델의 판단과 실행 전 검증을 나눠 교통조정',
        problem: '여러 AMR의 경로가 공유 구간에서 겹칠 때 통과 순서, 대기 위치와 우회 행동을 조정해야 했습니다.',
        decision: 'PBS의 우선순위 개념을 참고했습니다. KEV 점수로 계획의 우선순위를 정하고, 코드는 충돌 구역과 대기 후보를 검사하며 KEV의 양보 행동·우회 경로 판단을 FMS 실행에 연결했습니다.',
        result: '마주 오는 로봇 중 한 대가 대기하고 다른 한 대가 먼저 통과하는 동작을 실기체에서 확인했습니다. PBS의 우선순위 개념을 참고한 KEV 응용 구현이며, PBS 전체 탐색이나 모델 자체 학습과 구분합니다.',
        flow: ['공유 구간 확인', 'KEV 우선순위·행동', '경로·점유·예약 검사', 'FMS 실행'],
        media: 'traffic', note: '실기체 확인 범위: 마주 오는 로봇의 대기·우선 통과. 우회·세 대 동시 이동의 성공률은 별도로 제시하지 않습니다.'
      },
      { id: 'docking', backgroundLabel: '요구사항', label: 'MQTT / 시스템 통합', title: 'MQTT 도킹 센서 수신 처리와 관제 상태 연동',
        problem: '도킹 스테이션의 리미트 스위치가 ESP32 보드에 연결되어 있었습니다. ESP32에서 MQTT로 발행한 스위치 접촉 상태를 관제에서 수신하고, 스테이션별 도킹 상태에 반영해야 했습니다.',
        decision: 'ESP32에서 발행한 리미트 스위치 접촉 상태를 수신하도록 mqtt_manager.py의 토픽 구독·메시지 처리 코드를 작성했습니다. dock/station/+/status 메시지의 JSON을 해석하고 스테이션 번호와 접촉 상태를 확인해 FMS에 전달했습니다.',
        result: '스테이션별 접촉 상태를 관제에서 활용할 수 있도록 연동했습니다. 도킹 완료 처리에서는 Action 결과와 접촉 신호를 함께 확인하며, 도킹 완료 상태는 실제 전력 충전과 구분합니다.',
        flow: ['리미트 스위치 → ESP32', 'MQTT 접촉 상태 발행', '토픽 구독·수신 처리', 'FMS 도킹 상태 반영'],
        media: 'docking'
      }
    ]
  },
  {
    id: 'mobile-manipulator', anchor: 'project-embedded', number: '02', title: '앱 제어 이동형 로봇팔',
    subtitle: '모바일 명령에서 주행·티칭·데이터 보존까지',
    meta: '2026.07.31 — 08.07 · 팀 5명 · 부팀장',
    tags: ['STM32', 'C/C++', 'HAL', 'Flutter', 'Bluetooth'], fields: ['임베디드·제어', '앱 연동'],
    image: 'assets/mobile-manipulator-system.png', imageAlt: 'STM32 기반 이동형 로봇팔 시스템 구성 · Bluetooth·서보·IMU·구동부 연결',
    stackedScreens: [
      { src: 'assets/robot.jpeg', caption: '4륜 이동 플랫폼과 5자유도 로봇팔' },
      { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/isyhQvfVqWs', caption: 'Flutter 앱 기반 로봇팔 제어 시연' }
    ],
    summaryWork: [
      ['앱·통신', 'Flutter 조작 화면과 16바이트 Bluetooth 명령 패킷'],
      ['로봇팔 제어', 'PCA9685 기반 6채널 서보 제어'],
      ['주행 보정', 'IMU Yaw 기반 PID 방향 보정'],
      ['데이터 저장', '내부 Flash에 티칭 시퀀스·설정값 저장 및 복원']
    ],
    summary: '4륜 이동 플랫폼에 5자유도 로봇팔을 탑재하고, Flutter 앱에서 주행·관절 조작·티칭을 통합 제어하는 모바일 매니퓰레이터입니다. 기록한 동작과 설정을 STM32 내부 Flash에 저장해 전원을 다시 켠 뒤에도 불러와 재생할 수 있도록 구현했습니다.',
    role: 'Flutter 제어 앱, Bluetooth 통신과 STM32 제어·티칭 저장 기능을 담당했습니다.',
    contributions: [
      ['명령과 제어 연결', 'Flutter 앱·Bluetooth 패킷·PCA9685 서보 제어'],
      ['주행 보정', '센서 정보를 활용한 PID 직진 보정'],
      ['티칭 데이터 보존', '내부 Flash에 12개 시퀀스 × 최대 30 Waypoint 저장']
    ],
    scope: '팀 5명의 제작 프로젝트에서 부팀장으로 참여했습니다. 아래에서는 앱·통신·제어·저장 기능에 대한 담당 내용을 설명합니다.',
    proof: '주행·물체 운반 시연 · Flash 저장 구조',
    flow: ['Flutter 앱', 'Bluetooth 명령', 'STM32 제어', '주행·로봇팔 동작'],
    links: [['GitHub 코드', 'https://github.com/sditr0414/mobile-retrieval-robot']],
    demo: { type: 'video', src: 'assets/mobile-manipulator-demo.mp4', url: 'https://woozoo-studio.github.io/#project-embedded-demo', title: '앱 제어 주행·물체 운반 시연', poster: 'assets/robot.jpeg', qr: 'assets/qr-mobile-demo.svg', legacyId: 'project-embedded-demo' },
    gallery: [],
    cases: [
      { id: 'flash', backgroundLabel: '요구사항', label: '메모리 / 데이터 보존', title: '추가 저장장치 없이 티칭 데이터를 보존', flashEvidence: true,
        problem: '전원이 꺼져도 티칭 데이터를 유지해야 했습니다. 별도 EEPROM을 추가하는 방법 외에 보드 내부 Flash를 활용할 수 있는지 검토했습니다.',
        decision: '마지막 128KiB(Sector 7)를 데이터용으로 확보하고 프로그램 영역을 384KiB로 제한했습니다. RAM에 모은 데이터를 Flash에 기록·검증하고 부팅 시 다시 읽도록 구현했습니다.',
        result: '프로그램과 데이터의 저장 영역을 분리하고, 12개 시퀀스와 시퀀스당 최대 30 Waypoint를 저장하는 구조를 구현했습니다.',
        flow: ['RAM 티칭 데이터', 'Flash 기록·검증', '전원 재시작', '데이터 불러오기'],
      },
      { id: 'control', backgroundLabel: '요구사항', label: 'Flutter / 앱 개발', title: '하나의 앱에서 주행·로봇팔·티칭 기능 조작',
        videos: [
          { title: '차량 조작 화면', src: 'assets/mobile-app-demo-01.mp4', caption: '' },
          { title: '티칭·시퀀스 화면', src: 'assets/mobile-app-demo-02.mp4', caption: '' }
        ],
        problem: '이동체 주행과 로봇팔 조작, 티칭 기능을 하나의 모바일 앱에서 사용할 수 있어야 했습니다.',
        decision: 'Flutter로 조작 화면을 개발하고, 사용자의 입력을 모드별 Bluetooth 명령 패킷으로 변환해 STM32에 전달하도록 연결했습니다.',
        result: '차량 조작과 티칭·시퀀스 화면을 구현했습니다. 앱 화면과 하단의 실기체 시연에서 조작 흐름과 실제 동작을 확인할 수 있습니다.'
      },
      { id: 'packet', backgroundLabel: '요구사항', label: 'Bluetooth / 통신 설계', title: '주행·로봇팔·티칭 명령을 16바이트 패킷으로 통합',
        problem: '주행, 로봇팔, 티칭과 설정 명령은 필요한 데이터가 달라, 앱과 STM32가 공통으로 해석할 수 있는 통신 형식이 필요했습니다.',
        decision: '시작 바이트·Mode·12바이트 Payload·Checksum·종료 바이트로 구성한 16바이트 패킷을 설계했습니다. 전체 길이는 고정하고 Payload의 의미를 모드별로 구분했습니다.',
        result: '하나의 프레임 형식으로 차량 주행·비상정지, 6채널 로봇팔, 12개 티칭 시퀀스와 설정 명령을 구분해 전달하도록 구성했습니다.',
        packet: {
          fields: [
            { name: '시작', value: '0xAA', offset: '[0]', size: '1 byte', kind: 'boundary' },
            { name: '모드', value: 'Mode', offset: '[1]', size: '1 byte', kind: 'mode' },
            { name: '데이터', value: 'Data Payload', offset: '[2]–[13]', size: '12 bytes', kind: 'payload' },
            { name: '검사', value: 'Checksum', offset: '[14]', size: '1 byte', kind: 'check' },
            { name: '종료', value: '0x55', offset: '[15]', size: '1 byte', kind: 'boundary' }
          ],
          modes: [
            ['Mode 0', '차량 주행 · E-STOP · PID'],
            ['Mode 1', '6채널 로봇팔 · 속도 · Transaction ID'],
            ['Mode 2', '12개 티칭 시퀀스 · 조회 · 재생 · 저장'],
            ['Mode 3', 'PID 계수 · 서보 3점 보정 · 설정 저장']
          ]
        }
      },
      { id: 'servo', backgroundLabel: '요구사항', label: 'I2C / 서보 제어', title: 'PCA9685로 6채널 서보의 PWM 출력 제어',
        problem: '로봇팔의 여러 서보를 같은 주기로 동작시키면서 각 관절의 목표 위치를 개별적으로 제어해야 했습니다.',
        decision: 'STM32에서 목표 각도를 서보 펄스폭과 12비트 카운트 값으로 변환하고, I2C로 PCA9685의 채널별 레지스터에 기록했습니다. PCA9685가 50Hz PWM 신호를 출력하도록 구성했습니다.',
        result: 'STM32의 타이머 채널 사용을 줄이면서 6개 서보의 펄스폭을 개별 설정했습니다. 로봇팔의 목표 위치 처리와 하드웨어 PWM 출력 코드도 분리했습니다.',
        servoControl: {
          hardware: [
            { title: 'STM32', src: 'assets/mobile-stm32-board.png', description: '목표 각도 → 카운트 계산', output: 'I2C' },
            { title: 'PCA9685', src: 'assets/mobile-pca9685-board.png', description: '6채널 · 12비트 PWM 출력', output: 'PWM' },
            { title: '서보 모터', src: 'assets/mobile-servo-motor.png', description: '채널별 목표 위치로 이동' }
          ],
          example: [ ['목표 각도', '50°'], ['펄스폭', '1,056 µs'], ['12비트 카운트', '216'], ['I2C 기록', '채널 2'] ]
        }
      }
    ]
  },
  {
    id: 'vision-tracking', anchor: 'project-vision', number: '03', title: '비전 AI 트래킹 로봇',
    stackedScreens: [
      {src: 'assets/tracking-pose-demo-mosaic.png', caption: 'YOLO Pose 기반 자세 인식 화면'},
      {type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/0Xhue5Aivyg', caption: '온디바이스 AI 순찰·대상 추적 시연'}
    ],
    subtitle: '온디바이스 AI 기반 자세 인식과 대상 추적',
    meta: '2026.04.29 — 05.07 · 팀 4명',
    tags: ['Python', 'YOLO', 'Quantization', 'STM32', 'Raspberry Pi', 'PID'], fields: ['비전 AI', '임베디드·제어'],
    image: 'assets/tracking-pose-demo-mosaic.png', imageAlt: 'YOLO Pose 기반 인식 화면',
    summary: '라즈베리파이에서 영상 인식과 상황 판단을 수행하는 온디바이스 AI 순찰 로봇입니다. YOLO Pose로 사람의 자세를 분석해 위험 행동·낙상 의심 상황의 대상을 선정하고, STM32 보드의 주행 제어와 연동해 추적하도록 구현했습니다.',
    role: 'STM32 주행 제어를 담당하고, Pose 라벨 통합·모델 학습 및 변환에 참여했습니다.',
    contributions: [
      ['직진 보정', 'IMU Yaw 기반 PID 직진 보정'],
      ['학습 라벨 통합', '11포인트 인체 Pose와 화재·무기 검출 데이터 형식 통합'],
      ['모델 학습·추론', 'YOLO Pose 모델 학습·추론 및 변환·양자화 참여']
    ],
    proof: 'Pose 인식 화면 · 주행·인식 시연 · 라벨 변환·제어 로직',
    flow: ['카메라 입력', 'Raspberry Pi 인식', 'STM32 모터·IMU', '주행 제어'],
    links: [['GitHub 코드', 'https://github.com/Ugie01/Tracking_Patrol_Robot']],
    demo: { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/0Xhue5Aivyg', url: 'https://youtu.be/0Xhue5Aivyg', title: '비전 AI 트래킹 로봇 시연', poster: 'assets/tracking-pose-demo-mosaic.png', qr: 'assets/qr-vision-demo.svg' },
    situationScreens: [
      {src: 'assets/tracking-normal-mosaic.png', title: '정상', state: 'NORMAL'},
      {src: 'assets/tracking-danger-mosaic.png', title: '위험', state: 'ABNORMAL'},
      {src: 'assets/tracking-fall-mosaic.png', title: '낙상', state: 'FALLEN'}
    ],
    gallery: [],
    cases: [
      { id: 'labels', backgroundLabel: '문제', label: '비전 / 학습 데이터', title: '다른 형태의 검출·포즈 라벨을 통합',
        problem: '인체 데이터는 11개 키포인트를 사용하지만 화재·무기 데이터에는 바운딩 박스만 있어, 같은 Pose 학습 형식에 바로 넣을 수 없었습니다.',
        decision: '비인체 객체의 바운딩 박스 중심을 키포인트 하나로 표현하고 나머지 10개를 더미 처리해 11포인트 구조에 맞췄습니다.',
        result: '인체 Pose와 비인체 검출 라벨을 동일한 학습 형식으로 통합했습니다. 비인체 객체의 중심점은 실제 자세가 아닌 형식 호환용 표현입니다.',
        flow: ['인체: 11개 키포인트', '객체: 중심점 + 더미', '공통 라벨 형식', 'YOLO Pose 학습']
      },
      { id: 'pid', backgroundLabel: '문제', label: '임베디드 / 주행 제어', title: '후진 시 직진 보정 오차가 커지는 문제',
        problem: '전진에서는 직진 보정이 정상적으로 작동했지만, 후진에서는 오히려 한쪽으로 치우치며 주행 방향 오차가 커졌습니다.',
        decision: '직진 방향을 유지하기 위해 목표 Yaw와 IMU로 측정한 현재 Yaw의 오차로 PID 보정값을 계산했습니다. 후진 시에는 좌우 모터 PWM 보정 부호를 반대로 적용하고, 적분 누적과 모터 출력에도 상하한을 적용했습니다.',
        result: '전진·후진에 따라 보정 부호를 전환하는 PID 직진 보정 로직을 구현했습니다. 적분 누적·모터 출력 제한도 함께 적용했습니다.',
        request: { id: 'C1', title: '전진·후진 보정 동작 자료', description: '바닥 기준선을 따라 전진·후진하는 장면이나 Yaw·PWM 로그가 있으면 제어 동작을 설명할 수 있습니다. 같은 조건의 보정 전·후 자료가 있으면 더 좋습니다.', format: '짧은 영상 1개 또는 주행 궤적·로그 화면' }
      }
    ]
  },
  {
    id: 'plc-automation', anchor: 'project-plc', number: '04', title: 'PLC 기반 MPS 공정 제어',
    stackedScreens: [
      {src: 'assets/plc.png', caption: 'MPS 공정 장치 · 재료 투입·가공·적재·배출'},
      {src: 'assets/plc-hmi-equipment.png', caption: 'HMI · 공정 조작·적재 현황·작업 수량'}
    ],
    subtitle: '공정 순서와 비상정지·복귀 동작 구성',
    meta: '2026.05.31 — 06.05 · 팀 2명',
    tags: ['PLC Ladder', 'GX Works2', 'HMI'], fields: ['산업 자동화', '공정 제어'],
    image: 'assets/plc.png', imageAlt: 'MPS 자동화 실습 장비와 HMI 제어 화면',
    hmiScreens: [
      { src: 'assets/plc-hmi-servo.png', title: 'Servo Control', caption: '원점 복귀 · 위치 티칭 · JOG 제어' },
      { src: 'assets/plc-hmi-equipment.png', title: 'Equipment Control', caption: '공정 조작 · 적재 현황 · 작업 수량', primary: true },
      { src: 'assets/plc-hmi-manual.png', title: 'Manual Control', caption: '창고 적재 · 실린더 수동 조작' }
    ],
    summary: '유도형 근접센서로 금속·비금속을 구분해 창고에 적재 및 배출하는 PLC 자동화 시스템입니다. 재료 투입·가공·분류·적재·배출 시퀀스와 비상정지 기능을 구현했습니다.',
    role: '재료 투입·가공, 유도형 근접센서를 이용한 금속·비금속 판별, 창고 적재·배출 시퀀스와 비상정지 제어를 구현했습니다.',
    contributions: [
      ['공정 시퀀스 구현', '재료 투입·가공, 금속·비금속 분류 및 적재·배출'],
      ['안전 제어 구현', '비상정지·인터록·자가유지 로직 구현'],
      ['HMI 작화·연동', '공정 조작, 적재 현황·작업 수량을 표시하는 HMI 화면 구성 및 PLC 연동']
    ],
    proof: '실습 장비 · 비상정지 동작 시연',
    flow: ['재료 투입·가공', '금속·비금속 판별', '창고 적재·배출 제어'], links: [],
    demo: { type: 'video', src: 'assets/plc-demo.mp4', url: 'https://woozoo-studio.github.io/#project-plc', title: 'PLC 비상정지 동작 시연', poster: 'assets/plc.png', qr: 'assets/qr-plc.svg' },
    gallery: [],
    cases: [
      { id: 'sequence', backgroundLabel: '요구사항', label: 'PLC / 공정 흐름', title: '공정 순서와 조작·상태 화면 연결',
        problem: '재료를 투입·가공한 뒤 유도형 근접센서로 금속·비금속을 구분하고, 두 종류 모두 창고에 적재하며 배출 동작도 제어해야 했습니다.',
        decision: 'PLC 래더에서 센서 입력과 공정 단계에 따라 동작 조건을 구성하고, 금속·비금속 판별과 창고 적재·배출 시퀀스를 구현했습니다. 비상정지·인터록·자가유지 로직을 적용하고 HMI에서 공정을 조작하고 상태를 확인하도록 구성했습니다.',
        result: '유도형 근접센서 판별에 따른 창고 적재·배출 공정과 비상정지 동작을 구현했습니다.'
      }
    ]
  }
];
if (typeof module !== 'undefined') module.exports = portfolioProjects;
if (typeof window !== 'undefined') window.PORTFOLIO_PROJECTS = portfolioProjects;
