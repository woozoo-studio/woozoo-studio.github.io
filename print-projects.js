// Print is edited as a self-contained document, using the same project facts.
window.renderPortfolioProjects = ({sheet, heading, make, add}) => {
  const projects = window.PORTFOLIO_PROJECTS;
  const paragraph = (parent, title, text) => {
    const row = make('div', 'folio-print-row');
    add(row, make('dt', '', title), make('dd', '', text));
    add(parent, row);
  };
  const photo = (src, alt, caption) => {
    const figure = make('figure', 'folio-print-photo');
    const image = make('img');
    image.src = src;
    image.alt = alt;
    add(figure, image, make('figcaption', '', caption));
    return figure;
  };
  const caseBlock = (item, compact = false) => {
    const block = make('section', `folio-print-case${compact ? ' is-compact' : ''}`);
    add(block, make('p', 'kicker', item.label), make('h3', '', item.title));
    const story = make('dl');
    paragraph(story, '문제', item.problem);
    paragraph(story, '판단·구현', item.decision);
    paragraph(story, '확인 결과', item.result);
    add(block, story);
    return block;
  };
  const compact = {
    'logiflow': {
      intro: '여러 AMR과 로봇팔을 연동해 주문·피킹·이송·패킹을 수행하는 물류 자동화 시스템입니다.',
      role: 'AMR 주행·위치추정 검증, KEV 교통조정과 관제 연동을 담당했습니다.',
      implementations: [
        {title:'AMR 주행·관제 위치', image:'assets/print-amr-map-frame.png', note:'관제 지도에서 로봇 위치·경로 표시'},
        {title:'KEV 교통조정', image:'assets/print-traffic-start.png', note:'마주 오는 로봇의 이동 조정'},
        {title:'MQTT 도킹 연동', image:'assets/print-docking-frame-clean.png', note:'스테이션별 도킹 시연 · 접촉 신호 수신·상태 반영'}
      ],
      problem:{title:'관제 화면에서 로봇 위치가 점프하듯 표시되는 문제', rows:[['문제','로봇은 연속적으로 이동했지만, 관제 위치 갱신이 amcl_pose 수신에 묶여 한 지점에서 다음 지점으로 점프하듯 표시됐습니다.'],['판단·구현','TF의 map → base_footprint에서 위치·방향을 읽어 logitle_pose를 발행하는 ROS2 노드를 작성했습니다.'],['확인 결과','관제용 위치 발행을 AMCL 수신과 분리하고, Zenoh·FMS를 통해 로봇별 위치를 지도에 반영했습니다.']]}
    },
    'mobile-manipulator': {
      intro: 'Flutter 앱으로 4륜 이동체와 5자유도 로봇팔을 제어합니다. 티칭 동작과 설정을 내부 Flash에 저장하고 다시 불러오도록 구현했습니다.',
      role:'Flutter 앱·Bluetooth 통신, STM32 제어와 티칭 데이터 저장을 담당했습니다.',
      implementations:[
        {title:'16바이트 명령 패킷',kind:'packet',note:'Mode에 따라 12바이트 데이터 영역을 해석'},
        {title:'로봇팔 서보 제어',kind:'servo',note:'목표 각도를 I2C 명령과 PWM 출력으로 연결'},
        {title:'티칭 데이터 Flash 저장',image:'assets/mobile-flash-build.png',note:'프로그램 영역을 384KiB로 제한해 데이터 저장 영역과 분리'}
      ],
      problem:{title:'전원 종료 후 티칭 데이터 보존 필요',rows:[['요구사항','추가 저장장치 없이 티칭 동작과 설정을 보존해야 했습니다.'],['판단·구현','마지막 Sector 7을 데이터용으로 확보하고, 프로그램 영역은 384KiB로 제한했습니다. 기록 후 읽기 검증과 부팅 시 복원을 구현했습니다.'],['구현 결과','프로그램과 저장 데이터를 분리하고 티칭·설정의 저장·불러오기 구조를 마련했습니다.']]}
    },
    'vision-tracking': {
      intro:'Raspberry Pi의 YOLO Pose 인식과 STM32 주행 제어를 연동한 온디바이스 AI 추적 로봇입니다.',
      role:'STM32 주행 제어, 학습 라벨 통합과 모델 학습·추론·경량화를 담당했습니다.',
      implementations:[
        {title:'YOLO Pose 학습 및 모델 양자화',kind:'quantization',note:''},
        {title:'IMU 기반 PID 방향 제어',image:'assets/vision-imu-pid-loop.svg',note:'목표·현재 Yaw 오차로 좌우 PWM 보정 · 전진·후진 보정 부호 분리'}
      ],
      problem:{title:'후진 시 오히려 더 치우치는 방향 보정',rows:[['문제','같은 좌우 모터 보정 부호를 쓰면 진행 방향에 따라 보정이 반대로 작용할 수 있었습니다.'],['판단·구현','IMU Yaw로 PID 보정값을 계산하고 후진 시 좌우 보정 부호를 반대로 적용했습니다.'],['구현 결과','방향별 보정과 적분 누적·모터 출력 제한을 적용한 제어 로직을 구현했습니다.']]}
    },
    'plc-automation': {
      intro:'유도형 근접센서로 금속·비금속을 구분하고, 재료 투입·가공·창고 적재·배출을 제어하는 MPS 자동화 시스템입니다.',
      role:'공정 시퀀스·비상정지·인터록, HMI 작화와 PLC 연동을 담당했습니다.',
      implementations:[
        {title:'재료 분류·적재·배출',steps:['재료 투입','가공','금속·비금속 판별','창고 적재·배출'],note:'유도형 근접센서 기반 재질 판별'},
        {title:'HMI 공정 조작',screens:[{src:'assets/plc-hmi-equipment.png',title:'공정 조작·현황'},{src:'assets/plc-hmi-manual.png',title:'수동 조작'}],note:'공정 조작·적재 현황·작업 수량 표시 및 PLC 연동'}
      ],
      problem:{title:'안전 조건을 포함한 공정 순서 구성',rows:[['요구사항','센서 입력과 공정 단계에 따라 동작을 연결하고 비상정지 조건을 반영해야 했습니다.'],['판단·구현','래더에 단계별 동작 조건, 비상정지·인터록·자가유지 로직을 구성하고 HMI를 연동했습니다.'],['구현 결과','재료 분류·창고 적재·배출 공정과 비상정지 동작을 구현했습니다.']]}
    }
  };
  compact.logiflow.secondaryProblem = {
    title:'통과한 경유점으로 되돌아가는 문제',
    rows:[['문제','NavigateThroughPoses 전환 후 실기체가 이미 통과한 중간 경유점으로 되돌아갔습니다.'],['판단·구현','RViz와 BT 흐름을 분석하고, 당시 시험에서 RemovePassedGoals 반경을 0.03→0.06m로 조정했습니다. 경유점 확인 3Hz와 경로 재계산 1Hz를 분리했습니다.'],['확인 결과','수정된 BT를 적용한 뒤 실기체에서 왕복 현상이 해소된 것을 확인했습니다.']]
  };
  compact['mobile-manipulator'].secondaryProblem = compact['mobile-manipulator'].problem;
  compact['mobile-manipulator'].problem = {
    title:'제어 명령마다 다른 데이터 구조',
    rows:[['문제','주행·로봇팔·티칭·설정은 필요한 데이터가 달라 공통 통신 형식이 필요했습니다.'],['판단·구현','시작·Mode·12바이트 데이터·Checksum·종료로 이루어진 고정 16바이트 패킷을 설계하고, 모드별로 데이터를 해석했습니다.'],['구현 결과','앱과 STM32가 하나의 프레임 형식으로 명령을 구분해 전달·처리하도록 구현했습니다.']]
  };
  compact['vision-tracking'].secondaryProblem = compact['vision-tracking'].problem;
  compact['vision-tracking'].secondaryProblem.rows[0][1] = '전진 시에는 방향 보정이 정상적으로 작동했지만, 후진 시에는 오히려 한쪽으로 더 치우쳤습니다.';
  compact['vision-tracking'].problem = {
    title:'인체·객체 데이터의 학습 라벨 형식 불일치',
    rows:[['문제','인체 데이터는 11개 키포인트를 사용하지만 화재·무기 데이터는 바운딩 박스만 있어 같은 Pose 학습 형식에 넣을 수 없었습니다.'],['판단·구현','비인체 바운딩 박스의 중심점을 키포인트 하나로 표현하고 나머지 10개를 더미 처리해 11포인트 형식으로 맞췄습니다.'],['구현 결과','인체 Pose와 비인체 검출 라벨을 같은 학습 형식으로 통합했습니다. 비인체 중심점은 형식 호환용입니다.']]
  };
  const roleRows = {
    'logiflow': [['AMR 주행','Nav2 주행·위치추정 설정과 검증'],['교통조정','KEV 기반 대기·통과 로직 구현'],['관제 연동','위치 토픽 발행·MQTT 도킹 상태 처리']],
    'mobile-manipulator': [['앱·통신','Flutter 제어 앱·Bluetooth 패킷 설계'],['로봇팔 제어','PCA9685 기반 서보 제어'],['주행 보정','IMU 기반 PID 방향 보정'],['데이터 저장','Flash 티칭·설정 저장 및 복원']],
    'vision-tracking': [['주행 제어','STM32 모터·IMU 연동과 PID 보정'],['데이터 통합','검출·Pose 학습 라벨 형식 통합'],['모델 학습·추론','YOLO Pose 학습·추론 및 경량화']],
    'plc-automation': [['공정 시퀀스','재료 투입·가공·분류·적재·배출'],['안전 제어','비상정지·인터록·자가유지 구현'],['HMI 작화·연동','공정 조작·적재 현황·작업 수량 표시']]
  };
  const implementationCard = item => {
    const card=make('article','print-implementation-card');
    add(card,make('h4','',item.title));
    if(item.kind==='quantization') {
      const comparison=make('table','print-quant-comparison');
      const head=make('thead'), header=make('tr');
      ['', '원본 모델', 'INT8'].forEach(text=>add(header,make('th','',text)));add(head,header);
      const data=make('tbody');
      [['모델 용량','6.5 MB','1.7 MB'],['추론 성능','8.5 FPS','12.4 FPS']].forEach(([label,before,after])=>{
        const row=make('tr');add(row,make('th','',label),make('td','',before),make('td','is-optimized',after));add(data,row);
      });add(comparison,head,data);
      const results=make('div','print-quant-results');
      add(results,make('span','','용량 약 74% 감소'),make('span','','FPS 약 46% 증가'));
      add(card,comparison,results);
    } else if(item.screens) {
      const gallery=make('div','print-implementation-screens');
      item.screens.forEach(screen=>add(gallery,photo(screen.src,screen.title,screen.title)));
      add(card,gallery);
    } else if(item.image) {
      const frame=make('img','print-implementation-frame');frame.src=item.image;frame.alt=item.title+' 시연 캡처';add(card,frame);
    } else if(item.kind==='packet') {
      const fields=make('div','print-packet-mini');
      [['0xAA','1B'],['Mode','1B'],['Data','12B'],['Check','1B'],['0x55','1B']].forEach(([name,size],i)=>{
        const cell=make('div',i===2?'is-data':'');add(cell,make('strong','',name),make('span','',size));add(fields,cell);
      });add(card,fields);
    } else if(item.kind==='servo') {
      const chain=make('div','print-servo-mini');
      [['assets/mobile-stm32-board.png','STM32'],['assets/mobile-pca9685-board.png','PCA9685'],['assets/mobile-servo-motor.png','서보']].forEach(([src,title])=>{
        const part=make('figure');const image=make('img');image.src=src;image.alt=title;add(part,image,make('figcaption','',title));add(chain,part);
      });add(card,chain);
      add(card,make('p','print-mini-interface','I2C → PWM'));
    } else {
      const diagram=make('ol','print-implementation-flow');item.steps.forEach(step=>add(diagram,make('li','',step)));add(card,diagram);
    }
    if(item.note) add(card,make('p','print-implementation-note',item.note));return card;
  };
  projects.forEach(p => {
    const body = sheet('project', `PROJECT ${p.number} / ${p.fields.join(' · ')}`);
    body.dataset.project = p.id;
    body.classList.add('folio-print-web-overview','print-project-onepage');
    const content=compact[p.id];
    const layout = make('div', 'folio-print-web-layout');
    const copy = make('div', 'folio-print-web-copy');
    add(copy, heading(`${p.number} / ${p.id === 'logiflow' ? '대표 프로젝트' : p.fields.join(' · ')}`, p.title, p.subtitle));
    const tags = make('div', 'folio-print-tags');
    p.tags.forEach(tag => add(tags, make('span', '', tag)));
    add(copy, tags, make('p', 'folio-print-meta', p.meta), make('p', 'folio-print-summary', content.intro));
    const role=make('section','print-role-table');
    add(role,make('h3','','담당 역할'));
    const roleList=make('dl');
    roleRows[p.id].forEach(([label,text])=>paragraph(roleList,label,text));
    add(role,roleList);add(copy,role);
    const media = make('div', 'folio-print-web-media');
    if (p.id === 'mobile-manipulator') {
      add(media, photo('assets/robot.jpeg','4륜 이동 플랫폼과 5자유도 로봇팔','4륜 이동 플랫폼과 5자유도 로봇팔'), photo('assets/mobile-app-joystick-screen.png','Flutter 앱 차량 조작 화면','Flutter 앱 · 차량 조작 화면'));
    } else if (p.id === 'vision-tracking') {
      add(media, photo(p.image,p.imageAlt,'YOLO Pose 기반 자세 인식 화면'));
      const states = make('div', 'folio-print-state-images');
      p.situationScreens.forEach(screen=>add(states,photo(screen.src,screen.title,screen.title+' · '+screen.state)));
      add(media,states);
    } else if (p.id === 'plc-automation') {
      add(media,
        photo('assets/plc.png','MPS 공정 장치 · 재료 투입·가공·적재·배출','MPS 공정 장치 · 재료 투입·가공·적재·배출'),
        photo('assets/plc-control-panel.png','미쓰비시 PLC 제어반의 CPU 및 입출력 모듈','PLC 제어반 · CPU 및 입출력 모듈')
      );
    } else {
      p.stackedScreens.forEach(screen => add(media, photo(screen.src,screen.caption,screen.caption)));
    }
    add(layout, copy, media);
    add(body, layout);
    const implementation=make('section','print-implementation-section');
    add(implementation,make('h3','','주요 구현'));
    const cards=make('div','print-implementation-grid');cards.dataset.count=String(content.implementations.length);
    content.implementations.forEach(item=>add(cards,implementationCard(item)));add(implementation,cards);
    const problem=make('section','print-problem-section');add(problem,make('h3','','문제 해결'));
    const problems=make('div','print-problem-grid');
    const problemItems=[content.problem,content.secondaryProblem].filter(Boolean);
    problems.dataset.count=String(problemItems.length);
    problemItems.forEach(item=>{
      const card=make('article','print-problem-card');add(card,make('h4','',item.title));
      const story=make('dl');item.rows.forEach(([label,text])=>paragraph(story,label,text));add(card,story);add(problems,card);
    });
    add(problem,problems);add(body,implementation);
    if(p.id !== 'plc-automation') add(body,problem);

  });
};
