// 手写的简易表格组件
export default class MyTable {
  constructor(id, data) {
    this.id = id;
    this.data = data;
    this.init();
  }

  init() {
    if (this.data.length === 0) {
      return;
    }

    const container = document.getElementById(this.id);
    const table = document.createElement('table');
    const thead = this.makeHeader();
    const tbody = this.makeBody();

    table.id = 'ym-table';
    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
  }

  makeHeader() {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    Object.keys(this.data[0])
      .forEach((item) => {
        const th = document.createElement('th');
        th.innerHTML = item;
        tr.appendChild(th);
      });

    thead.appendChild(tr);
    return thead;
  }

  makeBody() {
    const tbody = document.createElement('tbody');

    this.data.forEach((item) => {
      const tr = document.createElement('tr');

      Object.keys(item)
        .forEach((key) => {
          const td = document.createElement('td');
          td.innerText = item[key];
          tr.appendChild(td);
        });

      tbody.appendChild(tr);
    });

    return tbody;
  }
}
