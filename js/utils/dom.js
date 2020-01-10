import jsonToExcel from 'xlsx';

export function generateDownloadButton({ data, filename, isMultiple }) {
  const button = document.createElement('button');
  button.className = 'ym-button ym-button-see';
  button.innerHTML = '一面插件：点击导出';
  button.addEventListener('click', () => {
    jsonToExcel({ data, filename, isMultiple });
  });
  return button;
}

export function generateSeeButton({ parent, buttonId, callback }) {
  let button = document.querySelector(`#${buttonId}`);

  if (!button) {
    const container = document.querySelector(parent);

    if (container) {
      button = document.createElement('button');
      button.id = buttonId;
      button.className = 'ym-button ym-button-see';
      button.innerHTML = '一面插件：点击查看';

      button.addEventListener('click', () => callback());
      container.appendChild(button);
    }
  }
}
