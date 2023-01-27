let bahuu = [];
let jihuu = [];
let rontumo = [];
let kotae = [];
let isClear = false;

function randomNum(a,b){  //a以上b以下の乱数を返す a,bは整数
  return a + Math.floor( Math.random() * (b - a + 1) );
}

function $(opp) {
  return document.getElementById(opp);
}

function clog(asdfg){
  console.log(asdfg);
}

function syutudaiRandom(){
  bahuu[0] = randomNum(0,3);
  bahuu[1] = kaze[bahuu[0]];
  jihuu[0] = randomNum(0,3);
  jihuu[1] = kaze[jihuu[0]];
  let rt = ['ロン','ツモ'];
  rontumo[0] = randomNum(0,1);
  rontumo[1] = rt[rontumo[0]];
  
  let yakuKakuritu = randomNum(0,100000);
  clog(yakuKakuritu + '(<=37:国士無双,<=2437:チートイツ)');
  if(yakuKakuritu <= 37){ //国士無双
    let nimai = randomNum(1,13);
    let agaripai = randomNum(1,14);
    let paisi = ['一萬','九萬','一筒','九筒','一索','九索','東','南','西','北','白','発','中'];
    paisi.push(paisi[nimai - 1]);
    paisi = paisi.sort(haisort);
    paisi.push(paisi[agaripai - 1]);
    paisi.splice(agaripai - 1,1);
    kotae = paisi;
    
  }else if(yakuKakuritu <= 2437){  //チートイツ
  clog('チートイ');
    let kouho = [].concat(hai);
    let sensyutu = [];
    for(let x = 0;x<7;x++){
      let randomx = randomNum(0,kouho.length - 1);
      sensyutu.push(kouho[randomx]);
      kouho.splice(randomx,1);
      
    }
    sensyutu = sensyutu.concat(sensyutu);
    let agaripai = randomNum(1,14);
    let paisi = sensyutu;
    paisi.sort(haisort);
    paisi.push(paisi[agaripai - 1]);
    paisi.splice(agaripai - 1, 1);
    kotae = paisi;
    
  }else{  //その他の役
    let yaku = 0; //0:役なし
    let isTyuutyanpai = [0,0,0,0,0];
    let syurui = [];  //1:まんず　2:ぴんず　3:そーず　0or4:じはい
    let isJuntu = [];
    let isSansyoku = [[0,0,10],[0,0,11],[0,0,12],[0,0,13]]; //[isJuntu,syurui,三つのうち最小の数字]
    let isPinhujantou = 1;
    let brock1 = [];
    let brock2 = [];
    let brock3 = [];
    let brock4 = [];
    let jantou = [];
  
    whilebun: while(yaku == 0){
      for(let n=0;n<4;n++){
        let brockx = [];
        let juntu = randomNum(0,6);
        
        if(juntu < 6){  //順子
          let startnum = randomNum(0,20);
          let startarr = [0,1,2,3,4,5,6,9,10,11,12,13,14,15,18,19,20,21,22,23,24];
          startnum = startarr[startnum];
          brockx = [hai[startnum],hai[startnum + 1],hai[startnum + 2]];
          if(startnum % 9 >= 2 && startnum % 9 <= 6){
            isTyuutyanpai[n] = 1;
          }
          syurui[n] = (Math.floor(startnum / 9)) + 1;
          isJuntu[n] = 1;
          isSansyoku[n] = [1,syurui[n],startnum % 9];
          
        }else{  //刻子
          isJuntu[n] = 0;
          let hainum = randomNum(0,hai.length - 1);
          brockx = [hai[hainum],hai[hainum],hai[hainum]];
          if(hainum == 0 || hainum == 8 || hainum == 9 || hainum == 17 || hainum == 18 || hainum >= 26){
              if(hai[hainum] == bahuu[1] || hai[hainum] == jihuu[1] || hainum >= 31){
                yaku = 'yakuhai';
                syurui[n] = 0;
              }
          }else{
            isTyuutyanpai[n] = 1;
            
            
          }
          if(hainum < 27){
            isSansyoku[n] = [0,syurui[n],hainum % 9];
            syurui[n] = (Math.floor(hainum / 9)) + 1;
          }else{
            syurui[n] = 0;
          }
        }
        switch(n){
          case 0:
            brock1 = brockx;
            break;
          case 1:
            brock2 = brockx;
            break;
          case 2:
            brock3 = brockx;
            break;
          case 3:
            brock4 = brockx;
            break;
          
        }
        
      }
      let jantounum = randomNum(0, hai.length - 1);
      jantou = [hai[jantounum], hai[jantounum]];
      if(jantounum == 0 || jantounum == 8 || jantounum == 9 || jantounum == 17 || jantounum == 18 || jantounum >= 26){
        //頭がピンフ条件かどうか
        if(jantou[0] == bahuu[1] || jantou[0] == jihuu[1] || jantounum >= 31){
          isPinhujantou = 0;
        }
      }else{
        isTyuutyanpai[4] = 1;
      }
      syurui[4] = (Math.floor(jantounum / 9)) + 1;
      
      //役判定開始
      let paisix = brock1.concat(brock2,brock3,brock4,jantou);
      
      //同じ牌を5つ以上使ってないか
      for(let k = 0;k < 10;k++){
        let arr = paisix.filter(element => element == paisix[k]);
        if(arr.length >= 5){
          yaku = 0;
          continue whilebun;
        }
      }
      
      //タンヤオとチャンタ
      if(isTyuutyanpai.toString() == [1,1,1,1,1].toString()){
        yaku = 'tanyao';
      }else if(isTyuutyanpai.toString() == [0,0,0,0,0].toString()){
        yaku = 'tyanta';
      }
    
      //ホンイツ
      if((syurui.includes(1) == false && syurui.includes(2) == false)||
         (syurui.includes(2) == false && syurui.includes(3) == false)||
         (syurui.includes(3) == false && syurui.includes(1) == false))
          {
            clog(syurui);
          yaku = 'honitu';
      }
    
      //イーベーコー
      if((brock1.toString() == brock2.toString() && isJuntu[0] == 1 && isJuntu[1] == 1)||
          (brock1.toString() == brock3.toString() && isJuntu[0] == 1 && isJuntu[2] == 1)||
          (brock1.toString() == brock4.toString() && isJuntu[0] == 1 && isJuntu[3] == 1)||
          (brock2.toString() == brock3.toString() && isJuntu[1] == 1 && isJuntu[2] == 1)||
          (brock2.toString() == brock4.toString() && isJuntu[1] == 1 && isJuntu[3] == 1)||
          (brock3.toString() == brock4.toString() && isJuntu[2] == 1 && isJuntu[3] == 1)
      ){
           yaku = 'ibeko';
      }
    
      //トイトイ
      if(isJuntu.toString() == [0,0,0,0].toString()){
          yaku = 'toitoi';
      }
    
      //三色
        if((isSansyoku[0][0] == isSansyoku[1][0] && isSansyoku[1][0] == isSansyoku[2][0] && isSansyoku[2][0] == isSansyoku[0][0] && isSansyoku[0][1] != isSansyoku[1][1] && isSansyoku[1][1] != isSansyoku[2][1] && isSansyoku[2][1] != isSansyoku[0][1] && isSansyoku[0][2] == isSansyoku[1][2] && isSansyoku[1][2] == isSansyoku[2][2] && isSansyoku[2][2] == isSansyoku[0][2])||
          (isSansyoku[0][0] == isSansyoku[1][0] && isSansyoku[1][0] == isSansyoku[3][0] && isSansyoku[3][0] == isSansyoku[0][0] && isSansyoku[0][1] != isSansyoku[1][1] && isSansyoku[1][1] != isSansyoku[3][1] && isSansyoku[3][1] != isSansyoku[0][1] && isSansyoku[0][2] == isSansyoku[1][2] && isSansyoku[1][2] == isSansyoku[3][2] && isSansyoku[3][2] == isSansyoku[0][2])||
         (isSansyoku[3][0] == isSansyoku[1][0] && isSansyoku[1][0] == isSansyoku[2][0] && isSansyoku[2][0] == isSansyoku[3][0] && isSansyoku[3][1] != isSansyoku[1][1] && isSansyoku[1][1] != isSansyoku[2][1] && isSansyoku[2][1] != isSansyoku[3][1] && isSansyoku[3][2] == isSansyoku[1][2] && isSansyoku[1][2] == isSansyoku[2][2] && isSansyoku[2][2] == isSansyoku[3][2])||
         (isSansyoku[3][0] == isSansyoku[0][0] && isSansyoku[0][0] == isSansyoku[2][0] && isSansyoku[2][0] == isSansyoku[3][0] && isSansyoku[3][1] != isSansyoku[0][1] && isSansyoku[0][1] != isSansyoku[2][1] && isSansyoku[2][1] != isSansyoku[3][1] && isSansyoku[3][2] == isSansyoku[0][2] && isSansyoku[0][2] == isSansyoku[2][2] && isSansyoku[2][2] == isSansyoku[3][2])
        ){
          yaku = 'sansyoku';
        }
    
    
      if(yaku != 0){
          let agaripai = randomNum(1, 14);
          let paisi = paisix.sort(haisort);
          paisi.push(paisi[agaripai - 1]);
          paisi.splice(agaripai - 1, 1);
          kotae = paisi;
      
      }else{
        //その他(ピンフ、さんあんこ、メンゼンツモ)
        //さんあんこ
        let isSananko = [].concat(isJuntu);
        isSananko = isSananko.filter(element => element == 0);
        if(isSananko.length == 3){
          if(rontumo[1] == 'ロン'){
            let juntunum = isJuntu.indexOf(1);
            let ankohai = [];
            let hokanohai = [];
            switch(juntunum){
              case 0:
                ankohai = [].concat(brock2,brock3,brock4);
                hokanohai = [].concat(brock1,jantou);
                break;
              case 1:
                ankohai = [].concat(brock1,brock3, brock4);
                hokanohai = [].concat(brock2,jantou);
                break;
              case 2:
                ankohai = [].concat(brock1,brock2, brock4);
                hokanohai = [].concat(brock3,jantou);
                break;
              case 3:
                ankohai = [].concat(brock1,brock2, brock3);
                hokanohai = [].concat(brock4,jantou);
                break;
            }
           let agaripai = randomNum(1, 5);
           let agaripaix = hokanohai[agaripai - 1];
           hokanohai.splice(agaripai - 1,1);
           let paisiy = ankohai.concat(hokanohai);
           paisiy = paisiy.sort(haisort);
           paisiy.push(agaripaix);
           kotae = paisiy;
           yaku = 'sananko';
          }else{  //つもあがり
            let agaripai = randomNum(1, 14);
            let paisi = paisix.sort(haisort);
            paisi.push(paisi[agaripai - 1]);
            paisi.splice(agaripai - 1, 1);
            kotae = paisi;
            yaku = 'sananko';
      
          }
        }
        
        //ピンフ
        if(isJuntu.toString() == [1,1,1,1].toString() && isPinhujantou == 1){
          let agaripai = randomNum(1,8);
          let agariarr = [0,2,3,5,6,8,9,11];
          paisix = brock1.concat(brock2,brock3,brock4,jantou);
          let agaripaiy = paisix[agariarr[agaripai - 1]];
          let paisiy = paisix;
          paisiy.splice(agariarr[agaripai - 1],1);
          paisiy = paisiy.sort(haisort);
          paisiy.push(agaripaiy);
          kotae = paisiy;
          yaku = 'pinhu';
        }
        
        //メンゼンツモ
        if(yaku == 0 && rontumo[0] == 1){
          let agaripai = randomNum(1, 14);
          let paisi = paisix.sort(haisort);
          paisi.push(paisi[agaripai - 1]);
          paisi.splice(agaripai - 1, 1);
          kotae = paisi;
          yaku = 'menzentumo';
          
        
        }
      }
    }
  clog(yaku);
  }
  $('bahuu').innerHTML = bahuu[1];
  $('jihuu').innerHTML = jihuu[1];
  $('rontumo').innerHTML = rontumo[1];
  $('syutudaiId').innerHTML = idSyuturyoku(kotae);
  console.log('答え:' + kotae);
  
  syokika();
  
  
}

