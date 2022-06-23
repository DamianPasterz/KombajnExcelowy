var file = document.getElementById('file-input')
file.addEventListener('change', readSingleFile, false);

function readSingleFile(e) {
  var file = e.target.files[0];

  if (file) {
    var r = new FileReader();
    r.onload = e => {
      var contents = processExcel(e.target.result);
      displayContents(contents)
    }
    r.readAsBinaryString(file);
  } else {
    alert("Failed to load file");
  }
}

function processExcel(data) {
  var workbook = XLSX.read(data, {
    type: 'binary'
  });

  var data = to_json(workbook);
  return data
};

function to_json(workbook) {
  var result = [];
  workbook.SheetNames.forEach(function (sheetName) {
    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1
    });

    if (roa.length) result.push(roa);
  });
  return result;
};

function displayContents(contents) {
  const transformedData = parseData(contents);
}

function parseData(contents) {
  const sheet1 = contents[0];
  const uniqueColumneValues = [...new Set(sheet1.map(row => row[6]))];
  const uniqueMaterialCodes = uniqueColumneValues.slice(1)
  const columneNineValues = sheet1.map(row => row[9]);
  const allMeters = columneNineValues.slice(1);




  let metersSquare = 0;
  const result = {};

  for (let index = 0; index < uniqueMaterialCodes.length; index++) {
    const filterted = sheet1.filter(value => value[6] === uniqueMaterialCodes[index])
    const sum = filterted.reduce((acc, value) => {
      return acc + value[9];
    }, 0);
    result[uniqueMaterialCodes[index]] = sum;
  };

  resultaArray = Object.entries(result);



  for (let index1 = 0; index1 < allMeters.length; index1++) {
    metersSquare += allMeters[index1];
  };

  const h2 = document.createElement('h2');
  h2.textContent = `suma metrów: ${Math.round(metersSquare)}`;
  document.body.appendChild(h2)
  const field = document.querySelector('.reesault__field');
  pozycja = Object.entries(result);

  for (let wer = 0; wer < pozycja.length; wer++) {
    let newArr = pozycja[wer]

    field.innerHTML += `
                    <div class="reesault__row">
                    <div class="material">${newArr[0]}</div>
                    <div class="meter">${newArr[1].toFixed(1)}</div>
                    </div>
            
            `
    field.classList.add('reesault__field__end')
  }
  field.innerHTML += `<button class="download">POBIERZ</button>`;

  const button = document.querySelector('button');

  button.onclick = function saveXls() {
    var worksheet2 = XLSX.utils.aoa_to_sheet(pozycja);
    console.log(worksheet2);
    const newWoerkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(newWoerkBook, worksheet2, "haha")
    XLSX.writeFile(newWoerkBook, "hart2.xlsx")

  }
}