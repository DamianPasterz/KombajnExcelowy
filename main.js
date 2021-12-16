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
  console.log(workbook);

  var data = to_json(workbook);
  return data
};

function to_json(workbook) {
  var result = {};

  workbook.SheetNames.forEach(function(sheetName) {
    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1
    });

    if (roa.length) result[sheetName] = roa;
  });

  // return JSON.stringify(result, 2, 2);
  return result;
};

function displayContents(contents) {
  let element = document.getElementById('file-content');
  element.textContent = contents;
}
