function isAgari (arr,moji1 = '現在'){  //[trueかfalse,trueなら理牌した配列]　を返す
  let paisiOrijin = [].concat(arr);
  
  if(paisiOrijin.length != 14){
    return [false,[]];
  }
  
        //同じ牌を5つ以上使ってないか
        for (let k = 0; k < 10; k++) {
          let arr_ = paisiOrijin.filter(element => element == paisiOrijin[k]);
          if (arr_.length >= 5) {
            
            return [false,[]];
          }
        }
  
  if(isKokusi(arr)){
    return [true,rihai(arr)];
　}

  if(isTitoi(arr)){
    return [true,rihai(arr)];
    
  }
  
  let hairetuPatan = patanSyuturyoku(arr);
  if(hairetuPatan == 'toitoi'){
    return [true,rihai(arr)];
    
  }
  if(hairetuPatan.length == 0){
    return [false,[]];
  }
  
  for(let x = 0;x<hairetuPatan.length;x++){
    if(isYakuari(hairetuPatan[x],moji1)){
      return [true,rihai(arr)];
    }
    
  }
  return [false,[]];
}



function rihai(arr){  //順番にする。あがりぱいは最後尾のまま。
  let orijin = [].concat(arr);
  let agaripai = orijin[13];
  orijin.pop();
  orijin.sort(haisort);
  orijin.push(agaripai);
  return orijin;
  
}

function isKokusi(arr){
  let orijin = [].concat(arr);
  let kouho = ['一萬','九萬','一筒','九筒','一索','九索','東','南','西','北','白','発','中'];
  let sousa = [].concat(arr);
  for(let n = 0;n<kouho.length;n++){
    if(sousa.indexOf(kouho[n]) == -1){
      return false;
    }else{
      sousa.splice(sousa.indexOf(kouho[n]),1);
      
    }
    
  }
  if(kouho.indexOf(sousa[0]) != -1 && sousa.length == 1){
    return true;
  }else{
    return false;
    
  }
}

function isTitoi(arr){
  let orijin = [].concat(arr);
  let count = {};
  let key = [];
  for (var i = 0; i < orijin.length; i++) {
    var elm = orijin[i];
    count[elm] = (count[elm] || 0) + 1;
    if(key.indexOf(elm) == -1){
      key.push(elm);
    }
  } //count == {'一萬':2, ...}
  
  if( count[key[0]] == 2 && count[key[1]] == 2 && count[key[2]] == 2 &&
      count[key[3]] == 2 && count[key[4]] == 2 && count[key[5]] == 2 &&
      count[key[6]] == 2 ){
        return true;
      }else{
        return false;
      }
}


