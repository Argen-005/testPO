// app.js
const express = require('express');
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Простой роут для проверки статуса
app.get('/api/status', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
});

// Роут с параметром
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({ 
    id: Number(id), 
    name: `User ${id}`,
    active: true 
  });
});

// POST роут для создания ресурса
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  res.status(201).json({ 
    id: Date.now(), 
    name, 
    created: true 
  });
});

// Экспортируем app для тестов (важно!)
module.exports = app;

// Запускаем сервер только если файл запущен напрямую
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}