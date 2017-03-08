'use strict';

console.log('JS Wagwan');

$(function () {

  var $form = $('.tesco');
  $form.on('submit', getIngredients);
  $('.searchDropdown').on('click', 'option', grabIngredient, showMeasure);

  function grabIngredient(e) {
    console.log('clicked on ingredient');
    console.log($(e.target).html());
    console.log($(e.target).val());
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
      $form.append('<select class="searchDropdown"></select>');
      $.each($searchArray, function (i) {
        $('.searchDropdown').hide().append('<option>' + $searchArray[i].name + '</option>').fadeIn();
      });
    }).fail(function (error) {
      console.log(error);
    });
  }
});