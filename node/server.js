const path = require('path');
const express = require('express');

const PORT = 3001;
const WEB_FILE_PATH = path.resolve(__dirname, '../build');
const app = express();

app.use(express.static(WEB_FILE_PATH));

app.listen(PORT, () => {
    console.log(`服务已启动，端口：${PORT}`);
});
