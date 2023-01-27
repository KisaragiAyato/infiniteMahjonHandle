let kaitouKaisuu = 0;
let kaitou = [];
let kaitouPaisuu = 0;
let seikaiColor = 'green';
let hukumareColor = 'orange';
let hukumarenaiColor = 'gray';



window.onload = function(){
  createDiv(1);
  syutudaiRandom();
}




//1行増やす関数
function createDiv (unko = 0){ //最初の処理時にはunko = 1
  var oyaDiv;
  var divId;
  if(unko == 1){
    oyaDiv = 'hyouji';
    divId = 'hyouji1';
  }else{
    oyaDiv = 'kaitou';
    divId = 'kaitou' + kaitouKaisuu;
  }
  
  var divElement = document.createElement('div');
  divElement.id = divId;
  $(oyaDiv).appendChild(divElement);
  
  for(let x = 0;x<14;x++){
    var buttonElement = document.createElement('button');
    buttonElement.classList = 'mahjonhai';
    buttonElement.id = divId + '_' + (x + 1);
    if(unko == 0){
      buttonElement.innerHTML = kaitou[x];
    }
    $(divId).appendChild(buttonElement);
  }
  
  if(unko == 1){ //nyuuryoku欄の作成
    for(let y = 0;y<4;y++){
      var divElement = document.createElement('div');
      var divId = 'nyuuryoku' + (y + 1);
      divElement.id = divId;
      $('nyuuryoku').appendChild(divElement);
      
      for (let z = 0; z <9; z++) {
        var buttonElement = document.createElement('button');
        buttonElement.classList = 'mahjonhai';
        buttonElement.id = divId + '_' + (z + 1);
        if(y == 3 && z == 8){
          buttonElement.innerHTML = '回答';
          buttonElement.onclick = haiAnsewr;
        }else if(y == 3 && z == 7){
          buttonElement.innerHTML = '消す';
          buttonElement.onclick = haiDeleat;
        }else{
          buttonElement.innerHTML = hai[9 * y + z];
          buttonElement.onclick = haiNyuuryoku;
        }
        $(divId).appendChild(buttonElement);
      }
    }
  }
  
}


function haiNyuuryoku(event){
  let paimoji = event.target.innerHTML;
  if(kaitouPaisuu >= 14 || isClear == true){
    return;
  }
  kaitouPaisuu++;
  $('hyouji1_' + kaitouPaisuu).innerHTML = paimoji;
  kaitou[kaitouPaisuu - 1] = paimoji;
  
}

function haiDeleat(){
  if(kaitouPaisuu <= 0){
    return;
  }
  $('hyouji1_' + kaitouPaisuu).innerHTML = '';
  kaitou.pop() ;
  kaitouPaisuu--;
}

function haiAnsewr(){
  if(kaitou.length != 14 || isAgari(kaitou)[0] == false || isClear == true){
    return;
  }
  clog(isAgari(kaitou));
  kaitouKaisuu++;
  createDiv();
  
  let kotaex = [].concat(kotae);
  let kaitoux = [].concat(kaitou);
  let color = [];
  let itticount = 0;
  
  for(let x = 0;x<14;x++){  //一致の確認
    if(kotaex[x] == kaitoux[x]){
      color[x] = seikaiColor;
      haijouhou[hai.indexOf(kaitoux[x])] = seikaiColor;
      kotaex[x] = 'youzumidayo';
      kaitoux[x] = 'youzumidesuyo';
      itticount++;
    }else{
      color[x] = '';
    }
  }
  
  for(let x = 0;x<14;x++){  //含まれるかの確認
    if(kaitoux[x] != 'youzumidesuyo'){
      if(kotaex.indexOf(kaitoux[x]) == -1){
        color[x] = hukumarenaiColor;
        if(haijouhou[hai.indexOf(kaitoux[x])] == 0){
          haijouhou[hai.indexOf(kaitoux[x])] = hukumarenaiColor;
        }
      }else{
        color[x] = hukumareColor;
        kotaex[kotaex.indexOf(kaitoux[x])] = 'youzumidaze';
        if (haijouhou[hai.indexOf(kaitoux[x])] != seikaiColor) {
          haijouhou[hai.indexOf(kaitoux[x])] = hukumareColor;
        }
      }
    }
  
  }
  for(let x = 0;x<14;x++){  //出力
    let buttonid = 'kaitou' + kaitouKaisuu + '_' + (x + 1);
    $(buttonid).innerHTML = kaitou[x];
    $(buttonid).style.backgroundColor = color[x];
  }
  
  //はい使われてないじょうほうを反映
  for(let x = 0;x<haijouhou.length;x++){  
    if(haijouhou[x] != 0){
      let thisid = 'nyuuryoku' + ( 1 + Math.floor(x/9) ) + '_' + ( x % 9 + 1 );
      $(thisid).style.backgroundColor = haijouhou[x];
    }
  }
  
  //表示欄を戻す
  while(kaitouPaisuu > 0){
    haiDeleat();
  }


//正解した場合
  if(itticount == 14){
    isClear = true;
  }
  
  
}
