
var representativeContainer = document.getElementById("representative-info");
var btn = document.getElementById("btn");
var input=document.getElementById('inputText').value;

//Function to format postal code input for use
function format(text){
  //Removes spaces from input string
  text=text.replace(/\s+/, "");
  //Capitalizes entire input string
  text=text.toUpperCase();
  return text;
}

btn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  var input=document.getElementById('inputText').value;
  //Removes spaces from input string
  input=format(input);
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
        console.log("MP is "+data.representatives_centroid[i].name);
        var MP=i;
    }
    //MPP stuff
    else if (data.representatives_centroid[i].elected_office==="MPP") {
      console.log("MPP is "+data.representatives_centroid[i].name);
      var MPP=i;
      var MPPname=data.representatives_centroid[i].name;
      var MPPemail=data.representatives_centroid[i].email;
      MPPemail="<a href='"+"mailto:"+MPPemail+"'>"+MPPemail+"</a>";
    }
  }
  if (data.candidates_centroid[0].elected_office==="candidate") {
    console.log("MPP is "+data.candidates_centroid[0].name);
    var MPP=0;
    var MPPemail=data.candidates_centroid[MPP].email;
    MPPemail="<a href='"+"mailto:"+MPPemail+"'>"+MPPemail+"</a>";
    var MPPname=data.candidates_centroid[0].name;
  }


    //End of MPP stuff

  var email=data.representatives_centroid[MP].email;
  //Converts email to a hyperlink that opens the user's email program
  email="<a href='"+"mailto:"+email+"'>"+email+"</a>";
  var name=data.representatives_centroid[MP].name;
  var phone=data.representatives_centroid[MP].offices[0].tel;
  //Converts phone to a hyperlink that opens the user's calling program
  phone="<a href='"+"tel:"+phone+"'>"+phone+"</a>";
  var htmlString = "<br><p>"+"Your MP is <b>"+name
  +"</b>. Contact your MP at <b><a id='emailLink'>"+email+"</a></b> and call their office at <b>"
  +phone+"</b>.</p>"
  //MPP stuff
  +"<p>Your MPP is <b>"+MPPname+"</b>. Contact your MPP at <b>"+MPPemail+"</b>.</p>"
  //End of MPP stuff


  representativeContainer.insertAdjacentHTML('beforeend', htmlString)
}
