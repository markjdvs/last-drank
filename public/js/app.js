'use strict';

console.log('js');
$(function () {
  console.log('jQuery');

  var $form = $('.tesco');
  var searchArray = [];

  $form.on('submit', getIngredients);
  $form.on('change', '.searchDropdown', grabIngredient);

  $('.carousel').carousel();

  function getIngredients(e) {
    e.preventDefault();
    var query = $form.find('input').val();
    makeAjaxCall(query);
  }

  function grabIngredient(e) {
    e.preventDefault();
    var ingredient = $('.searchDropdown').val();
    console.log('this is the chosen option:', $('.searchDropdown').val());
    console.log('clicked on ingredient');

    var ingredientData = searchArray.find(function (item) {
      return item.name === ingredient;
    });

    $('input[name="mainSpirit[name]"]').val(ingredientData.name);
    $('input[name="mainSpirit[image]"]').val(ingredientData.image);
    $('input[name="mainSpirit[price]"]').val(ingredientData.price);
    $('input[name="mainSpirit[tpnb]"]').val(ingredientData.tpnb);
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
      searchArray = data.uk.ghs.products.results;
      $('.searchDropdown').remove();
      $form.append('\n        <select class="searchDropdown" style="display:none;">\n        <option disabled selected>Please choose</option>\n        </select>\n      ');
      $.each(searchArray, function (i) {
        $('.searchDropdown').append('\n          <option>' + searchArray[i].name + '</option>\n        ').fadeIn();
      });
    }).fail(function (error) {
      console.log(error);
    });
  }
});