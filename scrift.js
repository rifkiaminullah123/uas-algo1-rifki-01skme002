document.addEventListener('DOMContentLoaded', function() {
    // Function to calculate arithmetic operations
    function calculate() {
        const num1 = parseFloat(document.getElementById('num1').value);
        const num2 = parseFloat(document.getElementById('num2').value);
        const operator = document.getElementById('operator').value;
        let result;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num2 !== 0 ? num1 / num2 : 'Error: Pembagian dengan nol tidak diperbolehkan.';
                break;
            default:
                result = 'Operasi tidak valid';
        }
        document.getElementById('kalkulatorResult').innerText = `Hasil = ${result}`;
    }

    // Function to show inputs based on selected option for calculating area
    function showLuasInputs() {
        const option = document.getElementById('luasOption').value;
        let inputsHtml = '';
        switch (option) {
            case 'lingkaran':
                inputsHtml = '<label for="radius">Masukkan jari-jari:</label><input type="number" id="radius" step="any">';
                break;
            case 'persegi':
                inputsHtml = '<label for="sisi">Masukkan sisi:</label><input type="number" id="sisi" step="any">';
                break;
            case 'persegiPanjang':
                inputsHtml = '<label for="panjang">Masukkan panjang:</label><input type="number" id="panjang" step="any"><label for="lebar">Masukkan lebar:</label><input type="number" id="lebar" step="any">';
                break;
            case 'jajargenjang':
                inputsHtml = '<label for="alas">Masukkan alas:</label><input type="number" id="alas" step="any"><label for="tinggi">Masukkan tinggi:</label><input type="number" id="tinggi" step="any">';
                break;
            default:
                inputsHtml = '';
        }
        document.getElementById('luasInputs').innerHTML = inputsHtml;
    }

    // Function to calculate area based on selected option
    function calculateLuas() {
        const option = document.getElementById('luasOption').value;
        let result;
        switch (option) {
            case 'lingkaran':
                const radius = parseFloat(document.getElementById('radius').value);
                result = 3.14 * radius * radius;
                break;
            case 'persegi':
                const sisi = parseFloat(document.getElementById('sisi').value);
                result = sisi * sisi;
                break;
            case 'persegiPanjang':
                const panjang = parseFloat(document.getElementById('panjang').value);
                const lebar = parseFloat(document.getElementById('lebar').value);
                result = panjang * lebar;
                break;
            case 'jajargenjang':
                const alas = parseFloat(document.getElementById('alas').value);
                const tinggi = parseFloat(document.getElementById('tinggi').value);
                result = alas * tinggi;
                break;
            default:
                result = 'Pilihan tidak valid';
        }
        document.getElementById('luasResult').innerText = `Luas = ${result} cm²`;
    }

    // Function to validate and read input within a specific range
    function readDoubleInRange(input, min, max) {
        const value = parseFloat(input.value);
        if (isNaN(value) || value < min || value > max) {
            input.setCustomValidity(`Nilai harus antara ${min} dan ${max}`);
            input.reportValidity();
            return null;
        } else {
            input.setCustomValidity('');
            return value;
        }
    }

    // Function to calculate student's grade and display result
    function calculateNilai() {
        const nama = document.getElementById('nama').value;
        const nim = document.getElementById('nim').value;
        const kelas = document.getElementById('kelas').value;
        const sks = parseInt(document.getElementById('sks').value);
        const kehadiran = readDoubleInRange(document.getElementById('kehadiran'), 0, sks === 3 ? 21 : 14);
        const tugas = readDoubleInRange(document.getElementById('tugas'), 0, 100);
        const uts = readDoubleInRange(document.getElementById('uts'), 0, 100);
        const uas = readDoubleInRange(document.getElementById('uas'), 0, 100);

        if (kehadiran === null || tugas === null || uts === null || uas === null) {
            return;
        }

        const max_kehadiran = sks === 3 ? 21 : 14;
        const phadir = (kehadiran / max_kehadiran) * 10;
        const ptugas = (tugas / 100) * 20;
        const puts = (uts / 100) * 30;
        const puas = (uas / 100) * 40;

        let hasil;
        let grade;

        if (phadir < 8) {
            hasil = 0;
            grade = 'D - Absen anda Kurang dari batas minimum';
        } else {
            hasil = phadir + ptugas + puts + puas;
            grade = hasil >= 80 ? 'A' :
                    hasil >= 70 ? 'B' :
                    hasil >= 60 ? 'C' :
                    hasil >= 50 ? 'D' : 'E';
        }

        document.getElementById('nilaiResult').innerHTML = `
            Nama: ${nama}<br>
            NIM: ${nim}<br>
            Kelas: ${kelas}<br>
            Mata Kuliah: Algoritma 1<br>
            Total presentase = ${hasil.toFixed(1)} %: Grade ${grade}
        `;
    }

    // Attach event listeners to respective elements
    document.getElementById('luasOption').addEventListener('change', showLuasInputs);
    document.getElementById('kalkulator').querySelector('button').addEventListener('click', calculate);
    document.getElementById('menghitungLuas').querySelector('button').addEventListener('click', calculateLuas);
    document.getElementById('menghitungNilai').querySelector('button').addEventListener('click', calculateNilai);
});
