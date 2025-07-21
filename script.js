// Vérifie si un nombre BigInt est premier
function isPrime(n) {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;
  const sqrtN = BigInt(Math.floor(Number(n ** 0.5n))) + 1n;
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
  const input = document.getElementById("evenNumber").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // reset

  try {
    let E = BigInt(input);
    if (E % 2n !== 0n || E < 4n) {
      resultDiv.innerHTML = "<p style='color:red;'>E must be an even number ≥ 4.</p>";
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
          resultDiv.innerHTML = `<p><strong>✔ Found pair:</strong><br>p = ${p1.toString()}<br>q = ${q1.toString()}<br>s = ${s.toString()}</p>`;
          return;
        }

        if (p2 > 1n && q2 > 1n && isPrime(p2) && isPrime(q2) && (isTwin(p2) || isTwin(q2))) {
          resultDiv.innerHTML = `<p><strong>✔ Found pair:</strong><br>p = ${p2.toString()}<br>q = ${q2.toString()}<br>s = ${s.toString()}</p>`;
          return;
        }
      }
    }

    resultDiv.innerHTML = "<p style='color:orange;'>❌ No valid pair found in the tested range.</p>";

  } catch (err) {
    resultDiv.innerHTML = "<p style='color:red;'>Invalid input. Please enter a valid even number.</p>";
  }
}
