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

  // return JSON.stringify(result, 2, 2);
  return result;
};

function displayContents(contents) {
  const transformedData = parseData(contents);

  // let element = document.getElementById('file-content');
  // element.textContent = contents;
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




  for (let wer = 0; wer < resultaArray.length; wer++) {
    for (let index = 0; index <= 1; index++) {


      pozycja = resultaArray[wer][index];
      // console.log(pozycja);

      const div = document.createElement('div');


      div.textContent = pozycja;
      document.body.appendChild(div)

      // console.log(resultaArray);
    }
  }
}

  // div.textContent = resultaArray[0][0];
  // div2.textContent = resultaArray[0][1];
  // const costram = uniqueMaterialCodes.



  // const filtered = sheet1.filter(row => row[2] > 4 && row[2] < 9);
  // console.log(filtered);
  // const filteredMap = filtered.map(row => row[2] * 2);
  // console.log(filteredMap);
  // const filteredReduce = filteredMap.reduce((acc, value) => {
  //   // console.log(value);
  //   const transformedValue = value / 2;
  //   return [...acc, transformedValue]
  // }, []);
  // const filteredFind = sheet1.find(row => {
  //   console.log(row[2] === 2);
  //   return row[2] === 2;
  // });
  // console.log(filteredFind);
  // const value = contents[0][7][2];
  // console.log(value);

  // filter
  // map
  // reduce
  // find
  // some
  // every



