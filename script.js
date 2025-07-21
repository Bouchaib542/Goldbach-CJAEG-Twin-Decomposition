// Racine carrée entière pour BigInt
function sqrtBigInt(n) {
  if (n < 0n) throw new Error("Negative square root");
  if (n < 2n) return n;
  let x0 = n / 2n;
  let x1 = (x0 + n / x0) / 2n;
  while (x1 < x0) {
    x0 = x1;
    x1 = (x0 + n / x0) / 2n;
  }
  return x0;
}

// Vérifie si un nombre BigInt est premier
function isPrime(n) {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;
  const sqrtN = sqrtBigInt(n) + 1n;
  for (let i = 5n; i <= sqrtN; i += 6n) {
    if (n % i === 0n || n % (i + 2n) === 0n) return false;
  }
  return true;
}

// Vérifie si n fait partie d'une paire de jumeaux
function isTwin(n) {
  return isPrime(n) && (isPrime(n - 2n) || isPrime(n + 2n));
}

// Fonction principale appelée depuis index.html
function findCJAEGPair() {
  const input = document.getElementById("inputNumber").value.trim();
  const resultDiv = document.getElementById("resultat");
  resultDiv.innerHTML = ""; // reset

  try {
    let E = BigInt(input);
    if (E % 2n !== 0n || E < 4n) {
      resultDiv.innerHTML = "<p style='color:red;'>E doit être un nombre pair ≥ 4.</p>";
      return;
    }

    const maxSteps = 100000n;
    for (let s = 1n; s <= maxSteps; s++) {
      for (let A = 2n; A <= E - 2n; A += 2n) {
        let B = E - A;

        let p1 = A - s;
        let q1 = B + s;
        let p2 = A + s;
        let q2 = B - s;

        if (p1 > 1n && q1 > 1n && isPrime(p1) && isPrime(q1) && (isTwin(p1) || isTwin(q1))) {
          resultDiv.innerHTML = `<p><strong>✔ Paire trouvée :</strong><br>p = ${p1.toString()}<br>q = ${q1.toString()}<br>s = ${s.toString()}</p>`;
          return;
        }

        if (p2 > 1n && q2 > 1n && isPrime(p2) && isPrime(q2) && (isTwin(p2) || isTwin(q2))) {
          resultDiv.innerHTML = `<p><strong>✔ Paire trouvée :</strong><br>p = ${p2.toString()}<br>q = ${q2.toString()}<br>s = ${s.toString()}</p>`;
          return;
        }
      }
    }

    resultDiv.innerHTML = "<p style='color:orange;'>❌ Aucune paire valide trouvée dans l’intervalle testé.</p>";

  } catch (err) {
    resultDiv.innerHTML = "<p style='color:red;'>Entrée invalide. Veuillez entrer un nombre pair valide.</p>";
  }
}
