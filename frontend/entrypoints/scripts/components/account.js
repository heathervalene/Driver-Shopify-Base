document.addEventListener("DOMContentLoaded", () => {

  // Login
  const forgot_trigger = document.querySelector('.js-forgot')
  const recover = document.querySelector('.js-recover')
  const recover_close = document.querySelector('.js-recover-close')
  
  
  if (forgot_trigger) {
    forgot_trigger.addEventListener('click', () => {
      recover.style.display = 'block'
    })
  }
  
  if (recover_close) {
    recover_close.addEventListener('click', () => {
      recover.style.display = 'none'
    })
  }

  // Orders
  document.querySelectorAll('.js-trigger-details').forEach(function(trigger) {
    trigger.addEventListener('click', function() {

      var parentBlock = trigger.closest('.customer-order');

      var details = parentBlock.querySelector('.details');
  
      if (details.classList.contains('block')) {
        details.classList.remove('block');
        details.classList.add('hidden');
        trigger.textContent = 'View details';
      } else {
        details.classList.remove('hidden');
        details.classList.add('block');
        trigger.textContent = 'Hide details';
      }
    });
  });
  
  
  // Addresses

  let addresses = document.querySelectorAll(".is-edit-form [data-address=root]");
  addresses.forEach((address, i) => {
    let id = address.dataset.id;
    let country_selector = document.getElementById(`${id}_country`);
    let province_selector = document.getElementById(`${id}_state`);
    // console.log(address);
    // console.log(id, country_selector, province_selector);
    let default_province = province_selector.dataset.default;
    let provinces = JSON.parse(country_selector.options[country_selector.selectedIndex].dataset.provinces)
    showProvinces(provinces, province_selector, default_province, country_selector);
  });

  let country_selector = document.getElementById('new_country');
  let province_selector = document.getElementById('new_state');
  
  if (province_selector) {
    let default_province = province_selector.dataset.default;
    let provinces = JSON.parse(country_selector.options[country_selector.selectedIndex].dataset.provinces)
    showProvinces(provinces, province_selector, default_province, country_selector);
  }

  function showProvinces(options, province_selector, default_province, country_selector){
    var previousValue = province_selector.options[0] ? province_selector.options[0].value : false 
    var isNewValue = !previousValue || options[0][0] !== previousValue ? true : false
    if (isNewValue){
      // Emptry provinces select
      province_selector.innerHTML = '';
      // Generate new options from values
      for (var i = 0; i < options.length; i++){
        var option = document.createElement('option');
        option.value = options[i][0];
        option.innerHTML = options[i][1];
        province_selector.appendChild(option);
      }
    }
    if (default_province.length > 0) {
      for (let i = 0, limit = province_selector.options.length; i < limit; i++) {
        if (province_selector.options[i].value === default_province) {
          province_selector.selectedIndex = i;
          break;
        }
      }
    }
  }

  const toggle_edit = Array.from(document.querySelectorAll('.js-toggle-edit'));

  if (toggle_edit.length > 0) {
    toggle_edit.forEach((elem) => {
      elem.addEventListener('click', () => {
        var el = document.getElementById("form_" + elem.dataset.id);
        el.style.display = el.style.display == "none" ? "" : "none";
      })
    });
  }

  const toggle_remove = Array.from(document.querySelectorAll('.js-toggle-remove'));

  if (toggle_remove.length > 0) {
    toggle_remove.forEach((elem) => {
      elem.addEventListener('click', () => {
        // if (!confirm("Are you sure you wish to delete this address?")) return;
        const body = document.body;
        let confirmPopup = document.querySelector('.js-toggle-remove-popup'),
            cancelBtn = confirmPopup.querySelector('.js-toggle-remove-cancel'),
            confirmBtn = confirmPopup.querySelector('.js-toggle-remove-confirm');

        function disableTouchMove() {
          e.preventDefault();
        }

        function closeModal() {
          body.style.overflow = '';
          body.removeEventListener('touchmove', disableTouchMove);
          confirmPopup.classList.add('hidden');
        }

        // Disable scroll
        body.style.overflow= 'hidden';
        body.addEventListener('touchmove', disableTouchMove, false);
        confirmPopup.classList.remove('hidden');

        cancelBtn.addEventListener('click', closeModal);

        confirmBtn.addEventListener('click', () => {
          var form = document.createElement("form"),
              input = document.createElement("input");
      
          form.setAttribute("method", "post");
          form.setAttribute("action", window.Shopify.routes.root + "account/addresses/" + elem.dataset.id);
          input.setAttribute("type", "hidden");
          input.setAttribute("name", "_method");
          input.setAttribute("value", "delete");

          form.appendChild(input);
          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);

          closeModal();
        });
      })
    });
  }

  const toggle = document.querySelector('.js-toggle-new-form')

  if (toggle) {
    toggle.addEventListener('click', () => {
      var el = document.getElementById("form_new");
      el.style.display = el.style.display == "none" ? "" : "none";
    })
  }
});