function patanSyuturyoku(arr){  
  //5ブロック順にして返す。
  //あがりパイを示すため、最後に1要素増やす。
  //[[1じゃんとう4ブロックあがりぱい],[...],...]
  //といといならreturn'toitoi'
  let orijin = [].concat(arr);
  let henkan = []; //orijin の内容そのままで数字に
  let agaripai = hain[orijin[13]];
  let count = {};
  let key = [];
  let nimaiijou = [];  //じゃんとう候補
  let sanmaiijou = [];  //あんこ候補
  let syuturyoku = [];
  for (var i = 0; i < orijin.length; i++) {
    var elm = orijin[i];
    elm = hain[elm];  //数字にへんかん
    henkan.push(elm);
    count[elm] = (count[elm] || 0) + 1;
    if(key.indexOf(elm) == -1){
      key.push(elm);
    }
  } // count=={12:1,13:1,14:1 ...}
  
  for (var i = 0; i < key.length; i++) {
    if(count[key[i]] >= 2){
      nimaiijou.push(key[i]);
    }
    if (count[key[i]] >= 3) {
      sanmaiijou.push(key[i]);
    }
  }
  
  for(let n = 0;n <nimaiijou.length;n++){
    let jantou = [nimaiijou[n],nimaiijou[n]];
    let brock1 = [];
    let brock2 = [];
    let brock3 = [];
    let brock4 = [];
    let nokoriorijin = [].concat(henkan);
    nokoriorijin.splice(nokoriorijin.indexOf(nimaiijou[n]),1);
    nokoriorijin.splice(nokoriorijin.indexOf(nimaiijou[n]),1);
    nokoriorijin.sort(function(a, b) {return a - b});
    let sanmaiijounokori = [].concat(sanmaiijou);
    if(sanmaiijounokori.indexOf(nimaiijou[n]) != -1){
      sanmaiijounokori.splice(sanmaiijounokori.indexOf(nimaiijou[n]),1);
    }
    
    if(sanmaiijounokori.length == 4){
      //といといなので、returnしちゃう
      return 'toitoi';
      
    }
    
    // あんことして扱うかの場合分け
    if(sanmaiijounokori.length >= 0){  
      
      var nokori = [].concat(nokoriorijin);
      if(nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)){
        let juntufirst = nokori[0];
        brock1 = [juntufirst,juntufirst + 1,juntufirst + 2];
        nokori.splice(nokori.indexOf(juntufirst),1);
        nokori.splice(nokori.indexOf(juntufirst + 1),1);
        nokori.splice(nokori.indexOf(juntufirst + 2),1);
        if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
          juntufirst = nokori[0];
          brock2 = [juntufirst, juntufirst + 1, juntufirst + 2];
          nokori.splice(nokori.indexOf(juntufirst), 1);
          nokori.splice(nokori.indexOf(juntufirst + 1), 1);
          nokori.splice(nokori.indexOf(juntufirst + 2), 1);
          if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
            juntufirst = nokori[0];
            brock3 = [juntufirst, juntufirst + 1, juntufirst + 2];
            nokori.splice(nokori.indexOf(juntufirst), 1);
            nokori.splice(nokori.indexOf(juntufirst + 1), 1);
            nokori.splice(nokori.indexOf(juntufirst + 2), 1);
            if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
              juntufirst = nokori[0];
              brock4 = [juntufirst, juntufirst + 1, juntufirst + 2];
              nokori.splice(nokori.indexOf(juntufirst), 1);
              nokori.splice(nokori.indexOf(juntufirst + 1), 1);
              nokori.splice(nokori.indexOf(juntufirst + 2), 1);
              
              let dekita = [].concat(jantou,brock1,brock2,brock3,brock4,agaripai);
              syuturyoku.push(dekita);
            }
          }
        }
      }
      
      
    }
    
    if(sanmaiijounokori.length >= 1){ // +1通り
    
    var nokori = [].concat(nokoriorijin);
      if (true) {
        let juntufirst = nokori[0];
        brock1 = [sanmaiijounokori[0], sanmaiijounokori[0], sanmaiijounokori[0]];
        nokori.splice(nokori.indexOf(sanmaiijounokori[0]), 1);
        nokori.splice(nokori.indexOf(sanmaiijounokori[0]), 1);
        nokori.splice(nokori.indexOf(sanmaiijounokori[0]), 1);
        if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
          juntufirst = nokori[0];
          brock2 = [juntufirst, juntufirst + 1, juntufirst + 2];
          nokori.splice(nokori.indexOf(juntufirst), 1);
          nokori.splice(nokori.indexOf(juntufirst + 1), 1);
          nokori.splice(nokori.indexOf(juntufirst + 2), 1);
          if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
            juntufirst = nokori[0];
            brock3 = [juntufirst, juntufirst + 1, juntufirst + 2];
            nokori.splice(nokori.indexOf(juntufirst), 1);
            nokori.splice(nokori.indexOf(juntufirst + 1), 1);
            nokori.splice(nokori.indexOf(juntufirst + 2), 1);
            if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
              juntufirst = nokori[0];
              brock4 = [juntufirst, juntufirst + 1, juntufirst + 2];
              nokori.splice(nokori.indexOf(juntufirst), 1);
              nokori.splice(nokori.indexOf(juntufirst + 1), 1);
              nokori.splice(nokori.indexOf(juntufirst + 2), 1);
      
              let dekita = [].concat(jantou, brock1, brock2, brock3, brock4, agaripai);
              syuturyoku.push(dekita);
            }
          }
        }
      }
    }
    
    if (sanmaiijounokori.length >= 2) { // +2通り
    
    var nokori = [].concat(nokoriorijin);
      if (true) {
        let juntufirst = nokori[0];
        brock1 = [sanmaiijounokori[1], sanmaiijounokori[1], sanmaiijounokori[1]];
        nokori.splice(nokori.indexOf(sanmaiijounokori[1]), 1);
        nokori.splice(nokori.indexOf(sanmaiijounokori[1]), 1);
        nokori.splice(nokori.indexOf(sanmaiijounokori[1]), 1);
        if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
          juntufirst = nokori[0];
          brock2 = [juntufirst, juntufirst + 1, juntufirst + 2];
          nokori.splice(nokori.indexOf(juntufirst), 1);
          nokori.splice(nokori.indexOf(juntufirst + 1), 1);
          nokori.splice(nokori.indexOf(juntufirst + 2), 1);
          if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
            juntufirst = nokori[0];
            brock3 = [juntufirst, juntufirst + 1, juntufirst + 2];
            nokori.splice(nokori.indexOf(juntufirst), 1);
            nokori.splice(nokori.indexOf(juntufirst + 1), 1);
            nokori.splice(nokori.indexOf(juntufirst + 2), 1);
            if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
              juntufirst = nokori[0];
              brock4 = [juntufirst, juntufirst + 1, juntufirst + 2];
              nokori.splice(nokori.indexOf(juntufirst), 1);
              nokori.splice(nokori.indexOf(juntufirst + 1), 1);
              nokori.splice(nokori.indexOf(juntufirst + 2), 1);
    
              let dekita = [].concat(jantou, brock1, brock2, brock3, brock4, agaripai);
              syuturyoku.push(dekita);
            }
          }
        }
      }
      
      var nokori = [].concat(nokoriorijin);
      if (true) {
        let juntufirst = nokori[0];
        brock1 = [sanmaiijounokori[0], sanmaiijounokori[0], sanmaiijounokori[0]];
        nokori.splice(nokori.indexOf(sanmaiijounokori[0]), 1);
        nokori.splice(nokori.indexOf(sanmaiijounokori[0]), 1);
        nokori.splice(nokori.indexOf(sanmaiijounokori[0]), 1);
        if (true) {
          juntufirst = nokori[0];
          brock2 = [sanmaiijounokori[1], sanmaiijounokori[1], sanmaiijounokori[1]];
          nokori.splice(nokori.indexOf(sanmaiijounokori[1]), 1);
          nokori.splice(nokori.indexOf(sanmaiijounokori[1]), 1);
          nokori.splice(nokori.indexOf(sanmaiijounokori[1]), 1);
          if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
            juntufirst = nokori[0];
            brock3 = [juntufirst, juntufirst + 1, juntufirst + 2];
            nokori.splice(nokori.indexOf(juntufirst), 1);
            nokori.splice(nokori.indexOf(juntufirst + 1), 1);
            nokori.splice(nokori.indexOf(juntufirst + 2), 1);
            if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
              juntufirst = nokori[0];
              brock4 = [juntufirst, juntufirst + 1, juntufirst + 2];
              nokori.splice(nokori.indexOf(juntufirst), 1);
              nokori.splice(nokori.indexOf(juntufirst + 1), 1);
              nokori.splice(nokori.indexOf(juntufirst + 2), 1);
      
              let dekita = [].concat(jantou, brock1, brock2, brock3, brock4, agaripai);
              syuturyoku.push(dekita);
            }
          }
        }
      }
    }
    
    if (sanmaiijounokori.length >= 3) { // +4通り
    
    var nokori = [].concat(nokoriorijin);
      if (true) {
        let juntufirst = nokori[0];
        brock1 = [sanmaiijounokori[2], sanmaiijounokori[2], sanmaiijounokori[2]];
        nokori.splice(nokori.indexOf(sanmaiijounokori[2]), 1);
        nokori.splice(nokori.indexOf(sanmaiijounokori[2]), 1);
        nokori.splice(nokori.indexOf(sanmaiijounokori[2]), 1);
        if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
          juntufirst = nokori[0];
          brock2 = [juntufirst, juntufirst + 1, juntufirst + 2];
          nokori.splice(nokori.indexOf(juntufirst), 1);
          nokori.splice(nokori.indexOf(juntufirst + 1), 1);
          nokori.splice(nokori.indexOf(juntufirst + 2), 1);
          if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
            juntufirst = nokori[0];
            brock3 = [juntufirst, juntufirst + 1, juntufirst + 2];
            nokori.splice(nokori.indexOf(juntufirst), 1);
            nokori.splice(nokori.indexOf(juntufirst + 1), 1);
            nokori.splice(nokori.indexOf(juntufirst + 2), 1);
            if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
              juntufirst = nokori[0];
              brock4 = [juntufirst, juntufirst + 1, juntufirst + 2];
              nokori.splice(nokori.indexOf(juntufirst), 1);
              nokori.splice(nokori.indexOf(juntufirst + 1), 1);
              nokori.splice(nokori.indexOf(juntufirst + 2), 1);
    
              let dekita = [].concat(jantou, brock1, brock2, brock3, brock4, agaripai);
              syuturyoku.push(dekita);
            }
          }
        }
      }
    
    var nokori = [].concat(nokoriorijin);
      if (true) {
        let juntufirst = nokori[0];
        brock1 = [sanmaiijounokori[0], sanmaiijounokori[0], sanmaiijounokori[0]];
        nokori.splice(nokori.indexOf(sanmaiijounokori[0]), 1);
        nokori.splice(nokori.indexOf(sanmaiijounokori[0]), 1);
        nokori.splice(nokori.indexOf(sanmaiijounokori[0]), 1);
        if (true) {
          juntufirst = nokori[0];
          brock2 = [sanmaiijounokori[2], sanmaiijounokori[2], sanmaiijounokori[2]];
          nokori.splice(nokori.indexOf(sanmaiijounokori[2]), 1);
          nokori.splice(nokori.indexOf(sanmaiijounokori[2]), 1);
          nokori.splice(nokori.indexOf(sanmaiijounokori[2]), 1);
          if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
            juntufirst = nokori[0];
            brock3 = [juntufirst, juntufirst + 1, juntufirst + 2];
            nokori.splice(nokori.indexOf(juntufirst), 1);
            nokori.splice(nokori.indexOf(juntufirst + 1), 1);
            nokori.splice(nokori.indexOf(juntufirst + 2), 1);
            if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
              juntufirst = nokori[0];
              brock4 = [juntufirst, juntufirst + 1, juntufirst + 2];
              nokori.splice(nokori.indexOf(juntufirst), 1);
              nokori.splice(nokori.indexOf(juntufirst + 1), 1);
              nokori.splice(nokori.indexOf(juntufirst + 2), 1);
    
              let dekita = [].concat(jantou, brock1, brock2, brock3, brock4, agaripai);
              syuturyoku.push(dekita);
            }
          }
        }
      }
      
      var nokori = [].concat(nokoriorijin);
      if (true) {
        let juntufirst = nokori[1];
        brock1 = [sanmaiijounokori[1], sanmaiijounokori[1], sanmaiijounokori[1]];
        nokori.splice(nokori.indexOf(sanmaiijounokori[1]), 1);
        nokori.splice(nokori.indexOf(sanmaiijounokori[1]), 1);
        nokori.splice(nokori.indexOf(sanmaiijounokori[1]), 1);
        if (true) {
          juntufirst = nokori[0];
          brock2 = [sanmaiijounokori[2], sanmaiijounokori[2], sanmaiijounokori[2]];
          nokori.splice(nokori.indexOf(sanmaiijounokori[2]), 1);
          nokori.splice(nokori.indexOf(sanmaiijounokori[2]), 1);
          nokori.splice(nokori.indexOf(sanmaiijounokori[2]), 1);
          if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
            juntufirst = nokori[0];
            brock3 = [juntufirst, juntufirst + 1, juntufirst + 2];
            nokori.splice(nokori.indexOf(juntufirst), 1);
            nokori.splice(nokori.indexOf(juntufirst + 1), 1);
            nokori.splice(nokori.indexOf(juntufirst + 2), 1);
            if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
              juntufirst = nokori[0];
              brock4 = [juntufirst, juntufirst + 1, juntufirst + 2];
              nokori.splice(nokori.indexOf(juntufirst), 1);
              nokori.splice(nokori.indexOf(juntufirst + 1), 1);
              nokori.splice(nokori.indexOf(juntufirst + 2), 1);
      
              let dekita = [].concat(jantou, brock1, brock2, brock3, brock4, agaripai);
              syuturyoku.push(dekita);
            }
          }
        }
      }
      
      var nokori = [].concat(nokoriorijin);
      if (true) {
        let juntufirst = nokori[0];
        brock1 = [sanmaiijounokori[0], sanmaiijounokori[0], sanmaiijounokori[0]];
        nokori.splice(nokori.indexOf(sanmaiijounokori[0]), 1);
        nokori.splice(nokori.indexOf(sanmaiijounokori[0]), 1);
        nokori.splice(nokori.indexOf(sanmaiijounokori[0]), 1);
        if (true) {
          juntufirst = nokori[0];
          brock2 = [sanmaiijounokori[2], sanmaiijounokori[2], sanmaiijounokori[2]];
          nokori.splice(nokori.indexOf(sanmaiijounokori[2]), 1);
          nokori.splice(nokori.indexOf(sanmaiijounokori[2]), 1);
          nokori.splice(nokori.indexOf(sanmaiijounokori[2]), 1);
          if (true) {
            juntufirst = nokori[0];
            brock3 = [sanmaiijounokori[1], sanmaiijounokori[1], sanmaiijounokori[1]];
            nokori.splice(nokori.indexOf(sanmaiijounokori[1]), 1);
            nokori.splice(nokori.indexOf(sanmaiijounokori[1]), 1);
            nokori.splice(nokori.indexOf(sanmaiijounokori[1]), 1);
            if (nokori.includes(nokori[0] + 1) && nokori.includes(nokori[0] + 2)) {
              juntufirst = nokori[0];
              brock4 = [juntufirst, juntufirst + 1, juntufirst + 2];
              nokori.splice(nokori.indexOf(juntufirst), 1);
              nokori.splice(nokori.indexOf(juntufirst + 1), 1);
              nokori.splice(nokori.indexOf(juntufirst + 2), 1);
      
              let dekita = [].concat(jantou, brock1, brock2, brock3, brock4, agaripai);
              syuturyoku.push(dekita);
            }
          }
        }
      }
      
    }
    
  }
  clog('場合分け:');
  console.table(syuturyoku);
  return syuturyoku;
  
  
}


