var repoList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');
let baseURI = "https://www.dnd5eapi.co/api/"
function getApi() {
  // Replace `octocat` with anyone else's GitHub username
  var requestUrl = baseURI + 'equipment-categories';
//arrow, battleaxe, bucket
  let checkEl = "";
  let labelEl = ""
  let divEl = ""
  let buttonEl = ""
  fetch(requestUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {

      buttonEl = $('<button>')
      buttonEl.text("GET THE STUFF")
      $("#check").append(buttonEl)
      buttonEl.on('click', buttonAction)

      data.results.forEach(function(v) {
        divEl = $('<div>')
        labelEl = $('<label>')
        checkEl = $('<input type="checkbox">')
        
        checkEl.val(v.index)

        labelEl.text(v.name)
        $("#check").append(divEl)
        divEl.append(labelEl)
        labelEl.append(checkEl)
      })
    })
    .catch(function(e) {
      console.log(`ERROR: ${e}`);
    });
}
getApi()

function buttonAction(){
  $("#check").hide();
  $("#equip").show()
  //$("label input:checked")[0].parentElement.innerText
  for (const [key, value] of Object.entries($("label input:checked"))) {
    if(!isNaN(key)){    
      console.log(value.value);
      let equipURI = baseURI + 'equipment-categories/' + value.value
      fetch(equipURI)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data);
        })
        .catch(function(e) {
          console.log(`ERROR: ${e}`);
        });
    }
  }
}

$("#equip").hide()