// hashMapping.js ফাইলটি ইম্পোর্ট করতে হবে
import { hashMapping } from './hashMapping.js';

// Text to Hash convert করে output দেখাবে
function convertTextToHash() {
    const text = document.getElementById("textInput").value;
    let hash = '';

    for (let char of text) {
        hash += (hashMapping[char] || '') + '.';
    }

    // শেষের অতিরিক্ত '.' বাদ দিন
    hash = hash.slice(0, -1);
    
    document.getElementById("hashOutput").textContent = "Hash: " + hash;

    // Save hash mapping to Hash.txt
    saveHashMapping();
}

// Hash থেকে Text convert করার ফাংশন
function convertHashToText() {
    const hash = document.getElementById("hashInput").value.split('.');
    let text = '';

    for (let hashValue of hash) {
        const foundKey = Object.keys(hashMapping).find(key => hashMapping[key] === hashValue);
        text += foundKey ? foundKey : '';
    }

    document.getElementById("textOutput").textContent = "Original Text: " + text;
}

// Hash mapping সংরক্ষণ করা Hash.txt ফাইলে
function saveHashMapping() {
    let data = '';
    for (let [key, value] of Object.entries(hashMapping)) {
        data += `${key}:${value}\n`;
    }
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Hash.txt';
    a.click();
    URL.revokeObjectURL(url);
}
