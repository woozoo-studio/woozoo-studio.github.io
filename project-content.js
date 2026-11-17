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
    implementations: [
      {
        "id": "amr-driving",
        "title": "Nav2 기반 AMR 자율주행",
        "description": "FMS가 전달한 목표와 경유점을 따라 이동하도록 Nav2 주행을 구성했습니다. TF·EKF와 Behavior Tree 설정을 함께 다루고 실기체에서 주행 동작을 확인했습니다.",
        "flow": [
          "목표·경유점 수신",
          "Nav2 경로 생성·추종",
          "위치·방향 갱신",
          "이송·도착 상태 연동"
        ]
      },
      {
        "id": "traffic",
        "title": "다중 로봇 대기·우선 통과",
        "description": "공유 경로에서 로봇의 통과 순서와 대기 행동을 조정하는 KEV-MAPF 응용 로직을 구현했습니다. 실기체 시연에서는 마주 오는 두 로봇 중 한 대가 대기하고 다른 한 대가 먼저 통과하는 동작을 확인했습니다.",
        "flow": [
          "공유 구간 확인",
          "KEV 우선순위·행동 판단",
          "경로·점유 조건 검사",
          "대기·통과 실행"
        ],
        "media": "traffic"
      },
      {
        "id": "position-publishing",
        "title": "로봇 위치 발행·관제 지도 연동",
        "description": "지도 기준 로봇의 위치·방향을 PoseStamped 토픽으로 발행하고, Zenoh 브리지를 거쳐 FMS 지도에 반영하도록 연결했습니다.",
        "images": [
          {
            "src": "assets/fms-dashboard-final.png",
            "alt": "주문과 로봇 위치·상태를 표시하는 FMS 관제 화면",
            "caption": "FMS 관제 화면 · 주문 생성·로봇 위치·상태 연동"
          }
        ],
        "flow": [
          "TF 위치·방향 조회",
          "logitle_pose 발행",
          "Zenoh 브리지 중계",
          "FMS 구독·지도 표시"
        ]
      },
      {
        "id": "docking",
        "title": "MQTT 도킹 접촉 상태 연동",
        "description": "ESP32에 연결된 리미트 스위치의 접촉 상태를 MQTT로 수신했습니다. 스테이션별 상태를 구분해 관제에 전달하고 도킹 완료 판단에 활용하도록 연동했습니다.",
        "flow": [
          "리미트 스위치 → ESP32",
          "MQTT 접촉 상태 발행",
          "스테이션별 메시지 수신",
          "FMS 도킹 상태 반영"
        ],
        "media": "docking"
      }
    ],
    cases: [
      {
        "id": "tf",
        "navTitle": "관제 위치 표시 끊김",
        "title": "관제 화면에서 로봇 위치가 점프하듯 표시되는 문제",
        "rows": [
          [
            "문제",
            "실제 로봇은 연속적으로 이동했지만, 관제 화면에서는 위치가 한 지점에서 다음 지점으로 점프하듯 표시됐습니다. 관제 위치 갱신이 amcl_pose 메시지 수신 시점에 묶여 있었습니다."
          ],
          [
            "해결 과정",
            "AMCL 메시지 수신과 관제용 위치 발행을 분리했습니다. TF의 map → base_footprint에서 위치·방향을 읽어 타이머 주기로 logitle_pose를 발행하는 ROS2 노드를 작성하고, Zenoh 브리지와 FMS의 전달·구독 설정을 맞췄습니다."
          ],
          [
            "결과",
            "AMCL 메시지 수신을 기다리는 방식에서 벗어나, 로봇별 위치 토픽을 별도 주기로 발행하고 관제 지도에서 구독하도록 연동했습니다."
          ]
        ]
      },
      {
        "id": "waypoint-return",
        "navTitle": "통과한 경유점으로 복귀",
        "title": "이미 통과한 경유점으로 되돌아가는 문제",
        "rows": [
          [
            "문제",
            "NavigateThroughPoses로 전환한 뒤 로봇이 이미 통과한 중간 경유점으로 되돌아가는 왕복 현상이 발생했습니다."
          ],
          [
            "해결 과정",
            "RViz와 Behavior Tree 흐름으로 경유점 통과 판정과 남은 목표 목록 처리를 확인했습니다. 당시 시험에서 RemovePassedGoals 반경을 0.03m에서 0.06m로 조정하고, 경유점 확인은 3Hz·경로 재계산은 1Hz로 나눠 처리했습니다."
          ],
          [
            "결과",
            "수정한 Behavior Tree를 적용한 뒤 실기체에서 해당 왕복 현상이 해소되는 것을 확인했습니다."
          ]
        ]
      },
      {
        "id": "traffic-design",
        "navTitle": "공유 구간의 경로 중첩",
        "title": "공유 구간에서 겹치는 로봇 경로",
        "rows": [
          [
            "문제",
            "여러 로봇의 이동 경로가 공유 구간에서 겹쳐 통과 순서와 대기 위치를 정해야 했습니다. 선택한 행동을 실행할 수 있는지 경로·점유 조건도 함께 확인해야 했습니다."
          ],
          [
            "해결 과정",
            "PBS의 우선순위 개념을 참고해 KEV의 우선순위·행동 판단을 활용했습니다. 실행 전 경로·점유·예약 조건은 코드에서 확인하도록 나누고, 확인한 행동을 FMS의 대기·통과 처리에 연결했습니다."
          ],
          [
            "결과",
            "실기체에서 마주 오는 두 로봇 중 한 대가 대기하고 다른 한 대가 먼저 통과하는 동작을 확인했습니다."
          ]
        ]
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
      ['주행 보정', 'IMU Yaw 기반 PID 직진 보정'],
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
    implementations: [
      {
        "id": "control",
        "title": "Flutter 주행·로봇팔 제어 앱",
        "description": "차량 주행과 관절 조작, 티칭·시퀀스 기능을 Flutter 앱으로 구성했습니다. 사용자의 입력을 Bluetooth 명령으로 전달해 STM32 제어와 연결했습니다.",
        "videos": [
          {
            "title": "차량 조작 화면",
            "src": "assets/mobile-app-demo-01.mp4",
            "caption": ""
          }
        ]
      },
      {
        "id": "servo",
        "title": "PCA9685 기반 6채널 서보 제어",
        "description": "5자유도 로봇팔과 그리퍼의 목표 자세를 6개 서보 채널로 제어했습니다. STM32에서 목표 값을 펄스폭·카운트로 변환하고 I2C로 PCA9685에 전달해 채널별 PWM을 출력했습니다.",
        "servoControl": {
          "hardware": [
            {
              "title": "STM32",
              "src": "assets/mobile-stm32-board.png",
              "description": "목표 각도 → 카운트 계산",
              "output": "I2C"
            },
            {
              "title": "PCA9685",
              "src": "assets/mobile-pca9685-board.png",
              "description": "6채널 · 12비트 PWM 출력",
              "output": "PWM"
            },
            {
              "title": "서보 모터",
              "src": "assets/mobile-servo-motor.png",
              "description": "채널별 목표 위치로 이동"
            }
          ],
          "example": [
            [
              "PWM 주기",
              "20,000 µs"
            ],
            [
              "목표 펄스폭",
              "1,056 µs"
            ],
            [
              "12비트 카운트",
              "216"
            ],
            [
              "출력 설정",
              "채널별 OFF 값"
            ]
          ]
        }
      },
      {
        "id": "teaching",
        "title": "티칭 동작 기록·저장·재생",
        "description": "관절 자세를 순서대로 기록해 시퀀스로 저장하고 다시 불러와 재생하도록 구현했습니다. 내부 Flash에 12개 시퀀스와 시퀀스당 최대 30개 Waypoint, 설정값을 보존하는 구조로 구성했습니다.",
        "videos": [
          {
            "title": "티칭·시퀀스 화면",
            "src": "assets/mobile-app-demo-02.mp4",
            "caption": ""
          }
        ],
        "flow": [
          "관절 자세 기록",
          "티칭 시퀀스 저장",
          "저장 데이터 불러오기",
          "시퀀스 재생"
        ]
      },
      {
        "id": "straight-control",
        "title": "IMU Yaw 기반 PID 직진 보정",
        "description": "주행 중 목표 Yaw와 현재 Yaw의 차이로 좌우 모터 출력을 보정했습니다. 전진·후진 구간에서 진행 방향을 유지하도록 PID 직진 보정을 적용했습니다.",
        "flow": [
          "목표 Yaw 설정",
          "IMU Yaw 측정",
          "PID 보정값 계산",
          "좌우 모터 PWM 반영"
        ]
      }
    ],
    cases: [
      {
        "id": "packet",
        "navTitle": "명령마다 다른 데이터 구조",
        "title": "제어 명령마다 달랐던 데이터 구조",
        "rows": [
          [
            "문제",
            "하나의 Bluetooth 통신 경로로 주행 속도·관절 각도·티칭 명령·설정값을 전달해야 했지만, 명령마다 데이터 구조와 의미가 달랐습니다."
          ],
          [
            "해결 과정",
            "시작·Mode·12바이트 Payload·Checksum·종료로 구성한 고정 16바이트 프레임을 설계했습니다. Mode로 명령 종류를 구분하고, 프레임을 검증한 뒤 각 모드에 맞춰 Payload를 해석하도록 구현했습니다."
          ],
          [
            "결과",
            "앱과 STM32가 같은 프레임 규격으로 명령을 주고받고, 주행·로봇팔·티칭·설정 처리를 구분하는 통신 구조를 마련했습니다."
          ]
        ],
        "packet": {
          "fields": [
            {
              "name": "시작",
              "value": "0xAA",
              "offset": "[0]",
              "size": "1 byte",
              "kind": "boundary"
            },
            {
              "name": "모드",
              "value": "Mode",
              "offset": "[1]",
              "size": "1 byte",
              "kind": "mode"
            },
            {
              "name": "데이터",
              "value": "Data Payload",
              "offset": "[2]–[13]",
              "size": "12 bytes",
              "kind": "payload"
            },
            {
              "name": "검사",
              "value": "Checksum",
              "offset": "[14]",
              "size": "1 byte",
              "kind": "check"
            },
            {
              "name": "종료",
              "value": "0x55",
              "offset": "[15]",
              "size": "1 byte",
              "kind": "boundary"
            }
          ],
          "modes": [
            [
              "Mode 0",
              "차량 주행 · E-STOP · PID"
            ],
            [
              "Mode 1",
              "6채널 로봇팔 · 속도 · Transaction ID"
            ],
            [
              "Mode 2",
              "12개 티칭 시퀀스 · 조회 · 재생 · 저장"
            ],
            [
              "Mode 3",
              "PID 계수 · 서보 3점 보정 · 설정 저장"
            ]
          ]
        }
      },
      {
        "id": "flash",
        "navTitle": "전원 종료 후 티칭 데이터 보존",
        "title": "전원 종료 시 사라지는 티칭 데이터",
        "rows": [
          [
            "문제",
            "티칭 동작과 설정을 RAM에만 두면 전원이 꺼진 뒤에는 유지할 수 없습니다. 전원 재시작 후에도 같은 동작을 불러와 재생할 수 있도록 비휘발성 저장이 필요했습니다."
          ],
          [
            "해결 과정",
            "별도 EEPROM을 추가하는 대신 내부 Flash를 활용했습니다. 512KiB 중 마지막 128KiB인 Sector 7을 데이터용으로 확보하고, 링커의 프로그램 영역을 384KiB로 제한했습니다. 데이터 기록 후 읽기 검증과 부팅 시 복원도 구현했습니다."
          ],
          [
            "결과",
            "프로그램과 저장 데이터 영역을 분리하고, 12개 티칭 시퀀스와 설정값의 저장·불러오기를 구현했습니다. 저장이 완료된 데이터는 전원 재시작 후 다시 사용할 수 있도록 구성했습니다."
          ]
        ],
        "flashEvidence": true
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
    role: 'STM32 주행 제어를 담당하고, 학습 라벨 통합과 YOLO Pose 모델 학습·양자화를 수행했습니다.',
    contributions: [
      ['직진 보정', 'IMU Yaw 기반 PID 직진 보정'],
      ['학습 라벨 통합', '11포인트 인체 Pose와 화재·무기 검출 데이터 형식 통합'],
      ['모델 학습·양자화', 'YOLO Pose 모델 학습·추론 및 INT8 양자화']
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
    implementations: [
      {
        "id": "recognition-control",
        "title": "온디바이스 자세 인식과 주행 명령 연동",
        "description": "Raspberry Pi 5에서 YOLO Pose 기반으로 정상·위험·낙상 의심 상황을 판단하고 대상을 추적하는 시스템입니다. STM32에서는 전달받은 주행 명령을 모터 제어로 연결했습니다.",
        "situations": true,
        "flow": [
          "카메라 영상 입력",
          "Raspberry Pi 인식·추적",
          "STM32 주행 명령 수신",
          "모터 구동"
        ]
      },
      {
        "id": "straight-control",
        "title": "IMU Yaw 기반 PID 직진 보정",
        "description": "목표 방향과 IMU로 측정한 현재 Yaw의 차이를 이용해 좌우 모터 PWM을 보정했습니다. 전진·후진에 맞춰 보정 부호를 구분하고 적분 누적과 모터 출력에 상하한을 적용했습니다.",
        "images": [
          {
            "src": "assets/vision-imu-pid-loop.svg",
            "alt": "목표 Yaw와 현재 Yaw의 차이로 좌우 모터 PWM을 보정하는 PID 피드백 구조",
            "caption": "목표·현재 Yaw 오차를 이용한 PID 직진 보정"
          }
        ]
      },
      {
        "id": "model-quantization",
        "title": "YOLO Pose 모델 학습 및 INT8 양자화",
        "description": "학습 라벨 형식을 통합하고 YOLO Pose 모델 학습·추론과 양자화를 수행했습니다. 원본 모델과 INT8 모델의 용량·추론 성능을 비교했습니다.",
        "quantization": true
      }
    ],
    cases: [
      {
        "id": "labels",
        "navTitle": "검출·Pose 라벨 형식 불일치",
        "title": "인체·객체 데이터의 학습 라벨 형식 불일치",
        "rows": [
          [
            "문제",
            "학습 데이터를 준비할 때 인체 데이터는 11개 키포인트를 사용했지만, 화재·무기 데이터에는 바운딩 박스만 있었습니다. 이 때문에 두 종류를 같은 Pose 학습 형식에 바로 넣을 수 없었습니다."
          ],
          [
            "해결 과정",
            "비인체 바운딩 박스의 중심점을 키포인트 하나로 표현하고, 나머지 10개는 더미 처리해 11포인트 형식으로 맞췄습니다."
          ],
          [
            "결과",
            "인체 Pose와 비인체 검출 라벨을 같은 학습 형식으로 통합했습니다. 비인체 중심점은 실제 자세 정보가 아니라 학습 형식을 맞추기 위한 표현입니다."
          ]
        ]
      },
      {
        "id": "pid",
        "navTitle": "후진 시 직진 보정 오차 증가",
        "title": "후진 시 직진 보정 오차가 커지는 문제",
        "rows": [
          [
            "문제",
            "전진에서는 직진 보정이 정상적으로 작동했지만, 후진에서는 오히려 한쪽으로 치우치며 주행 방향 오차가 커졌습니다."
          ],
          [
            "해결 과정",
            "전진·후진에서 좌우 PWM에 적용하는 PID 보정 부호를 확인하고, 후진 시에는 부호를 반대로 적용했습니다. 목표 Yaw와 IMU Yaw의 오차로 보정값을 계산하고, 적분 누적과 모터 출력에도 상하한을 적용했습니다."
          ],
          [
            "결과",
            "전진·후진에 맞춰 좌우 모터의 보정 방향을 전환하는 직진 보정 로직을 구현했습니다."
          ]
        ]
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
    systemImage: {src: 'assets/plc-control-panel.png', alt: 'PLC 제어반 · CPU 및 입출력 모듈'},
    hmiScreens: [
      { src: 'assets/plc-hmi-servo.png', title: '서보·위치 조작', caption: '원점 복귀 · 위치 티칭 · JOG 제어' },
      { src: 'assets/plc-hmi-equipment.png', title: '공정 조작·현황', caption: '공정 조작 · 적재 현황 · 작업 수량', primary: true },
      { src: 'assets/plc-hmi-manual.png', title: '창고·실린더 수동 조작', caption: '창고 적재 · 실린더 수동 조작' }
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
    implementations: [
      {
        "id": "sequence",
        "title": "재료 투입·가공·분류·창고 적재·배출",
        "description": "유도형 근접센서로 금속·비금속을 구분하고 두 종류 모두 창고에 적재·배출하도록 공정 시퀀스를 구성했습니다. 센서 입력과 공정 단계에 따라 다음 동작으로 이어지도록 PLC 래더를 작성했습니다.",
        "flow": [
          "재료 투입",
          "가공",
          "금속·비금속 판별",
          "창고 적재·배출"
        ]
      },
      {
        "id": "hmi-control",
        "title": "HMI 작화와 PLC 연동",
        "description": "공정 조작, 적재 현황과 작업 수량을 확인하는 HMI 화면을 작성하고 PLC와 연동했습니다. 원점 복귀·위치 티칭·JOG와 창고·실린더 수동 조작 화면도 구성했습니다.",
        "hmi": true
      },
      {
        "id": "emergency-control",
        "title": "비상정지·인터록·자가유지",
        "description": "공정 운전을 유지하는 자가유지와 동작 조건을 제한하는 인터록, 비상정지 로직을 구성했습니다. HMI 조작과 PLC 공정 제어를 연결해 운전·정지 조건을 반영했습니다."
      }
    ],
    cases: []
  }
];
if (typeof module !== 'undefined') module.exports = portfolioProjects;
if (typeof window !== 'undefined') window.PORTFOLIO_PROJECTS = portfolioProjects;
