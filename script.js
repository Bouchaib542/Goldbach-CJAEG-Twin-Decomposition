// Fonction pour vérifier si un nombre BigInt est premier
function isPrime(n) {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;

  let i = 5n;
  let w = 2n;
  while (i * i <= n) {
    if (n % i === 0n) return false;
    i += w;
    w = 6n - w;
  }
  return true;
}

// Vérifie si un nombre appartient à une paire de jumeaux
function isTwin(n) {
  return isPrime(n) && (isPrime(n - 2n) || isPrime(n + 2n));
}

// Fonction principale appelée par le bouton HTML
function findCJAEGPair() {
  const input = document.getElementById("evenNumber").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  try {
    const E = BigInt(input);
    if (E < 4n || E % 2n !== 0n) {
      resultDiv.innerHTML = "<p style='color:red;'>E doit être un nombre pair ≥ 4.</p>";
      return;
    }

    const maxS = 100000n;
    for (let s = 1n; s <= maxS; s++) {
      for (let A = 2n; A <= E - 2n; A += 2n) {
        let B = E - A;

        let p1 = A - s;
        let q1 = B + s;
        if (p1 > 1n && q1 > 1n && isPrime(p1) && isPrime(q1) && (isTwin(p1) || isTwin(q1))) {
          resultDiv.innerHTML = `<p><strong>✔ Paire trouvée :</strong><br>p = ${p1}<br>q = ${q1}<br>s = ${s}</p>`;
          return;
        }

        let p2 = A + s;
        let q2 = B - s;
        if (p2 > 1n && q2 > 1n && isPrime(p2) && isPrime(q2) && (isTwin(p2) || isTwin(q2))) {
          resultDiv.innerHTML = `<p><strong>✔ Paire trouvée :</strong><br>p = ${p2}<br>q = ${q2}<br>s = ${s}</p>`;
          return;
        }
      }
    }

    resultDiv.innerHTML = "<p style='color:orange;'>❌ Aucune paire trouvée dans la plage testée.</p>";
  } catch (err) {
    resultDiv.innerHTML = "<p style='color:red;'>Entrée invalide. Veuillez entrer un entier pair valide.</p>";
  }
}
