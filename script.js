// =========================
// VALIDASI DROPDOWN (FIX ERROR)
// =========================
function updatePilihan() {
    const tipe1 = document.getElementById("tipe1").value;
    const tipe2 = document.getElementById("tipe2").value;
    const error = document.getElementById("error");

    if (tipe1 === tipe2) {
        error.innerText = "Tidak boleh memilih jenis yang sama!";
    } else {
        error.innerText = "";
    }
}

// EVENT LISTENER
document.getElementById("tipe1").addEventListener("change", updatePilihan);
document.getElementById("tipe2").addEventListener("change", updatePilihan);

// =========================
// FORMAT ANGKA (NO .00)
// =========================
function formatAngka(n) {
    return parseFloat(n.toFixed(2));
}

// =========================
// HITUNG
// =========================
function hitung() {
    const tipe1 = document.getElementById("tipe1").value;
    const tipe2 = document.getElementById("tipe2").value;
    const nilai1 = parseFloat(document.getElementById("nilai1").value);
    const nilai2 = parseFloat(document.getElementById("nilai2").value);
    const error = document.getElementById("error");

    if (tipe1 === tipe2) {
        error.innerText = "Tidak boleh memilih jenis yang sama!";
        return;
    }

    if (isNaN(nilai1) || isNaN(nilai2)) {
        alert("Isi semua nilai!");
        return;
    }

    let V, I, R;

    if (tipe1 === "V") V = nilai1;
    if (tipe1 === "I") I = nilai1;
    if (tipe1 === "R") R = nilai1;

    if (tipe2 === "V") V = nilai2;
    if (tipe2 === "I") I = nilai2;
    if (tipe2 === "R") R = nilai2;

    let hasilUtama = "";
    let rumusText = "";

    if (V !== undefined && R !== undefined) {
        I = V / R;
        const P = V * I;

        hasilUtama = `
            Arus (I) = ${formatAngka(I)} Ampere<br>
            Daya (P) = ${formatAngka(P)} Watt
        `;

        rumusText = `
            I = V ÷ R<br>
            I = ${V} ÷ ${R}<br>
            I = ${formatAngka(I)} Ampere
        `;
    }

    else if (I !== undefined && R !== undefined) {
        V = I * R;
        const P = V * I;

        hasilUtama = `
            V = ${formatAngka(V)} Volt<br>
            P = ${formatAngka(P)} Watt
        `;

        rumusText = `
            V = I × R<br>
            V = ${I} × ${R}<br>
            V = ${formatAngka(V)} Volt
        `;
    }

    else if (V !== undefined && I !== undefined) {
        R = V / I;
        const P = V * I;

        hasilUtama = `
            R = ${formatAngka(R)} Ohm<br>
            P = ${formatAngka(P)} Watt
        `;

        rumusText = `
            R = V ÷ I<br>
            R = ${V} ÷ ${I}<br>
            R = ${formatAngka(R)} Ohm
        `;
    }

    const finalText = `
        ${hasilUtama}
        <br><br>
        ${rumusText}
        <br><br>
        Hukum Ohm: V = I × R
    `;

    const hasilDiv = document.getElementById("hasil");
    hasilDiv.innerHTML = finalText;

    hasilDiv.classList.remove("show");
    setTimeout(() => hasilDiv.classList.add("show"), 50);

    // RIWAYAT
    const riwayat = document.getElementById("riwayat");
    const item = `<div class="riwayat-item">${hasilUtama}</div>`;
    riwayat.innerHTML = item + riwayat.innerHTML;

    localStorage.setItem("riwayat", riwayat.innerHTML);
}

// =========================
// LOAD RIWAYAT
// =========================
window.onload = function () {
    const data = localStorage.getItem("riwayat");
    if (data) {
        document.getElementById("riwayat").innerHTML = data;
    }
};

// =========================
// HAPUS RIWAYAT (FIX)
// =========================
function hapusRiwayat() {
    document.getElementById("riwayat").innerHTML = "";
    localStorage.removeItem("riwayat");
}