function haisort (first, second) {
    if (Number(hai.indexOf(first)) > Number(hai.indexOf(second))) {
      return 1;
    } else if (Number(hai.indexOf(first)) < Number(hai.indexOf(second))) {
      return -1;
    } else {
      return 0;
    }
}



function u32(num,jougen = 64){  //0以上63以下に変換
let k = num;
  while(k<0 || k>=jougen){
    if(k<0){
      k = k + jougen;
    }else if(k>=jougen){
      k = k - jougen;
    }
    
  }
  return k;
  
}

function idSyuturyoku(arr,israndom01 = 'ランダム'){ 
  //第二引数に場風自風ロンツモ情報の1数字をいれられる。
  let paisi = [].concat(arr);
  let idnum = [];
  
  if(israndom01 == 'ランダム'){
    idnum[0] = (bahuu[0] << 3) | (jihuu[0] << 1) | rontumo[0];
  }else{
    idnum[0] = israndom01;
  }
  let id = '';
  for(let x = 0;x<14;x++){
    let painum = hai.indexOf(paisi[x]);
    idnum[x + 1] = (u32(idnum[x] + painum + 13));
    
  }
  
  for (let x = 0; x < 15; x++) {
    id = id + moji[idnum[x]];

  }  
  return id;
}

function idNyuuryoku(){
  let id = $('syutudaiInput').value;
  let idarr = Array.from(id);
  if(idarr.length != 15){
    alert('idが間違っています。');
    return;
  }
  let idnum = [];
  for (let x = 0; x < 15; x++) {
    idnum[x] = moji.indexOf(idarr[x]);
  
  }
  let kotaex = [];
  let paisinum = [];
  paisinum[0] = idnum[0];
  for (let x = 1; x < 15; x++) {
    paisinum[x] = u32(idnum[x] - idnum[x - 1] - 13);
    kotaex[x - 1] = hai[paisinum[x]];
  }
  
  let really = isAgari(kotaex,paisinum[0]);
  if(really[0]){
    kotae = really[1];
    bahuu[0] = paisinum[0] >> 3;
    bahuu[1] = kaze[bahuu[0]];
    jihuu[0] = (paisinum[0] >> 1) & 0b00011;
    jihuu[1] = kaze[jihuu[0]];
    let rt = ['ロン', 'ツモ'];
    rontumo[0] = paisinum[0] & 0b00001;
    rontumo[1] = rt[rontumo[0]];
  
    $('bahuu').innerHTML = bahuu[1];
    $('jihuu').innerHTML = jihuu[1];
    $('rontumo').innerHTML = rontumo[1];
    $('syutudaiId').innerHTML = id;
    console.log('答え:' + kotae);
  
     syokika();
  }else{
    alert('idが間違っています。');
    return;
  }
  
}


function syokika(){
  isClear = false;
  
  const node = document.getElementById("kaitou");
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }

  haijouhou = [
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0
      ]; //背景色が入る 不明は0
      
    //はい使われてないじょうほうを反映
  for(let x = 0;x<haijouhou.length;x++){  
      let thisid = 'nyuuryoku' + ( 1 + Math.floor(x/9) ) + '_' + ( x % 9 + 1 );
      $(thisid).style.backgroundColor = null;
    
  }
  
  //表示欄を戻す
  while(kaitouPaisuu > 0){
    haiDeleat();
  }

  
}


function createId(){
  if(kaitou.length != 14){
    return;
    }
  
  let bahuuq = kaze.indexOf($('createbahuu').value);
  let jihuuq = kaze.indexOf($('createjihuu').value);
  let rt = ['ロン', 'ツモ'];
  let rontumoq = rt.indexOf($('createrontumo').value);
  let firstmojinum = (bahuuq << 3) | (jihuuq << 1) | rontumoq;
  
  if(isAgari(kaitou,firstmojinum)[0] == false){
    $('createiddiv').innerHTML = '役がありません。';
    return;
  }
  
  let id = idSyuturyoku(kaitou,firstmojinum);
  $('createiddiv').innerHTML = id;
  
}
