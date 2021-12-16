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

  workbook.SheetNames.forEach(function(sheetName) {
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

  let element = document.getElementById('file-content');
  element.textContent = contents;
}

function parseData(contents) {
  const sheet1 = contents[0];
  const filtered = sheet1.filter(row => row[2] > 4 && row[2] < 9);
  console.log(filtered);
  const filteredMap = filtered.map(row => row[2] * 2);
  console.log(filteredMap);
  const filteredReduce = filteredMap.reduce((acc, value) => {
    // console.log(value);
    const transformedValue = value / 2;
    return [...acc, transformedValue]
  }, []);
  const filteredFind = sheet1.find(row => {
    console.log(row[2] === 2);
    return row[2] === 2;
  });
  console.log(filteredFind);
  // const value = contents[0][7][2];
  // console.log(value);

  // filter
  // map
  // reduce
  // find
  // some
  // every

  return;
}
