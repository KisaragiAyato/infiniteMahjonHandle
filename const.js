const hai = [
  '一萬','二萬','三萬','四萬','五萬','六萬','七萬','八萬','九萬',
  '一筒','二筒','三筒','四筒','五筒','六筒','七筒','八筒','九筒',
  '一索','二索','三索','四索','五索','六索','七索','八索','九索',
  '東','南','西','北','白','発','中'
  ];
  
  const kaze = [
    '東','南','西','北'
    ];
    
    
const moji = [
    'あ','い','う','え','お',
    'か','き','く','け','こ',
    'さ','し','す','せ','そ',
    'た','ち','つ','て','と',
    'な','に','ぬ','ね','の',
    'は','ひ','ふ','へ','ほ',
    'ま','み','む','め','も',
    'や','ゆ','よ',
    'ら','り','る','れ','ろ',
    'わ',
    'が','ぎ','ぐ','げ','ご',
    'ざ','じ','ず','ぜ','ぞ',
    'だ','ぢ','づ','で','ど',
    'ば','び','ぶ','べ','ぼ'
  ];

let haijouhou = [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0
    ]; //背景色が入る 不明は0
    
    const hain = {
      '一萬':1, '二萬':2, '三萬':3, '四萬':4, '五萬':5, '六萬':6, '七萬':7, '八萬':8, '九萬':9,
      '一筒':11, '二筒':12, '三筒':13, '四筒':14, '五筒':15, '六筒':16, '七筒':17, '八筒':18, '九筒':19,
      '一索':21, '二索':22, '三索':23, '四索':24, '五索':25, '六索':26, '七索':27, '八索':28, '九索':29,
      '東':0, '南':40, '西':50, '北':60,
      '白':70, '発':80, '中':90
      };
