const CACHE_KEY = "calculation_history";

checkForStorage();

function checkForStorage(){
    if(typeof(Storage) === "undefined"){
        document.getElementById("history-perhitungan").innerHTML = `
        <tr>
        <td colspan="4">Browser Tidak Mendukung Storage</td>
        </tr>
        `;
        return false;
    }

    renderHistory();
    return true;
}

function putHistory(data){
    if(checkForStorage()){
        let historyData = [];
        if(localStorage.getItem(CACHE_KEY) !== null){
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);
        if(historyData.length > 5){
            historyData.pop();
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
    renderHistory();
}

function renderHistory(){
    let historyData = [];
    let tableBody = document.getElementById('history-perhitungan');
    tableBody.innerHTML = "";

    if(localStorage.getItem(CACHE_KEY) !== null){
        historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    if(historyData.length == 0){
        let row = document.createElement('tr');
        row.innerHTML = `<td colspan="4">Belum Ada Riwayat</td>`;
        tableBody.appendChild(row);
    }else{
        historyData.forEach((v,i) => {
            let row = document.createElement('tr');
            row.innerHTML = `
            <td>`+ v.firstNumber +`</td>
            <td>`+ v.operator +`</td>
            <td>`+ v.secondNumber +`</td>
            <td>`+ v.result +`</td>
            `;
    
            tableBody.appendChild(row);
        })
    }
}