function isYakuari(arr,moji1){
  let bahuu0 = [];
  let jihuu0 = [];
  let rontumo0 = [];
  if(moji1 == '現在'){
    bahuu0[1] = bahuu[1];
    bahuu0[0] = hain[bahuu0[1]];
    jihuu0[1] = jihuu[1];
    jihuu0[0] = hain[jihuu0[1]];
    rontumo0 = [].concat(rontumo);
    
  }else{
    bahuu0[0] = moji1 >> 3;
    bahuu0[1] = kaze[bahuu[0]];
    bahuu0[0] = hain[bahuu0[1]];
    jihuu0[0] = (moji1 >> 1) & 0b00011;
    jihuu0[1] = kaze[jihuu[0]];
    jihuu0[0] = hain[jihuu0[1]];
    let rt = ['ロン', 'ツモ'];
    rontumo0[0] = moji1[0] & 0b00001;
    rontumo0[1] = rt[rontumo[0]];
    
  }
  
  let jantou_ = [arr[0],arr[1]];
  let brock1_ = [arr[2],arr[3],arr[4]];
  let brock2_ = [arr[5],arr[6],arr[7]];
  let brock3_ = [arr[8],arr[9],arr[10]];
  let brock4_ = [arr[11],arr[12],arr[13]];
  let agaripai_ = arr[14];
  let isTyuutyanpai_ = [tyuutyan01(jantou_,2),
                      tyuutyan01(brock1_),
                      tyuutyan01(brock2_),
                      tyuutyan01(brock3_),
                      tyuutyan01(brock4_)];  //ちゅうちゃんぱいだけのブロックなら1,それ以外は0
  let isSansyoku_ = [['jantou',Math.floor(jantou_[0] / 10),jantou_[0]],
                    [juntu01(brock1_),Math.floor(brock1_[0] / 10),brock1_[0] % 10],
                    [juntu01(brock2_),Math.floor(brock2_[0] / 10),brock2_[0] % 10],
                    [juntu01(brock3_),Math.floor(brock3_[0] / 10),brock3_[0] % 10],
                    [juntu01(brock4_),Math.floor(brock4_[0] / 10),brock4_[0] % 10]];
                    //[isJuntu(0,1),syurui(hainの十の位),三つのうち最小の数字]
  let syurui_ = [isSansyoku_[0][1],isSansyoku_[1][1],isSansyoku_[2][1],isSansyoku_[3][1],isSansyoku_[4][1]];
  let isjuntu_ = [isSansyoku_[1][0],isSansyoku_[2][0],isSansyoku_[3][0],isSansyoku_[4][0]];
                    
                    
      let yaku_ = 0;
      //役はい
      if(brock1_[0] ==bahuu0[0] || brock1_[0] ==jihuu0[0] || brock1_[0] >=80 ||
         brock2_[0] ==bahuu0[0] || brock2_[0] ==jihuu0[0] || brock2_[0] >=80 ||
         brock3_[0] ==bahuu0[0] || brock3_[0] ==jihuu0[0] || brock3_[0] >=80 ||
         brock4_[0] ==bahuu0[0] || brock4_[0] ==jihuu0[0] || brock4_[0] >=80
         ){
           yaku_ = 'yakuhai';
           return true;
         }
      
        //タンヤオとチャンタ
      if(isTyuutyanpai_.toString() == [1,1,1,1,1].toString()){
        yaku_ = 'tanyao';
        return true;
      }else if(isTyuutyanpai_.toString() == [0,0,0,0,0].toString()){
        yaku_ = 'tyanta';
        return true;
      }
    
      //ホンイツ
      if((syurui_.includes(1) == false && syurui_.includes(2) == false)||
         (syurui_.includes(2) == false && syurui_.includes(0) == false)||
         (syurui_.includes(0) == false && syurui_.includes(1) == false))
          {
            clog(syurui_);
          yaku_ = 'honitu';
          return true;
      }
    
      //イーベーコー
      if((brock1_.toString() == brock2_.toString() && isSansyoku_[1][0] == 1 && isSansyoku_[2][0] == 1)||
          (brock1_.toString() == brock3_.toString() && isSansyoku_[1][0] == 1 && isSansyoku_[3][0] == 1)||
          (brock1_.toString() == brock4_.toString() && isSansyoku_[1][0] == 1 && isSansyoku_[4][0] == 1)||
          (brock2_.toString() == brock3_.toString() && isSansyoku_[2][0] == 1 && isSansyoku_[3][0] == 1)||
          (brock2_.toString() == brock4_.toString() && isSansyoku_[2][0] == 1 && isSansyoku_[4][0] == 1)||
          (brock3_.toString() == brock4_.toString() && isSansyoku_[3][0] == 1 && isSansyoku_[4][0] == 1)
      ){
           yaku_ = 'ibeko';
           return true;
      }
    
      //トイトイ
      if(isjuntu_.toString() == [0,0,0,0].toString()){
          yaku_ = 'toitoi';
          return true;
      }
    
      //三色
        if((isSansyoku_[0+1][0] == isSansyoku_[1+1][0] && isSansyoku_[1+1][0] == isSansyoku_[2+1][0] && isSansyoku_[2+1][0] == isSansyoku_[0+1][0] && isSansyoku_[0+1][1] != isSansyoku_[1+1][1] && isSansyoku_[1+1][1] != isSansyoku_[2+1][1] && isSansyoku_[2+1][1] != isSansyoku_[0+1][1] && isSansyoku_[0+1][2] == isSansyoku_[1+1][2] && isSansyoku_[1+1][2] == isSansyoku_[2+1][2] && isSansyoku_[2+1][2] == isSansyoku_[0+1][2] && isSansyoku_[1][2] != 0)||
          (isSansyoku_[0+1][0] == isSansyoku_[1+1][0] && isSansyoku_[1+1][0] == isSansyoku_[3+1][0] && isSansyoku_[3+1][0] == isSansyoku_[0+1][0] && isSansyoku_[0+1][1] != isSansyoku_[1+1][1] && isSansyoku_[1+1][1] != isSansyoku_[3+1][1] && isSansyoku_[3+1][1] != isSansyoku_[0+1][1] && isSansyoku_[0+1][2] == isSansyoku_[1+1][2] && isSansyoku_[1+1][2] == isSansyoku_[3+1][2] && isSansyoku_[3+1][2] == isSansyoku_[0+1][2] && isSansyoku_[1][2] != 0)||
         (isSansyoku_[3+1][0] == isSansyoku_[1+1][0] && isSansyoku_[1+1][0] == isSansyoku_[2+1][0] && isSansyoku_[2+1][0] == isSansyoku_[3+1][0] && isSansyoku_[3+1][1] != isSansyoku_[1+1][1] && isSansyoku_[1+1][1] != isSansyoku_[2+1][1] && isSansyoku_[2+1][1] != isSansyoku_[3+1][1] && isSansyoku_[3+1][2] == isSansyoku_[1+1][2] && isSansyoku_[1+1][2] == isSansyoku_[2+1][2] && isSansyoku_[2+1][2] == isSansyoku_[3+1][2] && isSansyoku_[2][2] != 0)||
         (isSansyoku_[3+1][0] == isSansyoku_[0+1][0] && isSansyoku_[0+1][0] == isSansyoku_[2+1][0] && isSansyoku_[2+1][0] == isSansyoku_[3+1][0] && isSansyoku_[3+1][1] != isSansyoku_[0+1][1] && isSansyoku_[0+1][1] != isSansyoku_[2+1][1] && isSansyoku_[2+1][1] != isSansyoku_[3+1][1] && isSansyoku_[3+1][2] == isSansyoku_[0+1][2] && isSansyoku_[0+1][2] == isSansyoku_[2+1][2] && isSansyoku_[2+1][2] == isSansyoku_[3+1][2] && isSansyoku_[1][2] != 0)
        ){
          yaku_ = 'sansyoku';
          return true;
        }
    
    //いっつー
if(
    (isSansyoku_[0+1][0] == 1 && isSansyoku_[1+1][0] == 1 && isSansyoku_[2+1][0] == 1 && isSansyoku_[0+1][1] == isSansyoku_[1+1][1] && isSansyoku_[1+1][1] == isSansyoku_[2+1][1] && ([isSansyoku_[0+1][2],isSansyoku_[1+1][2],isSansyoku_[2+1][2]].sort(function(a, b) {return a - b})).toString() == [1,4,7].toString())||
    (isSansyoku_[0+1][0] == 1 && isSansyoku_[1+1][0] == 1 && isSansyoku_[3+1][0] == 1 && isSansyoku_[0+1][1] == isSansyoku_[1+1][1] && isSansyoku_[1+1][1] == isSansyoku_[3+1][1] && ([isSansyoku_[0+1][2] ,isSansyoku_[1+1][2] ,isSansyoku_[3+1][2] ].sort(function(a, b) {return a - b})).toString() == [1,4,7].toString())||
    (isSansyoku_[0+1][0] == 1 && isSansyoku_[3+1][0] == 1 && isSansyoku_[2+1][0] == 1 && isSansyoku_[0+1][1] == isSansyoku_[3+1][1] && isSansyoku_[3+1][1] == isSansyoku_[2+1][1] && ([isSansyoku_[0+1][2] ,isSansyoku_[3+1][2] ,isSansyoku_[2+1][2] ].sort(function(a, b) {return a - b})).toString() == [1,4,7].toString())||
    (isSansyoku_[3+1][0] == 1 && isSansyoku_[1+1][0] == 1 && isSansyoku_[2+1][0] == 1 && isSansyoku_[3+1][1] == isSansyoku_[1+1][1] && isSansyoku_[1+1][1] == isSansyoku_[2+1][1] && ([isSansyoku_[3+1][2] ,isSansyoku_[1+1][2] ,isSansyoku_[2+1][2] ].sort(function(a, b) {return a - b})).toString() == [1,4,7].toString())
  ){
    yaku_ = 'ittu';
    return true;
}

    
      if(yaku_ != 0){
          //let agaripai = randomNum(1, 14);
          //let paisi = paisix.sort(haisort);
          //paisi.push(paisi[agaripai - 1]);
          //paisi.splice(agaripai - 1, 1);
          //kotae = paisi;
      
      }else{
        //その他(ピンフ、さんあんこ、メンゼンツモ)
        //さんあんこ
        let isSananko = [].concat(isjuntu_);
        isSananko = isSananko.filter(element => element == 0);
        if(isSananko.length == 3){
          if(rontumo0[1] == 'ツモ'){
            yaku_ = 'sananko';
            return true;
          }
          let juntunum = isJuntu_.indexOf(1);
          //let ankohai = [];
          let hokanohai = [];
          switch(juntunum){
            case 0:
              //ankohai = brock2.concat(brock3,brock4);
              hokanohai = [].concat(brock1_,jantou_);
              break;
            case 1:
              //ankohai = brock1.concat(brock3, brock4);
              hokanohai = [].concat(brock2_,jantou_);
              break;
            case 2:
              //ankohai = brock1.concat(brock2, brock4);
              hokanohai = [].concat(brock3_,jantou_);
              break;
            case 3:
              //ankohai = brock1.concat(brock2, brock3);
              hokanohai = [].concat(brock4_,jantou_);
              break;
          }
         if(hokanohai.includes(agaripai_)){
           yaku_ = 'sananko';
           return true;
         }
        }
        
        //ピンフ
        let ispinhujantou_ = 1;
        if(jantou_[0] == jihuu0[0] || jantou_[0] == bahuu0[0] || jantou_[0] >= 80){
          ispinhujantou_ = 0
        }
        if(isjuntu_.toString() == [1,1,1,1].toString() && ispinhujantou_ == 1){
          if(agaripai_ == brock1_[0] || agaripai_ == brock1_[2] ||
             agaripai_ == brock2_[0] || agaripai_ == brock2_[2] ||
             agaripai_ == brock3_[0] || agaripai_ == brock3_[2] ||
             agaripai_ == brock4_[0] || agaripai_ == brock4_[2]
             ){
               yaku_ = 'pinhu';
               return true;
             }
        }
        
        //メンゼンツモ
        if(yaku_ == 0 && rontumo0[0] == 1){
          
          yaku_ = 'menzentumo';
          return true;
        
        }
      }
      return false;
  
}

function tyuutyan01(brock0,length = 3){
  if(brock0[0] % 10 == 0 || brock0[0] % 10 == 1 || brock0[0] % 10 == 9 ||
     brock0[length - 1] % 10 == 0 || brock0[length - 1] % 10 == 1 || brock0[length - 1] % 10 == 9){
       return 0;
       
     }
  return 1;
}

function juntu01(brock0){
  if(brock0[0] == brock0[1] - 1 && brock0[1] == brock0[2] - 1){
    return 1;
  }
  return 0;
}
