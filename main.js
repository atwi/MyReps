
var representativeContainer = document.getElementById("representative-info");
var btn = document.getElementById("btn");
var input=document.getElementById('inputText').value;

/* EXP */

/* EXP */

btn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  var input=document.getElementById('inputText').value;
  //Removes spaces from input string
  input=input.replace(/\s+/, "");
  console.log(input);

  ourRequest.open('GET', 'https://cors.io/?https://represent.opennorth.ca/postcodes/'+input);
  ourRequest.onload = function() {
    var ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);

  }
  ourRequest.send();
})

function renderHTML(data) {
  for (let i = 0; i < data.representatives_centroid.length; i++) {
    console.log(data.representatives_centroid.length);
    if (data.representatives_centroid[i].representative_set_name==="House of Commons") {
        console.log(data.representatives_centroid[i].name);
        var MP=i;
    }
  }
  var email=data.representatives_centroid[MP].email;
  var name=data.representatives_centroid[MP].name;
  var phone=data.representatives_centroid[MP].offices[0].tel;
  var htmlString = "<br><p>"+"Your MP is <b>"+name
  +"</b>. Contact your MP at <b><a id='emailLink'>"+email+"</a></b> and call their office at <b>"
  +phone+"</b></p>";


  representativeContainer.insertAdjacentHTML('beforeend', htmlString)
}
