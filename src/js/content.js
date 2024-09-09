// src/js/content.js
console.log("Content script loaded");

//let englishToGreek, greekToEnglish, sortedEnglishKeys, sortedGreekKeys;

const englishToGreek=  {
    "a": "α", "A": "Α", "b": "β", "B": "Β", "c": "κ", "C": "Κ", "d": "δ", "D": "Δ",
    "e": "ε", "E": "Ε", "f": "φ", "F": "Φ", "g": "γ", "G": "Γ", "h": "η", "H": "Η",
    "i": "ι", "I": "Ι", "j": "ξ", "J": "Ξ", "k": "κ", "K": "Κ", "l": "λ", "L": "Λ",
    "m": "μ", "M": "Μ", "n": "ν", "N": "Ν", "o": "ο", "O": "Ο", "p": "π", "P": "Π",
    "q": "κ", "Q": "Κ", "r": "ρ", "R": "Ρ", "s": "σ", "S": "Σ", "t": "τ", "T": "Τ",
    "u": "υ", "U": "Υ", "v": "β", "V": "Β", "w": "ω", "W": "Ω", "x": "χ", "X": "Χ",
    "y": "υ", "Y": "Υ", "z": "ζ", "Z": "Ζ",
    "th": "θ", "Th": "Θ", "TH": "Θ", "ps": "ψ", "Ps": "Ψ", "PS": "Ψ",
    "ph": "φ", "Ph": "Φ", "PH": "Φ", "ch": "χ", "Ch": "Χ", "CH": "Χ",
    "nt": "ντ", "Nt": "Ντ", "NT": "ΝΤ", "mp": "μπ", "Mp": "Μπ", "MP": "ΜΠ",
    "gk": "γκ", "Gk": "Γκ", "GK": "ΓΚ",
    "ou": "ου", "Ou": "Ου", "OU": "ΟΥ", "ai": "αι", "Ai": "Αι", "AI": "ΑΙ",
    "ei": "ει", "Ei": "Ει", "EI": "ΕΙ", "oi": "οι", "Oi": "Οι", "OI": "ΟΙ",
    "au": "αυ", "Au": "Αυ", "AU": "ΑΥ", "eu": "ευ", "Eu": "Ευ", "EU": "ΕΥ",
    "ca": "κα", "Ca": "Κα", "CA": "ΚΑ", "ce": "σε", "Ce": "Σε", "CE": "ΣΕ",
    "ci": "σι", "Ci": "Σι", "CI": "ΣΙ", "co": "κο", "Co": "Κο", "CO": "ΚΟ",
    "cu": "κου", "Cu": "Κου", "CU": "ΚΟΥ",
    "s ": "ς ", "S ": "Σ ", "s.": "ς.", "S.": "Σ."
  }

const greekToEnglish = {
  "α": "a", "Α": "A", "β": "b", "Β": "B", "κ": "k", "Κ": "K", "δ": "d", "Δ": "D",
  "ε": "e", "Ε": "E", "φ": "f", "Φ": "F", "γ": "g", "Γ": "G", "η": "h", "Η": "H",
  "ι": "i", "Ι": "I", "ξ": "j", "Ξ": "J", "λ": "l", "Λ": "L", "μ": "m", "Μ": "M",
  "ν": "n", "Ν": "N", "ο": "o", "Ο": "O", "π": "p", "Π": "P", "ρ": "r", "Ρ": "R",
  "σ": "s", "Σ": "S", "τ": "t", "Τ": "T", "υ": "y", "Υ": "Y", "ω": "w", "Ω": "W",
  "χ": "ch", "Χ": "Ch", "ζ": "z", "Ζ": "Z", "θ": "th", "Θ": "Th", "ψ": "ps", "Ψ": "Ps",
  "ντ": "nt", "Ντ": "Nt", "μπ": "mp", "Μπ": "Mp", "γκ": "gk", "Γκ": "Gk",
  "ου": "ou", "Ου": "Ou", "αι": "ai", "Αι": "Ai", "ει": "ei", "Ει": "Ei",
  "οι": "oi", "Οι": "Oi", "αυ": "au", "Αυ": "Au", "ευ": "eu", "Ευ": "Eu",
  "ς": "s"
}

const sortedEnglishKeys = Object.keys(englishToGreek).sort((a, b) => b.length - a.length);
const sortedGreekKeys = Object.keys(greekToEnglish).sort((a, b) => b.length - a.length);


// Load the mapping from a JSON file
// fetch(chrome.runtime.getURL('src/js/mapping.json'))
//   .then(response => response.json())
//   .then(data => {
//     englishToGreek = data.englishToGreek;
//     greekToEnglish = data.greekToEnglish;
//     sortedEnglishKeys = Object.keys(englishToGreek).sort((a, b) => b.length - a.length);
//     sortedGreekKeys = Object.keys(greekToEnglish).sort((a, b) => b.length - a.length);
//     console.log("Mapping loaded");
//   })
//   .catch(error => console.error("Error loading mapping:", error));



function convertToGreek(text) {
  if (!sortedEnglishKeys) return text; // Return original text if mapping hasn't loaded yet
  let result = '';
  let i = 0;
  while (i < text.length) {
    let matched = false;
    for (const key of sortedEnglishKeys) {
      if (text.slice(i, i + key.length).toLowerCase() === key.toLowerCase()) {
        result += englishToGreek[key];
        i += key.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result += text[i];
      i++;
    }
  }
  return result;
}

function convertToEnglish(text) {
  if (!sortedGreekKeys) return text; // Return original text if mapping hasn't loaded yet
  let result = '';
  let i = 0;
  while (i < text.length) {
    let matched = false;
    for (const key of sortedGreekKeys) {
      if (text.slice(i, i + key.length) === key) {
        result += greekToEnglish[key];
        i += key.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result += text[i];
      i++;
    }
  }
  return result;
}

function processTextNodes(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const span = document.createElement('span');
    const greekText = convertToGreek(node.textContent);
    span.textContent = greekText;
    span.title = node.textContent; // Set original text as tooltip
    span.dataset.originalText = node.textContent; // Store original text for potential reversion
    node.parentNode.replaceChild(span, node);
  } else {
    for (let child of node.childNodes) {
      processTextNodes(child);
    }
  }
}

function convertPage() {
  console.log("Converting page to Greek");
  processTextNodes(document.body);
}

function revertPage() {
  console.log("Reverting page to English");
  document.querySelectorAll('span[data-original-text]').forEach(span => {
    const textNode = document.createTextNode(span.dataset.originalText);
    span.parentNode.replaceChild(textNode, span);
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received:", request);
  if (request.action === "convert") {
    convertPage();
  } else if (request.action === "revert") {
    revertPage();
  }
});

console.log("Content script setup complete");