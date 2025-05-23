# CSV to SQL Insert Generator (Node.js)

This Node.js script reads a large CSV file and outputs a single SQL `INSERT INTO` statement with all rows batched — ideal for fast bulk inserts into a database.

## 🚀 Features

- Converts CSV to one big SQL `INSERT` statement
- Handles 30,000+ rows efficiently using streaming
- Escapes single quotes in values
- Low memory footprint

## 📦 Requirements

- Node.js (v14+ recommended)
- npm

## 🧰 Installation

```bash
npm install csv-parser
