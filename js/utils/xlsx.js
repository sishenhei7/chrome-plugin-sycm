import XLSX from 'xlsx';

export function jsonToExcel({ data, filename, isMultiple }) {
  // A workbook is the name given to an Excel file
  const workbook = XLSX.utils.book_new();

  if (!isMultiple) {
    // export json to Worksheet of Excel
    // only array possible
    const sheet = XLSX.utils.json_to_sheet(data);

    // add Worksheet to Workbook
    // Workbook contains one or more worksheets
    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
  } else {
    data.forEach((item) => {
      const sheet = XLSX.utils.json_to_sheet(item.data);
      XLSX.utils.book_append_sheet(workbook, sheet, item.name);
    });
  }

  // export Excel file
  XLSX.writeFile(workbook, filename);
}

export function generateDownloadButton({ data, filename, isMultiple }) {
  const button = document.createElement('button');
  button.className = 'ym-button ym-button-see';
  button.innerHTML = '一面插件：点击导出';
  button.addEventListener('click', () => {
    jsonToExcel({ data, filename, isMultiple });
  });
  return button;
}
