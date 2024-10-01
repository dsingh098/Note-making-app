async function loadColors() {
    try {
      const colors = await (await fetch('../src/data.json')).json();
      const colorOptionsContainer = document.getElementById('color-options');
  
      colors.forEach(colorObj => {
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('color-option');
        colorDiv.style.backgroundColor = colorObj.color;
        colorDiv.setAttribute('data-color', colorObj.color);
  
        const tooltip = document.createElement('span');
        tooltip.classList.add('tooltip');
        tooltip.textContent = colorObj.color;
  
        colorDiv.appendChild(tooltip);
        colorOptionsContainer.appendChild(colorDiv);
      });
    } catch (error) {
      console.error('Error loading colors:', error);
    }
  }
  
  loadColors();
  
  const colorButton = document.getElementById('color-button');
  const colorOptions = document.getElementById('color-options');
  
  colorButton.addEventListener('click', () => {
    colorOptions.classList.toggle('show');
    colorOptions.style.display = colorOptions.classList.contains('show') ? 'grid' : 'none';
  });
  
  colorOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-option')) {
      const selectedColor = e.target.getAttribute('data-color');
      const textarea = document.getElementById('text-area');
      const { selectionStart: start, selectionEnd: end } = textarea;
      const selectedText = textarea.value.substring(start, end);
  
      if (selectedText) {
        const beforeText = textarea.value.substring(0, start);
        const afterText = textarea.value.substring(end);
        textarea.value = beforeText + `[color=${selectedColor}]${selectedText}[/color]` + afterText;
      }
    }
  });
  
  document.addEventListener('click', (event) => {
    if (!colorButton.contains(event.target) && !colorOptions.contains(event.target)) {
      colorOptions.classList.remove('show');
      colorOptions.style.display = 'none';
    }
  });