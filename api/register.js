// api/register.js
const axios = require('axios');

module.exports = async (req, res) => {
  // 设置CORS头，允许所有来源（在生产环境中应该限制为你的前端域名）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  如果 (请求.method === '选项') {
    返回 响应.状态(200).结束();
  }

  try {
    const { method } = req;
    const params = req.method === 'GET' ? req.query : req.body;

    let response;
    if (method === 'GET') {
      response = await axios.get('http://a.buhui.ltd/main/backend/user/Register.php', { params });
    } else {
      // 假设目标API使用application/x-www-form-urlencoded格式
      const formData = new URLSearchParams(params);
      response = await axios.post('http://a.buhui.ltd/main/backend/user/Register.php', formData.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
    }

    // 将目标API的响应返回给前端
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('代理请求失败:', error);
    // 如果axios请求失败，返回错误信息
    res.status(500).json({
      code: -1,
      msg: '代理服务器错误: ' + error.message
    });
  }
};
