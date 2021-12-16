
function readSingleFile(e) {

    var file = e.target.files[0];
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        let contents = e.target.result;
        displayContents(contents);
        // console.log(e.target.files);

    };
    reader.readAsText(file);
    console.log(file);

}

function displayContents(contents) {
    let element = document.getElementById('file-content');
    element.textContent = contents;
}

document.getElementById('file-input')
    .addEventListener('change', readSingleFile, false);


const XLSX = require("xlsx");
// import xlsx from 'xlsx';

const wordkbook = XLSX.readFile(file)
const worksheet = wordkbook.Sheets["Arkusz1"];

const arrStudentd = XLSX.utils.sheet_add_json(worksheet);
console.log(arrStudentd);





