var file = document.getElementById('file-input')
file.addEventListener('change', readSingleFile, false);

function readSingleFile(e) {
  var file = e.target.files[0];

  if (file) {
    var r = new FileReader();
    r.onload = e => {
      var contents = processExcel(e.target.result);
      console.log(contents);
      displayContents(contents)

    }
    r.readAsBinaryString(file);
  } else {
    console.log("Failed to load file");
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
  console.log(uniqueMaterialCodes);

  const columneNineValues = sheet1.map(row => row[9]);
  // console.log(columneNineValues);
  const allMeters = columneNineValues.slice(1);
  console.log(allMeters);



  let metersSquare = 0;
  const result = {};

  for (let index = 0; index < uniqueMaterialCodes.length; index++) {
    const filterted = sheet1.filter(value => value[6] === uniqueMaterialCodes[index])
    const sum = filterted.reduce((acc, value) => {
      return acc + Math.round(value[9]);
    }, 0);
    result[uniqueMaterialCodes[index]] = sum;
  };
  resultaArray = Object.entries(result);

  console.log(result);



  for (let index1 = 0; index1 < allMeters.length; index1++) {
    metersSquare += allMeters[index1];
  };




  console.log(Math.floor(metersSquare));



  const h2 = document.createElement('h2');
  h2.textContent = `suma metrów: ${Math.round(metersSquare)}`;
  document.body.appendChild(h2)
  const field = document.querySelector('.reesault__field');

  pozycja = Object.entries(result);
  console.log(pozycja);




  for (let wer = 0; wer < pozycja.length; wer++) {

    console.log(pozycja[wer]);
    let newArr = pozycja[wer]
    console.log(newArr[0]);

    field.innerHTML += `
                    <div class="reesault__row">
                    <div class="material">${newArr[0]}</div>
                    <div class="meter">${newArr[1]}</div>
                    </div>
            
            `
    field.classList.add('reesault__field__end')


  }
}

