'use strict';

console.log('JS Wagwan');

$(function () {

  var $form = $('.tesco');
  $form.on('submit', getIngredients);
  $form.on('change', '.searchDropdown', function () {
    console.log('hello');
    grabIngredient();
    showMeasure();
  });

  function grabIngredient() {
    console.log($('.searchDropdown option:first-child').val());
    console.log('clicked on ingredient');
  }

  function showMeasure() {
    $form.append('<button class="addIngredient">Add Ingredient</button>');
  }

  function getIngredients(e) {
    e.preventDefault();
    var query = $form.find('input').val();
    makeAjaxCall(query);
  }

  function makeAjaxCall(query) {
    $.ajax({
      url: 'https://dev.tescolabs.com/grocery/products/?query=' + query + '&offset=0&limit=10',
      beforeSend: function beforeSend(xhrObj) {
        xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', 'd508764b9e3146b5a3978b7b68811a45');
      },
      type: 'GET'
    }).then(function (data) {
      console.log(data);
      var $searchArray = data.uk.ghs.products.results;
      $('.searchDropdown').remove();
      $form.append('<select class="searchDropdown" style="display:none;">\n        <option disabled selected>Please choose</option>\n      </select>');
      $.each($searchArray, function (i) {
        $('.searchDropdown').append('<option>' + $searchArray[i].name + '</option>').fadeIn();
      });
    }).fail(function (error) {
      console.log(error);
    });
  }
});