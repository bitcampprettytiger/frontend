const menuList = [
  {
    id: 1,
    name: '대파라면',
    description: '대파를 많이 넣어 시원한 맛이 나는 라면',
    image: 'https://tinyurl.com/248g4nh2',
    price: 7000,
    category:'면류',
    options: [
      {
        type: 'radio',
        title: '매운맛 단계 선택',
        choices: [
          { name: '기본맛 (신라면 맵기)', price: 0 },
          { name: '더 맵게 (신라면 보다 좀 더 칼칼하게 매운 맛)', price: 0 },
          { name: '순하게 (진라면 순한 맛)', price: 0 },
        ],
      },
      {
        type: 'checkbox',
        title: '추가 토핑 선택',
        choices: [
          { name: '새우 4개 추가', price: 2000 },
          { name: '치즈 추가', price: 500 },
          { name: '트러플 오일 추가', price: 500 },
          { name: '계란 추가', price: 500 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: '짜계치',
    description: '짜파게티 계란 치즈!',
    price: 7000,
    category:'면류',
    image: 'https://tinyurl.com/29zks4ed',
    options: [
      {
        type: 'checkbox',
        title: '기본 옵션',
        choices: [
          { name: '후추 톡톡', price: 0 },
          { name: '송송 썬 대파 추가', price: 0 },
          { name: '치즈 빼주세요', price: 0 },
          { name: '고춧가루 넣어주세요', price: 0 },
        ],
      },
      {
        type: 'multiple',
        title: '추가 토핑 (두 개만 선택 가능)',
        limit: 2,
        choices: [
          { name: '트러플 오일 추가', price: 500 },
          { name: '마늘 칩 추가', price: 500 },
          { name: '계란후라이 추가', price: 500 },
          { name: '치즈 추가', price: 500 },
          { name: '피자치즈 추가', price: 1000 },
        ],
      },
    ],
  },
  {
    id: 3,
    name: '골뱅이소면',
    description: '믿고 먹는 골뱅이 소면',
    price: 9000,
    category:'면류',
    image: 'https://tinyurl.com/24exv9tj',
    options: [],
  },
  {
    id: 4,
    name: '해물파전',
    description: '오징어와 홍합이 잔뜩 들어간 해물 파전',
    price: 13000,
    category:'전류',
    image: 'https://tinyurl.com/24exv9tj',
    options: [],
  },
  {
    id: 5,
    name: '김치전',
    description: '김치와 오징어가 들어가서 맛있는 전',
    price: 12000,
    category:'전류',
    image: 'https://tinyurl.com/24exv9tj',
    options: [],
  },
  {
    id: 6,
    name: '치즈 김치전',
    description: '치즈가 들어가서 더 맛있는 김치전',
    price: 13000,
    category:'전류',
    image: 'https://tinyurl.com/24exv9tj',
    options: [],
  },
];

export default menuList;