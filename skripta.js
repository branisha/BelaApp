// TODO!!!!!
// Staviti u posebnu funkciju proveru pada
// Kod pritiska na unos provjeriti pad i staviti odgovarajuce vrijednosti
// Numerirati tabelu i staviti "zebra striping"
// I rasporediti stupce kako treba

// Dodati "spremi i obriši" - redci su sa klasom game-row

function provjeriPad(input){
  let check = returnRadio().val();

  let inMi = $("#inMi");
  let inVi = $("#inVi");
  // if(inMi.val().length < 1) inMi.val(0);
  // if(inVi.val().length < 1) inVi.val(0);

  if(input == "mi"){
    if(inMi.val().length > 0){
      if(inMi.val() > returnIgra() || inMi.val() < 0) inMi.val(returnIgra());
      inVi.val(returnIgra() - parseInt(inMi.val()));
    }else{
      inVi.val(returnIgra());
    }
  }
  else{
    if(inVi.val().length > 0){
      if(inVi.val() > returnIgra() || inVi.val() < 0) inVi.val(returnIgra());
      inMi.val(returnIgra() - parseInt(inVi.val()));
    }else{
      inMi.val(returnIgra());
    }
  }
  let temp = parseInt(inMi.val());
  if(isNaN(temp)){
    temp = 0;
  }

  if(check == "mi" && temp < returnIgra()/2){
    console.log("\"mi\" su pali");
    inMi.css("background-color", "red");
    inVi.css("background-color", "white");
    return "mi";
  }else if(check == "vi" && temp > returnIgra()/2){
    console.log("\"vi\" su pali");
    inMi.css("background-color", "white");
    inVi.css("background-color", "red");
    return "vi";
  }else{
    console.log("nista");
    inMi.css("background-color", "white");
    inVi.css("background-color", "white");
  }
}

function updateZvanje(){
  let total = $("#igraTotal");
  if(!isNaN(returnZvanje()))
  total.text(162 + returnZvanje());
  else total.text(162);
  provjeriPad(returnRadio().val());
}

function returnRadio(){
  return $("input[name=options]:checked");
}
function returnZvanje(){
  // if is nan, return 0, else return value
  if(!isNaN(parseInt($("#zvanje").val())))
  return parseInt($("#zvanje").val());
  else return 0;
}
function returnIgra(){
  return parseInt(returnZvanje() + 162);
}

function addRow(){
  let tab = $("#tablica");
  let valMi = parseInt($("#inMi").val());
  let valVi = parseInt($("#inVi").val());
  let totalMi = $("#totalValueMi");
  let totalVi = $("#totalValueVi");

  if((!isNaN(valMi) && !isNaN(valVi)) &&
    (valMi != 0 || valVi != 0)){

    console.log(valMi);
    console.log(valVi);

    if(provjeriPad(returnRadio()) == "mi"){
      valVi += valMi;
      valMi = 0;
    }else if(provjeriPad(returnRadio()) == "vi"){
      valMi += valVi;
      valVi = 0;
    }

  totalMi.text(parseInt(totalMi.text()) + parseInt(valMi));
  totalVi.text(parseInt(totalVi.text()) + parseInt(valVi));

  let div1 = $(document.createElement("div"));
  div1.addClass("row game-row");

  let col1 = $(document.createElement("div"));
  col1.addClass("col-2");

  let col2 = $(document.createElement("div"));
  col2.addClass("col-2");
  let span1 = $(document.createElement("span"));
  span1.text(valMi);
  col2.append(span1);
  div1.append(col1);
  div1.append(col2);
  col1 = $(document.createElement("div"));
  col1.addClass("col-4");
  div1.append(col1);

  col2 = $(document.createElement("div"));
  col2.addClass("col-2");
  span1 = $(document.createElement("span"));
  span1.text(valVi);
  col2.append(span1);

  div1.append(col2);
  //tab.append(div1);
  $("#tableHeader").after(div1);
  $("#zvanje").val("0");
  updateZvanje();
  $("#inMi").val("0");
  $("#inVi").val("0");
  provjeraKrajaIgre();
  }
}

function provjeraKrajaIgre(){
  let vi = parseInt($("#totalValueVi").text());
  let mi = parseInt($("#totalValueMi").text());
  console.log("vi" + vi);
  console.log("mi" + mi);

  if(vi > 1000){
    console.log("end");
    let temp_string = 
    "Pobjedili su \"Vi\" sa " + vi + " naprema " + mi + ".";
    $("#text-modal").text(temp_string);
    $("#item-modal").modal("show");
  }
  else if(mi > 1000){
    console.log("end");
    let temp_string = 
    "Pobjedili su \"Mi\" sa " + mi + " naprema " + vi + ".";
    $("#text-modal").text(temp_string);
    $("#item-modal").modal('show');
  }
}

$(document).ready(function(){
  let inputMi = $("#inMi");
  let inputVi = $("#inVi");
  let inputZvanje = $("#zvanje");

  $("#inVi").keyup(function(){
    provjeriPad("vi");
  });
  $("#inMi").keyup(function(){
    provjeriPad("mi");
  });
  $("#zvanje").keyup(function(){
    updateZvanje();
  });
  $("#unesi").click(function(){
    addRow();
  });

  $("input[name=options]").change(function(){
      let a = $("input[name=options]");
      provjeriPad(this.value);
      // Change class on every click
      jQuery.each(a, function(i, v){
        $(v).parent().toggleClass("btn-primary");
        $(v).parent().toggleClass("btn-secondary");
      });
  });
});
